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

export default function SeoForm({ form }: { form: any }) {
  return (
    <Card>
        <CardHeader><CardTitle>SEO</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <FormField control={form.control} name="seo_title" render={({ field }) => ( <FormItem><FormLabel>SEO Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="seo_description" render={({ field }) => ( <FormItem><FormLabel>SEO Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="seo_keywords" render={({ field }) => ( <FormItem><FormLabel>SEO Keywords</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
        </CardContent>
    </Card>
  );
}
