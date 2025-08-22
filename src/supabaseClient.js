// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jzxbukmqdhoznxgbdjjo.supabase.co"; // ganti sesuai project URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // pakai env

export const supabase = createClient(supabaseUrl, supabaseKey);
