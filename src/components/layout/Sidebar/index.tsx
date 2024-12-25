'use client'

import { Button, Tooltip } from "@nextui-org/react"
import { ChevronLeft, Plus } from "lucide-react"
import Image from "next/image"
import { PropertyContext } from "@/components/PropertyContext"
import { Navigation } from "./Navigation"
import { UserSection } from "./UserSection"

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
    <aside className={`fixed top-0 left-0 h-screen bg-background/80 dark:bg-black/90 backdrop-blur-xl border-r border-divider transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}>
      <div className="flex flex-col h-full">
        <div className="relative">
          <Image
            src={isCollapsed ? "/roca-logo-small.png" : "/roca-logo.png"}
            alt="Roca Logo"
            width={isCollapsed ? 48 : 160}
            height={isCollapsed ? 48 : 64}
            className="dark:invert"
            priority
          />
          <Button
            isIconOnly
            variant="light"
            className="text-default-500 data-[hover]:bg-default-100 absolute top-2 right-2"
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
              <h3 className="text-xs font-medium text-default-500 uppercase">Properties</h3>
              <Tooltip content="Add Property">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  className="text-default-500 data-[hover]:bg-default-100"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </Tooltip>
            </div>
            <PropertyContext isCompact={isCollapsed} />
          </div>
        </div>

        <div className="p-2 border-t border-divider">
          <UserSection isCollapsed={isCollapsed} />
        </div>
      </div>
    </aside>
  )
} 