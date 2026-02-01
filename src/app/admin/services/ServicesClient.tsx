'use client';

import { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import DeleteServiceDialog from './DeleteServiceDialog';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ServicesLoading from './loading';

export default function ServicesClient() {
  const { services, loading, error } = useServices();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleDelete = (service: Service) => {
    setSelectedService(service);
    setIsDeleteDialogOpen(true);
  };

  const handleEdit = (service: Service) => {
    router.push(`/admin/services/${service.id}/edit`);
  };

  const handleCloseDialogs = () => {
    setIsDeleteDialogOpen(false);
    setSelectedService(null);
  };
  
  const onDeleted = () => {
      handleCloseDialogs();
      router.refresh();
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
        {loading ? <ServicesLoading /> : services.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
                <h3 className="text-lg font-semibold tracking-tight">No Services Yet</h3>
                <p className="text-sm text-muted-foreground">Click "Add Service" to get started.</p>
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
                <div key={service.id} className="group relative">
                    <Link href={`/admin/services/${service.id}`} className="absolute inset-0 z-10" aria-label={`View ${service.title}`}>
                        <span className="sr-only">View Details</span>
                    </Link>
                    <Card className="flex h-full flex-col transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/50">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg line-clamp-2">{service.title}</CardTitle>
                                <div className="relative z-20">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.preventDefault()}>
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={(e) => { e.preventDefault(); router.push(`/admin/services/${service.id}`) }}>View Details</DropdownMenuItem>
                                            <DropdownMenuItem onClick={(e) => { e.preventDefault(); handleEdit(service); }}>Edit</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                                                onClick={(e) => { e.preventDefault(); handleDelete(service); }}
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        <CardDescription>{service.category}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-grow">
                        <div className="flex flex-wrap gap-2">
                            <Badge variant={service.published ? "default" : "secondary"}>
                            {service.published ? 'Published' : 'Draft'}
                            </Badge>
                            {service.featured && <Badge variant="outline">Featured</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-3">{service.shortDescription}</p>
                        </CardContent>
                        <CardFooter>
                           <p className="text-lg font-semibold">{service.pricing ? `R ${service.pricing.toLocaleString()}`: 'Not Set'}</p>
                        </CardFooter>
                    </Card>
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
