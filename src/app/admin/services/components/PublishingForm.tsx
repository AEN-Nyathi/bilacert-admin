'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PublishingForm({ form }: { form: any }) {
  return (
    <Card>
        <CardHeader><CardTitle>Publishing</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <FormField control={form.control} name="published" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"><div className="space-y-0.5"><FormLabel>Published</FormLabel><FormDescription>Make this service visible on the site.</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem> )}/>
            <FormField control={form.control} name="featured" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"><div className="space-y-0.5"><FormLabel>Featured</FormLabel><FormDescription>Feature this service on the homepage.</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem> )}/>
        </CardContent>
    </Card>
  );
}
