
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
import DeleteServiceDialog from './DeleteServiceDialog';
import { Badge } from '@/components/ui/badge';
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
            <Link href={`/admin/services/${service.id}`} key={service.id} className="group">
                <Card className="flex flex-col h-full hover:shadow-lg hover:border-primary/50 transition-all">
                <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                        <div className='flex-1'>
                            <CardTitle className="truncate">{service.title}</CardTitle>
                            <CardDescription>{service.category || 'No Category'}</CardDescription>
                        </div>
                        {service.icon && <Icon name={service.icon} className="h-8 w-8 text-muted-foreground" />}
                    </div>
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
                        {service.featured && (
                            <Badge variant="outline" className="ml-2">
                                Featured
                            </Badge>
                        )}
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
                <CardFooter className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/services/${service.id}/edit`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete(service)
                        }}
                        >
                        Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </CardFooter>
                </Card>
            </Link>
            ))}
        </div>
        )}
      </div>
      
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
