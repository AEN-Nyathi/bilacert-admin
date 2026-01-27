import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestimonialsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Testimonials</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is where the management interface for Supabase-hosted social proof will be implemented.</p>
        </CardContent>
      </Card>
    </div>
  );
}
