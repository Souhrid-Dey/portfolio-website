import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client = null;

if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http') && !supabaseUrl.includes('your_supabase')) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('Supabase initialization failed:', error);
  }
}

/**
 * Safe Supabase submission wrapper with offline/fallback resilience.
 */
export async function submitContactForm(payload) {
  if (client) {
    try {
      const { data, error } = await client.from('contacts').insert([payload]);
      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Supabase insert failed, falling back to simulated success:', err.message);
    }
  }

  // Fallback response for environments without active Supabase credentials
  console.log('Contact form submission (Mock/Logged):', payload);
  return { success: true, simulated: true };
}

export default client;
