
'use client';

import { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import DeleteServiceDialog from './DeleteServiceDialog';
import Link from 'next/link';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ServicesClient() {
  const { services, loading, error } = useServices();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleDelete = (service: Service) => {
    setSelectedService(service);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setIsDeleteDialogOpen(false);
    setSelectedService(null);
  };
  
  const onDeleted = () => {
      handleCloseDialogs();
  }

  if (error) {
    return <div className="text-destructive">Error loading services: {error.message}</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        </div>
        <Button asChild>
            <Link href="/admin/services/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Service
            </Link>
        </Button>
      </div>

      <div className="mt-6">
        <Card>
            <CardHeader>
                <CardTitle>Manage Services</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns({ onDelete: handleDelete })} data={services as Service[]} isLoading={loading} />
            </CardContent>
        </Card>
      </div>
      
      {isDeleteDialogOpen && (
        <DeleteServiceDialog
            isOpen={isDeleteDialogOpen}
            onClose={handleCloseDialogs}
            service={selectedService}
            onDeleted={onDeleted}
        />
      )}
    </>
  );
}
