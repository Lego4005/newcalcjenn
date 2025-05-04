'use client'

import { Button, Tooltip } from "@heroui/react";
import { ChevronLeft, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link";
import { PropertyContext } from "@/components/PropertyContext"
import { Navigation } from "./Navigation"
import { UserSection } from "./UserSection"

interface SidebarProps {
  isCollapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

export function Sidebar({ isCollapsed, onCollapse }: SidebarProps) {
  const toggleSidebarLocal = () => {
    onCollapse(!isCollapsed)
    localStorage.setItem('sidebarCollapsed', String(!isCollapsed))
  }

  const sidebarClasses = `fixed top-0 left-0 h-screen bg-background/80 dark:bg-[#1a1a1a] backdrop-blur-xl border-r border-divider transition-all duration-300 shadow-lg z-40 rounded-tr-2xl rounded-br-2xl`;

  const cleanedSidebarClasses = `h-full bg-background/80 dark:bg-[#1a1a1a] backdrop-blur-xl border-r border-divider transition-all duration-300 shadow-lg z-40 rounded-tr-2xl rounded-br-2xl overflow-hidden`;

  return (
    <aside className={cleanedSidebarClasses}>
      <div className="flex flex-col h-full">
        <div className="relative px-2 py-4">
          <Image
            src={isCollapsed ? "/roca-logo-small.png" : "/roca-logo.png"}
            alt="Roca Logo"
            width={isCollapsed ? 48 : 160}
            height={isCollapsed ? 48 : 64}
            className="dark:invert mx-auto"
            priority
          />
          <Button
            isIconOnly
            variant="light"
            className="text-default-500 data-[hover]:bg-default-100 absolute top-1/2 -translate-y-1/2 right-2"
            radius="full"
            onClick={toggleSidebarLocal}
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>

        <div className="flex-1 px-2 py-4 overflow-y-auto">
          <Navigation isCollapsed={isCollapsed} />

          <div className="mt-6">
            <div
              className={`px-3 py-2 flex items-center justify-between ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              <h3 className="text-xs font-medium text-default-500 uppercase">
                Properties
              </h3>
              <Tooltip content="Add Property">
                <Link href="/wizard-selector">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    className="text-default-500 data-[hover]:bg-default-100"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>
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
  );
} 