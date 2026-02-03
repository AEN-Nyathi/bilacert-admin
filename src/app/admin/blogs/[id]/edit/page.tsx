import { supabase } from '@/lib/supabase/supabase';
import BlogForm from '../../BlogForm';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { BlogPost } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Edit Blog Post | Bilacert Admin Pro',
    description: 'Edit an existing blog post.',
};

async function getBlog(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_posts')
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
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        tags: data.tags,
        read_time: data.read_time,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        seo_keywords: data.seo_keywords,
        featured_image: data.featured_image,
        thumbnail: data.thumbnail,
        published: data.published,
        published_at: data.published_at,
        featured: data.featured,
        author_id: data.author_id,
        author_name: data.author_name,
        views_count: data.views_count,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
    } as BlogPost;
}


export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlog(id);

    if (!blog) {
        notFound();
    }

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
                    <CardTitle>Edit Blog Post</CardTitle>
                    <CardDescription>Update the details for "{blog.title}".</CardDescription>
                </CardHeader>
                <CardContent>
                    <BlogForm blog={blog} />
                </CardContent>
            </Card>
        </div>
    );
}
