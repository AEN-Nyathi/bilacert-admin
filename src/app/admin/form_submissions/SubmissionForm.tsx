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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Submission } from '@/lib/types';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { submissionSchema } from './schema';
import { upsertSubmission } from './actions';

type SubmissionFormValues = Zod.infer<typeof submissionSchema>;

interface SubmissionFormProps {
  submission: Submission;
}

export default function SubmissionForm({ submission }: SubmissionFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      company: '',
      industry: '',
      serviceName: '',
      status: 'pending',
      details: '',
      internalNotes: '',
      assignedTo: '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (submission) {
      reset({
        fullName: submission.fullName,
        email: submission.email,
        phone: submission.phone || '',
        company: submission.company || '',
        industry: submission.industry || '',
        serviceName: submission.serviceName || '',
        status: submission.status,
        details: submission.details ? JSON.stringify(submission.details, null, 2) : '',
        internalNotes: submission.internalNotes || '',
        assignedTo: submission.assignedTo || '',
      });
    }
  }, [submission, reset]);

  const onSubmit = async (values: SubmissionFormValues) => {
    try {
      const result = await upsertSubmission(values, submission.id);

      if (result.error) {
        throw new Error(result.error);
      }
      
      toast({
        title: result.message,
      });
      router.push(`/admin/form_submissions/${submission.id}`);
      router.refresh();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error saving submission',
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
                 <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
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
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
             <div className="space-y-6">
                <FormField
                    control={form.control}
                    name="serviceName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Service Name</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="capitalize">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {['pending', 'in-progress', 'completed', 'rejected', 'archived'].map(status => (
                            <SelectItem key={status} value={status} className="capitalize">{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="assignedTo"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Assigned To (User ID)</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter user UUID" {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Details (JSON format)</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder='e.g., { "inquiry": "..." }'
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
                    name="internalNotes"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Internal Notes</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="Add internal notes here..."
                            rows={4}
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
        </div>
        <div className="mt-8 flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href={`/admin/form_submissions/${submission.id}`}>Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
