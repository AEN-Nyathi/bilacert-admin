
import { Suspense } from 'react';
import BlogsClient from './BlogsClient';
import BlogsLoading from './loading';

export const metadata = {
    title: 'Blogs | Bilacert Admin Pro',
    description: 'Create and manage blog posts.',
};

export default function BlogsPage() {
  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
        <Suspense fallback={<BlogsLoading />}>
            <BlogsClient />
        </Suspense>
    </div>
  );
}
