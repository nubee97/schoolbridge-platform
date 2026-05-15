import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const isDemoMode = import.meta.env.VITE_DEMO_MODE !== 'false' || !supabaseAnonKey || supabaseAnonKey.includes('PASTE_')

export const supabase = !isDemoMode
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null
