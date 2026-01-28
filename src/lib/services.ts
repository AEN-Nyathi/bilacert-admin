
import 'server-only';
import { createClient } from './supabase/server';
import type { Service } from './types';

// This is a simplified example. In a real app, you'd handle errors more gracefully.

function mapToService(item: any): Service {
    return {
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
    };
}

export async function getPublishedServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .order('orderIndex', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return data.map(mapToService);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    // This will be caught by notFound() in the page component
    return null;
  }

  return mapToService(data);
}

export async function getAllPublishedServiceSlugs(): Promise<{ slug: string }[]> {
    const supabase = await createClient();
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
