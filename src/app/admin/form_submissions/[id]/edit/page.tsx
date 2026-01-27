
import { supabase } from '@/lib/supabase';
import SubmissionForm from '../../SubmissionForm';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Submission } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Edit Submission | Bilacert Admin Pro',
    description: 'Edit a form submission.',
};

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

export default async function EditSubmissionPage({ params }: { params: { id: string } }) {
    const submission = await getSubmission(params.id);

    if (!submission) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <Button variant="outline" asChild>
                <Link href={`/admin/form_submissions/${submission.id}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Submission
                </Link>
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Submission</CardTitle>
                    <CardDescription>Update details for submission from "{submission.fullName}".</CardDescription>
                </CardHeader>
                <CardContent>
                    <SubmissionForm submission={submission} />
                </CardContent>
            </Card>
        </div>
    );
}
