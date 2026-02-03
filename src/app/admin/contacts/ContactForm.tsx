
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
import type { Contact } from '@/lib/types';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { contactSchema } from './schema';
import { upsertContact } from './actions';

type ContactFormValues = Zod.infer<typeof contactSchema>;

interface ContactFormProps {
  contact?: Contact | null;
}

export default function ContactForm({ contact }: ContactFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;
  const isEditing = !!contact;

  useEffect(() => {
    if (contact) {
      reset({
        name: contact.name,
        email: contact.email,
        phone: contact.phone || '',
        service: contact.service || '',
        message: contact.message || '',
      });
    }
  }, [contact, reset]);

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const result = await upsertContact(values, contact?.id);

      if (result.error) {
        throw new Error(result.error);
      }

      toast({
        title: result.message,
      });
      router.push('/admin/contacts');
      router.refresh();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error saving contact',
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="(123) 456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Web Development" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message / Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Initial contact from the website..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/contacts">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Save Changes' : 'Add Contact'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
