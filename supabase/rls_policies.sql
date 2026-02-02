-- RLS Policies for Bilacert App

-- Enable RLS for all relevant tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public can read services" ON public.services;
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;

DROP POLICY IF EXISTS "Public can read blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;

DROP POLICY IF EXISTS "Public can read testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;

DROP POLICY IF EXISTS "Admins can manage contacts" ON public.contacts;

DROP POLICY IF EXISTS "Allow public form submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Admins can manage form submissions" ON public.form_submissions;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can manage all user profiles" ON public.users;


-- Helper function to check for admin role
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
DECLARE
  user_role TEXT;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;
  SELECT role INTO user_role FROM public.users WHERE id = auth.uid();
  RETURN user_role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Policies for 'services' table
CREATE POLICY "Public can read services" ON public.services
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());


-- Policies for 'blog_posts' table
CREATE POLICY "Public can read blog posts" ON public.blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage blog posts" ON public.blog_posts
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());


-- Policies for 'testimonials' table
CREATE POLICY "Public can read testimonials" ON public.testimonials
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());


-- Policies for 'contacts' table
CREATE POLICY "Admins can manage contacts" ON public.contacts
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());


-- Policies for 'form_submissions' table
CREATE POLICY "Allow public form submissions" ON public.form_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage form submissions" ON public.form_submissions
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
  

-- Policies for 'users' table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);
  
CREATE POLICY "Admins can manage all user profiles" ON public.users
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());