import { PropertyMetrics } from './metrics'

export interface DemoProperty {
  address: string
  purchasePrice: number
  monthlyIncome: number
  propertyTax: number
  insurance: number
  listingAgentRate: number
  buyerAgentRate: number
  settlementFee: number
  titleSearch: number
  municipalLienSearch: number
  hoaDues: number
  hoaEstoppelFee: number
}

// Generate historical data points with realistic trends
function generateHistoricalData(
  startValue: number,
  months: number,
  volatility: number = 0.02,
  trend: number = 0.005
): Array<{ value: number; timestamp: string }> {
  const data: Array<{ value: number; timestamp: string }> = []
  let currentValue = startValue

  for (let i = 0; i < months; i++) {
    // Add random variation with trend
    const randomChange = (Math.random() - 0.5) * 2 * volatility
    const trendChange = trend
    currentValue = currentValue * (1 + randomChange + trendChange)

    // Generate timestamp for i months ago
    const date = new Date()
    date.setMonth(date.getMonth() - (months - i - 1))

    data.push({
      value: Math.round(currentValue * 100) / 100,
      timestamp: date.toISOString()
    })
  }

  return data
}

// Generate demo metrics data
export function generateDemoMetrics(property: DemoProperty): PropertyMetrics {
  const annualIncome = property.monthlyIncome * 12
  const annualExpenses = property.propertyTax + property.insurance + 
    (property.hoaDues * 12) + property.settlementFee + 
    property.titleSearch + property.municipalLienSearch
  const netOperatingIncome = annualIncome - annualExpenses
  const downPayment = property.purchasePrice * 0.20 // Assume 20% down payment
  const annualDebtService = (property.purchasePrice - downPayment) * 0.06 // Assume 6% interest

  return {
    propertyValue: property.purchasePrice,
    monthlyIncome: property.monthlyIncome,
    roi: (netOperatingIncome / property.purchasePrice) * 100,
    capRate: (netOperatingIncome / property.purchasePrice) * 100,
    cashOnCash: (netOperatingIncome / downPayment) * 100,
    debtServiceCoverage: netOperatingIncome / annualDebtService,
    grossRentMultiplier: property.purchasePrice / annualIncome,
    netOperatingIncome: netOperatingIncome
  }
}

// Generate demo property with historical data
export function generateDemoPropertyData(): {
  property: DemoProperty
  historicalData: Array<{
    timestamp: string
    metrics: PropertyMetrics
  }>
} {
  const demoProperty: DemoProperty = {
    address: "123 Demo Street, Miami, FL 33101",
    purchasePrice: 450000,
    monthlyIncome: 3200,
    propertyTax: 4200,
    insurance: 1200,
    listingAgentRate: 3.0,
    buyerAgentRate: 3.0,
    settlementFee: 595,
    titleSearch: 150,
    municipalLienSearch: 150,
    hoaDues: 250,
    hoaEstoppelFee: 250
  }

  // Generate 12 months of historical data
  const propertyValueHistory = generateHistoricalData(demoProperty.purchasePrice, 12, 0.02, 0.005)
  const monthlyIncomeHistory = generateHistoricalData(demoProperty.monthlyIncome, 12, 0.01, 0.003)

  const historicalData = propertyValueHistory.map((pvh, index) => {
    const historicalProperty = {
      ...demoProperty,
      purchasePrice: pvh.value,
      monthlyIncome: monthlyIncomeHistory[index].value
    }

    return {
      timestamp: pvh.timestamp,
      metrics: generateDemoMetrics(historicalProperty)
    }
  })

  return {
    property: demoProperty,
    historicalData
  }
}