
'use client';

import { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import ServiceForm from './ServiceForm';
import ServiceDetails from './ServiceDetails';
import DeleteServiceDialog from './DeleteServiceDialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

  const getPriceDisplay = (pricing: any): string => {
    if (!pricing) return "Not set";
    if (typeof pricing === 'string') return pricing;
    if (typeof pricing === 'number') return `R${pricing.toFixed(2)}`;
    return typeof pricing === 'object' ? JSON.stringify(pricing) : String(pricing);
  }

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
          {services.length === 0 && !loading ? (
             <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
                <h3 className="text-lg font-semibold tracking-tight">No Services Yet</h3>
                <p className="text-sm text-muted-foreground">Click "Add Service" to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card key={service.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="truncate">{service.title}</CardTitle>
                    <CardDescription>{service.category || 'No Category'}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    {service.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {service.description}
                      </p>
                    )}
                    <div>
                      <h4 className="text-xs font-medium uppercase text-muted-foreground">Status</h4>
                      <Badge variant={service.published ? 'default' : 'secondary'}>
                        {service.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium uppercase text-muted-foreground">Processing Time</h4>
                      <p className="text-sm">
                        {service.processingTime || 'N/A'}
                      </p>
                    </div>
                    {service.pricing && (
                        <div>
                        <h4 className="text-xs font-medium uppercase text-muted-foreground">Pricing</h4>
                        <p className="text-sm font-mono truncate">{getPriceDisplay(service.pricing)}</p>
                        </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(service)}>
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(service)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                          onClick={() => handleDelete(service)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
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

