import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    
    // Refresh session if expired - required for Server Components
    await supabase.auth.getSession()
    
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If user is signed in and the current path is /login redirect the user to /dashboard
    if (session && req.nextUrl.pathname === '/login') {
      const redirectUrl = new URL('/dashboard', req.url)
      return NextResponse.redirect(redirectUrl)
    }

    // If user is not signed in and the current path is /dashboard redirect the user to /login
    if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
      const redirectUrl = new URL('/login', req.url)
      return NextResponse.redirect(redirectUrl)
    }

    return res
  } catch (e) {
    // If there's an error, redirect to login
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/login', '/dashboard/:path*']
} 