'use client';

import AdminPage from '@/components/admin/AdminPage';
import { useTestimonials } from '@/hooks/useTestimonials';
import type { Testimonial } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
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
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const renderTestimonial = (testimonial: Testimonial, onEdit: (testimonial: Testimonial) => void, onDelete: (testimonial: Testimonial) => void) => {
    const router = useRouter();
    return (
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
                        <DropdownMenuItem onClick={(e) => { e.preventDefault(); onEdit(testimonial)}}>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                            onClick={(e) => { e.preventDefault(); onDelete(testimonial); }}
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
    )
}

export default function TestimonialsClient() {
  return (
    <AdminPage<Testimonial>
      useData={useTestimonials}
      title="Testimonials"
      newItemButtonText="Add Testimonial"
      newItemLink="/admin/testimonials/new"
      renderItem={renderTestimonial}
      DeleteDialog={DeleteTestimonialDialog as any}
    />
  );
}
