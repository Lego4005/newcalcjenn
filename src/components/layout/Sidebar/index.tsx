'use client'

import { Button, Tooltip } from "@nextui-org/react"
import { ChevronLeft, Plus } from "lucide-react"
import { PropertyContext } from "@/components/PropertyContext"
import { Navigation } from "./Navigation"
import { UserSection } from "./UserSection"
import Logo from "../Logo"

interface SidebarProps {
  isCollapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

export function Sidebar({ isCollapsed, onCollapse }: SidebarProps) {
  const toggleSidebar = () => {
    onCollapse(!isCollapsed)
    localStorage.setItem('sidebarCollapsed', String(!isCollapsed))
  }

  return (
    <aside className={`
      fixed top-0 left-0 z-40 h-screen transition-all duration-300
      bg-[#051B2C] text-white
      ${isCollapsed ? 'w-20' : 'w-72'}
    `}>
      <div className="flex flex-col h-full">
        <div className="relative">
          <Logo isCollapsed={isCollapsed} />
          <Button
            isIconOnly
            variant="light"
            className="text-white/80 data-[hover]:bg-white/10 absolute top-2 right-2"
            radius="full"
            onClick={toggleSidebar}
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        <div className="flex-1 px-2 py-4">
          <Navigation isCollapsed={isCollapsed} />

          <div className="mt-6">
            <div className={`px-3 py-2 flex items-center justify-between ${isCollapsed ? 'hidden' : ''}`}>
              <h3 className="text-xs font-medium text-white/80 uppercase">Properties</h3>
              <Tooltip content="Add Property">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  className="text-white/80 data-[hover]:bg-white/10"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </Tooltip>
            </div>
            <PropertyContext isCompact={isCollapsed} />
          </div>
        </div>

        <div className="p-2 border-t border-white/10">
          <UserSection isCollapsed={isCollapsed} />
        </div>
      </div>
    </aside>
  )
} 