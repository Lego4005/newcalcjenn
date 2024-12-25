'use client'

import { Card, CardBody, Avatar, Button, Tooltip } from "@nextui-org/react"

interface PropertyDetails {
  beds: number
  baths: number
  sqft: number
  lotSize: string
  yearBuilt: number
  propertyType: string
  zoning: string
  parking: string
  stories: number
}

interface MarketData {
  listPrice: string
  pricePerSqft: number
  daysOnMarket: number
  lastSold: {
    date: string
    price: string
  }
  zestimate: string
  comparables: {
    low: string
    high: string
    median: string
  }
}

interface Property {
  id: string
  address: string
  price: string
  image: string
  status: 'active' | 'pending' | 'closed'
  details: PropertyDetails
  market: MarketData
  images: string[]
  description: string
}

export function PropertyContext({ isCompact = false }: { isCompact?: boolean }) {
  const properties: Property[] = [
    {
      id: '1',
      address: '123 Main St, Austin, TX',
      price: '$450,000',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
      status: 'active',
      details: {
        beds: 3,
        baths: 2.5,
        sqft: 2100,
        lotSize: '0.25 acres',
        yearBuilt: 2015,
        propertyType: 'Single Family',
        zoning: 'Residential',
        parking: '2 Car Garage',
        stories: 2
      },
      market: {
        listPrice: '$450,000',
        pricePerSqft: 214,
        daysOnMarket: 15,
        lastSold: {
          date: '2020-06-15',
          price: '$385,000'
        },
        zestimate: '$465,000',
        comparables: {
          low: '$425,000',
          high: '$475,000',
          median: '$455,000'
        }
      },
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1560185127-6ed189bf02f4',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'
      ],
      description: 'Beautiful modern home in prime location. Recently renovated with high-end finishes throughout. Open concept living area, gourmet kitchen with stainless steel appliances, and spacious primary suite.'
    },
    {
      id: '2',
      address: '456 Oak Ave, Austin, TX',
      price: '$550,000',
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
      status: 'pending',
      details: {
        beds: 4,
        baths: 3,
        sqft: 2800,
        lotSize: '0.3 acres',
        yearBuilt: 2018,
        propertyType: 'Single Family',
        zoning: 'Residential',
        parking: '2 Car Garage',
        stories: 2
      },
      market: {
        listPrice: '$550,000',
        pricePerSqft: 196,
        daysOnMarket: 8,
        lastSold: {
          date: '2019-08-20',
          price: '$475,000'
        },
        zestimate: '$565,000',
        comparables: {
          low: '$525,000',
          high: '$575,000',
          median: '$552,000'
        }
      },
      images: [
        'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b'
      ],
      description: 'Stunning new construction in desirable neighborhood. Chef\'s kitchen with quartz countertops, custom cabinetry, and premium appliances. Large backyard perfect for entertaining.'
    },
    {
      id: '3',
      address: '789 Pine Rd, Austin, TX',
      price: '$650,000',
      image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00',
      status: 'closed',
      details: {
        beds: 5,
        baths: 3.5,
        sqft: 3200,
        lotSize: '0.4 acres',
        yearBuilt: 2020,
        propertyType: 'Single Family',
        zoning: 'Residential',
        parking: '3 Car Garage',
        stories: 2
      },
      market: {
        listPrice: '$650,000',
        pricePerSqft: 203,
        daysOnMarket: 5,
        lastSold: {
          date: '2021-03-10',
          price: '$590,000'
        },
        zestimate: '$675,000',
        comparables: {
          low: '$625,000',
          high: '$685,000',
          median: '$655,000'
        }
      },
      images: [
        'https://images.unsplash.com/photo-1605146769289-440113cc3d00',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'
      ],
      description: 'Luxurious estate home with premium upgrades throughout. Gourmet kitchen, primary suite with spa-like bathroom, media room, and home office. Resort-style backyard with covered patio.'
    },
  ]

  return (
    <div className={`flex flex-col ${isCompact ? 'items-center gap-1' : 'gap-2'}`}>
      {!isCompact && (
        <div className="px-4 mb-1">
          <h2 className="text-xs font-medium text-default-500 uppercase">Properties</h2>
        </div>
      )}

      <div className={`flex flex-col ${isCompact ? 'items-center gap-1' : 'gap-1 px-1'}`}>
        {properties.map((property) => (
          <Tooltip
            key={property.id}
            content={
              <Card className="border-none bg-content1 max-w-[300px]">
                <CardBody className="gap-2">
                  <div>
                    <p className="font-semibold text-small">{property.address}</p>
                    <p className="text-small text-default-500">{property.price}</p>
                  </div>
                  <div className="text-tiny">
                    <p>{property.details.beds} beds • {property.details.baths} baths • {property.details.sqft.toLocaleString()} sqft</p>
                    <p>Built {property.details.yearBuilt} • {property.details.lotSize}</p>
                    <p className="capitalize mt-1">Status: {property.status}</p>
                  </div>
                  <p className="text-tiny text-default-500">
                    {property.description.substring(0, 100)}...
                  </p>
                </CardBody>
              </Card>
            }
            placement="right"
            showArrow
            offset={10}
            delay={200}
            closeDelay={0}
          >
            <Button
              className={`w-full group transition-transform hover:scale-[0.98] ${
                isCompact ? 'p-0 h-auto min-h-0 max-w-[52px]' : 'p-1 h-auto'
              }`}
              variant="light"
              radius="sm"
            >
              <div className={`flex ${isCompact ? 'justify-center' : 'items-center gap-3'} w-full`}>
                <Avatar
                  src={property.image}
                  className={`
                    ${isCompact ? 'w-11 h-11' : 'w-12 h-12'}
                    transition-transform group-hover:scale-105
                  `}
                  radius="sm"
                  classNames={{
                    base: `border-2 border-transparent ${
                      property.status === 'active' ? 'group-data-[hover=true]:border-primary' :
                      property.status === 'pending' ? 'group-data-[hover=true]:border-warning' :
                      'group-data-[hover=true]:border-success'
                    }`
                  }}
                />
                {!isCompact && (
                  <div className="flex flex-col items-start min-w-0">
                    <p className="text-xs font-medium line-clamp-1 w-full">
                      {property.address}
                    </p>
                    <p className="text-xs text-default-500">
                      {property.price} • {property.details.beds}bd {property.details.baths}ba
                    </p>
                    <span className={`text-[10px] ${
                      property.status === 'active' ? 'text-primary-500' :
                      property.status === 'pending' ? 'text-warning-500' :
                      'text-success-500'
                    }`}>
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </span>
                  </div>
                )}
              </div>
            </Button>
          </Tooltip>
        ))}
      </div>

      {!isCompact && (
        <Button
          className="w-full mt-1 mx-1"
          color="primary"
          variant="ghost"
          size="sm"
        >
          Add Property
        </Button>
      )}
    </div>
  )
} 