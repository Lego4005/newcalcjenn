export type AddressFeature = {
  place_name: string;
  center: [number, number];
  properties: {
    address?: string;
    postcode?: string;
    city?: string;
    state?: string;
  };
}; 