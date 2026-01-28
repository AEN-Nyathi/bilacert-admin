
'use client';

import { useForm } from 'react-hook-form';
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
import { Loader2, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ui/ImageUpload';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
    
const isJson = (val: string | undefined) => {
    if (!val || val.trim() === '') return true;
    try {
      JSON.parse(val);
      return true;
    } catch (e) {
      return false;
    }
};

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
  pricingPlans: z.string().refine(isJson, { message: "Pricing Plans must be valid JSON." }).optional(),
  processSteps: z.string().refine(isJson, { message: "Process Steps must be valid JSON." }).optional(),
  successStory: z.string().refine(isJson, { message: "Success Story must be valid JSON." }).optional(),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  service?: Service | null;
}

const PreviewPricingPlans = ({ jsonString }: { jsonString?: string }) => {
    let plans: PricingPlan[];
    try {
        if (!jsonString) return null;
        plans = JSON.parse(jsonString);
        if (!Array.isArray(plans)) return <p className="text-sm text-destructive mt-2">Invalid format: must be an array of plans.</p>;
    } catch (e) {
        return <p className="text-sm text-destructive mt-2">Invalid JSON format for Pricing Plans.</p>;
    }

    return (
        <div className="mt-4 space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Preview</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md bg-muted/50">
                {plans.map((plan, index) => (
                    <Card key={index} className="flex flex-col bg-card">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-base">{plan.title}</CardTitle>
                                {plan.popular && <Badge>Popular</Badge>}
                            </div>
                            <CardDescription className="text-xs">{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-2">
                            <p className="text-xl font-bold">{plan.price}</p>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                                {(plan.features || []).map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-green-500 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const PreviewProcessSteps = ({ jsonString }: { jsonString?: string }) => {
    let steps: ProcessStep[];
    try {
        if (!jsonString) return null;
        steps = JSON.parse(jsonString);
        if (!Array.isArray(steps)) return <p className="text-sm text-destructive mt-2">Invalid format: must be an array of steps.</p>;
    } catch (e) {
        return <p className="text-sm text-destructive mt-2">Invalid JSON format for Process Steps.</p>;
    }
    return (
        <div className="mt-4 space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Preview</h4>
            <div className="p-4 border rounded-md bg-muted/50">
                <div className="relative pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-border -translate-x-1/2 ml-3"></div>
                    <div className="space-y-6">
                    {(steps || []).map((step, index) => (
                        <div key={index} className="relative flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs z-10">
                                {step.step}
                            </div>
                            <div className="flex-grow">
                                <h5 className="font-semibold text-sm text-card-foreground">{step.title}</h5>
                                <p className="text-xs text-muted-foreground">{step.description}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PreviewSuccessStory = ({ jsonString }: { jsonString?: string }) => {
    let story: SuccessStory;
    try {
        if (!jsonString) return null;
        story = JSON.parse(jsonString);
        if (typeof story !== 'object' || story === null) return <p className="text-sm text-destructive mt-2">Invalid format: must be an object.</p>;
    } catch (e) {
        return <p className="text-sm text-destructive mt-2">Invalid JSON format for Success Story.</p>;
    }
    return (
        <div className="mt-4 space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Preview</h4>
             <Card className="bg-muted/50">
                <CardContent className="p-4 space-y-3 text-xs">
                    {story.scenario && <div>
                        <h5 className="font-semibold text-muted-foreground uppercase tracking-wider">Scenario</h5>
                        <p className="text-card-foreground">{story.scenario}</p>
                    </div>}
                    {story.challenge && <div>
                        <h5 className="font-semibold text-muted-foreground uppercase tracking-wider">Challenge</h5>
                        <p className="text-card-foreground">{story.challenge}</p>
                    </div>}
                    {story.solution && <div>
                        <h5 className="font-semibold text-muted-foreground uppercase tracking-wider">Solution</h5>
                        <p className="text-card-foreground">{story.solution}</p>
                    </div>}
                    {story.result && <div>
                        <h5 className="font-semibold text-muted-foreground uppercase tracking-wider">Result</h5>
                        <p className="text-card-foreground font-medium">{story.result}</p>
                    </div>}
                </CardContent>
            </Card>
        </div>
    );
};

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
      pricingPlans: '',
      processSteps: '',
      successStory: '',
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = form;

  const isEditing = !!service;
  const title = watch('title');
  const pricingPlansJson = watch('pricingPlans');
  const processStepsJson = watch('processSteps');
  const successStoryJson = watch('successStory');


  useEffect(() => {
    if (!isEditing && title) {
      setValue('slug', slugify(title));
    }
  }, [title, isEditing, setValue]);

  useEffect(() => {
    if (service) {
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
        pricingPlans: service.pricingPlans ? JSON.stringify(service.pricingPlans, null, 2) : '',
        processSteps: service.processSteps ? JSON.stringify(service.processSteps, null, 2) : '',
        successStory: service.successStory ? JSON.stringify(service.successStory, null, 2) : '',
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
        pricing_plans: values.pricingPlans ? JSON.parse(values.pricingPlans) : null,
        process_steps: values.processSteps ? JSON.parse(values.processSteps) : null,
        success_story: values.successStory ? JSON.parse(values.successStory) : null,
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ICASA Type Approvals" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., icasa-type-approvals" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Licensing" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Shield" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A detailed description of the service."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief summary for card views."
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Main content for the service page..."
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload 
                        bucket='services'
                        initialUrl={field.value}
                        onUpload={(url) => field.onChange(url)}
                        onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <ImageUpload 
                        bucket='services'
                        initialUrl={field.value}
                        onUpload={(url) => field.onChange(url)}
                        onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="successStory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Success Story (JSON)</FormLabel>
                   <FormControl>
                    <Textarea
                      placeholder='{ "scenario": "...", "challenge": "...", "solution": "...", "result": "..." }'
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <PreviewSuccessStory jsonString={successStoryJson} />
                </FormItem>
              )}
            />
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
             <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                   <FormControl>
                    <Textarea
                      placeholder="Enter one feature per line."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                   <FormControl>
                    <Textarea
                      placeholder="Enter one requirement per line."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="includes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Includes</FormLabel>
                   <FormControl>
                    <Textarea
                      placeholder="Enter one item per line."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pricingPlans"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pricing Plans (JSON)</FormLabel>
                   <FormControl>
                    <Textarea
                      placeholder='[ { "title": "Basic", "description": "...", "features": ["..."], "price": "...", "popular": false } ]'
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <PreviewPricingPlans jsonString={pricingPlansJson} />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="processSteps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Process Steps (JSON)</FormLabel>
                   <FormControl>
                    <Textarea
                      placeholder='[ { "step": "1", "title": "...", "description": "..." } ]'
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <PreviewProcessSteps jsonString={processStepsJson} />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="processingTime"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Processing Time</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., 5-7 business days" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pricing"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Pricing (ZAR)</FormLabel>
                        <FormControl>
                        <Input
                            type="number"
                            step="0.01"
                            placeholder="e.g., 1500.00"
                            {...field}
                            value={field.value ?? ''}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                        <FormLabel>Published</FormLabel>
                        <FormDescription>
                            Make this service visible on the public website.
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
                <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                        <FormLabel>Featured</FormLabel>
                         <FormDescription>
                            Highlight this service on the homepage.
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
             {/* SEO Section */}
            <div className="pt-6 border-t">
                <h3 className="text-lg font-medium">SEO Settings</h3>
                <div className="space-y-6 mt-4">
                    <FormField
                        control={form.control}
                        name="seoTitle"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>SEO Title</FormLabel>
                            <FormControl>
                            <Input {...field} value={field.value || ''}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="seoKeywords"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>SEO Keywords</FormLabel>
                            <FormControl>
                            <Input placeholder="keyword1, keyword2, keyword3" {...field} value={field.value || ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="seoDescription"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>SEO Description</FormLabel>
                            <FormControl>
                            <Textarea rows={3} {...field} value={field.value || ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
            </div>
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
