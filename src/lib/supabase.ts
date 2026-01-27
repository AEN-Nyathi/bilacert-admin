import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isValidSupabaseUrl = (url?: string) => {
    if (!url) return false;
    try {
        const u = new URL(url);
        return u.protocol === 'http:' || u.protocol === 'https:';
    } catch (e) {
        return false;
    }
}

export const isSupabaseConfigured = 
    isValidSupabaseUrl(supabaseUrl) && 
    !!supabaseAnonKey && 
    supabaseAnonKey !== "YOUR_SUPABASE_ANON_KEY";

// We only want to initialize the client if the config is valid.
// Otherwise, we'll export a dummy object to prevent build errors,
// and our configuration check will prevent it from being used at runtime.
export const supabase = isSupabaseConfigured 
    ? createBrowserClient(supabaseUrl!, supabaseAnonKey!)
    : {} as ReturnType<typeof createBrowserClient>;

if (!isSupabaseConfigured) {
    console.error(
      "Supabase is not configured. Please check your .env file and ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set correctly."
    );
}
