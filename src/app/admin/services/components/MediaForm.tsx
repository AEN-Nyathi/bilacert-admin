'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import ImageUpload from '@/components/ui/ImageUpload';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MediaForm({ form }: { form: any }) {
  return (
    <Card>
        <CardHeader><CardTitle>Media</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <FormField control={form.control} name="image" render={({ field }) => ( <FormItem><FormLabel>Image</FormLabel><FormControl><ImageUpload bucket='services' initialUrl={field.value} onUpload={(url) => field.onChange(url)} onRemove={() => field.onChange('')} /></FormControl><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="thumbnail" render={({ field }) => ( <FormItem><FormLabel>Thumbnail</FormLabel><FormControl><ImageUpload bucket='services' initialUrl={field.value} onUpload={(url) => field.onChange(url)} onRemove={() => field.onChange('')} /></FormControl><FormMessage /></FormItem> )}/>
        </CardContent>
    </Card>
  );
}
