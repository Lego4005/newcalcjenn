'use client'

import { Button, Tooltip } from "@nextui-org/react"
import { Home, Building2, Users, FileText, PieChart } from "lucide-react"

interface NavigationProps {
  isCollapsed: boolean
}

export function Navigation({ isCollapsed }: NavigationProps) {
  const items = [
    { icon: Home, label: "Dashboard" },
    { icon: Building2, label: "Properties" },
    { icon: Users, label: "Team" },
    { icon: FileText, label: "Documents" },
    { icon: PieChart, label: "Analytics" },
  ]

  return (
    <div className="flex flex-col items-center gap-1">
      {items.map(({ icon: Icon, label }) => (
        <Tooltip
          key={label}
          content={isCollapsed ? label : null}
          placement="right"
          delay={200}
        >
          <Button
            variant="light"
            className={`w-full text-default-500 data-[hover]:bg-default-100 min-h-[44px] ${
              isCollapsed ? 'justify-center px-0' : 'justify-start px-4'
            }`}
            startContent={!isCollapsed && <Icon className="w-5 h-5 shrink-0" />}
          >
            {isCollapsed ? <Icon className="w-5 h-5" /> : label}
          </Button>
        </Tooltip>
      ))}
    </div>
  )
} 