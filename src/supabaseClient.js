// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Works for both Vite and Create React App
const supabaseUrl =
  import.meta.env.VITE_REACT_APP_SUPABASE_URL ||
  process.env.REACT_APP_SUPABASE_URL ||
  'https://urnseqmobwestseziyyg.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY ||
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVybnNlcW1vYndlc3RzZXppeXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2Nzk2MzIsImV4cCI6MjA3MDI1NTYzMn0.Kapmdd4a8zx14J-mfywRa6-cL6W_O_Xr-RBViQFUyTw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
