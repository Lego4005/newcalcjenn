'use client'

import { Button, Tooltip } from "@heroui/react"
import { Home, Building2, Users, FileText, PieChart } from "lucide-react"
import Link from 'next/link'

interface NavigationProps {
  isCollapsed: boolean
}

export function Navigation({ isCollapsed }: NavigationProps) {
  const items = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Building2, label: "Properties", href: "/properties" },
    { icon: Users, label: "Team", href: "/team" },
    { icon: FileText, label: "Documents", href: "/documents" },
    { icon: PieChart, label: "Analytics", href: "/analytics" },
  ]

  return (
    <div className="flex flex-col items-center gap-1">
      {items.map(({ icon: Icon, label, href }) => (
        <Tooltip
          key={label}
          content={isCollapsed ? label : null}
          placement="right"
          delay={200}
        >
          <Link href={href} passHref legacyBehavior>
            <Button
              as="a"
              variant="light"
              className={`w-full text-default-500 data-[hover]:bg-default-100 min-h-[44px] ${
                isCollapsed ? 'justify-center px-0' : 'justify-start px-4'
              }`}
              startContent={!isCollapsed && <Icon className="w-5 h-5 shrink-0" />}
            >
              {isCollapsed ? <Icon className="w-5 h-5" /> : label}
            </Button>
          </Link>
        </Tooltip>
      ))}
    </div>
  )
} 