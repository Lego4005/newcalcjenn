'use client'

import { Button } from "@nextui-org/react"
import { SidebarHeaderProps } from "./types"

/**
 * Header component for the sidebar with toggle functionality
 */
export function SidebarHeader({ isExpanded, onToggle }: SidebarHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${isExpanded ? 'px-4' : 'px-2'} py-4 border-b border-gray-200`}>
      {isExpanded ? (
        <img 
          src="https://rocatitle.com/wp-content/uploads/2022/03/PNG-04_small_v2a.png"
          alt="Roca Title"
          className="h-10 w-auto" // Increased from h-8 to h-10
        />
      ) : (
        <div className="w-full flex justify-center">
          <img 
            src="https://rocatitle.com/wp-content/uploads/2022/03/PNG-04_small_v2a.png"
            alt="Roca Title"
            className="h-10 w-auto" // Increased from h-8 to h-10
          />
        </div>
      )}
      
      <Button
        isIconOnly
        variant="light"
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        onClick={onToggle}
        className="text-gray-500 hover:text-gray-700"
      >
        {isExpanded ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        )}
      </Button>
    </div>
  )
}