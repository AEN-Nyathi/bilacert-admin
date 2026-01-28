
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import type { Testimonial } from '@/lib/types';
import TestimonialDetails from '../TestimonialDetails';

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

export async function generateMetadata({ params }: { params: { id: string } }) {
    const testimonial = await getTestimonial(params.id);
    if (!testimonial) {
        return {
            title: 'Testimonial Not Found'
        }
    }
    return {
        title: `Testimonial from ${new Date(testimonial.createdAt).toLocaleDateString()} | Bilacert Admin Pro`,
    }
}

export default async function TestimonialDetailsPage({ params }: { params: { id: string } }) {
    const testimonial = await getTestimonial(params.id);

    if (!testimonial) {
        notFound();
    }

    return <TestimonialDetails testimonial={testimonial} />;
}
