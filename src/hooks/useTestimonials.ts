
'use client';

import { useState, useEffect } from 'react';
import type { Testimonial } from '@/lib/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
        setLoading(false);
        return;
    }
      
    const fetchTestimonials = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error);
        setTestimonials([]);
      } else {
        const mappedData = data.map(item => ({
            id: item.id,
            postUrl: item.post_url,
            createdAt: item.created_at,
        })) as Testimonial[];

        setTestimonials(mappedData);
        setError(null);
      }
      setLoading(false);
    };

    fetchTestimonials();

    const channel = supabase
      .channel('testimonials-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'testimonials' },
        (payload) => {
          fetchTestimonials();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { testimonials, loading, error };
}
