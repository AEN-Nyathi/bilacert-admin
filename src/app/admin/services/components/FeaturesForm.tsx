'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FeaturesForm({ form }: { form: any }) {
  return (
    <Card>
        <CardHeader><CardTitle>Features & Requirements</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <FormField control={form.control} name="features" render={({ field }) => (<FormItem><FormLabel>Features (one per line)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="requirements" render={({ field }) => (<FormItem><FormLabel>Requirements (one per line)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="includes" render={({ field }) => (<FormItem><FormLabel>What's Included (one per line)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
        </CardContent>
    </Card>
  );
}
