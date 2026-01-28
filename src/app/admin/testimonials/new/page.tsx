
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import TestimonialForm from '../TestimonialForm';

export const metadata = {
    title: 'New Testimonial | Bilacert Admin Pro',
    description: 'Add a new testimonial from a Facebook post.',
};

export default function NewTestimonialPage() {
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
                    <CardTitle>Add New Testimonial</CardTitle>
                    <CardDescription>Enter the URL of the Facebook post below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <TestimonialForm />
                </CardContent>
            </Card>
        </div>
    );
}
