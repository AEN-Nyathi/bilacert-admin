'use client';

import { useDataFetching } from './useDataFetching';
import type { BlogPost } from '@/lib/types';

export function useBlogs() {
  return useDataFetching<BlogPost>('blog_posts');
}
