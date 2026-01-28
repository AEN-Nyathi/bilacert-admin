
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import type { Service, PricingPlan, ProcessStep, SuccessStory } from '@/lib/types';
import { useEffect } from 'react';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ui/ImageUpload';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
    
const pricingPlanSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    features: z.string(), // Will be a string of newline-separated features
    price: z.string().min(1, 'Price is required'),
    popular: z.boolean(),
});

const processStepSchema = z.object({
    step: z.string().min(1, "Step number is required"),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
});

const successStorySchema = z.object({
    scenario: z.string().optional(),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    result: z.string().optional(),
});

const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  icon: z.string().optional(),
  content: z.string().optional(),
  features: z.string().optional(),
  requirements: z.string().optional(),
  includes: z.string().optional(),
  published: z.boolean(),
  featured: z.boolean(),
  processingTime: z.string().optional(),
  pricing: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.coerce.number({ invalid_type_error: "Pricing must be a number" }).optional()
  ),
  image: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  thumbnail: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  pricingPlans: z.array(pricingPlanSchema).max(3).optional(),
  processSteps: z.array(processStepSchema).optional(),
  successStory: successStorySchema.optional(),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  service?: Service | null;
}

export default function ServiceForm({ service }: ServiceFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: '',
      description: '',
      shortDescription: '',
      icon: '',
      content: '',
      features: '',
      requirements: '',
      includes: '',
      published: false,
      featured: false,
      processingTime: '',
      pricing: undefined,
      image: '',
      thumbnail: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
      pricingPlans: Array.from({ length: 3 }, () => ({ title: '', description: '', features: '', price: '', popular: false })),
      processSteps: [],
      successStory: { scenario: '', challenge: '', solution: '', result: '' },
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { isSubmitting },
  } = form;
  
  const { fields: pricingPlanFields } = useFieldArray({
    control,
    name: "pricingPlans"
  });

  const { fields: processStepFields, append: appendProcessStep, remove: removeProcessStep } = useFieldArray({
    control,
    name: "processSteps"
  });

  const isEditing = !!service;
  const title = watch('title');

  useEffect(() => {
    if (!isEditing && title) {
      setValue('slug', slugify(title));
    }
  }, [title, isEditing, setValue]);

  useEffect(() => {
    if (service) {
        const defaultPlan = { title: '', description: '', features: '', price: '', popular: false };
        const plans = (service.pricingPlans || []).concat(
          Array.from({ length: Math.max(0, 3 - (service.pricingPlans?.length || 0)) }, () => defaultPlan)
        ).slice(0, 3);
        
        reset({
            title: service.title,
            slug: service.slug,
            category: service.category,
            description: service.description || '',
            shortDescription: service.shortDescription || '',
            icon: service.icon || '',
            content: service.content || '',
            features: service.features?.join('\n') || '',
            requirements: service.requirements?.join('\n') || '',
            includes: service.includes?.join('\n') || '',
            published: service.published,
            featured: service.featured || false,
            processingTime: service.processingTime || '',
            pricing: service.pricing ?? undefined,
            image: service.image || '',
            thumbnail: service.thumbnail || '',
            seoTitle: service.seoTitle || '',
            seoDescription: service.seoDescription || '',
            seoKeywords: service.seoKeywords || '',
            pricingPlans: plans.map(p => ({ ...p, features: (p.features || []).join('\n') })),
            processSteps: service.processSteps || [],
            successStory: service.successStory || { scenario: '', challenge: '', solution: '', result: '' },
        });
    } else {
      reset();
    }
  }, [service, reset]);

  const onSubmit = async (values: ServiceFormValues) => {
    try {
      const href = `/services/${values.slug}`;

      const serviceData = {
        title: values.title,
        slug: values.slug,
        href,
        category: values.category,
        description: values.description,
        short_description: values.shortDescription,
        icon: values.icon,
        content: values.content,
        features: values.features ? values.features.split('\n').filter(s => s.trim() !== '') : [],
        requirements: values.requirements ? values.requirements.split('\n').filter(s => s.trim() !== '') : [],
        includes: values.includes ? values.includes.split('\n').filter(s => s.trim() !== '') : [],
        published: values.published,
        featured: values.featured,
        processing_time: values.processingTime,
        pricing: values.pricing,
        image: values.image,
        thumbnail: values.thumbnail,
        seo_title: values.seoTitle,
        seo_description: values.seoDescription,
        seo_keywords: values.seoKeywords,
        pricing_plans: values.pricingPlans?.map(p => ({...p, features: p.features.split('\n').filter(f => f.trim() !== '') })),
        process_steps: values.processSteps,
        success_story: values.successStory,
      };

      let response;
      if (service) {
        response = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', service.id)
          .select()
          .single();
      } else {
        response = await supabase.from('services').insert([
          serviceData,
        ]).select().single();
      }

      if (response.error) {
        throw response.error;
      }
      
      toast({
        title: `Service ${service ? 'updated' : 'created'} successfully!`,
      });
      router.push(`/admin/services`);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Column 1 */}
          <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Core Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="title" render={({ field }) => ( <FormItem> <FormLabel>Title</FormLabel> <FormControl><Input placeholder="e.g., ICASA Type Approvals" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="slug" render={({ field }) => ( <FormItem> <FormLabel>Slug</FormLabel> <FormControl> <Input placeholder="e.g., icasa-type-approvals" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="category" render={({ field }) => ( <FormItem> <FormLabel>Category</FormLabel> <FormControl> <Input placeholder="e.g., Licensing" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="icon" render={({ field }) => ( <FormItem> <FormLabel>Icon Name</FormLabel> <FormControl> <Input placeholder="e.g., Shield" {...field} value={field.value || ''} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="description" render={({ field }) => ( <FormItem> <FormLabel>Description</FormLabel> <FormControl> <Textarea placeholder="A detailed description of the service." rows={3} {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="shortDescription" render={({ field }) => ( <FormItem> <FormLabel>Short Description</FormLabel> <FormControl> <Textarea placeholder="A brief summary for card views." rows={2} {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="content" render={({ field }) => ( <FormItem> <FormLabel>Content</FormLabel> <FormControl> <Textarea placeholder="Main content for the service page..." rows={6} {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Service Lists</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-4">
                    <FormField control={form.control} name="features" render={({ field }) => ( <FormItem> <FormLabel>Features</FormLabel> <FormControl> <Textarea placeholder="Enter one feature per line." rows={4} {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="requirements" render={({ field }) => ( <FormItem> <FormLabel>Requirements</FormLabel> <FormControl> <Textarea placeholder="Enter one requirement per line." rows={4} {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="includes" render={({ field }) => ( <FormItem> <FormLabel>Includes</FormLabel> <FormControl> <Textarea placeholder="Enter one item per line." rows={4} {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                 </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Pricing Plans</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {pricingPlanFields.map((field, index) => (
                        <div key={field.id} className="space-y-4 rounded-md border p-4">
                             <h4 className="font-medium">Plan {index + 1}</h4>
                            <FormField control={form.control} name={`pricingPlans.${index}.title`} render={({ field }) => ( <FormItem> <FormLabel>Title</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage/> </FormItem> )} />
                            <FormField control={form.control} name={`pricingPlans.${index}.description`} render={({ field }) => ( <FormItem> <FormLabel>Description</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage/> </FormItem> )} />
                            <FormField control={form.control} name={`pricingPlans.${index}.price`} render={({ field }) => ( <FormItem> <FormLabel>Price</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage/> </FormItem> )} />
                            <FormField control={form.control} name={`pricingPlans.${index}.features`} render={({ field }) => ( <FormItem> <FormLabel>Features</FormLabel> <FormControl><Textarea placeholder="One feature per line" {...field} /></FormControl> <FormMessage/> </FormItem> )} />
                            <FormField
                                control={form.control}
                                name={`pricingPlans.${index}.popular`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel>Most Popular?</FormLabel>
                                            <FormDescription>
                                                Highlight this plan.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <Card>
                 <CardHeader>
                    <CardTitle>Configuration</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-4">
                     <div className="grid grid-cols-2 gap-6">
                        <FormField control={form.control} name="processingTime" render={({ field }) => ( <FormItem> <FormLabel>Processing Time</FormLabel> <FormControl> <Input placeholder="e.g., 5-7 business days" {...field} value={field.value || ''} /> </FormControl> <FormMessage /> </FormItem> )} />
                        <FormField control={form.control} name="pricing" render={({ field }) => ( <FormItem> <FormLabel>Base Price (ZAR)</FormLabel> <FormControl> <Input type="number" step="0.01" placeholder="e.g., 1500.00" {...field} value={field.value ?? ''} /> </FormControl> <FormMessage /> </FormItem> )} />
                    </div>
                    <div className="space-y-4 pt-4">
                        <FormField control={form.control} name="published" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"> <div className="space-y-0.5"> <FormLabel>Published</FormLabel> <FormDescription> Make this service visible on the public website. </FormDescription> </div> <FormControl> <Switch checked={field.value} onCheckedChange={field.onChange} /> </FormControl> </FormItem> )} />
                        <FormField control={form.control} name="featured" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"> <div className="space-y-0.5"> <FormLabel>Featured</FormLabel> <FormDescription> Highlight this service on the homepage. </FormDescription> </div> <FormControl> <Switch checked={field.value} onCheckedChange={field.onChange} /> </FormControl> </FormItem> )} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <FormField control={form.control} name="image" render={({ field }) => ( <FormItem> <FormLabel>Image</FormLabel> <FormControl> <ImageUpload bucket='services' initialUrl={field.value} onUpload={(url) => field.onChange(url)} onRemove={() => field.onChange('')} /> </FormControl> <FormMessage /> </FormItem> )} />
                     <FormField control={form.control} name="thumbnail" render={({ field }) => ( <FormItem> <FormLabel>Thumbnail</FormLabel> <FormControl> <ImageUpload bucket='services' initialUrl={field.value} onUpload={(url) => field.onChange(url)} onRemove={() => field.onChange('')} /> </FormControl> <FormMessage /> </FormItem> )} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Process Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {processStepFields.map((field, index) => (
                        <div key={field.id} className="flex items-start gap-4 rounded-md border p-4">
                            <span className="text-lg font-bold text-muted-foreground">{index + 1}</span>
                            <div className="flex-grow space-y-2">
                                <FormField control={form.control} name={`processSteps.${index}.title`} render={({ field }) => ( <FormItem> <FormLabel>Title</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage/> </FormItem> )} />
                                <FormField control={form.control} name={`processSteps.${index}.description`} render={({ field }) => ( <FormItem> <FormLabel>Description</FormLabel> <FormControl><Textarea rows={2} {...field} /></FormControl> <FormMessage/> </FormItem> )} />
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeProcessStep(index)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => appendProcessStep({ step: `${processStepFields.length + 1}`, title: '', description: '' })}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Step
                    </Button>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Success Story</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="successStory.scenario" render={({ field }) => ( <FormItem> <FormLabel>Scenario</FormLabel> <FormControl><Textarea rows={2} {...field} /></FormControl> <FormMessage/> </FormItem> )} />
                    <FormField control={form.control} name="successStory.challenge" render={({ field }) => ( <FormItem> <FormLabel>Challenge</FormLabel> <FormControl><Textarea rows={2} {...field} /></FormControl> <FormMessage/> </FormItem> )} />
                    <FormField control={form.control} name="successStory.solution" render={({ field }) => ( <FormItem> <FormLabel>Solution</FormLabel> <FormControl><Textarea rows={2} {...field} /></FormControl> <FormMessage/> </FormItem> )} />
                    <FormField control={form.control} name="successStory.result" render={({ field }) => ( <FormItem> <FormLabel>Result</FormLabel> <FormControl><Textarea rows={2} {...field} /></FormControl> <FormMessage/> </FormItem> )} />
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="seoTitle" render={({ field }) => ( <FormItem> <FormLabel>SEO Title</FormLabel> <FormControl> <Input {...field} value={field.value || ''}/> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="seoKeywords" render={({ field }) => ( <FormItem> <FormLabel>SEO Keywords</FormLabel> <FormControl> <Input placeholder="keyword1, keyword2, keyword3" {...field} value={field.value || ''} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="seoDescription" render={({ field }) => ( <FormItem> <FormLabel>SEO Description</FormLabel> <FormControl> <Textarea rows={3} {...field} value={field.value || ''} /> </FormControl> <FormMessage /> </FormItem> )} />
                </CardContent>
            </Card>
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
