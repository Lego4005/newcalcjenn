import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { withPermission } from '@/middleware/checkPermission'
import type { PropertyMetrics } from '@/lib/metrics'
import type { Property } from '@/components/RealEstateCalculator/BulkCalculator'

interface BatchCalculationRequest {
  properties: Property[];
}

interface BatchCalculationResult {
  propertyId: string;
  metrics: PropertyMetrics;
  timestamp: string;
}

// Helper to chunk array into batches
function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

// Handler for batch calculation storage
async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new NextResponse('Method not allowed', { status: 405 });
  }

  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body = (await request.json()) as BatchCalculationRequest;
    const results: BatchCalculationResult[] = [];

    // Process in batches of 10
    const batches = chunk(body.properties, 10);
    
    for (const batch of batches) {
      const { error } = await supabase
        .rpc('batch_store_property_metrics', {
          p_metrics: JSON.stringify(
            batch.map(property => ({
              property_id: property.id,
              metrics: results.find(r => r.propertyId === property.id)?.metrics,
              timestamp: new Date().toISOString()
            }))
          )
        });

      if (error) {
        throw new Error(`Error storing batch metrics: ${error.message}`);
      }

      // Store the calculations
      const { error: calcError } = await supabase
        .rpc('batch_save_calculations', {
          p_calculations: JSON.stringify(
            batch.map(property => ({
              name: property.address,
              property_details: {
                salePrice: property.formData.purchasePrice,
                purchaseDate: new Date().toISOString()
              },
              mortgage_info: {
                loanBalance: property.formData.purchasePrice - property.formData.downPayment,
                hasHOA: property.formData.hoaDues > 0
              },
              commission_structure: {
                listingAgentRate: property.formData.listingAgentRate,
                buyerAgentRate: property.formData.buyerAgentRate
              },
              additional_fees: {
                hasPriorTitlePolicy: property.formData.hasPriorTitlePolicy,
                priorTitleAmount: property.formData.priorTitleAmount,
                taxProrations: property.formData.taxProrations,
                hoaDues: property.formData.hoaDues,
                hoaEstoppelFee: property.formData.hoaEstoppelFee,
                settlementFee: property.formData.settlementFee,
                titleSearch: property.formData.titleSearch,
                municipalLienSearch: property.formData.municipalLienSearch,
                docStamps: property.formData.docStamps,
                titleInsurance: property.formData.titleInsurance
              }
            }))
          )
        });

      if (calcError) {
        throw new Error(`Error storing batch calculations: ${calcError.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Batch calculations stored successfully',
      results
    });

  } catch (error) {
    console.error('Error processing batch calculations:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred'
      },
      { status: 500 }
    );
  }
}

export const POST = withPermission(handler, 'BULK_CALCULATOR');