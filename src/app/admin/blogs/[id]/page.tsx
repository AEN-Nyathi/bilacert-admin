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
