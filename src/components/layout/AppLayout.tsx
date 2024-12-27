'use client'

import { CommandMenu } from "@/components/RealEstateCalculator/CommandMenu"
import { Sidebar } from "./Sidebar/index"
import { useState, useEffect } from "react"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState !== null) {
      setIsCollapsed(savedState === 'true')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-content1">
      <Sidebar isCollapsed={isCollapsed} onCollapse={setIsCollapsed} />
      <main className={`transition-all duration-300 ${isCollapsed ? 'pl-20' : 'pl-72'} pr-6`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-lg mt-2">
              <CommandMenu onAction={(action) => console.log(action)} />
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  )
} 