import { useEffect, useState, useRef } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Property } from '@/types/property';

type PropertyUpdate = {
  property: Property;
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  timestamp: string;
};

type UsePropertyUpdatesOptions = {
  onUpdate?: (update: PropertyUpdate) => void;
  propertyIds?: string[];
};

export function usePropertyUpdates({ onUpdate, propertyIds }: UsePropertyUpdatesOptions = {}) {
  const [updates, setUpdates] = useState<PropertyUpdate[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    const setupSubscription = async () => {
      try {
        // Clean up existing subscription
        channelRef.current?.unsubscribe();

        // Create a channel for property updates
        const channel = supabase.channel('property_updates');

        // Set up subscription based on propertyIds
        const filter = propertyIds?.length 
          ? `id=in.(${propertyIds.join(',')})`
          : undefined;

        channel
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'saved_calculations',
              filter
            },
            (payload) => {
              const update: PropertyUpdate = {
                property: payload.new as Property,
                type: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
                timestamp: new Date().toISOString()
              };

              setUpdates(prev => [update, ...prev].slice(0, 50)); // Keep last 50 updates
              onUpdate?.(update);
            }
          )
          .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
              console.log('Subscribed to property updates');
            }
            if (status === 'CLOSED') {
              console.log('Subscription closed');
            }
            if (status === 'CHANNEL_ERROR') {
              setError(new Error('Failed to subscribe to property updates'));
            }
          });

        channelRef.current = channel;
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to set up property updates'));
      }
    };

    setupSubscription();

    // Cleanup subscription on unmount
    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
    };
  }, [propertyIds]); // Only re-run when propertyIds changes

  // Function to manually refresh subscription
  const refresh = async () => {
    if (channelRef.current) {
      await channelRef.current.unsubscribe();
      channelRef.current = null;
      setError(null);
      setUpdates([]);
    }
  };

  return {
    updates,
    error,
    refresh,
    latestUpdate: updates[0],
    isSubscribed: !!channelRef.current
  };
}