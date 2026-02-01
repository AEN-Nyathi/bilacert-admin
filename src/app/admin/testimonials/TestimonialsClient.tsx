'use client';

import { useState } from 'react';
import { useTestimonials } from '@/hooks/useTestimonials';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import type { Testimonial } from '@/lib/types';
import DeleteTestimonialDialog from './DeleteTestimonialDialog';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TestimonialEmbed from './TestimonialEmbed';
import TestimonialsLoading from './loading';
import { useRouter } from 'next/navigation';

export default function TestimonialsClient() {
  const { testimonials, loading, error } = useTestimonials();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const router = useRouter();
  
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
      router.refresh();
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
        {loading ? <TestimonialsLoading /> : testimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
                <h3 className="text-lg font-semibold tracking-tight">No Testimonials Yet</h3>
                <p className="text-sm text-muted-foreground">Click "Add Testimonial" to get started.</p>
            </div>
        ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="group relative">
                        <Link href={`/admin/testimonials/${testimonial.id}`} className="absolute inset-0 z-10" aria-label={`View testimonial`}>
                            <span className="sr-only">View Details</span>
                        </Link>
                        <Card className="flex flex-col h-full hover:shadow-lg hover:border-primary/50 transition-all">
                            <CardHeader className="flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-base">Testimonial</CardTitle>
                                    <CardDescription className="text-xs">
                                        Added on {format(new Date(testimonial.createdAt), 'PP')}
                                    </CardDescription>
                                </div>
                                <div className="relative z-20">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.preventDefault()}>
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={(e) => { e.preventDefault(); router.push(`/admin/testimonials/${testimonial.id}`)}}>View</DropdownMenuItem>
                                    <DropdownMenuItem onClick={(e) => { e.preventDefault(); router.push(`/admin/testimonials/${testimonial.id}/edit`)}}>Edit</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                                        onClick={(e) => { e.preventDefault(); handleDelete(testimonial); }}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow p-0 overflow-hidden">
                                <TestimonialEmbed postUrl={testimonial.postUrl} />
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        )}
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
