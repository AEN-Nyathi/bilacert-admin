import { NextRequest, NextResponse } from 'next/server';
import { createAdminApiClient } from '@/lib/supabase/api';

export async function POST(request: NextRequest) {
  const { supabase, error: authError } = await createAdminApiClient();
  if (authError) return authError;

  try {
    const serviceData = await request.json();
    const { data, error } = await supabase!
      .from('services')
      .insert([serviceData])
      .select()
      .single();
      
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
