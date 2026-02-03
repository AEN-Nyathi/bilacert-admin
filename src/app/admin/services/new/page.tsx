import ServiceForm from '../ServiceForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'New Service | Bilacert Admin Pro',
    description: 'Add a new regulatory service.',
};

export default function NewServicePage() {
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
                    <CardTitle>Add New Service</CardTitle>
                    <CardDescription>Fill out the form below to create a new service.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ServiceForm />
                </CardContent>
            </Card>
        </div>
    );
}
