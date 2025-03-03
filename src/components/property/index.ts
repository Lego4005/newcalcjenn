/**
 * Property components index file
 * Exports all property-related components and types
 */

// Export components
export { PropertyContext } from './PropertyContext';
export { PropertyList } from './PropertyList';
export { PropertyCard } from './PropertyCard';
export { PropertyDetails } from './PropertyDetails';
export { PropertyExpandedView } from './PropertyExpandedView';
export { AddPropertyModal } from './AddPropertyModal';

// Export types
export type {
  Property,
  PropertyPhoto,
  PropertyListProps,
  PropertyCardProps,
  PropertyDetailsProps,
  PropertyExpandedViewProps,
  AddPropertyModalProps,
  PropertyContextProps,
  PropertyFilterOptions
} from './types';

// Export utility functions
export {
  formatCurrency,
  formatDate,
  getStatusBadgeColor,
  isCalculationField,
  getFallbackPropertyImage,
  getFallbackPropertyImages,
  extractPropertyId,
  calculateMonthlyPayment
} from './utils';