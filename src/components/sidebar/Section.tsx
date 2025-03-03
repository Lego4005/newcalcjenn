'use client'

import { useState } from "react"
import { SectionProps } from "./types"

/**
 * Collapsible section component for the sidebar
 */
export function Section({ 
  title, 
  children, 
  defaultExpanded = true 
}: SectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="mb-4">
      <button
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        <span>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  )
}