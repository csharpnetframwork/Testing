// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Use only env vars — no hardcoding
const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Check your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
