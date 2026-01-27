
'use client';

import { Badge } from '@/components/ui/badge';
import type { Service } from '@/lib/types';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import DeleteServiceDialog from './DeleteServiceDialog';
import { useRouter } from 'next/navigation';

interface ServiceDetailsProps {
  service: Service;
}

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!service) return null;

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const onDeleted = () => {
    setIsDeleteDialogOpen(false);
    router.push('/admin/services');
    router.refresh();
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
                <Link href="/admin/services">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Services
                </Link>
            </Button>
            <div className="flex gap-2">
                <Button asChild>
                    <Link href={`/admin/services/${service.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </Link>
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.category}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                            <Badge variant={service.published ? 'default' : 'secondary'}>
                                {service.published ? 'Published' : 'Draft'}
                            </Badge>
                        </div>
                        {service.description && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                                <p className="text-sm text-card-foreground">{service.description}</p>
                            </div>
                        )}
                        {service.content && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Content</h4>
                                <div className="prose prose-sm dark:prose-invert mt-1 text-card-foreground text-sm whitespace-pre-wrap">
                                    {service.content}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="space-y-6">
                        {service.processingTime && (
                            <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Processing Time</h4>
                            <p className="text-sm text-card-foreground">{service.processingTime}</p>
                            </div>
                        )}
                        {service.pricing && (
                            <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Pricing</h4>
                            <div className="prose prose-sm dark:prose-invert mt-1 text-card-foreground text-sm whitespace-pre-wrap">
                                <pre className="bg-muted/50 p-2 rounded-md"><code>{JSON.stringify(service.pricing, null, 2)}</code></pre>
                            </div>
                            </div>
                        )}
                         <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Created At</h4>
                            <p className="text-sm text-card-foreground">{format(new Date(service.createdAt), 'PPpp')}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
      
      {isDeleteDialogOpen && (
        <DeleteServiceDialog
            isOpen={isDeleteDialogOpen}
            onClose={handleCloseDialog}
            service={service}
            onDeleted={onDeleted}
        />
      )}
    </>
  );
}
