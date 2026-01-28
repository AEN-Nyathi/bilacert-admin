
import { supabase } from '@/lib/supabase';
import TestimonialForm from '../../TestimonialForm';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Testimonial } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Edit Testimonial | Bilacert Admin Pro',
    description: 'Edit an existing testimonial.',
};

async function getTestimonial(id: string): Promise<Testimonial | null> {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return null;
    }

    return {
        id: data.id,
        postUrl: data.post_url,
        createdAt: data.created_at,
    } as Testimonial;
}


export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
    const testimonial = await getTestimonial(params.id);

    if (!testimonial) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <Button variant="outline" asChild>
                <Link href="/admin/testimonials">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Testimonials
                </Link>
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Testimonial</CardTitle>
                    <CardDescription>Update the Facebook post URL.</CardDescription>
                </CardHeader>
                <CardContent>
                    <TestimonialForm testimonial={testimonial} />
                </CardContent>
            </Card>
        </div>
    );
}
