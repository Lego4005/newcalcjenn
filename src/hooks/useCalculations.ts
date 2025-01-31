import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { cacheKeys } from '@/lib/cache';
import type { SavedCalculation } from '@/components/RealEstateCalculator/PropertyComparison';

export function useSavedCalculations() {
  const supabase = createClientComponentClient();
  
  const { data: calculations = [], isLoading, error } = useQuery({
    queryKey: [cacheKeys.savedCalculations],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_user_calculations');
      if (error) throw error;
      return data as SavedCalculation[];
    },
  });

  return {
    calculations,
    isLoading,
    error,
  };
}

export function usePropertyMetrics(propertyId: string) {
  const supabase = createClientComponentClient();
  
  const { data: metrics = [], isLoading, error } = useQuery({
    queryKey: cacheKeys.propertyMetrics(propertyId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_metrics')
        .select('*')
        .eq('property_id', propertyId)
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return {
    metrics,
    isLoading,
    error,
  };
}

export function useComparisonData(propertyIds: string[]) {
  const queryClient = useQueryClient();
  const supabase = createClientComponentClient();

  // Prefetch all required data
  const prefetchData = async () => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: [cacheKeys.savedCalculations],
        queryFn: async () => {
          const { data, error } = await supabase.rpc('get_user_calculations');
          if (error) throw error;
          return data as SavedCalculation[];
        },
      }),
      ...propertyIds.map(id =>
        queryClient.prefetchQuery({
          queryKey: cacheKeys.propertyMetrics(id),
          queryFn: async () => {
            const { data, error } = await supabase
              .from('property_metrics')
              .select('*')
              .eq('property_id', id)
              .order('timestamp', { ascending: false });
            
            if (error) throw error;
            return data;
          },
        })
      ),
    ]);
  };

  // Set up real-time subscriptions
  const setupSubscriptions = () => {
    const metricsChannel = supabase
      .channel('property_metrics_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'property_metrics',
          filter: `property_id=in.(${propertyIds.join(',')})`,
        },
        (payload: { new: { property_id?: string } }) => {
          const propertyId = payload.new.property_id;
          if (propertyId) {
            queryClient.invalidateQueries({
              queryKey: cacheKeys.propertyMetrics(propertyId),
            });
          }
        }
      )
      .subscribe();

    return () => {
      metricsChannel.unsubscribe();
    };
  };

  return {
    prefetchData,
    setupSubscriptions,
  };
}