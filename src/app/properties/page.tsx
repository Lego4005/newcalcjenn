'use client'

import { useState, useEffect } from 'react'
import { 
  Card, 
  CardBody, 
  Input, 
  Select, 
  SelectItem, 
  Slider, 
  Button,
  Chip
} from "@nextui-org/react"
import { Search, SlidersHorizontal, MapPin } from 'lucide-react'
import Map, { Marker } from 'react-map-gl';

interface Property {
  id: string
  address: string
  price: string
  image: string
  status: 'active' | 'pending' | 'closed'
  bedrooms?: number
  bathrooms?: number
  squareFeet?: number
  yearBuilt?: string | number
  propertyType?: string
  description?: string
  latitude?: number; // Add latitude for map marker
  longitude?: number; // Add longitude for map marker
}

export default function PropertiesPage() {
  const [properties] = useState<Property[]>([
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
      propertyType: 'Single Family',
      latitude: 30.2672, // Example latitude for Austin, TX
      longitude: -97.7431, // Example longitude for Austin, TX
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
      propertyType: 'Single Family',
      latitude: 30.2711, // Example latitude for Austin, TX
      longitude: -97.7229, // Example longitude for Austin, TX
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
      propertyType: 'Single Family',
      latitude: 30.2849,  // Example latitude for Austin, TX
      longitude: -97.7341, // Example longitude for Austin, TX
    },
    {
      id: '4',
      address: '101 Maple Dr, Austin, TX',
      price: '$375,000',
      image: 'https://images.unsplash.com/photo-1598228723793-52759bba239c',
      status: 'active',
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1500,
      yearBuilt: 2005,
      propertyType: 'Condo',
      latitude: 30.2988, // Example latitude for Austin, TX
      longitude: -97.7489, // Example longitude for Austin, TX
    },
    {
      id: '5',
      address: '202 Cedar Ln, Austin, TX',
      price: '$825,000',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      status: 'active',
      bedrooms: 5,
      bathrooms: 4,
      squareFeet: 3200,
      yearBuilt: 2020,
      propertyType: 'Single Family',
      latitude: 30.2565, // Example latitude for Austin, TX
      longitude: -97.7639, // Example longitude for Austin, TX
    },
    {
      id: '6',
      address: '303 Birch Blvd, Austin, TX',
      price: '$420,000',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      status: 'active',
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1750,
      yearBuilt: 2012,
      propertyType: 'Townhouse',
      latitude: 30.2783, // Example latitude for Austin, TX
      longitude: -97.7425, // Example longitude for Austin, TX
    },
  ])
  
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([300000, 900000])
  const [propertyType, setPropertyType] = useState<string>('all')
  const [bedrooms, setBedrooms] = useState<string>('any')
  const [bathrooms, setBathrooms] = useState<string>('any')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  
  // Filter properties based on search criteria
  useEffect(() => {
    let filtered = properties
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Filter by price range
    filtered = filtered.filter(property => {
      const price = parseInt(property.price.replace(/[$,]/g, ''))
      return price >= priceRange[0] && price <= priceRange[1]
    })
    
    // Filter by property type
    if (propertyType !== 'all') {
      filtered = filtered.filter(property => 
        property.propertyType === propertyType
      )
    }
    
    // Filter by bedrooms
    if (bedrooms !== 'any') {
      const bedroomCount = parseInt(bedrooms)
      filtered = filtered.filter(property => 
        property.bedrooms === bedroomCount
      )
    }
    
    // Filter by bathrooms
    if (bathrooms !== 'any') {
      const bathroomCount = parseInt(bathrooms)
      filtered = filtered.filter(property => 
        property.bathrooms === bathroomCount
      )
    }
    
    setFilteredProperties(filtered)
  }, [searchQuery, priceRange, propertyType, bedrooms, bathrooms, properties])
  
  // Format price for display
  const formatPrice = (price: string) => {
    return price
  }
  
  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'pending':
        return 'warning'
      case 'closed':
        return 'danger'
      default:
        return 'default'
    }
  }
  
  return (
    <div className="flex flex-col h-[calc(100vh-60px)]">
      {/* Filters Bar */}
      <div className="p-4 bg-white border-b">
        <div className="flex flex-wrap gap-4 items-center">
          <Input
            placeholder="Search by address, city, or ZIP"
            value={searchQuery}
            onValueChange={setSearchQuery}
            startContent={<Search className="text-gray-400" size={18} />}
            className="w-full md:w-64"
          />
          
          <Select
            placeholder="Property Type"
            selectedKeys={[propertyType]}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full md:w-40"
          >
            <SelectItem key="all" value="all">All Types</SelectItem>
            <SelectItem key="Single Family" value="Single Family">Single Family</SelectItem>
            <SelectItem key="Condo" value="Condo">Condo</SelectItem>
            <SelectItem key="Townhouse" value="Townhouse">Townhouse</SelectItem>
            <SelectItem key="Multi-Family" value="Multi-Family">Multi-Family</SelectItem>
          </Select>
          
          <Select
            placeholder="Bedrooms"
            selectedKeys={[bedrooms]}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full md:w-32"
          >
            <SelectItem key="any" value="any">Any</SelectItem>
            <SelectItem key="1" value="1">1+</SelectItem>
            <SelectItem key="2" value="2">2+</SelectItem>
            <SelectItem key="3" value="3">3+</SelectItem>
            <SelectItem key="4" value="4">4+</SelectItem>
            <SelectItem key="5" value="5">5+</SelectItem>
          </Select>
          
          <Select
            placeholder="Bathrooms"
            selectedKeys={[bathrooms]}
            onChange={(e) => setBathrooms(e.target.value)}
            className="w-full md:w-32"
          >
            <SelectItem key="any" value="any">Any</SelectItem>
            <SelectItem key="1" value="1">1+</SelectItem>
            <SelectItem key="2" value="2">2+</SelectItem>
            <SelectItem key="3" value="3">3+</SelectItem>
            <SelectItem key="4" value="4">4+</SelectItem>
          </Select>
          
          <div className="w-full md:w-64">
            <p className="text-sm text-gray-500 mb-1">Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</p>
            <Slider
              minValue={300000}
              maxValue={1000000}
              step={25000}
              value={priceRange}
              onChange={(value) => setPriceRange(Array.isArray(value) ? value : [value, priceRange[1]])}
              className="w-full"
            />
          </div>
          
          <Button
            color="primary"
            variant="light"
            startContent={<SlidersHorizontal size={18} />}
            className="ml-auto"
          >
            More Filters
          </Button>
        </div>
      </div>
      
      {/* Main Content - Map and Listings */}
      <div className="flex flex-1 overflow-hidden">
        {/* Property Listings */}
        <div className="w-full md:w-1/2 lg:w-2/5 overflow-y-auto p-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
            </h2>
          </div>
          
          <div className="space-y-4">
            {filteredProperties.map((property) => (
              <Card 
                key={property.id}
                isPressable
                onPress={() => setSelectedProperty(property)}
                className={`overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ${
                  selectedProperty?.id === property.id ? 'border-2 border-primary' : 'border border-gray-200'
                }`}
              >
                <CardBody className="p-0 flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 h-48 md:h-auto">
                    <img 
                      src={property.image} 
                      alt={property.address}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">{formatPrice(property.price)}</h3>
                      <Chip color={getStatusBadgeColor(property.status)} size="sm">
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </Chip>
                    </div>
                    <p className="text-gray-600 mt-1">{property.address}</p>
                    <div className="flex gap-3 mt-2 text-sm text-gray-500">
                      {property.bedrooms && <span>{property.bedrooms} bd</span>}
                      {property.bathrooms && <span>{property.bathrooms} ba</span>}
                      {property.squareFeet && <span>{property.squareFeet.toLocaleString()} sqft</span>}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {property.propertyType} • Built in {property.yearBuilt}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
            
            {filteredProperties.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No properties match your search criteria.</p>
                <Button color="primary" variant="flat" className="mt-4" onClick={() => {
                  setSearchQuery('')
                  setPriceRange([300000, 900000])
                  setPropertyType('all')
                  setBedrooms('any')
                  setBathrooms('any')
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Map */}
        <div className="hidden md:block md:w-1/2 lg:w-3/5 bg-gray-100 relative">
        <Map
            initialViewState={{
              longitude: -97.7431, // Center on Austin, TX
              latitude: 30.2672,
              zoom: 10
            }}
            style={{width: '100%', height: '100%'}}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          >
            {filteredProperties.map(property => (
                <Marker key={property.id} longitude={property.longitude!} latitude={property.latitude!} anchor="bottom" >
                  <MapPin className='text-red-500' size={30}/>
                </Marker>
            ))}
          </Map>
          
          {/* Property Markers - These would be positioned on the map */}
          {selectedProperty && (
            <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-md">
              <div className="flex items-start gap-4">
                <img 
                  src={selectedProperty.image} 
                  alt={selectedProperty.address}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{formatPrice(selectedProperty.price)}</h3>
                  <p className="text-sm text-gray-600">{selectedProperty.address}</p>
                  <div className="flex gap-2 mt-1 text-xs text-gray-500">
                    <span>{selectedProperty.bedrooms} bd</span>
                    <span>{selectedProperty.bathrooms} ba</span>
                    <span>{selectedProperty.squareFeet?.toLocaleString()} sqft</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
