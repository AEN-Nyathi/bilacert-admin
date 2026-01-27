import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl === "" || supabaseUrl === "YOUR_SUPABASE_URL" || !supabaseAnonKey || supabaseAnonKey === "" || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
  throw new Error(
    "Supabase URL and/or anonymous key are not set. Please check your .env file and ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are correct. You can find these in your Supabase project's settings under the 'API' section."
  );
}

export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
);
