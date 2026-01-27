
import { supabase } from '@/lib/supabase';
import ServiceForm from '../../ServiceForm';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Service } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Edit Service | Bilacert Admin Pro',
    description: 'Edit an existing regulatory service.',
};

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


export default async function EditServicePage({ params }: { params: { id: string } }) {
    const service = await getService(params.id);

    if (!service) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <Button variant="outline" asChild>
                <Link href="/admin/services">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Services
                </Link>
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Service</CardTitle>
                    <CardDescription>Update the details for "{service.title}".</CardDescription>
                </CardHeader>
                <CardContent>
                    <ServiceForm service={service} />
                </CardContent>
            </Card>
        </div>
    );
}
