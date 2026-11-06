import { createClient } from '@supabase/supabase-js';

const getEnvVar = (key) => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    if (import.meta.env[key]) return import.meta.env[key];
    if (import.meta.env[`VITE_${key}`]) return import.meta.env[`VITE_${key}`];
  }
  if (typeof process !== 'undefined' && process.env) {
    if (process.env[key]) return process.env[key];
    if (process.env[`VITE_${key}`]) return process.env[`VITE_${key}`];
  }
  return '';
};

const supabaseUrl = getEnvVar('SUPABASE_URL') || 'https://placeholder.supabase.co';
const supabaseAnonKey =
  getEnvVar('SUPABASE_ANON_KEY') ||
  getEnvVar('SUPABASE_PUBLISHABLE_KEY') ||
  'placeholder-anon-key';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://placeholder.supabase.co' &&
    !supabaseUrl.includes('your-project-ref') &&
    !supabaseUrl.includes('your-project-id')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

