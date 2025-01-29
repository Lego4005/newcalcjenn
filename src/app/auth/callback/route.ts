import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { SupabaseClient, User } from '@supabase/supabase-js'

async function createUserProfile(
  supabase: SupabaseClient,
  user: User
) {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Only create profile if it doesn't exist
  if (!profile && !profileError) {
    const userRole = user.user_metadata?.role ?? 'agent'
    
    if (!['agent', 'broker'].includes(userRole)) {
      throw new Error('Invalid role specified')
    }

    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email ?? '',
        role: userRole,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (insertError) {
      console.error('Profile creation error:', insertError)
      throw new Error('Failed to create user profile')
    }
  }
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(
      new URL('/login?error=no_code', request.url)
    )
  }

  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    const { data: { user }, error: signInError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (signInError) throw signInError
    if (!user) throw new Error('No user found')

    await createUserProfile(supabase, user)
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(
      new URL('/login?error=auth_callback_error', request.url)
    )
  }
}