'use client';

import { useState } from 'react';
import { useBlogs } from '@/hooks/useBlogs';
import { BlogPost } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Calendar } from 'lucide-react';
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
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BlogsClient() {
  const { blogs, loading, error } = useBlogs();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  const handleDelete = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsDeleteDialogOpen(true);
  };
  
  const handleEdit = (blog: BlogPost) => {
    router.push(`/admin/blogs/${blog.id}/edit`);
  }

  const handleCloseDialogs = () => {
    setIsDeleteDialogOpen(false);
    setSelectedBlog(null);
  };
  
  const onDeleted = () => {
    handleCloseDialogs();
    router.refresh();
  }

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
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div key={blog.id} className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                <Link href={`/admin/blogs/${blog.id}`} className="absolute inset-0 z-10" aria-label={`View ${blog.title}`}>
                  <span className="sr-only">View Details</span>
                </Link>
                <div className="absolute top-4 right-4 z-20">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background" onClick={(e) => e.preventDefault()}>
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                         <DropdownMenuItem onClick={(e) => { e.preventDefault(); router.push(`/admin/blogs/${blog.id}`)}}>View</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.preventDefault(); handleEdit(blog)}}>Edit</DropdownMenuItem>
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
                </div>

                <div className="relative h-48 w-full">
                    <Image
                        src={blog.featured_image || `https://picsum.photos/seed/${blog.id}/600/400`}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                     <div className="absolute bottom-4 left-4">
                        {blog.category && <Badge variant="secondary">{blog.category}</Badge>}
                    </div>
                </div>

                <div className="flex flex-col flex-grow p-6">
                    <h3 className="mb-2 text-xl font-semibold text-primary line-clamp-2">{blog.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-3 flex-grow">{blog.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                        <Badge variant={blog.published ? "default" : "outline"}>
                            {blog.published ? "Published" : "Draft"}
                        </Badge>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(blog.createdAt), 'PP')}</span>
                        </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {isDeleteDialogOpen && (
        <DeleteBlogDialog
            isOpen={isDeleteDialogOpen}
            onClose={handleCloseDialogs}
            blog={selectedBlog}
            onDeleted={onDeleted}
        />
      )}
    </>
  );
}
