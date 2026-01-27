
import { supabase } from '@/lib/supabase';
import ServiceDetails from '../ServiceDetails';
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
        content: data.content,
        published: data.published,
        createdAt: data.created_at,
        processingTime: data.processing_time,
        pricing: data.pricing,
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
