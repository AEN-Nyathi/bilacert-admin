'use client';

import { useSubmissions } from '@/hooks/useSubmissions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { columns } from './columns';
import { Submission } from '@/lib/types';

export default function SubmissionsClient() {
  const { submissions, loading, error } = useSubmissions();

  if (error) {
    return <div className="text-destructive">Error loading submissions: {error.message}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={submissions as Submission[]} isLoading={loading} />
      </CardContent>
    </Card>
  );
}
