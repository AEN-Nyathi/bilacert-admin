
'use client';

import { useServices } from '@/hooks/useServices';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { columns } from './columns';
import { Service } from '@/lib/types';
import { DataTable } from '@/app/admin/form_submissions/data-table';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function ServicesClient() {
  const { services, loading, error } = useServices();

  if (error) {
    return <div className="text-destructive">Error loading services: {error.message}</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Services</CardTitle>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={services as Service[]} isLoading={loading} />
      </CardContent>
    </Card>
  );
}
