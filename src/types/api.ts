import type { TransactionDetails, PropertyMetrics, PropertyFormData } from './property';

export interface ZillowPropertyResponse {
  zpid?: string;
  price?: number;
  listPrice?: number;
  zestimate?: number;
  imgSrc?: string;
  propertyTaxRate?: number;
  monthlyHoaFee?: number;
  bedrooms?: number;
  bathrooms?: number;
  livingArea?: number;
  yearBuilt?: number;
  description?: string;
  propertyTypeDimension?: string;
  homeType?: string;
  dateSold?: string;
  walkScore?: number;
  transitScore?: number;
  resoFacts?: {
    livingArea?: number;
    lotSize?: number;
    parkingSpaces?: number;
  };
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
}

export interface PropertyData {
  id: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  lotSize: number;
  propertyType: string;
  status: 'Active' | 'Pending' | 'Sold';
  images: string[];
  source?: {
    name: string;
    fetchDate: string;
  };
  transactionDetails?: TransactionDetails;
  metrics?: PropertyMetrics;
  formData?: PropertyFormData;
  zpid?: string;
  propertyTaxRate?: number;
  monthlyHoaFee?: number;
  description?: string;
}

export interface ZillowSearchResponse {
  zpid: string;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zipcode: string;
  };
  price: number;
  beds: number;
  baths: number;
  area: number;
  latLong: {
    latitude: number;
    longitude: number;
  };
}