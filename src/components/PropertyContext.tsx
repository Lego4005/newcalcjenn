'use client'

import { PropertyContext as PropertyContextComponent } from './property'
import { Property } from './property/types'

export function PropertyContext() {
  // This function would be connected to the calculator components
  const handleLoadPropertyToCalculator = (property: Property) => {
    // In a real implementation, this would update the calculator state
    console.log('Loading property into calculator:', property)
    
    // Example of what might happen:
    // - Update price field in NetSellerCalculator
    // - Update tax information
    // - Update property details
    // - etc.
  }
  
  return <PropertyContextComponent onLoadPropertyToCalculator={handleLoadPropertyToCalculator} />
}
