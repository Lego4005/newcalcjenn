'use client'

import { motion } from "framer-motion"
import { Card, CardBody, CardFooter, Image, Chip } from "@nextui-org/react"
import { Property } from "./types"
import { getStatusBadgeColor } from "./utils"

interface PropertyCardProps {
  property: Property
  isSelected: boolean
  onSelect: (property: Property) => void
  isSidebarView?: boolean
}

export function PropertyCard({ 
  property, 
  isSelected, 
  onSelect,
  isSidebarView = false
}: PropertyCardProps) {
  // If in sidebar view, render a compact card
  if (isSidebarView) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Card 
          isPressable
          onPress={() => onSelect(property)}
          className={`overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ${
            isSelected ? 'border-2 border-primary' : 'border border-gray-200'
          }`}
        >
          <CardBody className="p-2 flex flex-row items-center gap-3">
            <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
              <Image
                alt={property.address}
                className="w-full h-full object-cover"
                src={property.image}
                radius="none"
              />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{property.address}</p>
              <p className="text-xs text-gray-600 truncate">{property.price}</p>
            </div>
            <Chip 
              size="sm" 
              className={`${getStatusBadgeColor(property.status)} flex-shrink-0`}
            >
              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </Chip>
          </CardBody>
        </Card>
      </motion.div>
    )
  }
  
  // Otherwise, render a standard card for the grid view
  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        isPressable
        onPress={() => onSelect(property)}
        className={`overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-[250px] ${
          isSelected ? 'border-2 border-primary' : 'border border-gray-200'
        }`}
      >
        <CardBody className="p-0">
          <div className="relative">
            <Image
              alt={property.address}
              className="w-full h-40 object-cover"
              src={property.image}
              radius="none"
            />
            <div className="absolute top-2 right-2">
              <Chip 
                size="sm" 
                className={`${getStatusBadgeColor(property.status)}`}
              >
                {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
              </Chip>
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex flex-col items-start text-left p-3">
          <div className="w-full">
            <div className="flex justify-between items-start w-full">
              <h3 className="font-semibold text-lg text-gray-800">
                {property.price}
              </h3>
              {property.bedrooms && property.bathrooms && (
                <div className="text-sm text-gray-600">
                  {property.bedrooms} bd | {property.bathrooms} ba
                  {property.squareFeet && ` | ${property.squareFeet.toLocaleString()} sqft`}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1 truncate">{property.address}</p>
            {property.yearBuilt && (
              <p className="text-xs text-gray-500 mt-1">Built in {property.yearBuilt}</p>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}