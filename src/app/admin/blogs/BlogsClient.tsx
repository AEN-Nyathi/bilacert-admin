
'use client';

import { useState } from 'react';
import { useBlogs } from '@/hooks/useBlogs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BlogPost } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import DeleteBlogDialog from './DeleteBlogDialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export default function BlogsClient() {
  const { blogs, loading, error } = useBlogs();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  const handleDelete = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setIsDeleteDialogOpen(false);
    setSelectedBlog(null);
  };

  if (error) {
    return <div className="text-destructive">Error loading posts: {error.message}</div>;
  }

  return (
    <>
      <div>
        {blogs.length === 0 && !loading ? (
           <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
              <h3 className="text-lg font-semibold tracking-tight">No Blog Posts Yet</h3>
              <p className="text-sm text-muted-foreground">Click "Add Post" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link href={`/admin/blogs/${blog.id}`} key={blog.id} className="group">
                <Card className="flex flex-col h-full hover:shadow-lg hover:border-primary/50 transition-all">
                  <CardHeader>
                    <CardTitle className="truncate">{blog.title}</CardTitle>
                    <CardDescription>{blog.category || 'No Category'}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    {blog.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {blog.excerpt}
                      </p>
                    )}
                    <div>
                      <h4 className="text-xs font-medium uppercase text-muted-foreground">Status</h4>
                      <Badge variant={blog.published ? 'default' : 'secondary'}>
                        {blog.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium uppercase text-muted-foreground">Created At</h4>
                      <p className="text-sm">
                        {format(new Date(blog.createdAt), 'PP')}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/blogs/${blog.id}/edit`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                          onClick={(e) => {
                              e.preventDefault();
                              handleDelete(blog);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {isDeleteDialogOpen && (
        <DeleteBlogDialog
            isOpen={isDeleteDialogOpen}
            onClose={handleCloseDialogs}
            blog={selectedBlog}
        />
      )}
    </>
  );
}
