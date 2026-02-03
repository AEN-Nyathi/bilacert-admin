'use client';

import { useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProcessStepsForm({ form }: { form: any }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'process_steps'
  });

  return (
    <Card>
        <CardHeader><CardTitle>Process Steps</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-4 p-4 border rounded-md">
                    <div className="grid gap-2 flex-grow">
                         <FormField control={form.control} name={`process_steps.${index}.step`} render={({ field }) => (<FormItem><FormLabel>Step Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`process_steps.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Step Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`process_steps.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Step Description</FormLabel><FormControl><Textarea {...field} rows={2} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} className="mt-7"><Trash2 className="h-4 w-4" /></Button>
                </div>
            ))}
             <Button type="button" variant="outline" onClick={() => append({ step: `${fields.length + 1}`, title: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Step</Button>
        </CardContent>
    </Card>
  );
}
