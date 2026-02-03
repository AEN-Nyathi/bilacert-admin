'use server';

import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { serviceSchema } from './schema';
import { revalidatePath } from 'next/cache';
import { Service } from '@/lib/types';

export async function upsertService(values: unknown, serviceId?: string) {
  const supabase = createSupabaseAdminClient();
  const parsedValues = serviceSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: parsedValues.error.message };
  }
  
  const transformStringToArray = (str?: string) => str ? str.split('\n').map(s => s.trim()).filter(Boolean) : [];

  const serviceData: any = {
    title: parsedValues.data.title,
    slug: parsedValues.data.slug,
    href: parsedValues.data.href,
    category: parsedValues.data.category,
    description: parsedValues.data.description,
    short_description: parsedValues.data.short_description,
    icon: parsedValues.data.icon,
    order_index: parsedValues.data.order_index,
    content: parsedValues.data.content,
    features: transformStringToArray(parsedValues.data.features),
    requirements: transformStringToArray(parsedValues.data.requirements),
    includes: transformStringToArray(parsedValues.data.includes),
    published: parsedValues.data.published,
    featured: parsedValues.data.featured,
    processing_time: parsedValues.data.processing_time,
    pricing: parsedValues.data.pricing,
    image: parsedValues.data.image,
    thumbnail: parsedValues.data.thumbnail,
    seo_title: parsedValues.data.seo_title,
    seo_description: parsedValues.data.seo_description,
    seo_keywords: parsedValues.data.seo_keywords,
    pricing_plans: parsedValues.data.pricing_plans.map(p => ({ ...p, features: transformStringToArray(p.features) })),
    process_steps: parsedValues.data.process_steps,
    success_story: parsedValues.data.success_story,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('services')
    .upsert(serviceId ? { ...serviceData, id: serviceId } : { ...serviceData, created_at: new Date().toISOString() })
    .select('*')
    .single();

  if (error) {
    return { error: `Database error: ${error.message}` };
  }

  revalidatePath('/admin/services');
  revalidatePath(`/admin/services/${(data as Service).id}`);
  revalidatePath(`/services/${(data as Service).slug}`);

  return {
    data: data,
    message: `Service ${serviceId ? 'updated' : 'created'} successfully!`,
  };
}
