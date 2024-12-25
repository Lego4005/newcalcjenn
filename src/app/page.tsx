'use client'

import { Suspense } from "react"
import PropertyDashboard from "@/components/RealEstateCalculator/Dashboard/PropertyDashboard"

export default function Home() {
  return (
    <div className="w-full min-h-screen p-4 md:p-6 lg:p-8">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-default-500">Loading...</div>
        </div>
      }>
        <PropertyDashboard />
      </Suspense>
    </div>
  )
}
