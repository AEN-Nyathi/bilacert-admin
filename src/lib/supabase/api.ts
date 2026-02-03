import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// This function creates a Supabase client for use in API routes
// and ensures that the user is an authenticated admin.
export async function createAdminApiClient() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return {
      supabase: null,
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }

  // Check if user is admin
  const { data: userProfile, error: profileError } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()
  
  if (profileError || userProfile?.role !== 'admin') {
     return {
      supabase: null,
      error: NextResponse.json({ error: 'Forbidden: requires admin privileges' }, { status: 403 }),
    }
  }

  return { supabase, error: null }
}
