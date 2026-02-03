-- ===============================================================================================
-- SUPABASE STORAGE POLICIES
-- ===============================================================================================
-- This file defines the Row Level Security (RLS) policies for the Supabase Storage buckets.
-- Buckets: 'blogs', 'services'
--
-- Policies:
-- 1. Public Read Access: Allows anyone to view images in the buckets. This is necessary for
--    displaying images on the public-facing website.
-- 2. Authenticated Write Access: Allows only authenticated users (i.e., logged-in admins)
--    to upload, update, and delete images. This secures your storage from public writes.
--
-- To Apply: Copy the content of this file and run it in the Supabase SQL Editor for your project.
-- ===============================================================================================


-- -----------------------------------------------------------------------------------------------
-- Policies for 'blogs' bucket
-- -----------------------------------------------------------------------------------------------

-- 1. Allow public read access to all files in the 'blogs' bucket.
CREATE POLICY "Public read access for blog images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blogs' );

-- 2. Allow authenticated users to upload files to the 'blogs' bucket.
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'blogs' );

-- 3. Allow authenticated users to update files in the 'blogs' bucket.
CREATE POLICY "Authenticated users can update blog images"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'blogs' );

-- 4. Allow authenticated users to delete files in the 'blogs' bucket.
CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'blogs' );


-- -----------------------------------------------------------------------------------------------
-- Policies for 'services' bucket
-- -----------------------------------------------------------------------------------------------

-- 1. Allow public read access to all files in the 'services' bucket.
CREATE POLICY "Public read access for service images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'services' );

-- 2. Allow authenticated users to upload files to the 'services' bucket.
CREATE POLICY "Authenticated users can upload service images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'services' );

-- 3. Allow authenticated users to update files in the 'services' bucket.
CREATE POLICY "Authenticated users can update service images"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'services' );

-- 4. Allow authenticated users to delete files in the 'services' bucket.
CREATE POLICY "Authenticated users can delete service images"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'services' );
