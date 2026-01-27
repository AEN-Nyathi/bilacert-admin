
'use client';

import { useState } from 'react';
import { useSubmissions } from '@/hooks/useSubmissions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { columns } from './columns';
import { Submission } from '@/lib/types';
import { DataTable } from './data-table';
import DeleteSubmissionDialog from './DeleteSubmissionDialog';

export default function SubmissionsClient() {
  const { submissions, loading, error } = useSubmissions();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const handleDelete = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setIsDeleteDialogOpen(false);
    setSelectedSubmission(null);
  };

  if (error) {
    return <div className="text-destructive">Error loading submissions: {error.message}</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns({ onDelete: handleDelete })} data={submissions as Submission[]} isLoading={loading} />
        </CardContent>
      </Card>
      
      {isDeleteDialogOpen && (
        <DeleteSubmissionDialog
            isOpen={isDeleteDialogOpen}
            onClose={handleCloseDialogs}
            submission={selectedSubmission}
        />
      )}
    </>
  );
}
