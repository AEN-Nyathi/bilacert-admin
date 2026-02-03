'use client';

import { useFieldArray } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PricingPlansForm({ form }: { form: any }) {
  const { fields: pricingPlanFields } = useFieldArray({
    control: form.control,
    name: "pricing_plans"
  });

  return (
    <Card>
        <CardHeader><CardTitle>Pricing Plans</CardTitle></CardHeader>
        <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-6">
            {pricingPlanFields.map((field, index) => (
            <Card key={field.id} className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">{`Plan ${index + 1}`}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name={`pricing_plans.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Plan Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`pricing_plans.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Plan Description</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`pricing_plans.${index}.price`} render={({ field }) => (<FormItem><FormLabel>Price</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`pricing_plans.${index}.features`} render={({ field }) => (<FormItem><FormLabel>Features (one per line)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField
                    control={form.control}
                    name={`pricing_plans.${index}.popular`}
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border bg-card p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Most Popular</FormLabel>
                                <FormDescription>Highlight this plan.</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                </CardContent>
            </Card>
            ))}
        </div>
        </CardContent>
    </Card>
  );
}
