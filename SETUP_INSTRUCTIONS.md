# Rate That AI - Setup Instructions

## ⚠️ IMPORTANT: Database Migration Required

Before the application will work properly, you **MUST** run the database migration to create the storage bucket and update user types.

### Step 1: Apply the Migration

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor**
4. Open the migration file: `supabase/migrations/20251105000000_storage_and_user_type_update.sql`
5. Copy the entire SQL content
6. Paste it into the SQL Editor
7. Click **Run** to execute the migration

### What the Migration Does:

1. **Creates Storage Bucket**: Creates the `project-images` bucket for storing project screenshots and avatars
2. **Sets Up Storage Policies**: Configures public read access and authenticated write access
3. **Updates User Types**: Changes 'student' to 'tester' in the database
4. **Updates Functions**: Ensures new signups create 'tester' profiles by default

## 🚀 Features Implemented

### 1. Authentication & User Management
- ✅ User profiles with avatars, bio, skills, location
- ✅ Signup/Login for testers
- ✅ Profile editing page (`/settings`)
- ✅ User authentication state in navigation

### 2. AI Builder Partners
All 12 partners added to submission form and landing page:
- Base44
- Blink  
- Bolt.new
- Cursor
- HeyBoss
- Lovable
- Mocha
- Orchids
- Rork
- v0
- Windsurf
- Wix

### 3. Project Management
- ✅ Submit projects with screenshots (up to 5 images)
- ✅ Image upload to Supabase Storage
- ✅ Browse projects on Explore page
- ✅ Real-time filtering by AI tool and category
- ✅ Search functionality

### 4. Upvoting System
- ✅ Upvote/downvote projects
- ✅ Real-time upvote counts
- ✅ Requires authentication
- ✅ Animated interactions

### 5. Leaderboards
- ✅ **Top AI Tools**: Ranked by total upvotes and project count
- ✅ **Top Testers**: Ranked by activity score (3 pts per project + 1 pt per review)
- ✅ Real-time data from database

### 6. Community
- ✅ Testers page loads real users from database
- ✅ Search by name, university, skills
- ✅ Profile stats (projects, reviews, upvotes)

## 🔧 Configuration

The `.env` file is already configured with your Supabase credentials:
- Project URL: `https://zemacbxlbsydzhmcumbr.supabase.co`
- Anon Key: Already set

## 📝 Known Limitations & Next Steps

### Still To Implement:
1. **Project Detail Page** - View full project details with all images
2. **Reviews System** - Add reviews and ratings to projects  
3. **Comments** - Discussion on projects
4. **Notifications** - Alert users of upvotes, reviews, etc.

### Future Enhancements:
- Email verification
- Social auth (Google, GitHub)
- Project categories/tags filtering
- Trending projects algorithm
- Weekly/monthly highlights

## 🐛 Troubleshooting

### "Bucket not found" Error
**Solution**: You haven't run the migration yet. Follow Step 1 above.

### Can't see yourself in Testers page
**Possible Causes**:
1. Your user_type is still 'student' instead of 'tester' - run the migration
2. You signed up before the migration - run the migration to convert your account

### Images not uploading
**Possible Causes**:
1. Storage bucket doesn't exist - run the migration
2. File size > 10MB - reduce image size
3. Wrong file format - use JPG, PNG, or WEBP

### Profile edit not working
**Solution**: Make sure you're logged in and the session is active

## 📊 Database Schema

### Tables:
- `profiles` - User profiles (id, username, full_name, user_type, bio, etc.)
- `projects` - Projects (id, user_id, title, description, ai_tool, upvotes, etc.)
- `project_images` - Project screenshots (id, project_id, image_url, display_order)
- `upvotes` - Upvote tracking (id, project_id, user_id)
- `reviews` - Project reviews (id, project_id, user_id, rating, comment)

### Storage Buckets:
- `project-images` - Stores project screenshots and user avatars

## 🎨 Design System

- **Theme**: Retro 70's vibe with brutalist design
- **Colors**: Golden Yellow (primary), Coral Red (secondary), Velvet Black (accent)
- **Typography**: Playfair Display for headings, Inter for body
- **Components**: Thick borders, drop shadows, bold colors

## 🚦 Testing Checklist

After running the migration, test these features:

1. ✅ Sign up as a new tester
2. ✅ Edit your profile (add bio, avatar, skills)
3. ✅ Submit a project with screenshots
4. ✅ Browse projects on Explore page
5. ✅ Upvote a project
6. ✅ View your profile
7. ✅ Check leaderboards
8. ✅ Search for testers

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify migration was run successfully
3. Check Supabase dashboard for data
4. Ensure storage policies are correctly set

## 🎉 You're Ready!

Once you've run the migration, your Rate That AI platform is fully functional and ready to use!
