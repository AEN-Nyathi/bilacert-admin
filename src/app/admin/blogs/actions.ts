'use server';

import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { blogSchema } from './schema';
import { revalidatePath } from 'next/cache';
import { BlogPost } from '@/lib/types';

export async function upsertBlog(values: unknown, blogId?: string) {
  const supabase = createSupabaseAdminClient();
  const parsedValues = blogSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: parsedValues.error.message };
  }

  const { data: blogData, error } = await supabase
    .from('blog_posts')
    .upsert(blogId ? { ...parsedValues.data, id: blogId } : parsedValues.data)
    .select('*')
    .single();

  if (error) {
    return { error: `Database error: ${error.message}` };
  }

  revalidatePath('/admin/blogs');
  revalidatePath(`/admin/blogs/${(blogData as BlogPost).id}`);
  revalidatePath(`/blog/${(blogData as BlogPost).slug}`);

  return {
    data: blogData,
    message: `Blog post ${blogId ? 'updated' : 'created'} successfully!`,
  };
}
