import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 

// Added from researchly/lib/utils.ts
export const formatPrice = (price: number | undefined | null): string => {
  if (price === undefined || price === null) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDistance = (distanceKm: number): string => {
  const distanceMiles = distanceKm * 0.621371;
  return `${distanceMiles.toFixed(2)} miles`;
};

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

// Add this new function
export const formatAddress = (address: { streetAddress: string; city: string; state: string; zipcode: string } | undefined): string => {
  if (!address) {
    return "Address not available";
  }
  return `${address.streetAddress}, ${address.city}, ${address.state} ${address.zipcode}`;
}; 