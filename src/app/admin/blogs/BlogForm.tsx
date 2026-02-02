'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import type { BlogPost } from '@/lib/types';
import { useEffect, useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ui/ImageUpload';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { blogSchema, BlogFormValues } from './schema';
import { upsertBlog } from './actions';

interface BlogFormProps {
  blog?: BlogPost | null;
}

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function BlogForm({ blog }: BlogFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      slug: '',
      author_name: 'Bilacert Team',
      read_time: '5 min read',
      category: '',
      tags: '',
      excerpt: '',
      content: '',
      published: false,
      featured_image: '',
      thumbnail: '',
      featured: false,
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
    },
  });

  const { handleSubmit, reset, watch, setValue } = form;

  const title = watch('title');
  const isEditing = !!blog;

  useEffect(() => {
    if (!isEditing && title) {
      setValue('slug', slugify(title), { shouldValidate: true });
    }
  }, [title, setValue, isEditing]);

  useEffect(() => {
    if (blog) {
      reset({
        title: blog.title,
        slug: blog.slug,
        author_name: blog.author_name || 'Bilacert Team',
        read_time: blog.read_time || '5 min read',
        tags: blog.tags || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        published: blog.published,
        featured_image: blog.featured_image || '',
        thumbnail: blog.thumbnail || '',
        featured: blog.featured || false,
        seo_title: blog.seo_title || '',
        seo_description: blog.seo_description || '',
        seo_keywords: blog.seo_keywords || '',
      });
    }
  }, [blog, reset]);

  const onSubmit = (values: BlogFormValues) => {
    startTransition(async () => {
      const result = await upsertBlog(values, blog?.id);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Error saving blog post',
          description: result.error,
        });
      } else {
        toast({
          title: result.message,
        });
        router.push('/admin/blogs');
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader><CardTitle>Core Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="title" render={({ field }) => ( <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="e.g., My Awesome Blog Post" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="slug" render={({ field }) => ( <FormItem><FormLabel>Slug</FormLabel><FormControl><Input placeholder="e.g., my-awesome-blog-post" {...field} /></FormControl><FormMessage /></FormItem> )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Media</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="featured_image" render={({ field }) => ( <FormItem><FormLabel>Featured Image</FormLabel><FormControl><ImageUpload bucket='blogs' initialUrl={field.value} onUpload={(url) => field.onChange(url)} onRemove={() => field.onChange('')} /></FormControl><FormMessage /></FormItem> )}/>
                <FormField control={form.control} name="thumbnail" render={({ field }) => ( <FormItem><FormLabel>Thumbnail Image</FormLabel><FormControl><ImageUpload bucket='blogs' initialUrl={field.value} onUpload={(url) => field.onChange(url)} onRemove={() => field.onChange('')} /></FormControl><FormMessage /></FormItem> )}/>
              </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Content</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="excerpt" render={({ field }) => ( <FormItem><FormLabel>Excerpt</FormLabel><FormControl><Textarea placeholder="A short summary of the post." {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="content" render={({ field }) => ( <FormItem><FormLabel>Content</FormLabel><FormControl><Textarea placeholder="Write your blog post here. Markdown is supported." rows={12} {...field} /></FormControl><FormMessage /></FormItem> )} />
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader><CardTitle>SEO</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="seo_title" render={({ field }) => ( <FormItem><FormLabel>SEO Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                    <FormField control={form.control} name="seo_description" render={({ field }) => ( <FormItem><FormLabel>SEO Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )}/>
                    <FormField control={form.control} name="seo_keywords" render={({ field }) => ( <FormItem><FormLabel>SEO Keywords (comma separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                </CardContent>
            </Card>
          </div>
          <div className="space-y-6 lg:col-span-1">
             <Card>
                <CardHeader><CardTitle>Publishing</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="published" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"><div className="space-y-0.5"><FormLabel>Published</FormLabel><FormDescription>Make this post visible.</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem> )}/>
                    <FormField control={form.control} name="featured" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"><div className="space-y-0.5"><FormLabel>Featured Post</FormLabel><FormDescription>Display this post prominently.</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem> )}/>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Details</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="author_name" render={({ field }) => ( <FormItem><FormLabel>Author</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                    <FormField control={form.control} name="read_time" render={({ field }) => ( <FormItem><FormLabel>Read Time</FormLabel><FormControl><Input placeholder="e.g., 5 min read" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                    <FormField control={form.control} name="category" render={({ field }) => ( <FormItem><FormLabel>Category</FormLabel><FormControl><Input placeholder="e.g., Tech" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                    <FormField control={form.control} name="tags" render={({ field }) => ( <FormItem><FormLabel>Tags (comma separated)</FormLabel><FormControl><Input placeholder="e.g., icasa, nrcs" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/blogs">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Save Changes' : 'Create Post'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
