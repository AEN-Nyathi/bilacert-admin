import { supabase } from '@/lib/supabase/supabase';
import ServiceDetails from './ServiceDetails';
import { notFound } from 'next/navigation';
import type { Service } from '@/lib/types';
import type { Metadata } from 'next';

async function getService(id: string): Promise<Service | null> {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return null;
    }

    return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        href: data.href,
        category: data.category,
        description: data.description,
        short_description: data.short_description,
        icon: data.icon,
        order_index: data.order_index,
        content: data.content,
        features: data.features,
        requirements: data.requirements,
        includes: data.includes,
        published: data.published,
        featured: data.featured,
        created_at: data.created_at,
        processing_time: data.processing_time,
        pricing: data.pricing,
        image: data.image,
        thumbnail: data.thumbnail,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        seo_keywords: data.seo_keywords,
        pricing_plans: data.pricing_plans,
        process_steps: data.process_steps,
        success_story: data.success_story,
    } as Service;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const service = await getService(params.id);
    if (!service) {
        return {
            title: 'Service Not Found'
        }
    }
    return {
        title: `${service.title} | Bilacert Admin Pro`,
    }
}

export default async function ServiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const service = await getService(id);

    if (!service) {
        notFound();
    }

    return <ServiceDetails service={service} />;
}
