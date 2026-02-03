'use server';

import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { contactFormSchema } from './schema';

export async function submitContactForm(values: unknown) {
  const supabase = createSupabaseAdminClient();
  const parsedValues = contactFormSchema.safeParse(values);

  if (!parsedValues.success) {
    return { success: false, message: parsedValues.error.message };
  }

  const { data, error } = await supabase.from('contacts').insert([
    {
      name: parsedValues.data.fullName,
      email: parsedValues.data.email,
      phone: parsedValues.data.phone,
      service: parsedValues.data.service,
      message: parsedValues.data.message,
    },
  ]);

  if (error) {
    return { success: false, message: `Database error: ${error.message}` };
  }

  return {
    success: true,
    message: 'Thank you for your message! We will get back to you soon.',
  };
}
