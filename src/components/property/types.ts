/**
 * Type definitions for property components
 */

/**
 * Property interface representing a real estate property
 */
export interface Property {
  id: string;
  address: string;
  price: string;
  image: string;
  status: 'active' | 'pending' | 'closed';
  
  // Additional data
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  yearBuilt?: string | number;
  propertyType?: string;
  lotSize?: number;
  description?: string;
  photos?: PropertyPhoto[];
  lastTouched?: string;
  
  // Financial data
  taxAssessment?: number;
  zestimate?: number;
  rentZestimate?: number;
  lotSizeSqFt?: number;
  hoaFee?: number;
  annualTaxAmount?: number;
  parcelId?: string;
}

/**
 * Property photo interface
 */
export interface PropertyPhoto {
  href: string;
  [key: string]: unknown;
}

/**
 * Property list props interface
 */
export interface PropertyListProps {
  properties: Property[];
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
  isSidebarView?: boolean;
}

/**
 * Property card props interface
 */
export interface PropertyCardProps {
  property: Property;
  isSelected: boolean;
  onSelect: (property: Property) => void;
  isSidebarView?: boolean;
}

/**
 * Property details props interface
 */
export interface PropertyDetailsProps {
  property: Property;
  onLoadToCalculator?: (property: Property) => void;
}

/**
 * Property expanded view props interface
 */
export interface PropertyExpandedViewProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onLoadToCalculator?: (property: Property) => void;
}

/**
 * Add property modal props interface
 */
export interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty: (property: Property) => void;
}

/**
 * Property context props interface
 */
export interface PropertyContextProps {
  isCompact?: boolean;
  onLoadPropertyToCalculator?: (property: Property) => void;
}

/**
 * Property filter options
 */
export interface PropertyFilterOptions {
  status?: 'active' | 'pending' | 'closed' | 'all';
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  minSquareFeet?: number;
  maxYearBuilt?: number;
  minYearBuilt?: number;
  propertyType?: string;
}