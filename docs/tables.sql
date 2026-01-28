-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.blog_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title character varying NOT NULL CHECK (length(title::text) > 0),
  slug character varying NOT NULL UNIQUE CHECK (length(slug::text) > 0),
  excerpt text,
  content text NOT NULL CHECK (length(content) > 0),
  category character varying,
  tags character varying,
  read_time character varying,
  seo_title character varying,
  seo_description character varying,
  seo_keywords character varying,
  featured_image character varying,
  thumbnail character varying,
  published boolean DEFAULT false,
  published_at timestamp without time zone,
  featured boolean DEFAULT false,
  author_id uuid,
  author_name character varying,
  views_count integer DEFAULT 0,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT blog_posts_pkey PRIMARY KEY (id),
  CONSTRAINT blog_posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id)
);
CREATE TABLE public.contacts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  phone text,
  service text,
  message text,
  submitted_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT contacts_pkey PRIMARY KEY (id)
);
CREATE TABLE public.form_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  form_type character varying NOT NULL CHECK (form_type::text = ANY (ARRAY['service-inquiry'::character varying, 'contact'::character varying, 'class-ecs-ecns'::character varying, 'icasa-type-approvals'::character varying, 'license-exemptions'::character varying, 'nrcs-loa'::character varying, 'radio-dealer'::character varying, 'ski-boat-vhf'::character varying]::text[])),
  status character varying NOT NULL DEFAULT 'pending'::character varying CHECK (status::text = ANY (ARRAY['pending'::character varying, 'in-progress'::character varying, 'completed'::character varying, 'rejected'::character varying, 'archived'::character varying]::text[])),
  service_id uuid,
  service_name character varying,
  full_name character varying NOT NULL CHECK (length(full_name::text) > 0),
  email character varying NOT NULL CHECK (email::text ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'::text),
  phone character varying,
  company character varying,
  industry character varying,
  details jsonb,
  internal_notes text,
  assigned_to uuid,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  completed_at timestamp without time zone,
  CONSTRAINT form_submissions_pkey PRIMARY KEY (id),
  CONSTRAINT form_submissions_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES public.users(id)
);
CREATE TABLE public.services (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title character varying NOT NULL,
  description text NOT NULL,
  short_description character varying,
  slug character varying NOT NULL UNIQUE,
  icon character varying,
  href character varying NOT NULL UNIQUE,
  category character varying NOT NULL,
  order_index integer DEFAULT 0,
  content text,
  features jsonb DEFAULT '[]'::jsonb,
  requirements jsonb DEFAULT '[]'::jsonb,
  processing_time character varying,
  image character varying,
  thumbnail character varying,
  seo_title character varying,
  seo_description character varying,
  seo_keywords character varying,
  published boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamp without time zone DEFAULT now(),
  pricing numeric,
  CONSTRAINT services_pkey PRIMARY KEY (id)
);
CREATE TABLE public.testimonials (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  post_url text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT testimonials_pkey PRIMARY KEY (id)
);
CREATE TABLE public.users (
  id uuid NOT NULL,
  email character varying NOT NULL UNIQUE,
  first_name character varying,
  last_name character varying,
  role character varying NOT NULL DEFAULT 'user'::character varying CHECK (role::text = ANY (ARRAY['admin'::character varying, 'editor'::character varying, 'user'::character varying]::text[])),
  phone character varying,
  company character varying,
  profile_image character varying,
  bio text,
  is_active boolean DEFAULT true,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  created_by uuid,
  updated_by uuid,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id),
  CONSTRAINT users_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id),
  CONSTRAINT users_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id)
);