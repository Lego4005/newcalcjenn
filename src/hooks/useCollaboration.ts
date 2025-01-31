import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface CollaboratorPresence {
  user_id: string;
  property_id: string;
  last_active: string;
  current_field?: string;
  user_details: {
    email: string;
    avatar_url?: string;
  };
}

export interface EditHistoryEntry {
  id: string;
  property_id: string;
  user_id: string;
  field: string;
  old_value: string | number | boolean | null;
  new_value: string | number | boolean | null;
  timestamp: string;
  user_details: {
    email: string;
  };
}

export function useCollaboration(propertyId: string) {
  const [collaborators, setCollaborators] = useState<CollaboratorPresence[]>([]);
  const [editHistory, setEditHistory] = useState<EditHistoryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Update user presence
  useEffect(() => {
    let presenceChannel: RealtimeChannel;

    const cleanup = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('property_presence')
            .delete()
            .eq('user_id', user.id)
            .eq('property_id', propertyId);
        }
        if (presenceChannel) {
          await presenceChannel.unsubscribe();
        }
      } catch (err) {
        console.error('Cleanup error:', err);
      }
    };

    const setupPresence = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser(); 
        if (!user) return;

        // Join presence channel
        presenceChannel = supabase.channel(`presence:${propertyId}`)
          .on('presence', { event: 'sync' }, () => {
            const newState = presenceChannel.presenceState();
            setCollaborators(
              Object.values(newState).flat().map(presence => presence as unknown as CollaboratorPresence)
            );
          })
          .on('presence', { event: 'join' }, ({ newPresences }) => {
            setCollaborators(prev => [
              ...prev,
              ...(newPresences as unknown as CollaboratorPresence[])
            ]);
          })
          .on('presence', { event: 'leave' }, ({ leftPresences }) => {
            const left = leftPresences as unknown as CollaboratorPresence[];
            setCollaborators(prev => prev.filter(c => !left.find(lp => lp.user_id === c.user_id))
            );
          })
          .subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
              await presenceChannel.track({
                user_id: user.id,
                property_id: propertyId,
                last_active: new Date().toISOString(),
                user_details: {
                  email: user.email,
                  avatar_url: user.user_metadata?.avatar_url
                }
              });
            }
          });

        // Subscribe to edit history
        const historyChannel = supabase
          .channel(`history:${propertyId}`)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'property_edit_history',
              filter: `property_id=eq.${propertyId}`
            },
            (payload) => {
              setEditHistory(prev => [payload.new as EditHistoryEntry, ...prev]);
            }
          )
          .subscribe();

        // Fetch initial edit history
        const { data: history, error: historyError } = await supabase
          .from('property_edit_history')
          .select(`
            id,
            property_id,
            user_id,
            field,
            old_value,
            new_value,
            timestamp,
            user_details
          `)
          .eq('property_id', propertyId)
          .order('timestamp', { ascending: false });

        if (historyError) {
          throw historyError;
        }

        setEditHistory(history || []);

        return () => { historyChannel.unsubscribe(); };
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to setup collaboration');
      }
    };

    void setupPresence();

    return cleanup;
  }, [propertyId]);

  const updateFieldValue = async (
    field: string,
    value: string | number | boolean | null,
    oldValue: string | number | boolean | null
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Update presence with current field
      await supabase
        .from('property_presence')
        .upsert({
          user_id: user.id,
          property_id: propertyId,
          last_active: new Date().toISOString(),
          current_field: field,
          user_details: {
            email: user.email,
            avatar_url: user.user_metadata?.avatar_url
          }
        });

      // Record edit history
      await supabase
        .from('property_edit_history')
        .insert({
          property_id: propertyId,
          user_id: user.id,
          field,
          old_value: oldValue,
          new_value: value,
          timestamp: new Date().toISOString(),
          user_details: {
            email: user.email
          }
        });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update field');
    }
  };

  return {
    collaborators,
    editHistory,
    error,
    updateFieldValue
  };
}