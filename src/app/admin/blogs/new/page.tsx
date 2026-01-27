
import BlogForm from '../BlogForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'New Blog Post | Bilacert Admin Pro',
    description: 'Create a new blog post.',
};

export default function NewBlogPage() {
    return (
        <div className="space-y-6">
            <Button variant="outline" asChild>
                <Link href="/admin/blogs">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blogs
                </Link>
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle>Add New Post</CardTitle>
                    <CardDescription>Fill out the form below to create a new post.</CardDescription>
                </CardHeader>
                <CardContent>
                    <BlogForm />
                </CardContent>
            </Card>
        </div>
    );
}
