import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing Supabase credentials for server-side operations.");
    }
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const serviceData = await request.json();
    const { data, error } = await supabase
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
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !serviceRoleKey) {
          throw new Error("Missing Supabase credentials for server-side operations.");
        }
        const supabase = createClient(supabaseUrl, serviceRoleKey);
        
        const { error } = await supabase.from('services').delete().eq('id', params.id);
        if (error) throw error;
        return NextResponse.json({ message: 'Service deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting service:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
