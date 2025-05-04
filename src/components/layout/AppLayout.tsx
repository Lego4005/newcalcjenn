'use client'

// import { CommandMenu } from "@/components/RealEstateCalculator/CommandMenu"
import { Sidebar } from "./Sidebar"
import { useState, useEffect } from "react"
// import { Footer } from './Footer'
import { Container } from './Container'
import ChatInterface from '../IrisAssistant/ChatInterface'
import Header from "../layout/Header"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  // Default to collapsed state initially or based on saved state
  const [isCollapsed, setIsCollapsed] = useState(true); 

  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed')
    // Initialize state from localStorage only on the client
    if (savedState !== null) {
      setIsCollapsed(savedState === 'true')
    } else {
      // Default to collapsed if no saved state
      setIsCollapsed(true);
    }
  }, [])

  // Calculate sidebar width based on state
  const sidebarWidth = isCollapsed ? '5rem' : '16rem'; // 80px (w-20) or 256px (w-64)

  return (
    <div
      className="grid h-screen"
      style={{
        // Three rows: header 60px, content 1fr, chat auto; two columns: sidebar var, rest 1fr
        gridTemplateRows: "60px 1fr auto",
        // Use the dynamic sidebarWidth variable here
        gridTemplateColumns: `${sidebarWidth} 1fr`,
        // Add transition for smoother width changes
        transition: 'grid-template-columns 0.3s ease-in-out' 
      }}
    >
      {/* Sidebar spans all three rows */}
      <aside className="row-span-3 col-start-1 overflow-hidden"> 
        {/* Pass state and handler to Sidebar */}
        <Sidebar isCollapsed={isCollapsed} onCollapse={setIsCollapsed} />
      </aside>

      {/* Header spans both columns */}
      <header className="col-span-2 row-start-1 sticky top-0 z-40"> 
        <Header />
      </header>

      {/* Main content starts after sidebar */}
      <main className="col-start-2 row-start-2 overflow-y-auto p-6"> 
        <Container>{children}</Container>
      </main>

      {/* Chat bar starts after sidebar */}
      <div className="col-start-2 row-start-3 z-40"> 
        <ChatInterface />
      </div>
    </div>
  )
} 