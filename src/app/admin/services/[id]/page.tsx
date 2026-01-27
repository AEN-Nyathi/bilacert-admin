
import { supabase } from '@/lib/supabase';
import ServiceDetails from './ServiceDetails';
import { notFound } from 'next/navigation';
import type { Service } from '@/lib/types';

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
        shortDescription: data.short_description,
        icon: data.icon,
        orderIndex: data.order_index,
        content: data.content,
        features: data.features,
        requirements: data.requirements,
        published: data.published,
        featured: data.featured,
        createdAt: data.created_at,
        processingTime: data.processing_time,
        pricing: data.pricing,
        image: data.image,
        thumbnail: data.thumbnail,
        seoTitle: data.seo_title,
        seoDescription: data.seo_description,
        seoKeywords: data.seo_keywords,
    } as Service;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
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

export default async function ServiceDetailsPage({ params }: { params: { id: string } }) {
    const service = await getService(params.id);

    if (!service) {
        notFound();
    }

    return <ServiceDetails service={service} />;
}
