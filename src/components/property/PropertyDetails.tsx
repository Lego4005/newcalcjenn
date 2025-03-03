'use client'

import { useState } from "react"
import { Button, Chip, Divider, Image, Spinner } from "@nextui-org/react"
import { Property } from "./types"
import { formatCurrency, formatDate, getStatusBadgeColor, isCalculationField } from "./utils"

interface PropertyDetailsProps {
  property: Property
  onLoadToCalculator?: (property: Property) => void
}

export function PropertyDetails({ 
  property,
  onLoadToCalculator
}: PropertyDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLoading] = useState(false)
  
  // Get property images
  const propertyImages = property.photos 
    ? property.photos.map(photo => photo.href) 
    : [property.image]
  
  // Handle image selection
  const handleSelectImage = (index: number) => {
    setSelectedImageIndex(index)
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">{property.address}</h3>
        <div className="flex items-center mt-1">
          <span className={`text-xl font-bold mr-3 ${isCalculationField('price') ? 'text-primary-600' : 'text-gray-900'}`}>
            {property.price}
          </span>
          <Chip 
            size="sm" 
            className={`${getStatusBadgeColor(property.status)}`}
          >
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </Chip>
          {property.lastTouched && (
            <span className="ml-auto text-xs text-gray-500">
              Last updated: {formatDate(property.lastTouched)}
            </span>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className="p-4 space-y-4">
          <Spinner label="Loading property data..." />
        </div>
      ) : (
        <div>
          {/* Main Image Gallery */}
          <div className="relative">
            {propertyImages.length > 0 && (
              <div className="w-full h-[400px] bg-gray-100">
                <Image
                  alt="Property image"
                  className="w-full h-full object-cover"
                  src={propertyImages[selectedImageIndex]}
                  radius="none"
                />
              </div>
            )}
            
            {/* Image Navigation Arrows */}
            {propertyImages.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <Button
                  isIconOnly
                  variant="flat"
                  className="bg-white/80 backdrop-blur-md"
                  onPress={() => handleSelectImage(
                    (selectedImageIndex - 1 + propertyImages.length) % propertyImages.length
                  )}
                >
                  ←
                </Button>
                <Button
                  isIconOnly
                  variant="flat"
                  className="bg-white/80 backdrop-blur-md"
                  onPress={() => handleSelectImage(
                    (selectedImageIndex + 1) % propertyImages.length
                  )}
                >
                  →
                </Button>
              </div>
            )}
          </div>
          
          {/* Property Details */}
          <div className="p-6">
            {/* Key Facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {property.bedrooms && (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Beds</span>
                  <span className="text-lg font-semibold">{property.bedrooms}</span>
                </div>
              )}
              
              {property.bathrooms && (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Baths</span>
                  <span className="text-lg font-semibold">{property.bathrooms}</span>
                </div>
              )}
              
              {property.squareFeet && (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Square Feet</span>
                  <span className="text-lg font-semibold">{property.squareFeet.toLocaleString()}</span>
                </div>
              )}
              
              {property.yearBuilt && (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Year Built</span>
                  <span className="text-lg font-semibold">{property.yearBuilt}</span>
                </div>
              )}
            </div>
            
            <Divider className="my-4" />
            
            {/* Financial Information */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-semibold">Financial Information</h4>
                {onLoadToCalculator && (
                  <Button 
                    color="primary"
                    variant="flat"
                    onPress={() => onLoadToCalculator(property)}
                    className="font-medium"
                  >
                    Load into Calculator
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {property.zestimate && (
                  <div className="flex flex-col p-3 rounded-lg bg-primary-50 border border-primary-100">
                    <span className="text-sm text-primary-600">Zestimate</span>
                    <span className="text-lg font-semibold text-primary-700">
                      {formatCurrency(property.zestimate)}
                    </span>
                  </div>
                )}
                
                {property.taxAssessment && (
                  <div className="flex flex-col p-3 rounded-lg bg-primary-50 border border-primary-100">
                    <span className="text-sm text-primary-600">Tax Assessment</span>
                    <span className="text-lg font-semibold text-primary-700">
                      {formatCurrency(property.taxAssessment)}
                    </span>
                  </div>
                )}
                
                {property.annualTaxAmount && (
                  <div className="flex flex-col p-3 rounded-lg bg-primary-50 border border-primary-100">
                    <span className="text-sm text-primary-600">Annual Tax</span>
                    <span className="text-lg font-semibold text-primary-700">
                      {formatCurrency(property.annualTaxAmount)}
                    </span>
                  </div>
                )}
                
                {property.rentZestimate && (
                  <div className="flex flex-col p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <span className="text-sm text-gray-600">Rent Zestimate</span>
                    <span className="text-lg font-semibold text-gray-700">
                      {formatCurrency(property.rentZestimate)}/mo
                    </span>
                  </div>
                )}
                
                {property.hoaFee && (
                  <div className="flex flex-col p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <span className="text-sm text-gray-600">HOA Fee</span>
                    <span className="text-lg font-semibold text-gray-700">
                      {formatCurrency(property.hoaFee)}/mo
                    </span>
                  </div>
                )}
                
                {property.parcelId && (
                  <div className="flex flex-col p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <span className="text-sm text-gray-600">Parcel ID</span>
                    <span className="text-lg font-semibold text-gray-700">
                      {property.parcelId}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Description */}
            {property.description && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">About this home</h4>
                <p className="text-gray-700">{property.description}</p>
              </div>
            )}
            
            {/* Thumbnail Gallery */}
            {propertyImages.length > 1 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Photos</h4>
                <div className="flex flex-wrap gap-2">
                  {propertyImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectImage(index)}
                      className={`w-16 h-16 rounded-md overflow-hidden transition-all duration-200 ${
                        selectedImageIndex === index 
                          ? 'ring-2 ring-primary ring-offset-2' 
                          : 'border border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Property thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}