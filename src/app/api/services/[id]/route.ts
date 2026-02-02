import { NextRequest, NextResponse } from 'next/server';
import { createAdminApiClient } from '@/lib/supabase/api';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { supabase, error: authError } = await createAdminApiClient();
  if (authError) return authError;

  try {
    const serviceData = await request.json();
    const { data, error } = await supabase!
      .from('services')
      .update(serviceData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { supabase, error: authError } = await createAdminApiClient();
    if (authError) return authError;

    try {
        const { error } = await supabase!.from('services').delete().eq('id', params.id);
        if (error) throw error;
        return NextResponse.json({ message: 'Service deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting service:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
