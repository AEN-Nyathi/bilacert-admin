
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/types';
import { format } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BlogDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  blog: BlogPost | null;
}

export default function BlogDetails({
  isOpen,
  onClose,
  blog,
}: BlogDetailsProps) {
  if (!blog) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{blog.title}</DialogTitle>
          {blog.category && <DialogDescription>{blog.category}</DialogDescription>}
        </DialogHeader>
        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6 p-1">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
              <Badge variant={blog.published ? 'default' : 'secondary'}>
                {blog.published ? 'Published' : 'Draft'}
              </Badge>
            </div>
             {blog.slug && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Slug</h4>
                <p className="text-sm text-card-foreground font-mono">{blog.slug}</p>
              </div>
            )}
             {blog.excerpt && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Excerpt</h4>
                <p className="text-sm text-card-foreground italic">"{blog.excerpt}"</p>
              </div>
            )}
            {blog.content && (
              <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Content</h4>
                  <div className="prose prose-sm dark:prose-invert mt-1 text-card-foreground text-sm whitespace-pre-wrap">
                      {blog.content}
                  </div>
              </div>
            )}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Created At</h4>
              <p className="text-sm text-card-foreground">{format(new Date(blog.createdAt), 'PPpp')}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
