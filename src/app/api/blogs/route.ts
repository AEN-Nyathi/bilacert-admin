import { NextRequest, NextResponse } from 'next/server';
import { createAdminApiClient } from '@/lib/supabase/api';

export async function POST(request: NextRequest) {
  const { supabase, error: authError } = await createAdminApiClient();
  if (authError) return authError;

  try {
    const blogData = await request.json();
    const { data, error } = await supabase!
      .from('blog_posts')
      .insert([blogData])
      .select()
      .single();
      
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
