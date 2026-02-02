import { NextRequest, NextResponse } from 'next/server';
import { createAdminApiClient } from '@/lib/supabase/api';

export async function POST(request: NextRequest) {
  const { supabase, error: authError } = await createAdminApiClient();
  if (authError) return authError;
  
  try {
    const testimonialData = await request.json();
    const { data, error } = await supabase!
      .from('testimonials')
      .insert([testimonialData])
      .select()
      .single();
      
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
