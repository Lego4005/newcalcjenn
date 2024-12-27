import { supabase } from './supabaseClient';
import type { Property } from '@/types/property';

export async function saveProperty(property: Property): Promise<Property> {
  try {
    // Clean numeric values and remove formatting
    const cleanNumber = (value: any) => {
      if (typeof value === 'string') {
        return parseInt(value.replace(/[^0-9.-]/g, ''));
      }
      return value || 0;
    };

    // Remove hoaFees and map to database column names
    const propertyData = {
      id: property.id || undefined,
      address: property.address,
      price: cleanNumber(property.price),
      beds: cleanNumber(property.beds),
      baths: cleanNumber(property.baths),
      sqft: cleanNumber(property.sqft),
      year_built: cleanNumber(property.yearBuilt),
      lot_size: cleanNumber(property.lotSize),
      property_type: property.propertyType || 'Single Family',
      status: property.status || 'Active',
      market_value: cleanNumber(property.marketValue),
      price_per_sqft: cleanNumber(property.pricePerSqft),
      days_on_market: cleanNumber(property.daysOnMarket),
      taxes: cleanNumber(property.taxes),
      source: property.source || {
        name: 'Manual Entry',
        fetchDate: new Date().toISOString()
      }
    };

    const { data, error } = await supabase
      .from('properties')
      .upsert(propertyData)
      .select()
      .single();

    if (error) {
      console.error('Error saving property to Supabase:', error.message);
      throw error;
    }

    // Map database columns back to Property type
    return {
      id: data.id,
      address: data.address,
      price: data.price,
      beds: data.beds,
      baths: data.baths,
      sqft: data.sqft,
      yearBuilt: data.year_built,
      lotSize: data.lot_size,
      propertyType: data.property_type,
      status: data.status,
      marketValue: data.market_value,
      pricePerSqft: data.price_per_sqft,
      daysOnMarket: data.days_on_market,
      taxes: data.taxes,
      source: data.source,
      hoaFees: property.hoaFees // Keep hoaFees in memory
    };
  } catch (error) {
    console.error('Error in saveProperty:', error);
    throw error;
  }
}

export async function saveTransaction(propertyId: string, transaction: any): Promise<void> {
  try {
    // Clean numeric values and remove formatting
    const cleanNumber = (value: any) => {
      if (typeof value === 'string') {
        return parseFloat(value.replace(/[^0-9.-]/g, ''));
      }
      return value || 0;
    };

    // Map transaction fields to database column names
    const transactionData = {
      property_id: propertyId,
      sale_price: cleanNumber(transaction.salePrice || transaction.sale_price || 3345400),
      mortgage_balance: cleanNumber(transaction.mortgageBalance || transaction.mortgage_balance || 0),
      hoa_fees: cleanNumber(transaction.hoaFees || transaction.hoa_fees || 0),
      buyer_agent_commission: cleanNumber(transaction.buyerAgentCommission || transaction.buyer_agent_commission || 3.00),
      seller_agent_commission: cleanNumber(transaction.sellerAgentCommission || transaction.seller_agent_commission || 3.00),
      escrow_fee: cleanNumber(transaction.escrowFee || transaction.escrow_fee || 595),
      title_fee: cleanNumber(transaction.titleFee || transaction.title_fee || 175),
      seller_credits: cleanNumber(transaction.sellerCredits || transaction.seller_credits || 0),
      repair_costs: cleanNumber(transaction.repairCosts || transaction.repair_costs || 0),
      custom_costs: cleanNumber(transaction.customCosts || transaction.custom_costs || 0),
      closing_date: transaction.closingDate || transaction.closing_date || new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString()
    };

    console.log('Saving transaction data:', transactionData);

    const { error } = await supabase
      .from('transactions')
      .upsert(transactionData);

    if (error) {
      console.error('Error saving transaction:', error.message);
      throw error;
    }
  } catch (error) {
    console.error('Error in saveTransaction:', error);
    throw error;
  }
}

export function getProperty(id: string): Property | null {
  try {
    const { data, error } = supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching property:', error.message);
      return null;
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      address: data.address,
      price: data.price,
      beds: data.beds,
      baths: data.baths,
      sqft: data.sqft,
      yearBuilt: data.year_built,
      lotSize: data.lot_size,
      propertyType: data.property_type,
      status: data.status,
      marketValue: data.market_value,
      pricePerSqft: data.price_per_sqft,
      daysOnMarket: data.days_on_market,
      taxes: data.taxes, // Using 'taxes' instead of 'annual_taxes'
      source: data.source,
      hoaFees: 0 // Default to 0 since it's not stored in the properties table
    };
  } catch (error) {
    console.error('Error in getProperty:', error);
    return null;
  }
}

export function getTransaction(propertyId: string): any | null {
  try {
    const { data, error } = supabase
      .from('transactions')
      .select('*')
      .eq('property_id', propertyId)
      .single();

    if (error) {
      console.error('Error fetching transaction:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getTransaction:', error);
    return null;
  }
} 