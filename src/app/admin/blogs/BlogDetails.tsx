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
        
        {(blog.featured_image || blog.thumbnail) && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {blog.featured_image && (
                     <Card>
                         <CardHeader>
                             <CardTitle className="text-lg">Featured Image</CardTitle>
                         </CardHeader>
                         <CardContent>
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                                <Image src={blog.featured_image} alt="Featured Image" fill className="object-cover" />
                            </div>
                         </CardContent>
                     </Card>
                 )}
                  {blog.thumbnail && (
                     <Card>
                         <CardHeader>
                             <CardTitle className="text-lg">Thumbnail</CardTitle>
                         </CardHeader>
                         <CardContent>
                            <div className="relative aspect-square w-48 overflow-hidden rounded-lg">
                                <Image src={blog.thumbnail} alt="Thumbnail" fill className="object-cover" />
                            </div>
                         </CardContent>
                     </Card>
                 )}
             </div>
        )}

        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{blog.title}</CardTitle>
                        {blog.category && <CardDescription>{blog.category}</CardDescription>}
                    </div>
                    <div className="flex gap-2">
                        {blog.featured && <Badge>Featured</Badge>}
                        <Badge variant={blog.published ? 'default' : 'secondary'}>
                            {blog.published ? 'Published' : 'Draft'}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-muted-foreground">Details</h4>
                        <div className="text-sm"><strong>Slug:</strong> <span className="font-mono">{blog.slug}</span></div>
                        {blog.author_name && <div className="text-sm"><strong>Author:</strong> {blog.author_name}</div>}
                        {blog.read_time && <div className="text-sm"><strong>Read Time:</strong> {blog.read_time}</div>}
                        {blog.tags && <div className="text-sm"><strong>Tags:</strong> {blog.tags}</div>}
                        <div className="text-sm"><strong>Created:</strong> {format(new Date(blog.createdAt), 'PPpp')}</div>
                        {blog.updatedAt && <div className="text-sm"><strong>Updated:</strong> {format(new Date(blog.updatedAt), 'PPpp')}</div>}
                    </div>
                     <div className="space-y-4 md:col-span-2">
                        <h4 className="text-sm font-medium text-muted-foreground">SEO</h4>
                        {blog.seo_title && <div className="text-sm"><strong>Title:</strong> {blog.seo_title}</div>}
                        {blog.seo_description && <div className="text-sm"><strong>Description:</strong> {blog.seo_description}</div>}
                        {blog.seo_keywords && <div className="text-sm"><strong>Keywords:</strong> {blog.seo_keywords}</div>}
                     </div>
                </div>
                {blog.excerpt && (
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-medium mb-2">Excerpt</h3>
                        <p className="text-sm text-card-foreground italic">"{blog.excerpt}"</p>
                    </div>
                )}
                {blog.content && (
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-medium mb-2">Content</h3>
                        <div className="prose prose-sm dark:prose-invert mt-1 text-card-foreground whitespace-pre-wrap">
                            {blog.content}
                        </div>
                    </div>
                )}
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
