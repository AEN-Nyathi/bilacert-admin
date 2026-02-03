
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
import type { Contact } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { deleteContact } from './actions';

interface DeleteContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
  onDeleted?: () => void;
}

export default function DeleteContactDialog({
  isOpen,
  onClose,
  contact,
  onDeleted,
}: DeleteContactDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!contact) return;

    setIsDeleting(true);
    try {
      const result = await deleteContact(contact.id);

      if (result?.error) {
        throw new Error(result.error);
      }

      toast({
        title: 'Contact deleted',
        description: `The contact "${contact.name}" has been successfully deleted.`,
      });
      if (onDeleted) {
        onDeleted();
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error deleting contact',
        description: error.message,
      });
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            contact "{contact?.name}".
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
