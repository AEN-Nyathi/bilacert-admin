
'use client';

import { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, ArrowRight } from 'lucide-react';
import DeleteServiceDialog from './DeleteServiceDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Badge } from '@/components/ui/badge';

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
        {services.length === 0 && !loading ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
            <h3 className="text-lg font-semibold tracking-tight">No Services Yet</h3>
            <p className="text-sm text-muted-foreground">Click "Add Service" to get started.</p>
            </div>
        ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
            <div key={service.id} className="group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="absolute top-4 right-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                             <DropdownMenuItem asChild>
                                <Link href={`/admin/services/${service.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/services/${service.id}/edit`}>Edit</Link>
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
                </div>
                
                <Link href={`/admin/services/${service.id}`} className="flex flex-col h-full">
                    <div className="flex-grow">
                         <div className="text-accent mb-4 group-hover:scale-110 transition-transform duration-200">
                            {service.icon && <Icon name={service.icon} className="h-8 w-8" />}
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
                        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{service.shortDescription || service.description}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                         <div className="flex items-center text-accent font-medium text-sm">
                            Details
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                        <Badge variant={service.published ? 'default' : 'secondary'}>
                            {service.published ? 'Published' : 'Draft'}
                        </Badge>
                    </div>
                </Link>
            </div>
            ))}
        </div>
        )}
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
