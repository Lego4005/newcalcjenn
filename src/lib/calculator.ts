import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { CalculatorFormData, CalculatorDefaults } from '@/types/calculator'
import { supabaseUrl, supabaseAnonKey } from './supabaseClient'

interface SavedCalculation {
  id: string
  name: string
  property_details: CalculatorFormData['propertyDetails']
  mortgage_info: CalculatorFormData['mortgageInfo']
  commission_structure: CalculatorFormData['commissionStructure']
  additional_fees: CalculatorFormData['additionalFees']
  created_at: string
  updated_at: string
}

// Calculate doc stamps based on FL rate
export function calculateDocStamps(salePrice: number, rate: number = 0.70): number {
  return (salePrice / 100) * rate;
}

// Calculate title insurance based on FL formula
export function calculateTitleInsurance(
  salePrice: number,
  hasPriorPolicy: boolean = false,
  priorAmount: number = 0,
  baseRate: number = 5.75,
  excessRate: number = 5.00
): number {
  let baseInsurance;
  if (salePrice <= 100000) {
    baseInsurance = (salePrice / 1000) * baseRate;
  } else {
    const firstTier = 100000 / 1000 * baseRate;
    const remainingAmount = (salePrice - 100000) / 1000 * excessRate;
    baseInsurance = firstTier + remainingAmount;
  }

  // Apply reissue rate if there's a prior policy
  if (hasPriorPolicy && priorAmount > 0) {
    // Calculate reissue credit (typically 40% of the overlapping coverage)
    const overlapAmount = Math.min(priorAmount, salePrice);
    const reissueCredit = calculateTitleInsurance(overlapAmount) * 0.4;
    return baseInsurance - reissueCredit;
  }

  return baseInsurance;
}

// Get calculator defaults from the database
export async function getCalculatorDefaults(): Promise<CalculatorDefaults> {
  const supabase = createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })

  const { data, error } = await supabase
    .from('calculator_defaults')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) {
    throw new Error(`Error fetching calculator defaults: ${error.message}`)
  }

  return {
    defaultBuyerAgentCommission: data.default_buyer_agent_commission,
    defaultSellerAgentCommission: data.default_seller_agent_commission,
    defaultSettlementFee: data.default_settlement_fee,
    defaultTitleSearch: data.default_title_search,
    defaultMunicipalLienSearch: data.default_municipal_lien_search,
    defaultDocStampRate: data.default_doc_stamp_rate,
    titleInsuranceBaseRate: data.title_insurance_base_rate,
    titleInsuranceExcessRate: data.title_insurance_excess_rate,
  }
}

// Update calculator defaults
export async function updateCalculatorDefaults(defaults: CalculatorDefaults): Promise<void> {
  const supabase = createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })

  const { error } = await supabase
    .from('calculator_defaults')
    .update({
      default_buyer_agent_commission: defaults.defaultBuyerAgentCommission,
      default_seller_agent_commission: defaults.defaultSellerAgentCommission,
      default_settlement_fee: defaults.defaultSettlementFee,
      default_title_search: defaults.defaultTitleSearch,
      default_municipal_lien_search: defaults.defaultMunicipalLienSearch,
      default_doc_stamp_rate: defaults.defaultDocStampRate,
      title_insurance_base_rate: defaults.titleInsuranceBaseRate,
      title_insurance_excess_rate: defaults.titleInsuranceExcessRate,
    })
    .eq('id', 1)

  if (error) {
    throw new Error(`Error updating calculator defaults: ${error.message}`)
  }
}

// Save a calculation
export async function saveCalculation(name: string, formData: CalculatorFormData): Promise<SavedCalculation> {
  const supabase = createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })

  const { data, error } = await supabase
    .from('saved_calculations')
    .insert({
      name,
      property_details: formData.propertyDetails,
      mortgage_info: formData.mortgageInfo,
      commission_structure: formData.commissionStructure,
      additional_fees: formData.additionalFees,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Error saving calculation: ${error.message}`)
  }

  return data
}

// Get all saved calculations for the current user
export async function getSavedCalculations(): Promise<SavedCalculation[]> {
  const supabase = createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })

  const { data, error } = await supabase
    .rpc('get_user_calculations')

  if (error) {
    throw new Error(`Error fetching saved calculations: ${error.message}`)
  }

  return data || []
}

// Get a specific saved calculation
export async function getSavedCalculation(id: string): Promise<SavedCalculation> {
  const supabase = createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })

  const { data, error } = await supabase
    .from('saved_calculations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Error fetching saved calculation: ${error.message}`)
  }

  return data
}

// Update a saved calculation
export async function updateSavedCalculation(
  id: string,
  name: string,
  formData: CalculatorFormData
): Promise<SavedCalculation> {
  const supabase = createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })

  const { data, error } = await supabase
    .from('saved_calculations')
    .update({
      name,
      property_details: formData.propertyDetails,
      mortgage_info: formData.mortgageInfo,
      commission_structure: formData.commissionStructure,
      additional_fees: formData.additionalFees,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Error updating saved calculation: ${error.message}`)
  }

  return data
}

// Delete a saved calculation
export async function deleteSavedCalculation(id: string): Promise<void> {
  const supabase = createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })

  const { error } = await supabase
    .from('saved_calculations')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Error deleting saved calculation: ${error.message}`)
  }
}