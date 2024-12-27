import { Modal, ModalContent, ModalBody, Button, Image, Card, CardBody, Progress, Tooltip } from "@nextui-org/react";
import { X, Bed, Bath, Square, Calendar, Car, Ruler, School, Train, Navigation2, DollarSign, Home, Tag, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useState } from "react";

interface PropertyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    address: string;
    price: number;
    beds?: number;
    baths?: number;
    sqft?: number;
    yearBuilt?: number;
    pricePerSqft?: number;
    marketValue?: number;
    images?: string[];
    description?: string;
    lotSize?: number;
    parkingSpaces?: number;
    propertyType?: string;
    lastSoldPrice?: number;
    lastSoldDate?: string;
    priceHistory?: Array<{
      date: string;
      price: number;
      event: string;
    }>;
    features?: string[];
    schools?: Array<{
      name: string;
      rating: number;
      distance: number;
      type: string;
    }>;
    walkScore?: number;
    transitScore?: number;
    zestimate?: number;
    taxes?: number;
    hoaFees?: number;
  };
}

export default function PropertyDrawer({ isOpen, onClose, property }: PropertyDrawerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextImage = () => {
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images!.length);
    }
  };

  const prevImage = () => {
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images!.length) % property.images!.length);
    }
  };

  // Split address into parts for better display
  const addressParts = property.address.split(',').map(part => part.trim());
  const streetAddress = addressParts[0];
  const cityStateZip = addressParts.slice(1).join(', ');

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-[600px] bg-white shadow-xl z-50 transition-all duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Home className="w-5 h-5" />
          <span className="font-semibold">Property Details</span>
        </div>
        <Button
          isIconOnly
          variant="light"
          onPress={onClose}
          aria-label="Close property details"
        >
          <X size={20} />
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="h-[calc(100vh-64px)] overflow-y-auto">
        {/* Image Gallery */}
        <div className="relative h-[400px] bg-default-100">
          {property.images && property.images.length > 0 ? (
            <>
              <Image
                src={property.images[currentImageIndex]}
                alt={`Property at ${property.address}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = '/placeholder-house.jpg';
                }}
              />
              {/* Navigation Buttons */}
              {property.images.length > 1 && (
                <>
                  <Button
                    isIconOnly
                    variant="flat"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white z-10"
                    onPress={prevImage}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="flat"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white z-10"
                    onPress={nextImage}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </>
              )}
              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Home className="w-16 h-16 text-default-300" />
            </div>
          )}
        </div>

        {/* Property Info */}
        <div className="p-6 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-5 h-5 text-primary" />
              <span className="text-sm text-primary font-medium">{property.propertyType || 'Residential'}</span>
            </div>
            <h1 className="text-2xl font-bold">${property.price?.toLocaleString()}</h1>
            <p className="text-lg mt-2">{property.address}</p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-default-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Bed className="w-4 h-4" />
                <span>{property.beds} beds</span>
              </div>
            </div>
            <div className="p-4 bg-default-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Bath className="w-4 h-4" />
                <span>{property.baths} baths</span>
              </div>
            </div>
            <div className="p-4 bg-default-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Square className="w-4 h-4" />
                <span>{property.sqft?.toLocaleString()} sqft</span>
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <Card className="bg-primary-50">
            <CardBody className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-default-500">Zestimate</p>
                    <Tooltip content="Zillow's estimated market value for this property">
                      <Info className="w-3 h-3 text-default-400 cursor-help" />
                    </Tooltip>
                  </div>
                  <p className="font-semibold">${property.zestimate?.toLocaleString()}</p>
                  <span className="inline-block mt-1 bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full font-medium">
                    Source: Zillow
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-default-500">Annual Taxes</p>
                    <Tooltip content="Estimated annual property taxes - please verify with county assessor">
                      <Info className="w-3 h-3 text-default-400 cursor-help" />
                    </Tooltip>
                  </div>
                  <p className="font-semibold">${property.taxes?.toLocaleString()}</p>
                  <span className="inline-block mt-1 bg-danger-50 text-danger text-xs px-2 py-1 rounded-full font-medium">
                    Source: Zillow (Verify)
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-default-500">HOA Fees</p>
                    <Tooltip content="Monthly Homeowners Association fees - verify with HOA">
                      <Info className="w-3 h-3 text-default-400 cursor-help" />
                    </Tooltip>
                  </div>
                  <p className="font-semibold">${property.hoaFees?.toLocaleString()}/month</p>
                  <span className="inline-block mt-1 bg-warning-50 text-warning-700 text-xs px-2 py-1 rounded-full font-medium">
                    Source: Zillow (Verify)
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-default-500">Price per Sqft</p>
                    <Tooltip content="Calculated based on listing price and square footage">
                      <Info className="w-3 h-3 text-default-400 cursor-help" />
                    </Tooltip>
                  </div>
                  <p className="font-semibold">${property.pricePerSqft?.toLocaleString()}</p>
                  <span className="inline-block mt-1 bg-default-100 text-default-700 text-xs px-2 py-1 rounded-full font-medium">
                    Source: Calculated
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Description */}
          {property.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">About this home</h3>
              <p className="text-default-600 text-sm leading-relaxed">{property.description}</p>
            </div>
          )}

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schools */}
          {property.schools && property.schools.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Nearby Schools</h3>
              <div className="space-y-2">
                {property.schools.map((school, index) => (
                  <Card key={index}>
                    <CardBody className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{school.name}</h4>
                          <p className="text-sm text-default-500">{school.type} • {school.distance} miles</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <School className="w-4 h-4" />
                          <span className="font-semibold">{school.rating}/10</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Walk Score */}
          {(property.walkScore || property.transitScore) && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Transportation</h3>
              <div className="space-y-4">
                {property.walkScore && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Walk Score</span>
                      <span className="text-sm font-semibold">{property.walkScore}/100</span>
                    </div>
                    <Progress value={property.walkScore} className="h-2" color="success" />
                  </div>
                )}
                {property.transitScore && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Transit Score</span>
                      <span className="text-sm font-semibold">{property.transitScore}/100</span>
                    </div>
                    <Progress value={property.transitScore} className="h-2" color="primary" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 