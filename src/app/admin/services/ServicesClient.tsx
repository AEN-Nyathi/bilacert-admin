'use client';

import AdminPage from '@/components/admin/AdminPage';
import { useServices } from '@/hooks/useServices';
import type { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
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

const renderService = (service: Service, onEdit: (service: Service) => void, onDelete: (service: Service) => void) => {
    const router = useRouter();
    return (
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
                                    <DropdownMenuItem onClick={(e) => { e.preventDefault(); onEdit(service); }}>Edit</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                                        onClick={(e) => { e.preventDefault(); onDelete(service); }}
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
                <p className="text-sm text-muted-foreground line-clamp-3">{service.short_description}</p>
                </CardContent>
                <CardFooter>
                   <p className="text-lg font-semibold">{service.pricing ? `R ${service.pricing.toLocaleString()}`: 'Not Set'}</p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default function ServicesClient() {
  return (
    <AdminPage<Service>
      useData={useServices}
      title="Services"
      newItemButtonText="Add Service"
      newItemLink="/admin/services/new"
      renderItem={renderService}
      DeleteDialog={DeleteServiceDialog as any}
    />
  );
}
