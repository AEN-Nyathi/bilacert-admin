
import { Suspense } from 'react';
import BlogsClient from './BlogsClient';
import BlogsLoading from './loading';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export const metadata = {
    title: 'Blogs | Bilacert Admin Pro',
    description: 'Create and manage blog posts.',
};

export default function BlogsPage() {
  return (
    <div className="space-y-6">
        <Suspense fallback={<BlogsLoading />}>
            <BlogsClient />
        </Suspense>
    </div>
  );
}
