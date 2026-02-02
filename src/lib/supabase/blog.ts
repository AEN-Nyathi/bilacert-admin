import 'server-only';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { createClient } from '@supabase/supabase-js';
import type { BlogPost } from '../types';

function mapToBlogPost(item: any): BlogPost {
    return {
        id: item.id,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        content: item.content,
        category: item.category,
        tags: item.tags,
        read_time: item.read_time,
        seo_title: item.seo_title,
        seo_description: item.seo_description,
        seo_keywords: item.seo_keywords,
        featured_image: item.featured_image,
        thumbnail: item.thumbnail,
        published: item.published,
        published_at: item.published_at,
        featured: item.featured,
        author_id: item.author_id,
        author_name: item.author_name,
        views_count: item.views_count,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
    };
}

export async function getPublishedBlogPosts(limit?: number): Promise<BlogPost[]> {
    const supabase = await createServerClient();
    let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }
  
    const { data, error } = await query;
  
    if (error) {
      console.error('Error fetching blog posts:', error.message);
      return [];
    }
  
    return data.map(mapToBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
  
    if (error || !data) {
      return null;
    }
  
    return mapToBlogPost(data);
}

export async function getAllPublishedBlogSlugs(): Promise<{ slug: string }[]> {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('published', true);
  
    if (error) {
      console.error('Error fetching blog slugs:', error);
      return [];
    }
  
    return data;
}
