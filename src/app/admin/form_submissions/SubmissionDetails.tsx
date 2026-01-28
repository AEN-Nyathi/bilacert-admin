
'use client';

import { Badge } from '@/components/ui/badge';
import type { Submission } from '@/lib/types';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, Phone } from 'lucide-react';
import { useState } from 'react';
import DeleteSubmissionDialog from './DeleteSubmissionDialog';
import { useRouter } from 'next/navigation';
import { statusVariantMap } from './columns';

interface SubmissionDetailsProps {
  submission: Submission;
}

export default function SubmissionDetails({ submission }: SubmissionDetailsProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!submission) return null;

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const onDeleted = () => {
    setIsDeleteDialogOpen(false);
    router.push('/admin/form_submissions');
    router.refresh();
  }

  const renderJson = (data: any) => {
    if (!data) return <p className="text-sm text-card-foreground">Not set.</p>;
    return (
        <div className="prose prose-sm dark:prose-invert mt-1 text-card-foreground text-sm whitespace-pre-wrap">
            <pre className="bg-muted/50 p-2 rounded-md"><code>{JSON.stringify(data, null, 2)}</code></pre>
        </div>
    )
  }

  const formatPhoneNumberForWhatsApp = (phone: string) => {
    // Remove all non-digit characters
    return phone.replace(/\D/g, '');
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
                <Link href="/admin/form_submissions">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Submissions
                </Link>
            </Button>
            <div className="flex gap-2">
                <Button asChild>
                    <Link href={`/admin/form_submissions/${submission.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </Link>
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
            </div>
        </div>

        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Submission from {submission.fullName}</CardTitle>
                        <CardDescription>
                            {submission.serviceName ? `Service: ${submission.serviceName}` : `Form: ${submission.formType}`}
                        </CardDescription>
                    </div>
                     <Badge variant={statusVariantMap[submission.status] || 'default'} className="capitalize">
                        {submission.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Client Name</h4>
                            <p className="text-sm text-card-foreground">{submission.fullName}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Client Email</h4>
                            <p className="text-sm text-card-foreground">{submission.email}</p>
                        </div>
                         {submission.phone && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                                <a 
                                    href={`https://wa.me/${formatPhoneNumberForWhatsApp(submission.phone)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-primary transition-colors hover:underline"
                                >
                                    <Phone className="h-4 w-4" />
                                    {submission.phone}
                                </a>
                            </div>
                        )}
                         {submission.company && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Company</h4>
                                <p className="text-sm text-card-foreground">{submission.company}</p>
                            </div>
                        )}
                        {submission.industry && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Industry</h4>
                                <p className="text-sm text-card-foreground">{submission.industry}</p>
                            </div>
                        )}
                    </div>
                     <div className="space-y-6">
                        {submission.assignedTo && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Assigned To</h4>
                                <p className="text-sm font-mono text-card-foreground">{submission.assignedTo}</p>
                            </div>
                        )}
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Submitted At</h4>
                            <p className="text-sm text-card-foreground">{format(new Date(submission.createdAt), 'PPpp')}</p>
                        </div>
                         <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Last Updated</h4>
                            <p className="text-sm text-card-foreground">{format(new Date(submission.updatedAt), 'PPpp')}</p>
                        </div>
                        {submission.completedAt && (
                             <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Completed At</h4>
                                <p className="text-sm text-card-foreground">{format(new Date(submission.completedAt), 'PPpp')}</p>
                            </div>
                        )}
                    </div>
                </div>

                {submission.details && (
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Submission Details</h3>
                        {renderJson(submission.details)}
                    </div>
                )}

                 {submission.internalNotes && (
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Internal Notes</h3>
                        <div className="prose prose-sm dark:prose-invert mt-1 text-card-foreground text-sm whitespace-pre-wrap">
                            {submission.internalNotes}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
      
      {isDeleteDialogOpen && (
        <DeleteSubmissionDialog
            isOpen={isDeleteDialogOpen}
            onClose={handleCloseDialog}
            submission={submission}
            onDeleted={onDeleted}
        />
      )}
    </>
  );
}
