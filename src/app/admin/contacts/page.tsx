import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Contacts</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is where the contact management interface will be implemented.</p>
        </CardContent>
      </Card>
    </div>
  );
}
