
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
import Image from 'next/image';

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

  const renderJson = (data: any) => {
    if (!data) return null;
    return (
        <div className="prose prose-sm dark:prose-invert mt-1 text-card-foreground text-sm whitespace-pre-wrap">
            <pre className="bg-muted/50 p-2 rounded-md"><code>{JSON.stringify(data, null, 2)}</code></pre>
        </div>
    )
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
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.category}</CardDescription>
                    </div>
                     <Badge variant={service.featured ? 'default' : 'secondary'}>
                        {service.featured ? 'Featured' : 'Not Featured'}
                    </Badge>
                </div>
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
                        {service.shortDescription && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Short Description</h4>
                                <p className="text-sm text-card-foreground">{service.shortDescription}</p>
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
                        {service.features && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Features</h4>
                                {renderJson(service.features)}
                            </div>
                        )}
                        {service.requirements && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Requirements</h4>
                                {renderJson(service.requirements)}
                            </div>
                        )}
                    </div>
                    <div className="space-y-6">
                        {service.slug && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Slug</h4>
                                <p className="text-sm font-mono text-card-foreground">{service.slug}</p>
                            </div>
                        )}
                         {service.href && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">HREF</h4>
                                <p className="text-sm font-mono text-card-foreground">{service.href}</p>
                            </div>
                        )}
                         {service.icon && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Icon</h4>
                                <p className="text-sm text-card-foreground">{service.icon}</p>
                            </div>
                        )}
                        {service.orderIndex !== undefined && (
                             <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Order Index</h4>
                                <p className="text-sm text-card-foreground">{service.orderIndex}</p>
                            </div>
                        )}
                        {service.processingTime && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Processing Time</h4>
                                <p className="text-sm text-card-foreground">{service.processingTime}</p>
                            </div>
                        )}
                        {service.pricing && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Pricing</h4>
                                {renderJson(service.pricing)}
                            </div>
                        )}
                         <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Created At</h4>
                            <p className="text-sm text-card-foreground">{format(new Date(service.createdAt), 'PPpp')}</p>
                        </div>
                    </div>
                </div>

                {(service.image || service.thumbnail) && (
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Media</h3>
                        <div className="flex gap-4">
                        {service.image && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Image</h4>
                                <Image src={service.image} alt="Service Image" width={300} height={200} className="mt-1 rounded-md border" />
                            </div>
                        )}
                        {service.thumbnail && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Thumbnail</h4>
                                <Image src={service.thumbnail} alt="Service Thumbnail" width={150} height={100} className="mt-1 rounded-md border" />
                            </div>
                        )}
                        </div>
                    </div>
                )}
                 {(service.seoTitle || service.seoDescription || service.seoKeywords) && (
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">SEO</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                        {service.seoTitle && (
                            <div>
                            <h4 className="text-sm font-medium text-muted-foreground">SEO Title</h4>
                            <p className="text-sm text-card-foreground">{service.seoTitle}</p>
                            </div>
                        )}
                        {service.seoDescription && (
                            <div>
                            <h4 className="text-sm font-medium text-muted-foreground">SEO Description</h4>
                            <p className="text-sm text-card-foreground">{service.seoDescription}</p>
                            </div>
                        )}
                        {service.seoKeywords && (
                             <div className="col-span-full">
                            <h4 className="text-sm font-medium text-muted-foreground">SEO Keywords</h4>
                            <p className="text-sm text-card-foreground">{service.seoKeywords}</p>
                            </div>
                        )}
                        </div>
                    </div>
                 )}

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
