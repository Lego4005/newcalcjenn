'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client' // Browser client
// We need a way to fetch profile client-side. Using RPC or a dedicated API route is safer.
// For simplicity now, we'll add a placeholder. Fetching directly like this isn't recommended client-side.
// import { getUserProfile } from '@/lib/supabase/profiles'; 

// TODO: Define proper profile type based on schema/database.types.ts
type UserProfile = unknown | null;

interface AuthContextType {
  session: Session | null
  user: User | null
  profile: UserProfile // Added profile state
  loading: boolean
  signOut: () => Promise<void>
  // Add other auth methods as needed (signIn, signUp, etc.)
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile>(null) // Added profile state
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false); // Separate loading for profile

  // Fetch profile when user changes
  useEffect(() => {
    if (user?.id) {
      setProfileLoading(true);
      // Ideally, call an RPC function or API route here instead of direct fetch
      // Placeholder: Assume profile is fetched elsewhere or not needed immediately client-side
      console.log("AuthProvider: User found, would fetch profile for:", user.id);
      // Example (if getUserProfile was client-safe):
      // getUserProfile(user.id).then(profileData => {
      //   setProfile(profileData);
      //   setProfileLoading(false);
      // });
      setProfile(null); // Reset profile for now
      setProfileLoading(false); // Reset loading for now
    } else {
      setProfile(null); // Clear profile if no user
    }
  }, [user]);

  useEffect(() => {
    setLoading(true); // Start loading when effect runs
    const fetchSession = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      } catch (error) { 
        console.error("Error fetching initial session:", error); 
        setSession(null); 
        setUser(null); 
      } finally {
        setLoading(false); // Stop loading regardless of outcome
      }
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, changedSession) => {
         console.log("Auth state changed:", _event, changedSession?.user?.id);
        setSession(changedSession);
        setUser(changedSession?.user ?? null);
        setLoading(false); // Also update loading on auth change
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase.auth]);

  const signOut = async () => {
    await supabase.auth.signOut();
    // State updates are handled by onAuthStateChange
    setProfile(null); // Clear profile on sign out
  };

  const value = {
    session,
    user,
    profile, // Provide profile
    loading: loading || profileLoading, // Combine loading states
    signOut,
    // Add other methods here
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}; 