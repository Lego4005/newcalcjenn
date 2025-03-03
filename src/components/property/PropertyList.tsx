'use client'

import { Property } from "./types"
import { PropertyCard } from "./PropertyCard"

interface PropertyListProps {
  properties: Property[]
  selectedProperty: Property | null
  onSelectProperty: (property: Property) => void
  isSidebarView?: boolean
}

export function PropertyList({ 
  properties, 
  selectedProperty, 
  onSelectProperty,
  isSidebarView = false
}: PropertyListProps) {
  // If in sidebar view, render a vertical list
  if (isSidebarView) {
    return (
      <div className="space-y-2">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isSelected={selectedProperty?.id === property.id}
            onSelect={onSelectProperty}
            isSidebarView={true}
          />
        ))}
      </div>
    )
  }
  
  // Otherwise, render a grid layout
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          isSelected={selectedProperty?.id === property.id}
          onSelect={onSelectProperty}
          isSidebarView={false}
        />
      ))}
    </div>
  )
}