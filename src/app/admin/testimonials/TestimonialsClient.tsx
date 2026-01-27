
'use client';

import { useState } from 'react';
import { useTestimonials } from '@/hooks/useTestimonials';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import type { Testimonial } from '@/lib/types';
import TestimonialForm from './TestimonialForm';
import DeleteTestimonialDialog from './DeleteTestimonialDialog';
import TestimonialEmbed from './TestimonialEmbed';

export default function TestimonialsClient() {
  const { testimonials, loading, error } = useTestimonials();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const handleAdd = () => {
    setSelectedTestimonial(null);
    setIsFormOpen(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsFormOpen(true);
  };

  const handleDelete = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setIsFormOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedTestimonial(null);
  };

  if (error) {
    return <div className="text-destructive">Error loading testimonials: {error.message}</div>;
  }
  
  return (
    <>
      <div className="flex justify-end">
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Testimonial
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
            <Card key={testimonial.id}>
                <CardContent className="p-0">
                <TestimonialEmbed postUrl={testimonial.postUrl} />
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t p-4">
                <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>
                    <Edit className="h-3 w-3" />
                    <span className="sr-only">Edit</span>
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(testimonial)}>
                    <Trash2 className="h-3 w-3" />
                    <span className="sr-only">Delete</span>
                </Button>
                </CardFooter>
            </Card>
            ))}
        </div>
      </div>
      
      {isFormOpen && (
        <TestimonialForm
          isOpen={isFormOpen}
          onClose={handleCloseDialogs}
          testimonial={selectedTestimonial}
        />
      )}

      {isDeleteDialogOpen && (
        <DeleteTestimonialDialog
            isOpen={isDeleteDialogOpen}
            onClose={handleCloseDialogs}
            testimonial={selectedTestimonial}
        />
      )}
    </>
  );
}
