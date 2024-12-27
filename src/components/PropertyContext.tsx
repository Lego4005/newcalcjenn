'use client'

import { FC, useState, useEffect } from 'react';
import { Button, Avatar, Tooltip } from '@nextui-org/react';
import { Building2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Property {
  id: string;
  address: string;
  price: number;
  images?: string[];
  isDemo?: boolean;
  status?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  source?: {
    name: string;
    fetchDate: string;
  };
}

interface PropertyContextProps {
  isCompact: boolean;
}

export const PropertyContext: FC<PropertyContextProps> = ({ isCompact }) => {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);

  // Get just the street number and name from the full address
  const getShortAddress = (address: string) => {
    const parts = address.split(',')[0].trim().split(' ');
    // Keep the street number and first word of street name
    return `${parts[0]} ${parts[1]}`;
  };

  const handlePropertyClick = (property: Property) => {
    router.push(`/dashboard?propertyId=${property.id}`);
  };

  // Clean up duplicates in properties array
  const cleanupDuplicates = (properties: Property[]) => {
    const seen = new Set<string>();
    return properties.reverse().filter(property => {
      const normalizedAddress = property.address.toLowerCase().replace(/\s+/g, ' ').trim();
      if (seen.has(normalizedAddress)) {
        return false;
      }
      seen.add(normalizedAddress);
      return true;
    }).reverse();
  };

  // Load saved properties from localStorage
  useEffect(() => {
    const savedProperties = localStorage.getItem('roca_properties');
    if (savedProperties) {
      try {
        const parsedProperties = JSON.parse(savedProperties);
        console.log('Loaded properties:', parsedProperties); // Debug log
        if (parsedProperties.length > 0) {
          // Clean up any existing duplicates
          const cleanedProperties = cleanupDuplicates(parsedProperties);
          
          // Sort by most recently updated
          const sortedProperties = cleanedProperties.sort((a: Property, b: Property) => {
            return new Date(b.source?.fetchDate || 0).getTime() - new Date(a.source?.fetchDate || 0).getTime();
          });

          // Save cleaned properties back to storage
          localStorage.setItem('roca_properties', JSON.stringify(cleanedProperties));
          
          setProperties(sortedProperties);
        }
      } catch (error) {
        console.error('Error parsing saved properties:', error);
      }
    }
  }, []);

  // Get transaction details for a property
  const getTransactionDetails = (propertyId: string) => {
    const transactions = JSON.parse(localStorage.getItem('roca_transactions') || '{}');
    return transactions[propertyId];
  };

  return (
    <div className="space-y-1">
      {properties.map((property) => {
        const transaction = getTransactionDetails(property.id);
        return (
          <Tooltip
            key={property.id}
            content={
              <div className="px-2 py-1 space-y-2">
                <div className="relative w-[200px] h-[150px] mb-2 rounded-md overflow-hidden">
                  {property.images && property.images.length > 0 ? (
                    <Image
                      src={property.images[0]}
                      alt={property.address}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  ) : (
                    <div className="w-full h-full bg-default-100 flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-default-300" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{property.address}</p>
                  <p className="text-sm">${property.price?.toLocaleString()}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-default-500">
                    {property.beds && <span>{property.beds} beds</span>}
                    {property.baths && <span>{property.baths} baths</span>}
                    {property.sqft && <span>{property.sqft.toLocaleString()} sqft</span>}
                  </div>
                </div>
                {transaction && (
                  <div className="border-t pt-2 space-y-1">
                    <p className="text-xs text-default-500">Transaction Details:</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                      <div>
                        <span className="text-default-400">Sale Price:</span>
                        <span className="ml-1">${transaction.salePrice?.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-default-400">Mortgage:</span>
                        <span className="ml-1">${transaction.mortgageBalance?.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-default-400">Annual Taxes:</span>
                        <span className="ml-1">${transaction.annualTaxes?.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-default-400">HOA (Monthly):</span>
                        <span className="ml-1">${transaction.hoaFees?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            }
            placement="right"
          >
            <Button
              className={`w-full justify-start text-default-600 ${isCompact ? 'px-0' : ''}`}
              variant="light"
              onPress={() => handlePropertyClick(property)}
            >
              <div className={`flex items-center gap-2 ${isCompact ? 'justify-center' : ''}`}>
                {property.images && property.images.length > 0 ? (
                  <div className="relative w-4 h-4 rounded-sm overflow-hidden">
                    <Image
                      src={property.images[0]}
                      alt={property.address}
                      fill
                      className="object-cover"
                      sizes="16px"
                    />
                  </div>
                ) : (
                  <Building2 className="w-4 h-4" />
                )}
                {!isCompact && (
                  <div className="truncate">
                    <span className="block text-sm truncate">{getShortAddress(property.address)}</span>
                    <span className="block text-xs text-default-400">${property.price?.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
}; 