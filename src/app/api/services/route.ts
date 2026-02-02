import { NextRequest, NextResponse } from 'next/server';
import { createAdminApiClient } from '@/lib/supabase/api';
import { createClient } from '@/lib/supabase/server';

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

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  try {
    const { data: services, error } = await supabase
      .from('services')
      .select('id, title, slug, href, category, description, short_description, icon, order_index, content, features, requirements, includes, published, featured, created_at, processing_time, pricing, image, thumbnail, seo_title, seo_description, seo_keywords, pricing_plans, process_steps, success_story, updated_at');

    if (error) {
      throw error;
    }

    return NextResponse.json(services, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
