'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SuccessStoryForm({ form }: { form: any }) {
  return (
    <Card>
        <CardHeader><CardTitle>Success Story</CardTitle></CardHeader>
        <CardContent className="space-y-4">
             <FormField control={form.control} name="success_story.scenario" render={({ field }) => (<FormItem><FormLabel>Scenario</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl></FormItem>)} />
            <FormField control={form.control} name="success_story.challenge" render={({ field }) => (<FormItem><FormLabel>Challenge</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl></FormItem>)} />
            <FormField control={form.control} name="success_story.solution" render={({ field }) => (<FormItem><FormLabel>Solution</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl></FormItem>)} />
            <FormField control={form.control} name="success_story.result" render={({ field }) => (<FormItem><FormLabel>Result</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl></FormItem>)} />
        </CardContent>
    </Card>
  );
}
