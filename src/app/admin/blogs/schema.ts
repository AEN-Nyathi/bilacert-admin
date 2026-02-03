import * as z from 'zod';

export const blogSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  author_name: z.string().optional(),
  read_time: z.string().optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required.'),
  published: z.boolean(),
  featured_image: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  thumbnail: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  featured: z.boolean(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.string().optional(),
});

export type BlogFormValues = z.infer<typeof blogSchema>;
