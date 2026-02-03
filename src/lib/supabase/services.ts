
import 'server-only';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { createClient } from '@supabase/supabase-js';
import type { Service } from '../types';

function mapToService(item: any): Service {
    return {
        id: item.id,
        title: item.title,
        slug: item.slug,
        href: item.href,
        category: item.category,
        description: item.description,
        short_description: item.short_description,
        icon: item.icon,
        order_index: item.order_index,
        content: item.content,
        features: item.features,
        requirements: item.requirements,
        includes: item.includes,
        published: item.published,
        featured: item.featured,
        created_at: item.created_at,
        processing_time: item.processing_time,
        pricing: item.pricing,
        image: item.image,
        thumbnail: item.thumbnail,
        seo_title: item.seo_title,
        seo_description: item.seo_description,
        seo_keywords: item.seo_keywords,
        pricing_plans: item.pricing_plans,
        process_steps: item.process_steps,
        success_story: item.success_story,
    };
}

export async function getPublishedServices(): Promise<Service[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return data.map(mapToService);
}

export async function getFeaturedServices(): Promise<Service[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('order_index', { ascending: true })
    .limit(4);

  if (error) {
    console.error('Error fetching featured services:', error);
    return [];
  }

  return data.map(mapToService);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return mapToService(data);
}

export async function getAllPublishedServiceSlugs(): Promise<{ slug: string }[]> {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase
      .from('services')
      .select('slug')
      .eq('published', true);
  
    if (error) {
      console.error('Error fetching service slugs:', error);
      return [];
    }
  
    return data;
}
