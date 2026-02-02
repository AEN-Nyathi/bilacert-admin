
'use client';

import { useState, useEffect } from 'react';
import type { BlogPost } from '@/lib/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export function useBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
        setLoading(false);
        return;
    }
      
    const fetchBlogs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error);
        setBlogs([]);
      } else {
        const mappedData = data.map(item => ({
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
        })) as BlogPost[];

        setBlogs(mappedData);
        setError(null);
      }
      setLoading(false);
    };

    fetchBlogs();

    const channel = supabase
      .channel('blog_posts-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'blog_posts' },
        (payload) => {
          fetchBlogs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { blogs, loading, error };
}
