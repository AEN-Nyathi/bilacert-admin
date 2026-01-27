
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
                <div className="rounded-md border">
                    <div className="w-full text-sm">
                        <div className="[&_tr]:border-b">
                            <div className="h-12 grid grid-cols-5 items-center gap-4 px-4 text-left align-middle font-medium text-muted-foreground">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-4 w-1/3" />
                            </div>
                        </div>
                        <div className="[&_tr:last-child]:border-0">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="border-b transition-colors grid grid-cols-5 items-center gap-4 p-4 align-middle">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-5 w-1/2" />
                                    <Skeleton className="h-5 w-1/2" />
                                    <Skeleton className="h-5 w-1/2" />
                                    <div className="flex justify-end">
                                        <Skeleton className="h-5 w-5" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
