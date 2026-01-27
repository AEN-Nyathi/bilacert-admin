
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
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import BlogForm from './BlogForm';
import BlogDetails from './BlogDetails';
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

export default function BlogsClient() {
  const { blogs, loading, error } = useBlogs();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  const handleAdd = () => {
    setSelectedBlog(null);
    setIsFormOpen(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsFormOpen(true);
  };

  const handleViewDetails = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsDetailsOpen(true);
  };

  const handleDelete = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setIsFormOpen(false);
    setIsDetailsOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedBlog(null);
  };

  if (error) {
    return <div className="text-destructive">Error loading posts: {error.message}</div>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Blog Posts</CardTitle>
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Post
          </Button>
        </CardHeader>
        <CardContent>
          {blogs.length === 0 && !loading ? (
             <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
                <h3 className="text-lg font-semibold tracking-tight">No Blog Posts Yet</h3>
                <p className="text-sm text-muted-foreground">Click "Add Post" to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Card key={blog.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="truncate">{blog.title}</CardTitle>
                    <CardDescription>{blog.category || 'No Category'}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
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
                  <CardFooter className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(blog)}>
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(blog)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                          onClick={() => handleDelete(blog)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {isFormOpen && (
        <BlogForm
          isOpen={isFormOpen}
          onClose={handleCloseDialogs}
          blog={selectedBlog}
        />
      )}

      {isDetailsOpen && (
        <BlogDetails
            isOpen={isDetailsOpen}
            onClose={handleCloseDialogs}
            blog={selectedBlog}
        />
      )}

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
