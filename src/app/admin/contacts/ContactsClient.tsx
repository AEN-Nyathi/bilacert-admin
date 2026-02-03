'use client';

import AdminPage from '@/components/admin/AdminPage';
import { useContacts } from '@/hooks/useContacts';
import type { Contact } from '@/lib/types';
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
import { format } from 'date-fns';

const renderContact = (contact: Contact, onEdit: (contact: Contact) => void, onDelete: (contact: Contact) => void) => {
    const router = useRouter();
    return (
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
                                    <DropdownMenuItem onClick={(e) => { e.preventDefault(); router.push(`/admin/contacts/${contact.id}`); }}>View</DropdownMenuItem>
                                    <DropdownMenuItem onClick={(e) => { e.preventDefault(); onEdit(contact); }}>Edit</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                                        onClick={(e) => { e.preventDefault(); onDelete(contact); }}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                  <CardDescription>{contact.service || `Submitted on ${format(new Date(contact.submitted_at), 'PP')}`}</CardDescription>
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
    )
}

export default function ContactsClient() {
  return (
    <AdminPage<Contact>
      useData={useContacts}
      title="Contacts"
      newItemButtonText="Add Contact"
      newItemLink="/admin/contacts/new"
      renderItem={renderContact}
      DeleteDialog={DeleteContactDialog as any}
    />
  );
}
