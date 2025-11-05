import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zemacbxlbsydzhmcumbr.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplbWFjYnhsYnN5ZHpobWN1bWJyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTkwNjYyNCwiZXhwIjoyMDc3NDgyNjI0fQ.OfaE51f9HNAqEsDgh-IZxx6edYE89L750Se78Srzxl4';

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

console.log('🚀 Starting database fixes with service role key...\n');

async function fixDatabase() {
  try {
    // Step 1: Check current profiles
    console.log('1️⃣ Checking profiles...');
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('id, username, user_type')
      .order('created_at', { ascending: false });

    if (profileError) {
      console.error('Error fetching profiles:', profileError);
    } else {
      console.log(`   Found ${profiles.length} profiles`);
      const studentProfiles = profiles.filter(p => p.user_type === 'student');
      console.log(`   - ${studentProfiles.length} with user_type='student'`);
      console.log(`   - ${profiles.filter(p => p.user_type === 'tester').length} with user_type='tester'`);
      console.log(`   - ${profiles.filter(p => p.user_type === 'builder').length} with user_type='builder'`);
    }

    // Step 2: Update all 'student' to 'tester'
    console.log('\n2️⃣ Updating student profiles to tester...');
    const { data: updated, error: updateError } = await supabase
      .from('profiles')
      .update({ user_type: 'tester' })
      .eq('user_type', 'student')
      .select();

    if (updateError) {
      console.error('   ❌ Error updating profiles:', updateError);
    } else {
      console.log(`   ✅ Updated ${updated?.length || 0} profiles from student to tester`);
    }

    // Step 3: Check for any NULL or invalid user_types
    console.log('\n3️⃣ Checking for NULL or invalid user_types...');
    const { data: invalidProfiles, error: invalidError } = await supabase
      .from('profiles')
      .select('id, username, user_type')
      .not('user_type', 'in', '(tester,builder)');

    if (invalidError) {
      console.error('   ❌ Error checking invalid profiles:', invalidError);
    } else if (invalidProfiles && invalidProfiles.length > 0) {
      console.log(`   Found ${invalidProfiles.length} profiles with invalid user_type`);
      console.log('   Fixing them...');
      
      for (const profile of invalidProfiles) {
        const { error: fixError } = await supabase
          .from('profiles')
          .update({ user_type: 'tester' })
          .eq('id', profile.id);
        
        if (fixError) {
          console.error(`   ❌ Error fixing profile ${profile.username}:`, fixError);
        } else {
          console.log(`   ✅ Fixed profile ${profile.username}`);
        }
      }
    } else {
      console.log('   ✅ All profiles have valid user_types');
    }

    // Step 4: Verify all profiles are valid now
    console.log('\n4️⃣ Verifying all profiles...');
    const { data: finalProfiles, error: finalError } = await supabase
      .from('profiles')
      .select('id, username, user_type');

    if (finalError) {
      console.error('   ❌ Error verifying profiles:', finalError);
    } else {
      const allValid = finalProfiles.every(p => ['tester', 'builder'].includes(p.user_type));
      if (allValid) {
        console.log('   ✅ All profiles have valid user_types!');
      } else {
        console.log('   ⚠️  Some profiles still have invalid user_types');
        finalProfiles.filter(p => !['tester', 'builder'].includes(p.user_type))
          .forEach(p => console.log(`      - ${p.username}: ${p.user_type}`));
      }
    }

    console.log('\n✨ Database fix completed!');
    console.log('\n📋 Next steps:');
    console.log('   1. Now run this SQL in Supabase Dashboard:');
    console.log('      ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_type_check;');
    console.log('      ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_type_check');
    console.log("        CHECK (user_type IN ('tester', 'builder'));");
    console.log('   2. Test editing your profile');
    console.log('   3. Test submitting a project');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

fixDatabase();
