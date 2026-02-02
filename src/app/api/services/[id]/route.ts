import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const serviceData = await request.json();
    const { data, error } = await supabase
      .from('services')
      .update(serviceData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
    }
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { error } = await supabase.from('services').delete().eq('id', params.id);
        if (error) {
            console.error('Supabase error:', error);
            throw new Error(error.message);
        }
        return NextResponse.json({ message: 'Service deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
