'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CoreDetailsForm({ form }: { form: any }) {
  return (
    <Card>
      <CardHeader><CardTitle>Core Details</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <FormField control={form.control} name="title" render={({ field }) => ( <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
        <FormField control={form.control} name="slug" render={({ field }) => ( <FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
        <FormField control={form.control} name="href" render={({ field }) => ( <FormItem><FormLabel>URL (href)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
        <FormField control={form.control} name="description" render={({ field }) => ( <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )} />
        <FormField control={form.control} name="short_description" render={({ field }) => ( <FormItem><FormLabel>Short Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )} />
        <FormField control={form.control} name="content" render={({ field }) => ( <FormItem><FormLabel>Content</FormLabel><FormControl><Textarea rows={5} {...field} /></FormControl><FormMessage /></FormItem> )} />
      </CardContent>
    </Card>
  );
}
