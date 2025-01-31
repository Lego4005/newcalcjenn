'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { hasPermission, type PermissionName } from '@/lib/permissions'
import type { Database } from '@/types/database'

type UserRole = Database['public']['Tables']['profiles']['Row']['role']

export function usePermissions() {
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    async function loadUserRole() {
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          // Get user's role from profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single()
          
          setUserRole(profile?.role ?? null)
        }
      } catch (error) {
        console.error('Error loading user role:', error)
        setUserRole(null)
      } finally {
        setLoading(false)
      }
    }

    loadUserRole()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()
        
        setUserRole(profile?.role ?? null)
      } else if (event === 'SIGNED_OUT') {
        setUserRole(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const can = (permission: PermissionName) => {
    return hasPermission(userRole, permission)
  }

  return {
    userRole,
    loading,
    can
  }
}