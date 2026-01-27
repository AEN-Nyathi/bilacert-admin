import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ServicesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Services</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Regulatory Services</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is where the CRUD interface for managing regulatory service metadata will be implemented.</p>
        </CardContent>
      </Card>
    </div>
  );
}
