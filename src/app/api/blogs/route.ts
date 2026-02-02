import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const blogData = await request.json();
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([blogData])
      .select()
      .single();
      
    if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
