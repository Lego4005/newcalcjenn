'use client'

import { usePathname } from "next/navigation"
import { Button } from "@nextui-org/react"
import { Home, Building2, Users, FileText, BarChart } from "lucide-react"
import Link from "next/link"

const routes = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
  },
  {
    label: 'Properties',
    icon: Building2,
    href: '/dashboard/properties',
  },
  {
    label: 'Team',
    icon: Users,
    href: '/dashboard/team',
  },
  {
    label: 'Documents',
    icon: FileText,
    href: '/dashboard/documents',
  },
  {
    label: 'Analytics',
    icon: BarChart,
    href: '/dashboard/analytics',
  },
]

interface NavigationProps {
  isCollapsed: boolean
}

export function Navigation({ isCollapsed }: NavigationProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-2">
      {routes.map((route) => {
        const Icon = route.icon
        const isActive = pathname === route.href

        return (
          <Link href={route.href} key={route.href}>
            <Button
              className={`w-full justify-start gap-2 px-4 ${
                isCollapsed ? 'h-12 justify-center px-0' : 'h-11'
              } ${
                isActive 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              variant="light"
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/60'}`} />
              {!isCollapsed && (
                <span className={`text-sm ${isActive ? 'font-medium' : 'font-normal'}`}>
                  {route.label}
                </span>
              )}
            </Button>
          </Link>
        )
      })}
    </div>
  )
} 