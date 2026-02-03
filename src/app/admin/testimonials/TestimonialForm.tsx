
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import type { Testimonial } from '@/lib/types';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { testimonialSchema } from './schema';
import { upsertTestimonial } from './actions';

type TestimonialFormValues = Zod.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
  testimonial?: Testimonial | null;
}

export default function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const isEditing = !!testimonial;
  
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      postUrl: '',
    },
  });

  const { handleSubmit, reset, formState: { isSubmitting } } = form;

  useEffect(() => {
    if (testimonial) {
      reset({
        postUrl: testimonial.postUrl,
      });
    } else {
      reset({
        postUrl: '',
      });
    }
  }, [testimonial, reset]);

  const onSubmit = async (values: TestimonialFormValues) => {
    try {

      const result = await upsertTestimonial(values, testimonial?.id);

      if (result.error) {
        throw new Error(result.error);
      }

      toast({
        title: result.message,
      });
      router.push('/admin/testimonials');
      router.refresh();

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error saving testimonial',
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="postUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook Post URL</FormLabel>
              <FormControl>
                <Input placeholder="https://www.facebook.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/testimonials">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Save Changes' : 'Add Testimonial'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
