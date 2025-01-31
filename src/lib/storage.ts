import { supabase } from './supabaseClient';
import type { Property, TransactionDetails } from '@/types/property';

export async function saveProperty(property: Property): Promise<Property> {
  try {
    // Clean numeric values and remove formatting
    const cleanNumber = (value: string | number | undefined) => {
      if (typeof value === 'string') {
        return parseInt(value.replace(/[^0-9.-]/g, ''));
      }
      return value || 0;
    };

    // Prepare property details
    const propertyDetails = {
      id: property.id || crypto.randomUUID(),
      address: property.address,
      price: cleanNumber(property.price),
      beds: cleanNumber(property.beds),
      baths: cleanNumber(property.baths),
      sqft: cleanNumber(property.sqft),
      yearBuilt: cleanNumber(property.yearBuilt),
      lotSize: cleanNumber(property.lotSize),
      propertyType: property.propertyType,
      status: property.status,
      images: property.images,
      source: property.source || {
        name: 'Manual Entry',
        fetchDate: new Date().toISOString()
      },
      metrics: property.metrics,
      formData: property.formData,
      transactionDetails: property.transactionDetails
    };

    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Save to saved_calculations table
    const { data, error } = await supabase
      .from('saved_calculations')
      .upsert({
        user_id: user.id,
        name: property.address,
        property_details: propertyDetails,
        mortgage_info: property.transactionDetails || {},
        commission_structure: {
          buyerAgentCommission: property.transactionDetails?.buyerAgentCommission,
          sellerAgentCommission: property.transactionDetails?.sellerAgentCommission
        },
        additional_fees: {
          escrowFee: property.transactionDetails?.escrowFee,
          titleFee: property.transactionDetails?.titleFee,
          sellerCredits: property.transactionDetails?.sellerCredits,
          repairCosts: property.transactionDetails?.repairCosts,
          customCosts: property.transactionDetails?.customCosts
        }
      })
      .select('property_details')
      .single();

    if (error) {
      console.error('Error saving property to Supabase:', error.message);
      throw error;
    }

    // Return the saved property details
    return data.property_details as Property;
  } catch (error) {
    console.error('Error in saveProperty:', error);
    throw error;
  }
}

export async function getProperty(id: string): Promise<Property | null> {
  try {
    const { data, error } = await supabase
      .from('saved_calculations')
      .select('property_details')
      .eq('property_details->>id', id)
      .single();

    if (error) {
      console.error('Error fetching property:', error.message);
      return null;
    }

    if (!data) {
      return null;
    }

    return data.property_details as Property;
  } catch (error) {
    console.error('Error in getProperty:', error);
    return null;
  }
}

export async function saveTransaction(propertyId: string, transaction: TransactionDetails): Promise<void> {
  try {
    // Get the property calculation first
    const { data: propertyData, error: propertyError } = await supabase
      .from('saved_calculations')
      .select('*')
      .eq('property_details->>id', propertyId)
      .single();

    if (propertyError) {
      throw propertyError;
    }

    // Clean numeric values and remove formatting
    const cleanNumber = (value: string | number | undefined) => {
      if (typeof value === 'string') {
        return parseFloat(value.replace(/[^0-9.-]/g, ''));
      }
      return value || 0;
    };

    // Update the calculation with transaction data
    const { error } = await supabase
      .from('saved_calculations')
      .update({
        mortgage_info: {
          mortgageBalance: cleanNumber(transaction.mortgageBalance),
          hoaFees: cleanNumber(transaction.hoaFees)
        },
        commission_structure: {
          buyerAgentCommission: cleanNumber(transaction.buyerAgentCommission),
          sellerAgentCommission: cleanNumber(transaction.sellerAgentCommission)
        },
        additional_fees: {
          escrowFee: cleanNumber(transaction.escrowFee),
          titleFee: cleanNumber(transaction.titleFee),
          sellerCredits: cleanNumber(transaction.sellerCredits),
          repairCosts: cleanNumber(transaction.repairCosts),
          customCosts: cleanNumber(transaction.customCosts)
        },
        updated_at: new Date().toISOString()
      })
      .eq('id', propertyData.id);

    if (error) {
      console.error('Error saving transaction:', error.message);
      throw error;
    }
  } catch (error) {
    console.error('Error in saveTransaction:', error);
    throw error;
  }
}

export async function getTransaction(propertyId: string): Promise<TransactionDetails | null> {
  try {
    const { data, error } = await supabase
      .from('saved_calculations')
      .select('mortgage_info, commission_structure, additional_fees')
      .eq('property_details->>id', propertyId)
      .single();

    if (error) {
      console.error('Error fetching transaction:', error.message);
      return null;
    }

    if (!data) {
      return null;
    }

    // Combine all transaction-related data
    return {
      salePrice: 0, // Required by TransactionDetails type
      mortgageBalance: data.mortgage_info?.mortgageBalance,
      hoaFees: data.mortgage_info?.hoaFees,
      buyerAgentCommission: data.commission_structure?.buyerAgentCommission,
      sellerAgentCommission: data.commission_structure?.sellerAgentCommission,
      escrowFee: data.additional_fees?.escrowFee,
      titleFee: data.additional_fees?.titleFee,
      sellerCredits: data.additional_fees?.sellerCredits,
      repairCosts: data.additional_fees?.repairCosts,
      customCosts: data.additional_fees?.customCosts
    };
  } catch (error) {
    console.error('Error in getTransaction:', error);
    return null;
  }
}