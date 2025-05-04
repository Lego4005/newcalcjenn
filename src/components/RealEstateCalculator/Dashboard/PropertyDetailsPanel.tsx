import React from 'react';
import { Card, CardHeader, CardBody, Divider, Image, Chip } from '@heroui/react';
import { Property } from './PropertyDashboard';
import { formatPrice } from '@/lib/utils';

interface PropertyDetailsPanelProps {
  property: Property | null;
  isLoading: boolean;
}

// Helper to display data or loading/placeholder
const DetailItem = ({ label, value, isLoading }: { label: string, value: React.ReactNode, isLoading: boolean }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-sm text-default-600">{label}</span>
    {isLoading ? (
      <div className="h-4 bg-default-200 rounded w-1/2 animate-pulse"></div>
    ) : (
      <span className="text-sm font-medium text-default-800 text-right">{value ?? 'N/A'}</span>
    )}
  </div>
);

export default function PropertyDetailsPanel({ property, isLoading }: PropertyDetailsPanelProps) {
  
  // Main loading state for the entire panel when initially fetching
  if (isLoading && !property) { 
    return (
      <Card>
        <CardHeader><h3 className="font-semibold text-lg">Property Details</h3></CardHeader>
        <CardBody className="space-y-2">
          <div className="h-40 bg-default-200 rounded w-full animate-pulse mb-4"></div> {/* Image placeholder */}
          <div className="h-4 bg-default-300 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-default-200 rounded w-1/2 animate-pulse"></div>
          <div className="h-4 bg-default-200 rounded w-5/6 animate-pulse"></div>
           <div className="h-4 bg-default-200 rounded w-2/3 animate-pulse"></div>
        </CardBody>
      </Card>
    );
  }

  // State when no property is selected or found
  if (!property) {
    return (
      <Card>
        <CardHeader><h3 className="font-semibold text-lg">Property Details</h3></CardHeader>
        <CardBody>
          <p className="text-default-500 text-center py-10">No property selected or data available.</p>
        </CardBody>
      </Card>
    );
  }

  // Destructure known properties (add more as needed and typed)
  const { 
    address,
    price,
    bedrooms,
    bathrooms, 
    livingArea, // Assuming sqft is livingArea
    yearBuilt,
    lotSize, 
    propertyType,
    homeStatus, // Assuming status is homeStatus
    imgSrc // Assuming first image source
  } = property;

  return (
    <Card className="shadow-md">
      <CardHeader className="flex-col items-start px-4 pt-4 pb-2"> 
        {/* Basic Image - TODO: Implement Image Gallery */}
        {imgSrc && (
           <Image
             isZoomed
             alt={address?.streetAddress || 'Property image'}
             className="object-cover rounded-xl w-full h-[200px] mb-3"
             src={imgSrc}
             fallbackSrc="https://via.placeholder.com/400x200?text=No+Image"
           />
        )}
        <p className="text-tiny uppercase font-bold">{propertyType || 'N/A'}</p>
        <h4 className="font-bold text-large">{address?.streetAddress || 'Address N/A'}</h4>
         <p className="text-sm text-default-500">{`${address?.city || ''}, ${address?.state || ''} ${address?.zipcode || ''}`}</p>
         <Chip color={homeStatus === 'Active' || homeStatus === 'FOR_SALE' ? "success" : "default"} variant="flat" size="sm" className="mt-1">{homeStatus || 'Status N/A'}</Chip>
      </CardHeader>
      <Divider />
      <CardBody className="py-2 px-4 space-y-1">
        <h5 className="font-semibold text-md mb-2">Key Details</h5>
        {/* Use DetailItem helper */}
        <DetailItem label="Price" value={formatPrice(price)} isLoading={false} />
        <DetailItem label="Beds" value={bedrooms} isLoading={false} />
        <DetailItem label="Baths" value={bathrooms} isLoading={false} />
        <DetailItem label="Sqft" value={livingArea ? `${livingArea} sqft` : null} isLoading={false} />
        <DetailItem label="Year Built" value={yearBuilt} isLoading={false} />
        <DetailItem label="Lot Size" value={lotSize ? `${lotSize} sqft` : null} isLoading={false} />

        {/* TODO: Add other property details */}
        {/* TODO: Add quick action buttons (Save, Share, Analyze) */}
      </CardBody>
    </Card>
  );
} 