
'use client';

import { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { columns as createColumns } from './columns';
import { Service } from '@/lib/types';
import { DataTable } from '@/app/admin/form_submissions/data-table';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import ServiceForm from './ServiceForm';
import ServiceDetails from './ServiceDetails';
import DeleteServiceDialog from './DeleteServiceDialog';

export default function ServicesClient() {
  const { services, loading, error } = useServices();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleAdd = () => {
    setSelectedService(null);
    setIsFormOpen(true);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  const handleViewDetails = (service: Service) => {
    setSelectedService(service);
    setIsDetailsOpen(true);
  };

  const handleDelete = (service: Service) => {
    setSelectedService(service);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setIsFormOpen(false);
    setIsDetailsOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedService(null);
  };

  const columns = createColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onViewDetails: handleViewDetails,
  });

  if (error) {
    return <div className="text-destructive">Error loading services: {error.message}</div>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Services</CardTitle>
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={services as Service[]} isLoading={loading} />
        </CardContent>
      </Card>
      
      {isFormOpen && (
        <ServiceForm
          isOpen={isFormOpen}
          onClose={handleCloseDialogs}
          service={selectedService}
        />
      )}

      {isDetailsOpen && (
        <ServiceDetails
            isOpen={isDetailsOpen}
            onClose={handleCloseDialogs}
            service={selectedService}
        />
      )}

      {isDeleteDialogOpen && (
        <DeleteServiceDialog
            isOpen={isDeleteDialogOpen}
            onClose={handleCloseDialogs}
            service={selectedService}
        />
      )}
    </>
  );
}
