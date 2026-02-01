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
        published: item.published,
        createdAt: item.created_at,
        image: item.image,
        author_name: item.author_name,
        read_time: item.read_time,
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
