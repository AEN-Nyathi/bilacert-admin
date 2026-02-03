'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import type { Service } from '@/lib/types';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { serviceSchema, ServiceFormValues } from '../schema';
import { upsertService } from '../actions';
import CoreDetailsForm from '../components/CoreDetailsForm';
import FeaturesForm from '../components/FeaturesForm';
import PricingPlansForm from '../components/PricingPlansForm';
import ProcessStepsForm from '../components/ProcessStepsForm';
import SuccessStoryForm from '../components/SuccessStoryForm';
import PublishingForm from '../components/PublishingForm';
import DetailsForm from '../components/DetailsForm';
import SeoForm from '../components/SeoForm';
import MediaForm from '../components/MediaForm';

interface ServiceFormProps {
  service?: Service | null;
}

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function ServiceForm({ service }: ServiceFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const isEditing = !!service;

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '', slug: '', href: '', category: '', description: '',
      short_description: '', icon: '', order_index: 0, content: '',
      features: '', requirements: '', includes: '',
      published: false, featured: false, processing_time: '', pricing: 0,
      image: '', thumbnail: '', seo_title: '', seo_description: '', seo_keywords: '',
      pricing_plans: [
          { title: 'Basic', description: '', price: '', features: '', popular: false },
          { title: 'Standard', description: '', price: '', features: '', popular: true },
          { title: 'Premium', description: '', price: '', features: '', popular: false },
      ],
      process_steps: [],
      success_story: { scenario: '', challenge: '', solution: '', result: '' },
    },
  });

  const { handleSubmit, watch, setValue, reset, formState: { isSubmitting } } = form;

  const title = watch('title');

  useEffect(() => {
    if (!isEditing && title) {
      const slug = slugify(title);
      setValue('slug', slug);
      setValue('href', `/services/${slug}`);
    }
  }, [title, setValue, isEditing]);

  useEffect(() => {
    if (service) {
      const defaultPricingPlans = [
        { title: 'Basic', description: '', price: '', features: '', popular: false },
        { title: 'Standard', description: '', price: '', features: '', popular: true },
        { title: 'Premium', description: '', price: '', features: '', popular: false },
      ];
      
      const servicePricingPlans = (service.pricing_plans || []).map(p => ({
        ...p,
        features: Array.isArray(p.features) ? p.features.join('\n') : p.features || '',
      }));
      
      const populatedPlans = defaultPricingPlans.map((defaultPlan, index) => {
          return servicePricingPlans[index] || defaultPlan;
      });

      reset({
        title: service.title || '',
        slug: service.slug || '',
        href: service.href || '',
        category: service.category || '',
        description: service.description || '',
        short_description: service.short_description || '',
        icon: service.icon || '',
        order_index: service.order_index || 0,
        content: service.content || '',
        features: Array.isArray(service.features) ? service.features.join('\n') : '',
        requirements: Array.isArray(service.requirements) ? service.requirements.join('\n') : '',
        includes: Array.isArray(service.includes) ? service.includes.join('\n') : '',
        published: service.published || false,
        featured: service.featured || false,
        processing_time: service.processing_time || '',
        pricing: service.pricing || 0,
        image: service.image || '',
        thumbnail: service.thumbnail || '',
        seo_title: service.seo_title || '',
        seo_description: service.seo_description || '',
        seo_keywords: service.seo_keywords || '',
        pricing_plans: populatedPlans,
        process_steps: service.process_steps || [],
        success_story: service.success_story || { scenario: '', challenge: '', solution: '', result: '' },
      });
    }
  }, [service, reset]);

  const onSubmit = async (values: ServiceFormValues) => {
    try {
      const { error, message } = await upsertService(values, service?.id);

      if (error) {
        throw new Error(error);
      }

      toast({
        title: message,
      });
      router.push('/admin/services');
      router.refresh();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error saving service',
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <CoreDetailsForm form={form} />
            <FeaturesForm form={form} />
            <PricingPlansForm form={form} />
            <ProcessStepsForm form={form} />
            <SuccessStoryForm form={form} />
          </div>
          <div className="space-y-6 lg:col-span-1">
            <PublishingForm form={form} />
            <DetailsForm form={form} />
            <SeoForm form={form} />
            <MediaForm form={form} />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/services">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Save Changes' : 'Create Service'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
