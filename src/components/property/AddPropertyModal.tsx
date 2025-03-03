'use client'

import { useState } from "react"
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Card,
  CardBody,
  Image,
  Divider
} from "@nextui-org/react"
import { AddressAutocomplete } from "../AddressAutocomplete"
import { fetchPropertyByAddress, formatPropertyData, getFallbackPropertyImages } from "../../utils/propertyApi"
import { Property, PropertyPhoto } from "./types"

interface AddPropertyModalProps {
  isOpen: boolean
  onClose: () => void
  onAddProperty: (property: Property) => void
}

export function AddPropertyModal({ isOpen, onClose, onAddProperty }: AddPropertyModalProps) {
  // State for form fields
  const [newProperty, setNewProperty] = useState<{
    address: string;
    price: string;
    image: string;
    status: 'active' | 'pending' | 'closed';
    bedrooms?: number;
    bathrooms?: number;
    squareFeet?: number;
    yearBuilt?: string | number;
    propertyType?: string;
    lotSize?: number;
    description?: string;
    taxAssessment?: number;
    zestimate?: number;
    rentZestimate?: number;
    lotSizeSqFt?: number;
    hoaFee?: number;
    annualTaxAmount?: number;
    parcelId?: string;
  }>({
    address: '',
    price: '',
    image: '',
    status: 'active'
  })
  
  // State for validation
  const [errors, setErrors] = useState<{
    address?: string;
    price?: string;
    image?: string;
  }>({})
  
  // State for loading property data
  const [isLoadingProperty, setIsLoadingProperty] = useState(false)
  const [propertyImages, setPropertyImages] = useState<string[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  
  // Handle address selection from autocomplete
  const handleAddressSelect = async (address: string) => {
    setNewProperty({
      ...newProperty,
      address
    })
    
    // Clear address error if it exists
    if (errors.address) {
      setErrors({
        ...errors,
        address: undefined
      })
    }
    
    // Fetch property data based on the selected address
    setIsLoadingProperty(true)
    try {
      const propertyData = await fetchPropertyByAddress(address)
      const formattedData = formatPropertyData(propertyData)
      
      if (formattedData) {
        setNewProperty({
          ...newProperty,
          ...formattedData,
          address // Keep the full address from Mapbox
        })
        
        // Set property images
        if (formattedData.photos && formattedData.photos.length > 0) {
          const imageUrls = formattedData.photos.map((photo: PropertyPhoto) => photo.href)
          setPropertyImages(imageUrls)
        } else {
          setPropertyImages(getFallbackPropertyImages())
        }
      }
    } catch (error) {
      console.error('Error fetching property data:', error)
      setPropertyImages(getFallbackPropertyImages())
    } finally {
      setIsLoadingProperty(false)
    }
  }
  
  // Handle input change
  const handleInputChange = (field: string, value: string) => {
    setNewProperty({
      ...newProperty,
      [field]: value
    })
    
    // Clear error when user types
    if (errors[field as keyof typeof errors]) {
      setErrors({
        ...errors,
        [field]: undefined
      })
    }
  }
  
  // Validate form
  const validateForm = () => {
    const newErrors: typeof errors = {}
    
    if (!newProperty.address.trim()) {
      newErrors.address = 'Address is required'
    }
    
    if (!newProperty.price.trim()) {
      newErrors.price = 'Price is required'
    } else if (!newProperty.price.startsWith('$')) {
      newErrors.price = 'Price should start with $'
    }
    
    if (!newProperty.image.trim() && propertyImages.length === 0) {
      newErrors.image = 'Image URL is required'
    } else if (newProperty.image.trim() && !newProperty.image.startsWith('http')) {
      newErrors.image = 'Image URL should start with http'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      const newId = Date.now().toString()
      
      // Use the selected image from propertyImages if available
      const finalImage = propertyImages.length > 0 
        ? propertyImages[selectedImageIndex] 
        : newProperty.image
      
      // Create photos array from propertyImages
      const photos = propertyImages.map(url => ({ href: url }))
      
      const newPropertyItem: Property = {
        id: newId,
        ...newProperty,
        image: finalImage,
        photos: photos,
        lastTouched: new Date().toISOString()
      }
      
      onAddProperty(newPropertyItem)
      
      // Reset form and close modal
      setNewProperty({
        address: '',
        price: '',
        image: '',
        status: 'active'
      })
      setPropertyImages([])
      setSelectedImageIndex(0)
      onClose()
    }
  }
  
  // Select an image from the property images
  const handleSelectImage = (index: number) => {
    setSelectedImageIndex(index)
    setNewProperty({
      ...newProperty,
      image: propertyImages[index]
    })
  }
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="3xl"
      classNames={{
        base: "bg-white",
        header: "border-b border-gray-200 pb-2",
        footer: "border-t border-gray-200 pt-2",
        body: "py-4"
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-gray-800">Add New Property</h3>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <AddressAutocomplete 
                onAddressSelect={handleAddressSelect}
                placeholder="Enter property address"
                label="Property Address"
              />
              
              {isLoadingProperty && (
                <div className="flex justify-center py-4">
                  <Spinner label="Loading property data..." />
                </div>
              )}
              
              <Input
                label="Price"
                placeholder="$450,000"
                value={newProperty.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                isInvalid={!!errors.price}
                errorMessage={errors.price}
                classNames={{
                  inputWrapper: "bg-gray-50"
                }}
              />
              
              {propertyImages.length === 0 && (
                <Input
                  label="Image URL"
                  placeholder="https://example.com/image.jpg"
                  value={newProperty.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  isInvalid={!!errors.image}
                  errorMessage={errors.image}
                  classNames={{
                    inputWrapper: "bg-gray-50"
                  }}
                />
              )}
              
              <Select
                label="Status"
                selectedKeys={[newProperty.status]}
                onChange={(e) => handleInputChange('status', e.target.value)}
                classNames={{
                  trigger: "bg-gray-50"
                }}
              >
                <SelectItem key="active" value="active">Active</SelectItem>
                <SelectItem key="pending" value="pending">Pending</SelectItem>
                <SelectItem key="closed" value="closed">Closed</SelectItem>
              </Select>
              
              {newProperty.bedrooms !== undefined && (
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Bedrooms"
                    type="number"
                    value={newProperty.bedrooms.toString()}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    classNames={{
                      inputWrapper: "bg-gray-50"
                    }}
                  />
                  <Input
                    label="Bathrooms"
                    type="number"
                    value={newProperty.bathrooms?.toString() || ''}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    classNames={{
                      inputWrapper: "bg-gray-50"
                    }}
                  />
                </div>
              )}
              
              {newProperty.squareFeet !== undefined && (
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Square Feet"
                    type="number"
                    value={newProperty.squareFeet.toString()}
                    onChange={(e) => handleInputChange('squareFeet', e.target.value)}
                    classNames={{
                      inputWrapper: "bg-gray-50"
                    }}
                  />
                  <Input
                    label="Year Built"
                    value={newProperty.yearBuilt?.toString() || ''}
                    onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                    classNames={{
                      inputWrapper: "bg-gray-50"
                    }}
                  />
                </div>
              )}
              
              {/* Financial Information Fields */}
              <Divider className="my-2">
                <span className="text-sm text-gray-500">Financial Information</span>
              </Divider>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Tax Assessment"
                  type="number"
                  placeholder="425000"
                  value={newProperty.taxAssessment?.toString() || ''}
                  onChange={(e) => handleInputChange('taxAssessment', e.target.value)}
                  classNames={{
                    inputWrapper: "bg-gray-50"
                  }}
                  description="Used in calculations"
                />
                <Input
                  label="Annual Tax Amount"
                  type="number"
                  placeholder="8500"
                  value={newProperty.annualTaxAmount?.toString() || ''}
                  onChange={(e) => handleInputChange('annualTaxAmount', e.target.value)}
                  classNames={{
                    inputWrapper: "bg-gray-50"
                  }}
                  description="Used in calculations"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Zestimate"
                  type="number"
                  placeholder="455000"
                  value={newProperty.zestimate?.toString() || ''}
                  onChange={(e) => handleInputChange('zestimate', e.target.value)}
                  classNames={{
                    inputWrapper: "bg-gray-50"
                  }}
                  description="Used in calculations"
                />
                <Input
                  label="Rent Zestimate"
                  type="number"
                  placeholder="2500"
                  value={newProperty.rentZestimate?.toString() || ''}
                  onChange={(e) => handleInputChange('rentZestimate', e.target.value)}
                  classNames={{
                    inputWrapper: "bg-gray-50"
                  }}
                />
              </div>
            </div>
            
            <div>
              {propertyImages.length > 0 && (
                <div className="space-y-4">
                  <Card className="shadow-md overflow-hidden">
                    <CardBody className="p-0">
                      <Image
                        alt="Property image"
                        className="w-full h-48 object-cover"
                        src={propertyImages[selectedImageIndex]}
                        radius="none"
                      />
                    </CardBody>
                  </Card>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Available Images</h4>
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
                </div>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Add Property
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}