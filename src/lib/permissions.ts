import type { Database } from '@/types/database'

type UserRole = Database['public']['Tables']['profiles']['Row']['role']

const PERMISSIONS: {
  [K: string]: {
    name: string
    description: string
    roles: UserRole[]
  }
} = {
  // Basic features
  VIEW_CALCULATOR: {
    name: 'view_calculator',
    description: 'View the calculator',
    roles: ['user', 'agent', 'broker']
  },
  SAVE_CALCULATION: {
    name: 'save_calculation',
    description: 'Save property calculations',
    roles: ['user', 'agent', 'broker']
  },
  SHARE_CALCULATION: {
    name: 'share_calculation',
    description: 'Share calculations with others',
    roles: ['agent', 'broker']
  },

  // Advanced features
  BULK_CALCULATOR: {
    name: 'bulk_calculator',
    description: 'Use bulk property calculator',
    roles: ['agent', 'broker']
  },
  EXPORT_COMPARISON: {
    name: 'export_comparison',
    description: 'Export property comparisons',
    roles: ['agent', 'broker']
  },
  VIEW_TRENDS: {
    name: 'view_trends',
    description: 'View market trends and analytics',
    roles: ['agent', 'broker']
  },

  // Admin features
  MANAGE_USERS: {
    name: 'manage_users',
    description: 'Manage user accounts and roles',
    roles: ['broker']
  },
  VIEW_ALL_CALCULATIONS: {
    name: 'view_all_calculations',
    description: 'View all saved calculations',
    roles: ['broker']
  },
  CUSTOMIZE_DEFAULTS: {
    name: 'customize_defaults',
    description: 'Customize default calculator values',
    roles: ['broker']
  }
} as const

export type PermissionName = keyof typeof PERMISSIONS

export function hasPermission(userRole: UserRole | null, permission: PermissionName): boolean {
  if (!userRole) return false
  return PERMISSIONS[permission].roles.includes(userRole)
}

export function getAllowedPermissions(userRole: UserRole | null): PermissionName[] {
  if (!userRole) return []
  return (Object.entries(PERMISSIONS) as [PermissionName, typeof PERMISSIONS[PermissionName]][])
    .filter(([, permission]) => permission.roles.includes(userRole))
    .map(([key]) => key)
}

export function getPermissionDescription(permission: PermissionName): string {
  return PERMISSIONS[permission].description
}

export const Permissions = PERMISSIONS