'use client'

import { PropertyCalculator } from "@/components/RealEstateCalculator/PropertyCalculator"
import { useSearchParams } from "next/navigation"

export default function TestCalculatorPage() {
  const searchParams = useSearchParams()
  const isDemoMode = searchParams.get('demo') === 'true'

  return (
    <div className="container mx-auto py-8 px-4">
      <PropertyCalculator isDemoMode={isDemoMode} />
    </div>
  )
}