-- Create function to increment project views
CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE projects
  SET views = COALESCE(views, 0) + 1
  WHERE id = project_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION increment_project_views(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_project_views(UUID) TO anon;
