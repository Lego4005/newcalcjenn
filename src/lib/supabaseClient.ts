import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iwoddeupzuadnbaydkpv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3b2RkZXVwenVhZG5iYXlka3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMTI3ODcsImV4cCI6MjA1MzY4ODc4N30.3s0gU3hSiv5POxIrSdKiZ2j9dF-62lvVXtrtmN5CTIM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export { supabaseUrl, supabaseAnonKey }