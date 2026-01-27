
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
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
            <Button asChild>
                <Link href="/admin/blogs/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Post
                </Link>
            </Button>
        </div>
        <Suspense fallback={<BlogsLoading />}>
            <BlogsClient />
        </Suspense>
    </div>
  );
}
