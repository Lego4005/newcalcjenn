'use client'

/**
 * Utility functions for fetching property data from RapidAPI
 */

// Define property data interface
interface PropertyApiResponse {
  property_id?: string;
  address?: {
    line?: string;
  };
  price?: number;
  thumbnail?: string;
  beds?: number;
  baths?: number;
  building_size?: {
    size?: number;
  };
  year_built?: number | string;
  prop_type?: string;
  lot_size?: {
    size?: number;
  };
  description?: string;
  photos?: Array<{
    href: string;
  }>;
  // Zillow API specific fields
  zpid?: string;
  streetAddress?: string;
  zipcode?: string;
  city?: string;
  state?: string;
  price_raw?: number;
  bedrooms?: number;
  bathrooms?: number;
  livingArea?: number;
  yearBuilt?: number;
  propertyType?: string;
  lotAreaValue?: number;
  description_raw?: string;
  imgSrc?: string;
  images?: string[];
  // Zillow API image fields
  hugePhotos?: Array<{
    caption: string;
    height: number;
    url: string;
    width: number;
  }>;
  big?: Array<{
    subjectType: null;
    url: string;
    width: number;
  }>;
  responsivePhotos?: Array<{
    caption: string;
    mixedSources: {
      jpeg: Array<{
        url: string;
        width: number;
      }>;
      webp: Array<{
        url: string;
        width: number;
      }>;
    };
  }>;
}

// Function to fetch property details by address
export async function fetchPropertyByAddress(address: string) {
  try {
    // Using the Zillow56 API endpoint suggested by the user
    const url = 'https://zillow56.p.rapidapi.com/search';
    
    const params = new URLSearchParams({
      location: address,
      output: 'json',
      status: 'forSale',
      sortSelection: 'priorityscore',
      listing_type: 'by_agent',
      doz: 'any'
    });
    
    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
        'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.results?.[0] as PropertyApiResponse || null;
  } catch (error) {
    console.error('Error fetching property data:', error);
    return null;
  }
}

// Function to fetch property images
export async function fetchPropertyImages(propertyId: string) {
  try {
    // Using the Zillow69 API endpoint for property details
    const url = 'https://zillow69.p.rapidapi.com/property';
    
    const params = new URLSearchParams({
      zpid: propertyId
    });
    
    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
        'X-RapidAPI-Host': 'zillow69.p.rapidapi.com'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    // Convert image URLs to the format expected by our application
    return data.images?.map((image: string) => ({ href: image })) || [];
  } catch (error) {
    console.error('Error fetching property images:', error);
    return [];
  }
}

// Function to format property data for our application
export function formatPropertyData(propertyData: PropertyApiResponse | null) {
  if (!propertyData) return null;
  
  // Extract images from the property data
  let images: Array<{ href: string }> = [];
  
  // Check for different image formats in the API response
  if (propertyData.hugePhotos && propertyData.hugePhotos.length > 0) {
    images = propertyData.hugePhotos.map(photo => ({ href: photo.url }));
  } else if (propertyData.big && propertyData.big.length > 0) {
    images = propertyData.big.map(photo => ({ href: photo.url }));
  } else if (propertyData.responsivePhotos && propertyData.responsivePhotos.length > 0) {
    // Get the largest jpeg image from each responsive photo
    images = propertyData.responsivePhotos.map(photo => {
      const jpegImages = photo.mixedSources.jpeg;
      const largestImage = jpegImages.reduce((prev, current) => 
        (prev.width > current.width) ? prev : current
      );
      return { href: largestImage.url };
    });
  } else if (propertyData.photos && propertyData.photos.length > 0) {
    images = propertyData.photos;
  } else if (propertyData.images && propertyData.images.length > 0) {
    images = propertyData.images.map(image => ({ href: image }));
  }
  
  // Set the main image
  const mainImage = images.length > 0 ? 
    images[0].href : 
    (propertyData.imgSrc || 
     propertyData.thumbnail || 
     'https://images.unsplash.com/photo-1568605114967-8130f3a36994');
  
  return {
    id: propertyData.zpid || propertyData.property_id || String(Date.now()),
    address: propertyData.streetAddress || 
             (propertyData.address?.line) || 
             `${propertyData.city || ''}, ${propertyData.state || ''} ${propertyData.zipcode || ''}`,
    price: propertyData.price_raw ? 
           `$${propertyData.price_raw.toLocaleString()}` : 
           (propertyData.price ? `$${propertyData.price.toLocaleString()}` : ''),
    image: mainImage,
    status: 'active' as const,
    // Additional data
    bedrooms: propertyData.bedrooms || propertyData.beds || 0,
    bathrooms: propertyData.bathrooms || propertyData.baths || 0,
    squareFeet: propertyData.livingArea || 
                (propertyData.building_size?.size) || 0,
    yearBuilt: propertyData.yearBuilt || 
               propertyData.year_built || 'Unknown',
    propertyType: propertyData.propertyType || 
                  propertyData.prop_type || 'Unknown',
    lotSize: propertyData.lotAreaValue || 
             (propertyData.lot_size?.size) || 0,
    description: propertyData.description_raw || 
                 propertyData.description || '',
    // Add the photos array to the property data
    photos: images
  };
}

// Function to get fallback property images if API fails
export function getFallbackPropertyImages() {
  return [
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
    'https://images.unsplash.com/photo-1576941089067-2de3c901e126',
    'https://images.unsplash.com/photo-1560184897-ae75f418493e'
  ];
}