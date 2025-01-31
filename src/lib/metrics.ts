import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { supabaseUrl, supabaseAnonKey } from './supabaseClient'
import type { Property } from '@/components/RealEstateCalculator/BulkCalculator'

export interface PropertyMetrics {
  propertyValue: number
  monthlyIncome: number
  roi: number
  capRate: number
  cashOnCash: number
  debtServiceCoverage: number
  grossRentMultiplier: number
  netOperatingIncome: number
}

export interface MetricsHistory {
  timestamp: string
  metrics: PropertyMetrics
}

export interface MetricTrend {
  current: number
  previous: number
  change: number
  isPositive: boolean
  data: Array<{ value: number; timestamp?: string }>
}

export interface PropertyTrends {
  propertyValue: MetricTrend
  monthlyIncome: MetricTrend
  roi: MetricTrend
  capRate: MetricTrend
  cashOnCash: MetricTrend
  debtServiceCoverage: MetricTrend
  grossRentMultiplier: MetricTrend
  netOperatingIncome: MetricTrend
}

// Calculate metrics for a single property
export async function calculatePropertyMetrics(property: Property): Promise<PropertyMetrics> {
  const {
    purchasePrice,
    downPayment,
    interestRate,
    propertyTax,
    insurance,
    listingAgentRate,
    buyerAgentRate
  } = property.formData;

  // Calculate loan amount and monthly payment
  const loanAmount = purchasePrice - downPayment;
  const monthlyInterestRate = interestRate / 12 / 100;
  const numberOfPayments = 30 * 12; // 30-year fixed
  
  const monthlyPayment = loanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  // Calculate annual expenses
  const totalCommission = purchasePrice * (listingAgentRate + buyerAgentRate) / 100;
  const annualDebtService = monthlyPayment * 12;
  const totalAnnualExpenses = propertyTax + insurance + (totalCommission / 30); // Amortize commission over 30 years

  // Calculate key metrics
  const grossAnnualIncome = purchasePrice * 0.08; // Assuming 8% annual return
  const netOperatingIncome = grossAnnualIncome - totalAnnualExpenses;
  const monthlyIncome = grossAnnualIncome / 12;
  
  return {
    propertyValue: purchasePrice,
    monthlyIncome,
    roi: (netOperatingIncome / purchasePrice) * 100,
    capRate: (netOperatingIncome / purchasePrice) * 100,
    cashOnCash: (netOperatingIncome / downPayment) * 100,
    debtServiceCoverage: netOperatingIncome / annualDebtService,
    grossRentMultiplier: purchasePrice / (monthlyIncome * 12),
    netOperatingIncome
  };
}

// Calculate the trend data for a specific metric
export function calculateMetricTrend(
  history: MetricsHistory[],
  metricKey: keyof PropertyMetrics
): MetricTrend {
  if (!history.length) {
    return {
      current: 0,
      previous: 0,
      change: 0,
      isPositive: false,
      data: []
    }
  }

  const values = history.map(h => ({
    value: h.metrics[metricKey],
    timestamp: h.timestamp
  }))

  const current = values[values.length - 1].value
  const previous = values.length > 1 ? values[values.length - 2].value : current
  const change = previous !== 0 ? ((current - previous) / previous) * 100 : 0

  return {
    current,
    previous,
    change,
    isPositive: change >= 0,
    data: values
  }
}

// Store new metrics for a property
export async function storePropertyMetrics(
  propertyId: string,
  propertyValue: number,
  monthlyIncome: number,
  purchasePrice: number,
  downPayment: number,
  monthlyExpenses: number,
  annualDebtService: number
): Promise<string> {
  const supabase = createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })

  const { data, error } = await supabase
    .rpc('store_property_metrics', {
      p_property_id: propertyId,
      p_property_value: propertyValue,
      p_monthly_income: monthlyIncome,
      p_purchase_price: purchasePrice,
      p_down_payment: downPayment,
      p_monthly_expenses: monthlyExpenses,
      p_annual_debt_service: annualDebtService
    })

  if (error) {
    throw new Error(`Error storing property metrics: ${error.message}`)
  }

  return data
}

// Get metrics history for a property
export async function getPropertyMetricsHistory(
  propertyId: string,
  startDate?: Date,
  endDate?: Date
): Promise<MetricsHistory[]> {
  const supabase = createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })

  const { data, error } = await supabase
    .rpc('get_property_metrics_history', {
      p_property_id: propertyId,
      p_start_date: startDate?.toISOString(),
      p_end_date: endDate?.toISOString()
    })

  if (error) {
    throw new Error(`Error fetching property metrics history: ${error.message}`)
  }

  return data || []
}

// Calculate all trends for a property
export async function calculatePropertyTrends(
  propertyId: string,
  startDate?: Date,
  endDate?: Date
): Promise<PropertyTrends> {
  const history = await getPropertyMetricsHistory(propertyId, startDate, endDate)

  return {
    propertyValue: calculateMetricTrend(history, 'propertyValue'),
    monthlyIncome: calculateMetricTrend(history, 'monthlyIncome'),
    roi: calculateMetricTrend(history, 'roi'),
    capRate: calculateMetricTrend(history, 'capRate'),
    cashOnCash: calculateMetricTrend(history, 'cashOnCash'),
    debtServiceCoverage: calculateMetricTrend(history, 'debtServiceCoverage'),
    grossRentMultiplier: calculateMetricTrend(history, 'grossRentMultiplier'),
    netOperatingIncome: calculateMetricTrend(history, 'netOperatingIncome')
  }
}

// Format metric value based on type
export function formatMetricValue(value: number, metricKey: keyof PropertyMetrics): string {
  switch (metricKey) {
    case 'propertyValue':
    case 'monthlyIncome':
    case 'netOperatingIncome':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value)
    case 'roi':
    case 'capRate':
    case 'cashOnCash':
      return value.toFixed(2) + '%'
    case 'debtServiceCoverage':
    case 'grossRentMultiplier':
      return value.toFixed(2)
    default:
      return value.toString()
  }
}

// Get metric description
export function getMetricDescription(metricKey: keyof PropertyMetrics): string {
  const descriptions: Record<keyof PropertyMetrics, string> = {
    propertyValue: 'Current market value of the property',
    monthlyIncome: 'Monthly rental or operational income',
    roi: 'Return on Investment - Annual return relative to total investment',
    capRate: 'Capitalization Rate - NOI relative to property value',
    cashOnCash: 'Cash-on-Cash Return - Annual return relative to down payment',
    debtServiceCoverage: 'Debt Service Coverage Ratio - NOI relative to debt obligations',
    grossRentMultiplier: 'Gross Rent Multiplier - Property value relative to annual income',
    netOperatingIncome: 'Net Operating Income - Annual income minus operating expenses'
  }

  return descriptions[metricKey]
}