import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing Supabase credentials for server-side operations.");
    }
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const blogData = await request.json();
    const { data, error } = await supabase
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
