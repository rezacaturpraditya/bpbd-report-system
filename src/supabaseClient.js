import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jzxbukmqdhoznxgbdjjo.supabase.co"; // URL dari Supabase project
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // gunakan environment variable untuk keamanan

export const supabase = createClient(supabaseUrl, supabaseKey);
