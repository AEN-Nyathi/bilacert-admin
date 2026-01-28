
'use client';

import { useState } from 'react';
import { useTestimonials } from '@/hooks/useTestimonials';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, MessageSquare, MoreHorizontal } from 'lucide-react';
import type { Testimonial } from '@/lib/types';
import DeleteTestimonialDialog from './DeleteTestimonialDialog';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function TestimonialsClient() {
  const { testimonials, loading, error } = useTestimonials();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const handleDelete = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setIsDeleteDialogOpen(false);
    setSelectedTestimonial(null);
  };
  
  const onDeleted = () => {
    handleCloseDialogs();
  }

  if (error) {
    return <div className="text-destructive">Error loading testimonials: {error.message}</div>;
  }
  
  return (
    <>
      <div className="flex justify-end">
          <Button asChild>
            <Link href="/admin/testimonials/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Testimonial
            </Link>
          </Button>
      </div>
      
      <div className="mt-6">
        {testimonials.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
                <h3 className="text-lg font-semibold tracking-tight">No Testimonials Yet</h3>
                <p className="text-sm text-muted-foreground">Click "Add Testimonial" to get started.</p>
            </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
            <Link href={`/admin/testimonials/${testimonial.id}`} key={testimonial.id} className="group">
                <Card className="flex flex-col h-full hover:shadow-lg hover:border-primary/50 transition-all">
                    <CardHeader>
                        <CardTitle className="truncate text-base">{testimonial.postUrl}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-center justify-center p-6 bg-muted/20">
                        <div className='text-center'>
                            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-4 text-xs text-muted-foreground">
                                Added on {format(new Date(testimonial.createdAt), 'PP')}
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
                              <Link href={`/admin/testimonials/${testimonial.id}/edit`} onClick={(e) => e.stopPropagation()}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDelete(testimonial);
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
      </div>

      {isDeleteDialogOpen && (
        <DeleteTestimonialDialog
            isOpen={isDeleteDialogOpen}
            onClose={handleCloseDialogs}
            testimonial={selectedTestimonial}
            onDeleted={onDeleted}
        />
      )}
    </>
  );
}
