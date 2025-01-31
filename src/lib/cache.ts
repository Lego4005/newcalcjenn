import { QueryClient } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { SavedCalculation } from '@/components/RealEstateCalculator/PropertyComparison';
import type { PropertyMetrics } from './metrics';

// Create a new QueryClient instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Cache persists for 30 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Cache keys for different data types
export const cacheKeys = {
  savedCalculations: 'saved-calculations',
  propertyMetrics: (propertyId: string) => ['property-metrics', propertyId],
  calculatorDefaults: 'calculator-defaults',
  userProfile: (userId: string) => ['user-profile', userId],
  comparisonData: (propertyIds: string[]) => ['comparison-data', ...propertyIds],
} as const;

// Prefetch saved calculations
export async function prefetchSavedCalculations() {
  const supabase = createClientComponentClient();
  
  return queryClient.prefetchQuery({
    queryKey: [cacheKeys.savedCalculations],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_user_calculations');
      if (error) throw error;
      return data as SavedCalculation[];
    },
  });
}

// Prefetch property metrics
export async function prefetchPropertyMetrics(propertyId: string) {
  const supabase = createClientComponentClient();
  
  return queryClient.prefetchQuery({
    queryKey: cacheKeys.propertyMetrics(propertyId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_metrics')
        .select('*')
        .eq('property_id', propertyId)
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      return data as PropertyMetrics[];
    },
  });
}

// Invalidate specific cache entries
export function invalidatePropertyCache(propertyId: string) {
  queryClient.invalidateQueries({
    queryKey: cacheKeys.propertyMetrics(propertyId),
  });
}

export function invalidateCalculationsCache() {
  queryClient.invalidateQueries({
    queryKey: [cacheKeys.savedCalculations],
  });
}

// Subscribe to real-time updates
export function setupRealtimeSubscriptions() {
  const supabase = createClientComponentClient();

  // Subscribe to property metrics updates
  const metricsSubscription = supabase
    .channel('property_metrics_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'property_metrics',
      },
      (payload: { new: { property_id?: string } }) => {
        const propertyId = payload.new.property_id;
        if (propertyId) {
          invalidatePropertyCache(propertyId);
        }
      }
    )
    .subscribe();

  // Subscribe to saved calculations updates
  const calculationsSubscription = supabase
    .channel('saved_calculations_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'saved_calculations',
      },
      () => {
        invalidateCalculationsCache();
      }
    )
    .subscribe();

  // Return cleanup function
  return () => {
    metricsSubscription.unsubscribe();
    calculationsSubscription.unsubscribe();
  };
}

// Batch prefetch for comparison view
export async function prefetchComparisonData(propertyIds: string[]) {
  await Promise.all([
    ...propertyIds.map(id => prefetchPropertyMetrics(id)),
    prefetchSavedCalculations(),
  ]);
}