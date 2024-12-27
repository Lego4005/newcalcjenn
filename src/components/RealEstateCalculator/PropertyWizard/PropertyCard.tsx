import { Card, CardBody, Image } from "@nextui-org/react";
import { Bed, Bath, Square, Calendar, TrendingUp, DollarSign } from "lucide-react";

interface PropertyCardProps {
  property: {
    address: string;
    price: number;
    beds?: number;
    baths?: number;
    sqft?: number;
    yearBuilt?: number;
    pricePerSqft?: number;
    marketValue?: number;
    imageUrl?: string;
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const {
    address,
    price,
    beds = 0,
    baths = 0,
    sqft = 0,
    yearBuilt = 0,
    pricePerSqft = 0,
    marketValue = 0,
    imageUrl = "/placeholder-house.jpg"
  } = property;

  const marketTrend = ((marketValue - price) / price * 100).toFixed(1);

  // Split address into parts for better display
  const addressParts = address.split(',').map(part => part.trim());
  const streetAddress = addressParts[0];
  const cityStateZip = addressParts.slice(1).join(', ');

  return (
    <Card className="w-full overflow-hidden">
      <CardBody className="p-0">
        {/* Property Image */}
        <div className="relative h-48">
          <Image
            src={imageUrl}
            alt={`Property at ${address}`}
            className="object-cover w-full h-full"
            radius="none"
          />
          <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-full">
            <span className="text-white font-semibold">
              ${price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Property Details */}
        <div className="p-4 space-y-4">
          {/* Address */}
          <div>
            <p className="text-default-500 text-sm">Property Address</p>
            <p className="font-semibold">{streetAddress}</p>
            <p className="text-sm text-default-500">{cityStateZip}</p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-default-400" />
              <span className="text-sm">{beds} Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 text-default-400" />
              <span className="text-sm">{baths} Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4 text-default-400" />
              <span className="text-sm">{sqft.toLocaleString()} sqft</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-default-400" />
              <span className="text-sm">{yearBuilt}</span>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Card className="bg-default-50">
              <CardBody className="p-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-success" />
                  <div>
                    <p className="text-xs text-default-500">Price per Sqft</p>
                    <p className="font-semibold">${pricePerSqft}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card className="bg-default-50">
              <CardBody className="p-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-default-500">Market Value</p>
                    <div className="flex items-center gap-1">
                      <p className="font-semibold">${marketValue.toLocaleString()}</p>
                      <span className={`text-xs ${Number(marketTrend) >= 0 ? 'text-success' : 'text-danger'}`}>
                        {marketTrend}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </CardBody>
    </Card>
  );
} 