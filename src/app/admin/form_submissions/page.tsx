import { Suspense } from 'react';
import SubmissionsClient from './SubmissionsClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
    title: 'Form Submissions | Bilacert Admin Pro',
    description: 'View and manage all form submissions.',
};

function SubmissionsLoading() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>All Submissions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </CardContent>
        </Card>
    )
}

export default function FormSubmissionsPage() {
  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Form Submissions</h1>
        <Suspense fallback={<SubmissionsLoading />}>
            <SubmissionsClient />
        </Suspense>
    </div>
  );
}
