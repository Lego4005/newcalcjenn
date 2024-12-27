import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    try {
      const { data: { user }, error: signInError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (signInError) throw signInError
      if (!user) throw new Error('No user found')

      // Check if user has a profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      // If no profile exists, create one
      if (!profile && !profileError) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })

        if (insertError) throw insertError
      }

      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(
        new URL('/login?error=auth_callback_error', request.url)
      )
    }
  }

  // No code or other error
  return NextResponse.redirect(
    new URL('/login?error=no_code', request.url)
  )
} 