import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zemacbxlbsydzhmcumbr.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplbWFjYnhsYnN5ZHpobWN1bWJyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTkwNjYyNCwiZXhwIjoyMDc3NDgyNjI0fQ.OfaE51f9HNAqEsDgh-IZxx6edYE89L750Se78Srzxl4';

const supabase = createClient(supabaseUrl, serviceRoleKey);

console.log('🚀 Fixing constraint issue...\n');

async function fixConstraint() {
  try {
    // Use the REST API to execute raw SQL
    console.log('1️⃣ Dropping existing constraint...');
    
    const dropConstraintSQL = `ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_type_check CASCADE;`;
    
    const dropResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({ query: dropConstraintSQL })
    });

    console.log('   Constraint drop response:', dropResponse.status);

    // Now update via Supabase client (bypasses RLS)
    console.log('\n2️⃣ Updating profiles to tester...');
    const { data: updated, error: updateError } = await supabase
      .from('profiles')
      .update({ user_type: 'tester' })
      .eq('user_type', 'student')
      .select();

    if (updateError) {
      console.error('   ❌ Update error:', updateError);
    } else {
      console.log(`   ✅ Updated ${updated?.length || 0} profiles`);
    }

    // Also update any NULL or invalid values
    console.log('\n3️⃣ Fixing any NULL or invalid user_types...');
    const { data: allProfiles } = await supabase
      .from('profiles')
      .select('id, username, user_type');

    if (allProfiles) {
      for (const profile of allProfiles) {
        if (!profile.user_type || !['tester', 'builder'].includes(profile.user_type)) {
          const { error } = await supabase
            .from('profiles')
            .update({ user_type: 'tester' })
            .eq('id', profile.id);
          
          if (error) {
            console.error(`   ❌ Error fixing ${profile.username}:`, error);
          } else {
            console.log(`   ✅ Fixed ${profile.username}`);
          }
        }
      }
    }

    console.log('\n✨ Data fixed! Now you can run the constraint SQL in Supabase Dashboard.');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixConstraint();
