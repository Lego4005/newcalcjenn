'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button, Chip, Image, Spinner } from "@nextui-org/react"
import { Property } from "./types"
import { formatCurrency, formatDate, getStatusBadgeColor } from "./utils"

interface PropertyExpandedViewProps {
  property: Property | null
  isOpen: boolean
  onClose: () => void
  onLoadToCalculator?: (property: Property) => void
}

export function PropertyExpandedView({ 
  property, 
  isOpen, 
  onClose,
  onLoadToCalculator 
}: PropertyExpandedViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  
  // Reset selected image index when property changes
  useEffect(() => {
    setSelectedImageIndex(0)
    setIsMapLoaded(false)
  }, [property])
  
  // If no property is selected, don't render anything
  if (!property) return null
  
  // Get property images
  const propertyImages = property.photos 
    ? property.photos.map(photo => photo.href) 
    : [property.image]
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Expanded Panel */}
          <motion.div
            className="fixed top-0 right-0 h-screen w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white shadow-xl z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 truncate">{property.address}</h2>
              <Button
                isIconOnly
                variant="light"
                onPress={onClose}
                className="text-gray-500"
              >
                ✕
              </Button>
            </div>
            
            {/* Content */}
            <div className="p-4">
              {/* Main Image Gallery */}
              <div className="relative rounded-lg overflow-hidden mb-4">
                <div className="w-full h-[400px] bg-gray-100">
                  <Image
                    alt="Property image"
                    className="w-full h-full object-cover"
                    src={propertyImages[selectedImageIndex]}
                    radius="none"
                  />
                </div>
                
                {/* Image Navigation Arrows */}
                {propertyImages.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <Button
                      isIconOnly
                      variant="flat"
                      className="bg-white/80 backdrop-blur-md"
                      onPress={() => setSelectedImageIndex(
                        (selectedImageIndex - 1 + propertyImages.length) % propertyImages.length
                      )}
                    >
                      ←
                    </Button>
                    <Button
                      isIconOnly
                      variant="flat"
                      className="bg-white/80 backdrop-blur-md"
                      onPress={() => setSelectedImageIndex(
                        (selectedImageIndex + 1) % propertyImages.length
                      )}
                    >
                      →
                    </Button>
                  </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <Chip 
                    size="md" 
                    className={`${getStatusBadgeColor(property.status)}`}
                  >
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </Chip>
                </div>
              </div>
              
              {/* Price and Calculator Button */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-primary-600">{property.price}</h3>
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
              
              {/* Key Facts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                {property.bedrooms && (
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500">Beds</span>
                    <span className="text-lg font-semibold">{property.bedrooms}</span>
                  </div>
                )}
                
                {property.bathrooms && (
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500">Baths</span>
                    <span className="text-lg font-semibold">{property.bathrooms}</span>
                  </div>
                )}
                
                {property.squareFeet && (
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500">Square Feet</span>
                    <span className="text-lg font-semibold">{property.squareFeet.toLocaleString()}</span>
                  </div>
                )}
                
                {property.yearBuilt && (
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500">Year Built</span>
                    <span className="text-lg font-semibold">{property.yearBuilt}</span>
                  </div>
                )}
              </div>
              
              {/* Mapbox Map */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Location</h4>
                <div className="relative w-full h-[300px] bg-gray-100 rounded-lg overflow-hidden">
                  {!isMapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Spinner label="Loading map..." />
                    </div>
                  )}
                  <iframe 
                    className={`w-full h-full border-0 ${isMapLoaded ? 'opacity-100' : 'opacity-0'}`}
                    src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+3498db(${encodeURIComponent(property.address)})/auto/600x300?access_token=pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xsZXhhbXBsZSJ9.example`}
                    title="Property location"
                    onLoad={() => setIsMapLoaded(true)}
                  />
                </div>
              </div>
              
              {/* Financial Information */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">Financial Information</h4>
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
              
              {/* Neighborhood Information */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Neighborhood</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    This property is located in a desirable neighborhood with excellent schools, parks, and amenities nearby.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                        🏫
                      </div>
                      <div>
                        <p className="text-sm font-medium">Schools</p>
                        <p className="text-xs text-gray-500">Highly rated</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">
                        🌳
                      </div>
                      <div>
                        <p className="text-sm font-medium">Parks</p>
                        <p className="text-xs text-gray-500">Within 0.5 miles</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-2">
                        🍽️
                      </div>
                      <div>
                        <p className="text-sm font-medium">Dining</p>
                        <p className="text-xs text-gray-500">Multiple options</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
                        🚌
                      </div>
                      <div>
                        <p className="text-sm font-medium">Transit</p>
                        <p className="text-xs text-gray-500">Good access</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              {property.description && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">About this home</h4>
                  <p className="text-gray-700">{property.description}</p>
                </div>
              )}
              
              {/* Thumbnail Gallery */}
              {propertyImages.length > 1 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Photos</h4>
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                    {propertyImages.map((image, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`aspect-square rounded-md overflow-hidden transition-all duration-200 ${
                          selectedImageIndex === idx 
                            ? 'ring-2 ring-primary ring-offset-2' 
                            : 'border border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Property thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Last Updated */}
              {property.lastTouched && (
                <div className="text-xs text-gray-500 text-right mt-4">
                  Last updated: {formatDate(property.lastTouched)}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}