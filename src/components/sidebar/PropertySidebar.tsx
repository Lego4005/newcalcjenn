'use client'

import { useState } from "react"
import { Button } from "@nextui-org/react"
import { Property } from "../property/types"
import { PropertySidebarProps } from "./types"
import { SidebarHeader } from "./SidebarHeader"
import { Section } from "./Section"
import { NavItem } from "./NavItem"

/**
 * Sidebar component for displaying properties and navigation
 */
export function PropertySidebar({
  onSelectProperty,
  selectedProperty,
  properties,
  isExpanded,
  onToggleExpanded
}: PropertySidebarProps) {
  const [activeSection, setActiveSection] = useState("dashboard")

  // Handle property selection
  const handlePropertySelect = (property: Property) => {
    onSelectProperty(property)
  }

  return (
    <aside 
      className={`
        fixed left-0 top-0 h-screen bg-white border-r border-gray-200
        transition-all duration-200 z-10
        ${isExpanded ? 'w-80' : 'w-[70px]'}
      `}
    >
      {/* Sidebar Header */}
      <SidebarHeader 
        isExpanded={isExpanded} 
        onToggle={onToggleExpanded} 
      />
      
      {/* Main Navigation */}
      <div className={`flex flex-col ${isExpanded ? 'px-3' : 'px-2'} py-4`}>
        <NavItem
          label="Dashboard"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
          }
          onClick={() => setActiveSection("dashboard")}
          isActive={activeSection === "dashboard"}
          href="/"
        />
        
        <NavItem
          label="Properties"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          }
          onClick={() => setActiveSection("properties")}
          isActive={activeSection === "properties"}
          href="/properties"
        />
        
        <NavItem
          label="Calculators"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
              <line x1="12" y1="10" x2="12" y2="16" />
              <line x1="9" y1="13" x2="15" y2="13" />
            </svg>
          }
          onClick={() => setActiveSection("calculators")}
          isActive={activeSection === "calculators"}
        />
        
        <NavItem
          label="Settings"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          }
          onClick={() => setActiveSection("settings")}
          isActive={activeSection === "settings"}
        />
      </div>
      
      {/* Divider */}
      <div className="px-3 py-2">
        <div className="border-t border-gray-200"></div>
      </div>
      
      {/* Properties Section - Always visible when expanded */}
      {isExpanded && (
        <div className="px-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <Section title="Recent Properties" defaultExpanded={true}>
            <div className="space-y-2">
              {properties.map((property) => (
                <div 
                  key={property.id}
                  className={`
                    flex items-center p-2 rounded-md cursor-pointer
                    ${selectedProperty?.id === property.id 
                      ? 'bg-primary-50 border border-primary-200' 
                      : 'hover:bg-gray-50 border border-transparent'
                    }
                  `}
                  onClick={() => handlePropertySelect(property)}
                >
                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={property.image} 
                      alt={property.address}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-grow min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {property.address.split(',')[0]}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {property.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button
              className="w-full mt-2"
              color="primary"
              variant="flat"
              size="sm"
              onClick={() => {}}
            >
              Add Property
            </Button>
          </Section>
          
          <Section title="Saved Searches" defaultExpanded={false}>
            <div className="text-sm text-gray-500 italic p-2">
              No saved searches yet
            </div>
          </Section>
        </div>
      )}
      
      {/* Compact View - Only Icons - Always visible when collapsed */}
      {!isExpanded && (
        <div className="flex flex-col items-center mt-4 space-y-4">
          {properties.slice(0, 3).map((property) => (
            <div 
              key={property.id}
              className={`
                w-10 h-10 rounded-full overflow-hidden cursor-pointer
                ${selectedProperty?.id === property.id 
                  ? 'ring-2 ring-primary ring-offset-2' 
                  : 'hover:opacity-80'
                }
              `}
              onClick={() => handlePropertySelect(property)}
            >
              <img 
                src={property.image} 
                alt={property.address}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
          {properties.length > 3 && (
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
              +{properties.length - 3}
            </div>
          )}
        </div>
      )}
    </aside>
  )
}