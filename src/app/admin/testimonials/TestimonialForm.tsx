
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
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

const testimonialSchema = z.object({
  postUrl: z.string().url('Please enter a valid Facebook post URL'),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial?: Testimonial | null;
}

export default function TestimonialForm({ isOpen, onClose, testimonial }: TestimonialFormProps) {
  const { toast } = useToast();
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      postUrl: '',
    },
  });

  useEffect(() => {
    if (testimonial) {
      form.reset({
        postUrl: testimonial.postUrl,
      });
    } else {
      form.reset({
        postUrl: '',
      });
    }
  }, [testimonial, form.reset]);

  const onSubmit = async (values: TestimonialFormValues) => {
    try {
      const testimonialData = {
        post_url: values.postUrl,
      };

      let response;
      if (testimonial) {
        response = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', testimonial.id);
      } else {
        response = await supabase.from('testimonials').insert([
          { ...testimonialData },
        ]);
      }

      if (response.error) {
        throw response.error;
      }

      toast({
        title: `Testimonial ${testimonial ? 'updated' : 'added'} successfully!`,
      });
      onClose();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error saving testimonial',
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
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
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {testimonial ? 'Save Changes' : 'Add Testimonial'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
