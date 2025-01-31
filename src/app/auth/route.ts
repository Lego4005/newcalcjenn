import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const email = String(formData.get('email'))
    const password = String(formData.get('password'))
    
    // Create a cookies instance and await it
    const cookieStore = await cookies()
    
    // Create a Supabase client
    const supabase = createRouteHandlerClient({ 
      cookies: () => cookieStore 
    })

    // Get current session to ensure cookies are set
    await supabase.auth.getSession()

    // Attempt to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    // Handle authentication errors
    if (error || !data.session) {
      console.error('Auth error:', {
        message: error?.message,
        status: error?.status,
        name: error?.name
      })
      return NextResponse.json(
        { error: 'Authentication failed. Please check your credentials.' }, 
        { status: 401 }
      )
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.session.user.id)
      .single()

    if (profileError) {
      console.error('Profile error:', profileError.message)
      return NextResponse.json(
        { error: 'Failed to fetch profile' }, 
        { status: 500 }
      )
    }

    // Create response with auth data
    const response = NextResponse.json({
      user: data.session.user,
      profile,
      redirectTo: requestUrl.origin + '/dashboard'
    })

    // Ensure session is properly set
    await supabase.auth.getSession()

    return response
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}