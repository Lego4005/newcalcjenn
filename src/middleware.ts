import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
        
    const {
      data: { session },
    } = await supabase.auth.getSession() // This call also refreshes the session

    // Allow test calculator route without authentication
    if (req.nextUrl.pathname === '/test/calculator') {
      return res;
    }

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
  } catch (error: unknown) {
    // Log the error for debugging
    console.error('Auth middleware error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/login', '/dashboard/:path*', '/test/calculator']
}