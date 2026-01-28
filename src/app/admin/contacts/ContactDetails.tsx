
'use client';

import type { Contact } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, Phone } from 'lucide-react';
import { useState } from 'react';
import DeleteContactDialog from './DeleteContactDialog';
import { useRouter } from 'next/navigation';

interface ContactDetailsProps {
  contact: Contact;
}

export default function ContactDetails({ contact }: ContactDetailsProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!contact) return null;

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const onDeleted = () => {
    setIsDeleteDialogOpen(false);
    router.push('/admin/contacts');
    router.refresh();
  }

  const formatPhoneNumberForWhatsApp = (phone: string) => {
    // Remove all non-digit characters
    return phone.replace(/\D/g, '');
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
                <Link href="/admin/contacts">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Contacts
                </Link>
            </Button>
            <div className="flex gap-2">
                <Button asChild>
                    <Link href={`/admin/contacts/${contact.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </Link>
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>{contact.name}</CardTitle>
                <CardDescription>{contact.email}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-6">
                        {contact.phone && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                                <a 
                                    href={`https://wa.me/${formatPhoneNumberForWhatsApp(contact.phone)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-primary transition-colors hover:underline"
                                >
                                    <Phone className="h-4 w-4" />
                                    {contact.phone}
                                </a>
                            </div>
                        )}
                         {contact.company && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Company</h4>
                                <p className="text-sm text-card-foreground">{contact.company}</p>
                            </div>
                        )}
                    </div>
                </div>

                {contact.message && (
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Message / Notes</h3>
                        <div className="prose prose-sm dark:prose-invert mt-1 text-card-foreground text-sm whitespace-pre-wrap">
                            {contact.message}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
      
      {isDeleteDialogOpen && (
        <DeleteContactDialog
            isOpen={isDeleteDialogOpen}
            onClose={handleCloseDialog}
            contact={contact}
            onDeleted={onDeleted}
        />
      )}
    </>
  );
}
