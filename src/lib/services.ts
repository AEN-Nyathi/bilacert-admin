
import 'server-only';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { createClient as createGenericClient } from '@supabase/supabase-js';
import type { Service } from './types';

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
        includes: item.includes,
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
        pricingPlans: item.pricing_plans,
        processSteps: item.process_steps,
        successStory: item.success_story,
    };
}

export async function getPublishedServices(): Promise<Service[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return data.map(mapToService);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = await createServerClient();
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
    const supabase = createGenericClient(
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
