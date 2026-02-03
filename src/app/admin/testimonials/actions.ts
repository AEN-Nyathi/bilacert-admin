'use server';

import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { testimonialSchema } from './schema';
import { revalidatePath } from 'next/cache';
import { Testimonial } from '@/lib/types';

export async function upsertTestimonial(values: unknown, testimonialId?: string) {
  const supabase = createSupabaseAdminClient();
  const parsedValues = testimonialSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: parsedValues.error.message };
  }

  const { data, error } = await supabase
    .from('testimonials')
    .upsert(testimonialId ? { ...parsedValues.data, id: testimonialId } : { post_url: parsedValues.data.postUrl })
    .select('*')
    .single();

  if (error) {
    return { error: `Database error: ${error.message}` };
  }

  revalidatePath('/admin/testimonials');
  revalidatePath(`/admin/testimonials/${(data as Testimonial).id}`);

  return {
    data: data,
    message: `Testimonial ${testimonialId ? 'updated' : 'created'} successfully!`,
  };
}
