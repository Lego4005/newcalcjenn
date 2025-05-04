import { createClient } from '@/lib/supabase/server'
import { getUserProfile } from '@/lib/supabase/profiles' // Import profile function
// import { cookies } from 'next/headers' // No longer needed here

export default async function SupabaseTestPage() {
  // const cookieStore = cookies() // No longer needed here
  const supabase = createClient()
  let sessionData = null
  let profileData = null // Add state for profile
  let errorData = null
  let profileErrorData = null // Add state for profile error

  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    sessionData = data.session

    // If session exists, try fetching the profile
    if (sessionData?.user?.id) {
      try {
        const profile = await getUserProfile(sessionData.user.id);
        profileData = profile; 
      } catch (profileError: unknown) {
        console.error("Profile fetch error:", profileError);
        profileErrorData = profileError instanceof Error ? profileError.message : String(profileError);
      }
    }

  } catch (error: unknown) {
    errorData = error instanceof Error ? error.message : String(error)
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Supabase Connection & Profile Test</h1>
      
      <div className="mb-4 p-4 border rounded bg-content2">
        <h2 className="font-semibold mb-2">Session Fetch Attempt:</h2>
        {errorData && (
          <div>
            <h3 className="font-medium text-danger">Session Error:</h3>
            <pre className="text-danger text-sm mt-1">{errorData}</pre>
          </div>
        )}
        {sessionData !== null && (
          <div>
            <h3 className="font-medium text-success">Session Data Found:</h3>
            <pre className="text-xs mt-1">{JSON.stringify(sessionData, null, 2)}</pre>
          </div>
        )}
        {sessionData === null && !errorData && (
          <div>
            <h3 className="font-medium">Result:</h3>
            <p className="text-sm">No active session found.</p>
          </div>
        )}
      </div>

      {sessionData && (
        <div className="mb-4 p-4 border rounded bg-content2">
          <h2 className="font-semibold mb-2">Profile Fetch Attempt (Requires Logged-in User):</h2>
          {profileErrorData && (
            <div>
              <h3 className="font-medium text-danger">Profile Error:</h3>
              <pre className="text-danger text-sm mt-1">{profileErrorData}</pre>
            </div>
          )}
          {profileData !== null && (
            <div>
              <h3 className="font-medium text-success">Profile Data Found:</h3>
              <pre className="text-xs mt-1">{JSON.stringify(profileData, null, 2)}</pre>
            </div>
          )}
           {profileData === null && !profileErrorData && (
            <div>
               <h3 className="font-medium">Result:</h3>
              <p className="text-sm">Profile fetch attempted, no data returned (or RLS blocked). Check if a profile exists for user ID: {sessionData.user.id}</p>
            </div>
          )}
        </div>
      )}

    </div>
  )
} 