'use client'

import { Link } from "@nextui-org/react"
import { NavItemProps } from "./types"

/**
 * Navigation item component for the sidebar
 */
export function NavItem({ 
  label, 
  icon, 
  onClick, 
  isActive = false,
  href
}: NavItemProps) {
  const baseClasses = `
    flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
    ${isActive 
      ? 'bg-primary-100 text-primary-700 font-medium' 
      : 'text-gray-700 hover:bg-gray-100'
    }
  `

  // If href is provided, render as a Link
  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        onClick={onClick}
      >
        {icon && <span className="text-lg">{icon}</span>}
        <span className="truncate">{label}</span>
      </Link>
    )
  }

  // Otherwise, render as a button
  return (
    <button
      className={baseClasses}
      onClick={onClick}
      type="button"
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="truncate">{label}</span>
    </button>
  )
}