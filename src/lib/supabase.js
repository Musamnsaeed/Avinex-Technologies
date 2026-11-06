import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cddqzpqinavitvztgaxy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkZHF6cHFpbmF2aXR2enRnYXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyODgzMTEsImV4cCI6MjEwODg2NDMxMX0.kOGnNYi5oqbfnoUgVConCRnRnmJq5WmCZ4lLD_r1lrI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
