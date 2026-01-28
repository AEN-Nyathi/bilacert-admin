import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    // THROW instead of RETURN so the return type is always the client
    throw new Error("Missing Supabase environment variables")
  }
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
