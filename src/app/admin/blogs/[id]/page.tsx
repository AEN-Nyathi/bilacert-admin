import { supabase } from '@/lib/supabase';
import BlogDetails from '../BlogDetails';
import { notFound } from 'next/navigation';
import type { BlogPost } from '@/lib/types';
import type { Metadata } from 'next';

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
        published: data.published,
        createdAt: data.created_at,
        image: data.image,
        author: data.author,
        readTime: data.read_time,
        date: data.created_at,
    } as BlogPost;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const blog = await getBlog(params.id);
    if (!blog) {
        return {
            title: 'Blog Post Not Found'
        }
    }
    return {
        title: `${blog.title} | Bilacert Admin Pro`,
    }
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlog(id);

    if (!blog) {
        notFound();
    }

    return <BlogDetails blog={blog} />;
}
