
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import type { Service } from '@/lib/types';
import { format } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ServiceDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export default function ServiceDetails({
  isOpen,
  onClose,
  service,
}: ServiceDetailsProps) {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{service.title}</DialogTitle>
          <DialogDescription>{service.category}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6 p-1">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
              <Badge variant={service.published ? 'default' : 'secondary'}>
                {service.published ? 'Published' : 'Draft'}
              </Badge>
            </div>
            {service.description && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                <p className="text-sm text-card-foreground">{service.description}</p>
              </div>
            )}
            {service.content && (
              <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Content</h4>
                  <div className="prose prose-sm dark:prose-invert mt-1 text-card-foreground text-sm whitespace-pre-wrap">
                      {service.content}
                  </div>
              </div>
            )}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Created At</h4>
              <p className="text-sm text-card-foreground">{format(new Date(service.createdAt), 'PPpp')}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
