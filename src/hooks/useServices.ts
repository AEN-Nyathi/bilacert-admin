
'use client';

import { useState, useEffect } from 'react';
import type { Service } from '@/lib/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
        setLoading(false);
        return;
    }
      
    const fetchServices = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error);
        setServices([]);
      } else {
        const mappedData = data.map(item => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            href: item.href,
            category: item.category,
            description: item.description,
            shortDescription: item.short_description,
            icon: item.icon,
            orderIndex: item.order_index,
            content: item.content,
            features: item.features,
            requirements: item.requirements,
            published: item.published,
            featured: item.featured,
            createdAt: item.created_at,
            processingTime: item.processing_time,
            pricing: item.pricing,
            image: item.image,
            thumbnail: item.thumbnail,
            seoTitle: item.seo_title,
            seoDescription: item.seo_description,
            seoKeywords: item.seo_keywords,
        })) as Service[];

        setServices(mappedData);
        setError(null);
      }
      setLoading(false);
    };

    fetchServices();

    const channel = supabase
      .channel('services-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'services' },
        (payload) => {
          fetchServices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { services, loading, error };
}

