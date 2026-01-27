
import { Suspense } from 'react';
import TestimonialsClient from './TestimonialsClient';
import TestimonialsLoading from './loading';

export const metadata = {
    title: 'Testimonials | Bilacert Admin Pro',
    description: 'Manage customer testimonials from social media.',
};

export default function TestimonialsPage() {
  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
        <Suspense fallback={<TestimonialsLoading />}>
            <TestimonialsClient />
        </Suspense>
    </div>
  );
}
