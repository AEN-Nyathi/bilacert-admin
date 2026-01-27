import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Blogs</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is where the content management for MDX-based blog posts will be implemented.</p>
        </CardContent>
      </Card>
    </div>
  );
}
