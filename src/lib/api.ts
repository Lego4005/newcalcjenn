import axios from 'axios';
import type { ZillowPropertyResponse, ZillowSearchResponse } from '@/types/api';

const RAPID_API_KEY = '98499a597fmshc2fcb36de3731c3p1b3d92jsn537d51627506';
const RAPID_API_HOST = 'zillow-com1.p.rapidapi.com';

// Helper function to make API requests
const makeZillowRequest = async <T>(endpoint: string, params: Record<string, string>) => {
  const options = {
    method: 'GET',
    url: `https://${RAPID_API_HOST}/${endpoint}`,
    params,
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST
    }
  };

  const response = await axios.request<T>(options);
  return response.data;
};

export interface PropertyData {
  price?: number;
  taxes?: number;
  hoaFees?: number;
  address?: string;
  mortgageBalance?: number;
  beds?: number;
  baths?: number;
  sqft?: number;
  yearBuilt?: number;
  zestimate?: number;
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
}

export async function fetchPropertyDetails(address: string): Promise<PropertyData> {
  try {
    // First, get the basic property data which includes the ZPID
    const data = await makeZillowRequest<ZillowPropertyResponse>('property', { address });
    console.log('Zillow API Response:', data);

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid property data received from API');
    }

    // Initialize images array
    const images: string[] = [];

    // Try to get images from different possible sources in the main response
    if (data.imgSrc) {
      images.push(data.imgSrc);
    }

    // Extract price from various possible fields or use a default value
    const defaultPrice = 500000; // Default price for testing
    let price = defaultPrice;

    if (typeof data.price === 'number' && data.price > 0) {
      price = data.price;
    } else if (typeof data.listPrice === 'number' && data.listPrice > 0) {
      price = data.listPrice;
    } else if (typeof data.zestimate === 'number' && data.zestimate > 0) {
      price = data.zestimate;
    }

    // Create property data with validation and default values
    const propertyData: PropertyData = {
      price,
      taxes: data.propertyTaxRate ? Math.round(price * data.propertyTaxRate / 100) : Math.round(price * 0.02), // Default 2% tax rate
      hoaFees: typeof data.monthlyHoaFee === 'number' ? data.monthlyHoaFee : 0,
      address: address,
      beds: typeof data.bedrooms === 'number' ? data.bedrooms : 3, // Default 3 beds
      baths: typeof data.bathrooms === 'number' ? data.bathrooms : 2, // Default 2 baths
      sqft: data.livingArea ?? data.resoFacts?.livingArea ?? 2000, // Default 2000 sqft
      yearBuilt: data.yearBuilt ?? new Date().getFullYear() - 20, // Default 20 years old
      zestimate: data.zestimate ?? price,
      images,
      description: data.description ?? "Beautiful property in a desirable location",
      lotSize: data.resoFacts?.lotSize ?? 5000, // Default 5000 sqft lot
      parkingSpaces: data.resoFacts?.parkingSpaces ?? 2,
      propertyType: data.propertyTypeDimension ?? data.homeType ?? "Single Family",
      lastSoldPrice: data.dateSold ? data.price : undefined,
      lastSoldDate: data.dateSold || undefined,
      priceHistory: data.priceHistory || [],
      features: data.features || [],
      schools: data.schools || [],
      walkScore: typeof data.walkScore === 'number' ? data.walkScore : 75,
      transitScore: typeof data.transitScore === 'number' ? data.transitScore : 65
    };

    console.log('Processed property data:', propertyData);
    return propertyData;
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error;
  }
}

export async function searchProperties(query: string): Promise<ZillowSearchResponse[]> {
  try {
    const data = await makeZillowRequest<{ props: ZillowSearchResponse[] }>('propertyExtendedSearch', {
      location: query,
      page: '1',
      status_type: 'ForSale'
    });
    return data?.props ?? [];
  } catch (error) {
    console.error('Error searching properties:', error);
    return [];
  }
}