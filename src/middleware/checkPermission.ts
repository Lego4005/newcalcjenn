import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { hasPermission } from '@/lib/permissions'
import type { PermissionName } from '@/lib/permissions'
import type { Database } from '@/types/database'

export async function checkPermission(
  request: NextRequest,
  permission: PermissionName
) {
  try {
    // Create supabase client
    const supabase = createMiddlewareClient<Database>({ req: request, res: NextResponse.next() })

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401 }
      )
    }

    // Get user's role from profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!profile) {
      return new NextResponse(
        JSON.stringify({ error: 'User profile not found' }),
        { status: 404 }
      )
    }

    // Check if user has required permission
    if (!hasPermission(profile.role, permission)) {
      return new NextResponse(
        JSON.stringify({ error: 'Permission denied' }),
        { status: 403 }
      )
    }

    // User has permission, continue
    return NextResponse.next()
  } catch (error) {
    console.error('Permission check error:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    )
  }
}

// Helper to protect API routes
export function withPermission(
  handler: (request: NextRequest) => Promise<NextResponse> | NextResponse,
  permission: PermissionName
) {
  return async function(request: NextRequest) {
    const permissionCheck = await checkPermission(request, permission)
    if (permissionCheck.status !== 200) {
      return permissionCheck
    }
    return handler(request)
  }
}

// Helper to protect pages
export function withPagePermission(permission: PermissionName) {
  return async function(request: NextRequest) {
    const permissionCheck = await checkPermission(request, permission)
    if (permissionCheck.status !== 200) {
      // Redirect to login or error page
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }
}