
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  category: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean(),
  image: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

type BlogFormValues = z.infer<typeof blogSchema>;

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
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: '',
      excerpt: '',
      content: '',
      published: false,
      image: '',
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = form;

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
        category: blog.category || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        published: blog.published,
        image: blog.image || '',
      });
    } else {
      reset({
        title: '',
        slug: '',
        category: '',
        excerpt: '',
        content: '',
        published: false,
        image: '',
      });
    }
  }, [blog, reset]);

  const onSubmit = async (values: BlogFormValues) => {
    try {
      const blogData = {
        title: values.title,
        slug: values.slug,
        category: values.category,
        excerpt: values.excerpt,
        content: values.content,
        published: values.published,
        image: values.image,
        updated_at: new Date().toISOString(),
      };

      let response;
      if (blog) {
        response = await supabase
          .from('blog_posts')
          .update(blogData)
          .eq('id', blog.id);
      } else {
        response = await supabase.from('blog_posts').insert([
          { ...blogData, created_at: new Date().toISOString() },
        ]);
      }

      if (response.error) {
        throw response.error;
      }

      toast({
        title: `Blog post ${blog ? 'updated' : 'created'} successfully!`,
      });
      router.push('/admin/blogs');
      router.refresh();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error saving blog post',
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., My Awesome Blog Post" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., my-awesome-blog-post" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Tech" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A short summary of the post."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog post here. Markdown is supported."
                      rows={12}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Published</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        <div className="mt-8 flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/blogs">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Save Changes' : 'Create Post'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
