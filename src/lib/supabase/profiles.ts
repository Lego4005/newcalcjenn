// Functions related to user profiles
import { createClient } from '@/lib/supabase/server'; // Use server client for direct DB access
// TODO: Import Database type from database.types.ts when available

/**
 * Fetches a user's profile data.
 * Assumes RLS is set up correctly to only allow users to fetch their own profile.
 * @param userId The Supabase Auth User ID.
 * @returns Profile data or null if not found/error.
 */
export async function getUserProfile(userId: string): Promise<unknown | null> {
  // Note: Using server client here implies this function should likely be 
  // called within Server Components or Route Handlers where cookies are available.
  // For client-side profile fetching, a different approach might be needed (e.g., RPC or client-side query).
  const supabase = createClient(); 

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error.message);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Supabase query failed:', error);
    return null;
  }
}

// Add functions for updating profile, etc. later 