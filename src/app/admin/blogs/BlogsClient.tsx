
'use client';

import { useState } from 'react';
import { useBlogs } from '@/hooks/useBlogs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { columns as createColumns } from './columns';
import { BlogPost } from '@/lib/types';
import { DataTable } from '@/app/admin/form_submissions/data-table';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import BlogForm from './BlogForm';
import BlogDetails from './BlogDetails';
import DeleteBlogDialog from './DeleteBlogDialog';

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

  const columns = createColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onViewDetails: handleViewDetails,
  });

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
          <DataTable columns={columns} data={blogs as BlogPost[]} isLoading={loading} />
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
