'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DetailsForm({ form }: { form: any }) {
  return (
    <Card>
        <CardHeader><CardTitle>Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <FormField control={form.control} name="category" render={({ field }) => ( <FormItem><FormLabel>Category</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="icon" render={({ field }) => ( <FormItem><FormLabel>Icon</FormLabel><FormControl><Input {...field} placeholder="e.g., Shield" /></FormControl><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="order_index" render={({ field }) => ( <FormItem><FormLabel>Order Index</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="processing_time" render={({ field }) => ( <FormItem><FormLabel>Processing Time</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="pricing" render={({ field }) => ( <FormItem><FormLabel>Price (ZAR)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem> )}/>
        </CardContent>
    </Card>
  );
}
