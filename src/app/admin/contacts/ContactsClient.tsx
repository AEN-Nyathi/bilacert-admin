'use client';

import { useState } from 'react';
import { useContacts } from '@/hooks/useContacts';
import { Contact } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Mail, Phone } from 'lucide-react';
import DeleteContactDialog from './DeleteContactDialog';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ContactsLoading from './loading';

export default function ContactsClient() {
  const { contacts, loading, error } = useContacts();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleDelete = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDeleteDialogOpen(true);
  };
  
  const handleEdit = (contact: Contact) => {
    router.push(`/admin/contacts/${contact.id}/edit`);
  };

  const handleViewDetails = (contact: Contact) => {
    router.push(`/admin/contacts/${contact.id}`);
  }

  const handleCloseDialogs = () => {
    setIsDeleteDialogOpen(false);
    setSelectedContact(null);
  };
  
  const onDeleted = () => {
      handleCloseDialogs();
      router.refresh();
  }

  if (error) {
    return <div className="text-destructive">Error loading contacts: {error.message}</div>;
  }

  return (
    <>
      <div>
        {loading ? <ContactsLoading /> : contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
              <h3 className="text-lg font-semibold tracking-tight">No Contacts Yet</h3>
              <p className="text-sm text-muted-foreground">Click "Add Contact" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contacts.map((contact) => (
              <div key={contact.id} className="group relative">
                <Link href={`/admin/contacts/${contact.id}`} className="absolute inset-0 z-10" aria-label={`View ${contact.name}`}>
                    <span className="sr-only">View Details</span>
                </Link>
                <Card className="flex h-full flex-col transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/50">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-lg line-clamp-1">{contact.name}</CardTitle>
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
                                        <DropdownMenuItem onClick={(e) => { e.preventDefault(); handleViewDetails(contact); }}>View</DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => { e.preventDefault(); handleEdit(contact); }}>Edit</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                                            onClick={(e) => { e.preventDefault(); handleDelete(contact); }}
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                      <CardDescription>{contact.company || 'No company'}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 flex-grow">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${contact.email}`} onClick={(e) => e.stopPropagation()} className="truncate hover:underline">{contact.email}</a>
                      </div>
                      {contact.phone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{contact.phone}</span>
                        </div>
                      )}
                    </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {isDeleteDialogOpen && (
        <DeleteContactDialog
          isOpen={isDeleteDialogOpen}
          onClose={handleCloseDialogs}
          contact={selectedContact}
          onDeleted={onDeleted}
        />
      )}
    </>
  );
}
