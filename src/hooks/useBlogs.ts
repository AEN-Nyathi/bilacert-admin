
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
            published: item.published,
            createdAt: item.created_at,
            image: item.image,
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
