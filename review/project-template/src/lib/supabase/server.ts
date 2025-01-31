import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Create a server-side Supabase client
export function createClient() {
  return createServerComponentClient({
    cookies,
  })
}

// Helper to get auth session on server side
export async function getSession() {
  const supabase = createClient()
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}