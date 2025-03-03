'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the root page
    router.replace('/')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Redirecting to Dashboard...</h1>
        <p className="text-gray-600">Please wait while you are redirected to the main dashboard.</p>
      </div>
    </div>
  )
}