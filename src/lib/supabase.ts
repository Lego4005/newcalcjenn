import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to handle magic link sign in
export const signInWithMagicLink = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  })
  
  if (error) throw error
}

// Helper function to handle sign up
export const signUpNewUser = async (email: string, userData: {
  full_name: string,
  company: string,
  role: string
}) => {
  const { error } = await supabase.auth.signUp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      data: userData
    }
  })

  if (error) throw error
} 