import axios from 'axios';

const RAPID_API_KEY = '98499a597fmshc2fcb36de3731c3p1b3d92jsn537d51627506';
const RAPID_API_HOST = 'zillow-com1.p.rapidapi.com';

// Helper function to make API requests
const makeZillowRequest = async (endpoint: string, params: any) => {
  const options = {
    method: 'GET',
    url: `https://${RAPID_API_HOST}/${endpoint}`,
    params,
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST
    }
  };

  const response = await axios.request(options);
  return response.data;
};

// Function to fetch property images
async function fetchPropertyImages(zpid: string): Promise<string[]> {
  try {
    const data = await makeZillowRequest('images', { zpid });
    console.log('Images API Response:', data);
    
    // Check different possible image sources in the response
    const images: string[] = [];
    
    // Check for images array
    if (Array.isArray(data.images)) {
      images.push(...data.images);
    }
    
    // Check for hdpPhotos
    if (data.hdpPhotos && Array.isArray(data.hdpPhotos)) {
      images.push(...data.hdpPhotos.map((photo: any) => photo.url || photo.photoUrl || photo));
    }
    
    // Check for large format images
    if (data.largePhotos && Array.isArray(data.largePhotos)) {
      images.push(...data.largePhotos.map((photo: any) => photo.url || photo.photoUrl || photo));
    }

    return [...new Set(images)]; // Remove duplicates
  } catch (error) {
    console.error('Error fetching property images:', error);
    return [];
  }
}

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
    const data = await makeZillowRequest('property', { address });
    console.log('Zillow API Response:', data);

    // Get the ZPID from the response
    const zpid = data.zpid;
    
    // Initialize images array
    let images: string[] = [];

    // Try to get images from different possible sources in the main response
    if (data.imgSrc) {
      images.push(data.imgSrc);
    }

    // Extract price from various possible fields
    let price = 3345400; // Default price for testing
    if (typeof data.price === 'number') {
      price = data.price;
    } else if (typeof data.listPrice === 'number') {
      price = data.listPrice;
    } else if (typeof data.zestimate === 'number') {
      price = data.zestimate;
    }

    // Create property data
    const propertyData: PropertyData = {
      price,
      taxes: data.propertyTaxRate ? Math.round(price * data.propertyTaxRate / 100) : 0,
      hoaFees: data.monthlyHoaFee || 0,
      address,
      beds: data.bedrooms || 0,
      baths: data.bathrooms || 0,
      sqft: data.livingArea || data.resoFacts?.livingArea || 0,
      yearBuilt: data.yearBuilt || 0,
      zestimate: data.zestimate || price,
      images,
      description: data.description || "Beautiful home in a desirable neighborhood.",
      lotSize: data.resoFacts?.lotSize || 0,
      parkingSpaces: data.resoFacts?.parkingSpaces || 2,
      propertyType: data.propertyTypeDimension || data.homeType || "Single Family",
      lastSoldPrice: data.dateSold ? data.price : 0,
      lastSoldDate: data.dateSold || "",
      priceHistory: [],
      features: [],
      schools: [],
      walkScore: data.walkScore || 75,
      transitScore: data.transitScore || 65,
      pricePerSqft: data.livingArea ? Math.round(price / data.livingArea) : 0,
      marketValue: data.zestimate || price
    };

    console.log('Processed property data:', propertyData);
    return propertyData;
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error;
  }
}

export async function searchProperties(query: string): Promise<any[]> {
  try {
    const data = await makeZillowRequest('propertyExtendedSearch', {
      location: query,
      page: '1',
      status_type: 'ForSale'
    });
    return data?.props || [];
  } catch (error) {
    console.error('Error searching properties:', error);
    return [];
  }
} 