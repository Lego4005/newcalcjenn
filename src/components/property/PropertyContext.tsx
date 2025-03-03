'use client'

import { useState } from "react"
import { Button } from "@nextui-org/react"
import { Property } from "./types"
import { PropertyList } from "./PropertyList"
import { PropertyDetails } from "./PropertyDetails"
import { AddPropertyModal } from "./AddPropertyModal"
import { PropertyExpandedView } from "./PropertyExpandedView"

// Sample property data
const sampleProperties: Property[] = [
  {
    id: '1',
    address: '123 Main St, Austin, TX',
    price: '$450,000',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    status: 'active',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1850,
    yearBuilt: 2015,
    lastTouched: '2025-02-28',
    taxAssessment: 425000,
    zestimate: 455000,
    annualTaxAmount: 8500
  },
  {
    id: '2',
    address: '456 Oak Ave, Austin, TX',
    price: '$550,000',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
    status: 'pending',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2200,
    yearBuilt: 2010,
    lastTouched: '2025-03-01',
    taxAssessment: 530000,
    zestimate: 560000,
    annualTaxAmount: 10600
  },
  {
    id: '3',
    address: '789 Pine Rd, Austin, TX',
    price: '$650,000',
    image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126',
    status: 'closed',
    bedrooms: 5,
    bathrooms: 3.5,
    squareFeet: 2800,
    yearBuilt: 2018,
    lastTouched: '2025-02-25',
    taxAssessment: 625000,
    zestimate: 660000,
    annualTaxAmount: 12500
  },
]

interface PropertyContextProps {
  isCompact?: boolean
  onLoadPropertyToCalculator?: (property: Property) => void
}

export function PropertyContext({ 
  isCompact = false,
  onLoadPropertyToCalculator
}: PropertyContextProps) {
  // State for properties
  const [properties, setProperties] = useState<Property[]>(sampleProperties)
  
  // State for selected property
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // State for expanded view
  const [isExpandedViewOpen, setIsExpandedViewOpen] = useState(false)
  
  // Handle property selection
  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property)
    setIsExpandedViewOpen(true)
  }
  
  // Handle property addition
  const handleAddProperty = (property: Property) => {
    setProperties([...properties, property])
    setSelectedProperty(property)
    setIsExpandedViewOpen(true)
  }
  
  // Handle loading property to calculator
  const handleLoadToCalculator = (property: Property) => {
    if (onLoadPropertyToCalculator) {
      onLoadPropertyToCalculator(property)
      setIsExpandedViewOpen(false)
    }
  }
  
  return (
    <div className="space-y-6">
      {!isCompact && (
        <div className="px-2">
          <h2 className="text-lg font-semibold text-gray-800">Properties</h2>
        </div>
      )}
      
      {/* Property List */}
      <PropertyList
        properties={properties}
        selectedProperty={selectedProperty}
        onSelectProperty={handlePropertySelect}
        isSidebarView={isCompact}
      />
      
      {/* Add Property Button (only in full view) */}
      {!isCompact && (
        <Button
          className="w-full"
          color="primary"
          variant="flat"
          size="md"
          onPress={() => setIsModalOpen(true)}
          startContent={<span className="text-xl">+</span>}
        >
          Add Property
        </Button>
      )}
      
      {/* Property Details (only in full view and when a property is selected) */}
      {selectedProperty && !isCompact && !isExpandedViewOpen && (
        <PropertyDetails 
          property={selectedProperty}
          onLoadToCalculator={onLoadPropertyToCalculator}
        />
      )}
      
      {/* Add Property Modal */}
      <AddPropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProperty={handleAddProperty}
      />
      
      {/* Expanded Property View */}
      <PropertyExpandedView
        property={selectedProperty}
        isOpen={isExpandedViewOpen}
        onClose={() => setIsExpandedViewOpen(false)}
        onLoadToCalculator={handleLoadToCalculator}
      />
    </div>
  )
}