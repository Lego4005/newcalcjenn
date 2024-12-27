import { supabase } from './supabaseClient';
import type { CalculatorDefaults } from '@/types/calculator';

// Default values for Florida
export const DEFAULT_CALCULATOR_VALUES = {
  SETTLEMENT_FEE: 595, // average of $495-695
  TITLE_SEARCH: 175,   // average of $150-200
  MUNICIPAL_LIEN_SEARCH: 175, // average of $150-200
  DOC_STAMPS_RATE: 0.70, // $0.70 per $100 in FL
  TITLE_INSURANCE_RATES: {
    FIRST_100K: 5.75,  // $5.75 per thousand up to $100,000
    ABOVE_100K: 5.00   // $5.00 per thousand between $100,000 and $1 million
  },
  COMMISSION_RATES: {
    LISTING_AGENT: 6.00, // Default 6%
    BUYER_AGENT: 3.00    // Default 3%
  }
};

export async function getCalculatorDefaults() {
  try {
    return DEFAULT_CALCULATOR_VALUES;
  } catch (error) {
    console.error('Error fetching calculator defaults:', error);
    return DEFAULT_CALCULATOR_VALUES;
  }
}

export async function updateCalculatorDefaults(defaults: CalculatorDefaults): Promise<void> {
  try {
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
        title_insurance_excess_rate: defaults.titleInsuranceExcessRate
      })
      .eq('id', 1);

    if (error) {
      console.error('Error updating calculator defaults:', error.message);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateCalculatorDefaults:', error);
    throw error;
  }
}

// Calculate title insurance based on FL formula
export function calculateTitleInsurance(salePrice: number, defaults: CalculatorDefaults): number {
  const baseAmount = Math.min(salePrice, 100000);
  const excessAmount = Math.max(0, Math.min(salePrice - 100000, 900000));
  
  const basePremium = (baseAmount / 1000) * defaults.titleInsuranceBaseRate;
  const excessPremium = (excessAmount / 1000) * defaults.titleInsuranceExcessRate;
  
  return Math.round(basePremium + excessPremium);
}

// Calculate doc stamps
export function calculateDocStamps(salePrice: number, defaults: CalculatorDefaults): number {
  return Math.round((salePrice / 100) * defaults.defaultDocStampRate);
} 