
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function BlogsLoading() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Blog Posts</CardTitle>
                <Button disabled>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Post
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-5 w-1/3" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-5 w-1/2" />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Skeleton className="h-8 w-8" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
