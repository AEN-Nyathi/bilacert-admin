'use server';

import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { submissionSchema } from './schema';
import { revalidatePath } from 'next/cache';
import { Submission } from '@/lib/types';

export async function upsertSubmission(values: unknown, submissionId: string) {
  const supabase = createSupabaseAdminClient();
  const parsedValues = submissionSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: parsedValues.error.message };
  }
  
  const submissionData = {
    full_name: parsedValues.data.fullName,
    email: parsedValues.data.email,
    phone: parsedValues.data.phone,
    company: parsedValues.data.company,
    industry: parsedValues.data.industry,
    service_name: parsedValues.data.serviceName,
    status: parsedValues.data.status,
    details: parsedValues.data.details ? JSON.parse(parsedValues.data.details) : null,
    internal_notes: parsedValues.data.internalNotes,
    assigned_to: parsedValues.data.assignedTo || null,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('form_submissions')
    .update(submissionData)
    .eq('id', submissionId)
    .select('*')
    .single();

  if (error) {
    return { error: `Database error: ${error.message}` };
  }

  revalidatePath('/admin/form_submissions');
  revalidatePath(`/admin/form_submissions/${(data as Submission).id}`);

  return {
    data: data,
    message: `Submission updated successfully!`,
  };
}

export async function updateSubmissionStatus(submissionId: string, status: Submission['status']) {
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
        .from('form_submissions')
        .update({ status: status, updated_at: new Date().toISOString() })
        .eq('id', submissionId)
        .select('*')
        .single();

    if (error) {
        return { error: `Database error: ${error.message}` };
    }

    revalidatePath('/admin/form_submissions');
    revalidatePath(`/admin/form_submissions/${(data as Submission).id}`);

    return {
        data: data,
        message: 'Status updated successfully',
    };
}
