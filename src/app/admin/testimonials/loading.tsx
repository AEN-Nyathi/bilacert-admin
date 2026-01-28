
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
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
                         <CardHeader>
                            <Skeleton className="h-5 w-full" />
                        </CardHeader>
                        <CardContent className="flex items-center justify-center p-6">
                           <div className="space-y-4 text-center">
                                <Skeleton className="mx-auto h-12 w-12 rounded-full" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Skeleton className="h-8 w-8" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
