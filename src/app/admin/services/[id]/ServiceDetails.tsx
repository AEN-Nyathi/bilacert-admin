
'use client';

import { Badge } from '@/components/ui/badge';
import type { Service, PricingPlan, ProcessStep, SuccessStory } from '@/lib/types';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, Phone, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import DeleteServiceDialog from '../DeleteServiceDialog';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Icon from '@/components/Icon';

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

  const renderStringArray = (data: string[] | undefined) => {
    if (!data || data.length === 0) return <p className="text-sm text-card-foreground">Not set.</p>;
    return (
        <ul className="list-disc list-inside space-y-1 mt-1 text-sm text-card-foreground">
            {data.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    )
  }

  const renderPricingPlans = (plans: PricingPlan[] | undefined) => {
    if (!plans || plans.length === 0) return <p className="text-sm text-card-foreground">No pricing plans defined.</p>;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {plans.map((plan, index) => (
                <Card key={index} className="flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{plan.title}</CardTitle>
                            {plan.popular && <Badge variant="default">Popular</Badge>}
                        </div>
                        <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                        <p className="text-2xl font-bold">{plan.price}</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
  };

  const renderProcessSteps = (steps: ProcessStep[] | undefined) => {
    if (!steps || steps.length === 0) return <p className="text-sm text-card-foreground">No process steps defined.</p>;
    return (
        <div className="relative mt-4 pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border -translate-x-1/2 ml-3"></div>
            <div className="space-y-8">
            {steps.map((step, index) => (
                <div key={index} className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs z-10">
                        {step.step}
                    </div>
                    <div className="flex-grow">
                        <h5 className="font-semibold text-card-foreground">{step.title}</h5>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                </div>
              ))}
            </div>
        </div>
    )
  };

  const renderSuccessStory = (story: SuccessStory | undefined) => {
    if (!story) return <p className="text-sm text-card-foreground">No success story defined.</p>;
    return (
         <Card className="mt-2 bg-muted/50">
            <CardContent className="p-6 space-y-4">
                <div>
                    <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Scenario</h5>
                    <p className="text-sm text-card-foreground">{story.scenario}</p>
                </div>
                 <div>
                    <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Challenge</h5>
                    <p className="text-sm text-card-foreground">{story.challenge}</p>
                </div>
                 <div>
                    <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Solution</h5>
                    <p className="text-sm text-card-foreground">{story.solution}</p>
                </div>
                 <div>
                    <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Result</h5>
                    <p className="text-sm text-card-foreground font-medium">{story.result}</p>
                </div>
            </CardContent>
         </Card>
    )
  };


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
                        {service.short_description && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Short Description</h4>
                                <p className="text-sm text-card-foreground">{service.short_description}</p>
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
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Features</h4>
                            {renderStringArray(service.features)}
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Requirements</h4>
                            {renderStringArray(service.requirements)}
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Includes</h4>
                            {renderStringArray(service.includes)}
                        </div>
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
                                <div className="flex items-center gap-2 mt-1">
                                    <Icon name={service.icon} className="h-5 w-5 text-accent" />
                                    <p className="text-sm font-mono text-card-foreground">{service.icon}</p>
                                </div>
                            </div>
                        )}
                        {service.order_index !== undefined && (
                             <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Order Index</h4>
                                <p className="text-sm text-card-foreground">{service.order_index}</p>
                            </div>
                        )}
                        {service.processing_time && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Processing Time</h4>
                                <p className="text-sm text-card-foreground">{service.processing_time}</p>
                            </div>
                        )}
                        {service.pricing !== null && service.pricing !== undefined && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Pricing</h4>
                                <p className="text-sm font-mono text-card-foreground">R{Number(service.pricing).toFixed(2)}</p>
                            </div>
                        )}
                         <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Created At</h4>
                            <p className="text-sm text-card-foreground">{format(new Date(service.created_at), 'PPpp')}</p>
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
                 {(service.seo_title || service.seo_description || service.seo_keywords) && (
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">SEO</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                        {service.seo_title && (
                            <div>
                            <h4 className="text-sm font-medium text-muted-foreground">SEO Title</h4>
                            <p className="text-sm text-card-foreground">{service.seo_title}</p>
                            </div>
                        )}
                        {service.seo_description && (
                            <div>
                            <h4 className="text-sm font-medium text-muted-foreground">SEO Description</h4>
                            <p className="text-sm text-card-foreground">{service.seo_description}</p>
                            </div>
                        )}
                        {service.seo_keywords && (
                             <div className="col-span-full">
                            <h4 className="text-sm font-medium text-muted-foreground">SEO Keywords</h4>
                            <p className="text-sm text-card-foreground">{service.seo_keywords}</p>
                            </div>
                        )}
                        </div>
                    </div>
                 )}

                <div className="mt-6 border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Pricing Plans</h3>
                    {renderPricingPlans(service.pricing_plans)}
                </div>
                 <div className="mt-6 border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Process Steps</h3>
                    {renderProcessSteps(service.process_steps)}
                </div>
                 <div className="mt-6 border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Success Story</h3>
                    {renderSuccessStory(service.success_story)}
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
