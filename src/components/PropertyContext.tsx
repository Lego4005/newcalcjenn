'use client'

import { Card, CardBody, Avatar, Button, Tooltip } from "@nextui-org/react"

interface Property {
  id: string
  address: string
  price: string
  image: string
  status: 'active' | 'pending' | 'closed'
}

export function PropertyContext({ isCompact = false }: { isCompact?: boolean }) {
  const properties: Property[] = [
    {
      id: '1',
      address: '123 Main St, Austin, TX',
      price: '$450,000',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      status: 'active'
    },
    {
      id: '2',
      address: '456 Oak Ave, Austin, TX',
      price: '$550,000',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
      status: 'pending'
    },
    {
      id: '3',
      address: '789 Pine Rd, Austin, TX',
      price: '$650,000',
      image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126',
      status: 'closed'
    },
  ]

  return (
    <div className="space-y-4">
      {!isCompact && (
        <div className="px-2">
          <h2 className="text-sm font-semibold text-default-600">Current Property</h2>
        </div>
      )}

      <div className="space-y-2">
        {properties.map((property) => (
          <Tooltip
            key={property.id}
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">{property.address}</div>
                <div className="text-tiny">{property.price}</div>
                <div className="text-tiny capitalize">{property.status}</div>
              </div>
            }
            placement="right"
          >
            <Button
              className={`w-full justify-start h-auto ${isCompact ? 'p-1' : 'p-2'}`}
              variant={property.status === 'active' ? 'flat' : 'light'}
              color={property.status === 'active' ? 'primary' : 'default'}
            >
              <div className={`flex ${isCompact ? 'justify-center' : 'items-center gap-3'}`}>
                <Avatar
                  src={property.image}
                  className={`object-cover ${isCompact ? 'w-10 h-10' : 'w-12 h-12'}`}
                  radius="sm"
                />
                {!isCompact && (
                  <div className="flex flex-col items-start">
                    <p className="text-xs font-medium line-clamp-1">
                      {property.address}
                    </p>
                    <p className="text-xs text-default-500">
                      {property.price}
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
          className="w-full"
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