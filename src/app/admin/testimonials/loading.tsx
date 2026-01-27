
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function TestimonialsLoading() {
    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button disabled>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Testimonial
                </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-6">
                            <Skeleton className="h-64 w-full" />
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Skeleton className="h-9 w-12" />
                            <Skeleton className="h-9 w-12" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
