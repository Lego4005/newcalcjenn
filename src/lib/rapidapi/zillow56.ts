// Utility functions for Zillow56 RapidAPI
// TODO: Define specific types for API responses instead of using unknown/any

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const ZILLOW56_API_HOST = 'zillow56.p.rapidapi.com';

if (!RAPID_API_KEY) {
  console.warn('RAPID_API_KEY environment variable is not set. Zillow56 API calls will fail.');
}

const defaultHeaders = {
  'x-rapidapi-key': RAPID_API_KEY || '',
  'x-rapidapi-host': ZILLOW56_API_HOST,
};

/**
 * Searches for a property by address using the Zillow56 API.
 * First finds location suggestions, then fetches property details using the ZPID.
 * @param address The property address string.
 * @returns Property details object or an error object.
 */
export async function searchPropertyByAddress(address: string): Promise<unknown> {
  if (!RAPID_API_KEY) {
    return { error: 'RAPID_API_KEY is not configured.' };
  }

  try {
    // 1. Get location suggestions to find ZPID
    console.log(`Fetching location suggestions for: ${address}`);
    const locationUrl = `https://${ZILLOW56_API_HOST}/locationSuggestions?query=${encodeURIComponent(address)}`;
    const locationResponse = await fetch(locationUrl, {
      method: 'GET',
      headers: defaultHeaders,
    });

    console.log(`Location suggestions response status: ${locationResponse.status}`);
    if (!locationResponse.ok) {
      const errorText = await locationResponse.text();
      console.error('Location suggestions API error:', errorText);
      throw new Error(`Location suggestions API failed with status ${locationResponse.status}: ${errorText}`);
    }

    const locations = await locationResponse.json();
    console.log('Location suggestions received:', locations);

    if (!locations || !Array.isArray(locations) || locations.length === 0 || !locations[0].zpid) {
      console.log('No ZPID found for the address.');
      return { error: 'Address not found or ZPID missing in suggestions.' };
    }

    const zpid = locations[0].zpid;
    console.log(`Found ZPID: ${zpid}`);

    // 2. Get property details using the ZPID
    console.log(`Fetching property details for ZPID: ${zpid}`);
    const propertyUrl = `https://${ZILLOW56_API_HOST}/property?zpid=${zpid}`;
    const propertyResponse = await fetch(propertyUrl, {
      method: 'GET',
      headers: defaultHeaders,
    });

    console.log(`Property details response status: ${propertyResponse.status}`);
    if (!propertyResponse.ok) {
      const errorText = await propertyResponse.text();
      console.error('Property details API error:', errorText);
      throw new Error(`Property details API failed with status ${propertyResponse.status}: ${errorText}`);
    }

    const propertyData = await propertyResponse.json();
    console.log('Property details received:', propertyData);
    return propertyData;

  } catch (error: unknown) {
    console.error('Error in searchPropertyByAddress:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { error: `Failed to fetch property data: ${errorMessage}` };
  }
}

/**
 * Fetches property images using the Zillow56 API.
 * @param zpid The Zillow Property ID.
 * @returns An array of image URLs or an error object.
 */
export async function getPropertyImages(zpid: string | number): Promise<string[] | { error: string }> {
   if (!RAPID_API_KEY) {
    return { error: 'RAPID_API_KEY is not configured.' };
  }
  if (!zpid) {
     return { error: 'ZPID is required to fetch images.' };
  }

  try {
    console.log(`Fetching images for ZPID: ${zpid}`);
    const imageUrl = `https://${ZILLOW56_API_HOST}/images?zpid=${zpid}`;
    const response = await fetch(imageUrl, {
      method: 'GET',
      headers: defaultHeaders,
    });

    console.log(`Images response status: ${response.status}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Images API error:', errorText);
      throw new Error(`Images API failed with status ${response.status}: ${errorText}`);
    }

    const imageData = await response.json();
    console.log('Image data received:', imageData);
    
    // TODO: Replace unknown assertion with proper type for imageData
    // Assuming the response is an array of objects with a 'url' property
    if (Array.isArray(imageData) && imageData.length > 0) {
      return imageData.map((img: unknown) => (img as { url: string })?.url).filter(Boolean);
    } else if (imageData && typeof imageData === 'object' && Array.isArray((imageData as { images?: unknown[] })?.images)) {
       // Simplified check for nested images array
       return (imageData as { images: unknown[] }).images.map((img: unknown) => (img as { url: string })?.url).filter(Boolean);
    }
    
    return []; // Return empty array if no images found

  } catch (error: unknown) {
    console.error('Error in getPropertyImages:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { error: `Failed to fetch property images: ${errorMessage}` };
  }
}

/**
 * Fetches price and tax history using the Zillow56 API.
 * @param zpid The Zillow Property ID.
 * @returns Price/tax history data or an error object.
 */
export async function getPriceAndTaxHistory(zpid: string | number): Promise<unknown> {
  if (!RAPID_API_KEY) return { error: 'RAPID_API_KEY is not configured.' };
  if (!zpid) return { error: 'ZPID is required.' };

  try {
    console.log(`Fetching price/tax history for ZPID: ${zpid}`);
    const url = `https://${ZILLOW56_API_HOST}/priceAndTaxHistory?zpid=${zpid}`;
    const response = await fetch(url, { method: 'GET', headers: defaultHeaders });
    if (!response.ok) throw new Error(`API failed: ${response.status} ${await response.text()}`);
    const data = await response.json();
    console.log('Price/tax history received:', data);
    return data;
  } catch (error: unknown) {
    console.error('Error in getPriceAndTaxHistory:', error);
    return { error: `Failed to fetch price/tax history: ${error instanceof Error ? error.message : String(error)}` };
  }
}

/**
 * Fetches estimated mortgage payments using the Zillow56 API.
 * @param zpid The Zillow Property ID.
 * @param price Optional: The price to base the estimate on (defaults to Zillow's data if not provided).
 * @param downPayment Optional: The down payment amount (defaults to 20% if not provided).
 * @returns Mortgage estimate data or an error object.
 */
export async function getPropertyEstimateMortgage(
  zpid: string | number,
  price?: number,
  downPayment?: number
): Promise<unknown> {
  if (!RAPID_API_KEY) return { error: 'RAPID_API_KEY is not configured.' };
  if (!zpid) return { error: 'ZPID is required.' };

  try {
    console.log(`Fetching mortgage estimate for ZPID: ${zpid}`);
    let url = `https://${ZILLOW56_API_HOST}/propertyEstimateMortgage?zpid=${zpid}`;
    if (price) url += `&price=${price}`;
    if (downPayment) url += `&down=${downPayment}`;
    
    const response = await fetch(url, { method: 'GET', headers: defaultHeaders });
    if (!response.ok) throw new Error(`API failed: ${response.status} ${await response.text()}`);
    const data = await response.json();
    console.log('Mortgage estimate received:', data);
    return data;
  } catch (error: unknown) {
    console.error('Error in getPropertyEstimateMortgage:', error);
    return { error: `Failed to fetch mortgage estimate: ${error instanceof Error ? error.message : String(error)}` };
  }
}

/**
 * Fetches the Zestimate for a property using the Zillow56 API.
 * @param zpid The Zillow Property ID.
 * @returns Zestimate data or an error object.
 */
export async function getZestimate(zpid: string | number): Promise<unknown> {
  if (!RAPID_API_KEY) return { error: 'RAPID_API_KEY is not configured.' };
  if (!zpid) return { error: 'ZPID is required.' };

  try {
    console.log(`Fetching Zestimate for ZPID: ${zpid}`);
    const url = `https://${ZILLOW56_API_HOST}/zestimate?zpid=${zpid}`;
    const response = await fetch(url, { method: 'GET', headers: defaultHeaders });
    if (!response.ok) throw new Error(`API failed: ${response.status} ${await response.text()}`);
    const data = await response.json();
    console.log('Zestimate received:', data);
    return data;
  } catch (error: unknown) {
    console.error('Error in getZestimate:', error);
    return { error: `Failed to fetch Zestimate: ${error instanceof Error ? error.message : String(error)}` };
  }
}

// Add other Zillow56 API functions here... 