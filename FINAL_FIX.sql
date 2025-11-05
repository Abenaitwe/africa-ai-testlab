-- COPY AND RUN THIS ENTIRE SCRIPT IN SUPABASE SQL EDITOR
-- This will fix all issues in the correct order

-- ============================================
-- STEP 1: DROP THE PROBLEMATIC CONSTRAINT
-- ============================================
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_type_check CASCADE;

-- ============================================
-- STEP 2: UPDATE ALL DATA TO VALID VALUES
-- ============================================
-- Update any 'student' to 'tester'
UPDATE public.profiles SET user_type = 'tester' WHERE user_type = 'student';

-- Update any NULL to 'tester'
UPDATE public.profiles SET user_type = 'tester' WHERE user_type IS NULL;

-- Update any other invalid values to 'tester'
UPDATE public.profiles SET user_type = 'tester' 
WHERE user_type NOT IN ('tester', 'builder');

-- ============================================
-- STEP 3: NOW ADD THE CONSTRAINT BACK
-- ============================================
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_user_type_check 
CHECK (user_type IN ('tester', 'builder'));

-- ============================================
-- STEP 4: FIX ALL RLS POLICIES
-- ============================================

-- Drop and recreate profiles policies
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Fix projects policies
DROP POLICY IF EXISTS "Projects are viewable by everyone" ON public.projects;
DROP POLICY IF EXISTS "Users can create projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete own projects" ON public.projects;

CREATE POLICY "Projects are viewable by everyone" 
ON public.projects FOR SELECT 
USING (true);

CREATE POLICY "Users can create projects" 
ON public.projects FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" 
ON public.projects FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" 
ON public.projects FOR DELETE 
USING (auth.uid() = user_id);

-- Fix project_images policies
DROP POLICY IF EXISTS "Project images are viewable by everyone" ON public.project_images;
DROP POLICY IF EXISTS "Users can add images to own projects" ON public.project_images;
DROP POLICY IF EXISTS "Users can delete images from own projects" ON public.project_images;

CREATE POLICY "Project images are viewable by everyone" 
ON public.project_images FOR SELECT 
USING (true);

CREATE POLICY "Users can add images to own projects" 
ON public.project_images FOR INSERT 
WITH CHECK (
  EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND user_id = auth.uid())
);

CREATE POLICY "Users can delete images from own projects" 
ON public.project_images FOR DELETE 
USING (
  EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND user_id = auth.uid())
);

-- Fix upvotes policies
DROP POLICY IF EXISTS "Upvotes are viewable by everyone" ON public.upvotes;
DROP POLICY IF EXISTS "Users can create upvotes" ON public.upvotes;
DROP POLICY IF EXISTS "Users can delete own upvotes" ON public.upvotes;

CREATE POLICY "Upvotes are viewable by everyone" 
ON public.upvotes FOR SELECT 
USING (true);

CREATE POLICY "Users can create upvotes" 
ON public.upvotes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own upvotes" 
ON public.upvotes FOR DELETE 
USING (auth.uid() = user_id);

-- Fix reviews policies  
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;
DROP POLICY IF EXISTS "Users can create reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can update own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can delete own reviews" ON public.reviews;

CREATE POLICY "Reviews are viewable by everyone" 
ON public.reviews FOR SELECT 
USING (true);

CREATE POLICY "Users can create reviews" 
ON public.reviews FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" 
ON public.reviews FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews" 
ON public.reviews FOR DELETE 
USING (auth.uid() = user_id);

-- ============================================
-- STEP 5: FIX STORAGE POLICIES
-- ============================================

DROP POLICY IF EXISTS "Anyone can view project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own project images" ON storage.objects;

CREATE POLICY "Anyone can view project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update project images"  
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete project images"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- ============================================
-- STEP 6: UPDATE FUNCTION FOR NEW SIGNUPS
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'tester')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$ 
BEGIN 
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅ ALL FIXES APPLIED SUCCESSFULLY!';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅ Constraint dropped and recreated';
  RAISE NOTICE '✅ All user_types updated to valid values';
  RAISE NOTICE '✅ All RLS policies fixed';
  RAISE NOTICE '✅ Storage policies configured';
  RAISE NOTICE '✅ Signup function updated';
  RAISE NOTICE '';
  RAISE NOTICE '🎉 You can now:';
  RAISE NOTICE '   - Edit your profile';
  RAISE NOTICE '   - Submit projects with images';
  RAISE NOTICE '   - Upvote projects';
  RAISE NOTICE '   - Everything should work!';
  RAISE NOTICE '========================================';
END $$;
