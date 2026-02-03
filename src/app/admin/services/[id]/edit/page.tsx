import { createSupabaseAdminClient } from '@/lib/supabase/admin';
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
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching service:', error);
        return null;
    }

    return data as Service;
}

export default async function EditServicePage({ params }:  { params: Promise<{ id: string }> } ) {
    const slug = (await params).id;
    const service = await getService(slug);

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
