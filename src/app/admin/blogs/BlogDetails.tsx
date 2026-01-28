
'use client';

import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/types';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import DeleteBlogDialog from './DeleteBlogDialog';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface BlogDetailsProps {
  blog: BlogPost;
}

export default function BlogDetails({ blog }: BlogDetailsProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!blog) return null;

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const onDeleted = () => {
    setIsDeleteDialogOpen(false);
    router.push('/admin/blogs');
    router.refresh();
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
                <Link href="/admin/blogs">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blogs
                </Link>
            </Button>
            <div className="flex gap-2">
                <Button asChild>
                    <Link href={`/admin/blogs/${blog.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </Link>
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
            </div>
        </div>
        
        {blog.image && (
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <Image src={blog.image} alt={blog.title} fill className="object-cover" />
            </div>
        )}

        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{blog.title}</CardTitle>
                        {blog.category && <CardDescription>{blog.category}</CardDescription>}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                        <Badge variant={blog.published ? 'default' : 'secondary'}>
                            {blog.published ? 'Published' : 'Draft'}
                        </Badge>
                    </div>
                    {blog.slug && (
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Slug</h4>
                            <p className="text-sm font-mono text-card-foreground">{blog.slug}</p>
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
            </CardContent>
        </Card>
      </div>
      
      {isDeleteDialogOpen && (
        <DeleteBlogDialog
            isOpen={isDeleteDialogOpen}
            onClose={handleCloseDialog}
            blog={blog}
            onDeleted={onDeleted}
        />
      )}
    </>
  );
}
