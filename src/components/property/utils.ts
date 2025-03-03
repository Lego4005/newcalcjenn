/**
 * Utility functions for property components
 */

/**
 * Format a number as currency
 * @param value The number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number | undefined): string => {
  if (value === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Format a date string
 * @param dateString The date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Get the appropriate CSS classes for a property status badge
 * @param status The property status
 * @returns CSS class string
 */
export const getStatusBadgeColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-amber-100 text-amber-800';
    case 'closed':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Check if a field is used in calculations
 * @param fieldName The field name to check
 * @returns Boolean indicating if the field is used in calculations
 */
export const isCalculationField = (fieldName: string): boolean => {
  const calculationFields = ['price', 'taxAssessment', 'annualTaxAmount', 'zestimate'];
  return calculationFields.includes(fieldName);
};

/**
 * Get a fallback image URL if property images are not available
 * @param index Optional index to get a specific fallback image
 * @returns URL of fallback image
 */
export const getFallbackPropertyImage = (index: number = 0): string => {
  const fallbackImages = [
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
    'https://images.unsplash.com/photo-1576941089067-2de3c901e126',
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914'
  ];
  
  return fallbackImages[index % fallbackImages.length];
};

/**
 * Get an array of fallback property images
 * @param count Number of fallback images to return
 * @returns Array of fallback image URLs
 */
export const getFallbackPropertyImages = (count: number = 3): string[] => {
  return Array.from({ length: count }, (_, i) => getFallbackPropertyImage(i));
};

/**
 * Extract property ID from various formats
 * @param idOrUrl Property ID or URL containing ID
 * @returns Extracted property ID
 */
export const extractPropertyId = (idOrUrl: string): string => {
  // If it's already a simple ID, return it
  if (/^\d+$/.test(idOrUrl)) {
    return idOrUrl;
  }
  
  // Try to extract from URL patterns
  const urlMatch = idOrUrl.match(/property\/(\d+)/);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }
  
  // Fallback: just return the original
  return idOrUrl;
};

/**
 * Calculate estimated monthly payment
 * @param price Property price
 * @param downPaymentPercent Down payment percentage
 * @param interestRate Annual interest rate
 * @param loanTermYears Loan term in years
 * @returns Estimated monthly payment
 */
export const calculateMonthlyPayment = (
  price: number | string,
  downPaymentPercent: number = 20,
  interestRate: number = 6.5,
  loanTermYears: number = 30
): number => {
  // Convert price from string if needed
  const propertyPrice = typeof price === 'string' 
    ? parseFloat(price.replace(/[^0-9.]/g, ''))
    : price;
  
  if (!propertyPrice || propertyPrice <= 0) return 0;
  
  const downPayment = (downPaymentPercent / 100) * propertyPrice;
  const loanAmount = propertyPrice - downPayment;
  const monthlyInterest = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;
  
  // Monthly payment formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
  // Where: P = payment, L = loan amount, c = monthly interest rate, n = number of payments
  const monthlyPayment = loanAmount * 
    (monthlyInterest * Math.pow(1 + monthlyInterest, totalPayments)) / 
    (Math.pow(1 + monthlyInterest, totalPayments) - 1);
  
  return Math.round(monthlyPayment);
};