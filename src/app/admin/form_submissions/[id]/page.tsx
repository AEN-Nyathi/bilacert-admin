import { supabase } from '@/lib/supabase/supabase';
import SubmissionDetails from '../SubmissionDetails';
import { notFound } from 'next/navigation';
import type { Submission } from '@/lib/types';
import type { Metadata } from 'next';

async function getSubmission(id: string): Promise<Submission | null> {
    const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return null;
    }

    return {
        id: data.id,
        formType: data.form_type,
        status: data.status,
        serviceId: data.service_id,
        serviceName: data.service_name,
        fullName: data.full_name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        industry: data.industry,
        details: data.details,
        internalNotes: data.internal_notes,
        assignedTo: data.assigned_to,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        completedAt: data.completed_at,
    } as Submission;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const submission = await getSubmission(params.id);
    if (!submission) {
        return {
            title: 'Submission Not Found'
        }
    }
    return {
        title: `Submission from ${submission.fullName} | Bilacert Admin Pro`,
    }
}

export default async function SubmissionDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const submission = await getSubmission(id);

    if (!submission) {
        notFound();
    }

    return <SubmissionDetails submission={submission} />;
}
