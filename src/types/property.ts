export type Property = {
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
}; 