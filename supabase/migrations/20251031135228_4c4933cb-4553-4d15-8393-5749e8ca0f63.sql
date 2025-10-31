-- Fix security issues by adding search_path to functions

-- Update increment upvotes function
CREATE OR REPLACE FUNCTION public.increment_project_upvotes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.projects
  SET upvotes = upvotes + 1
  WHERE id = NEW.project_id;
  RETURN NEW;
END;
$$;

-- Update decrement upvotes function
CREATE OR REPLACE FUNCTION public.decrement_project_upvotes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.projects
  SET upvotes = upvotes - 1
  WHERE id = OLD.project_id;
  RETURN OLD;
END;
$$;

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;