'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Testimonial } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface DeleteTestimonialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: Testimonial | null;
  onDeleted?: () => void;
}

export default function DeleteTestimonialDialog({
  isOpen,
  onClose,
  testimonial,
  onDeleted,
}: DeleteTestimonialDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!testimonial) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete testimonial.');
      }

      toast({
        title: 'Testimonial deleted',
        description: 'The testimonial has been successfully deleted.',
      });
      if (onDeleted) {
        onDeleted();
      } else {
        onClose();
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error deleting testimonial',
        description: error.message,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the testimonial.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} onClick={onClose}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
