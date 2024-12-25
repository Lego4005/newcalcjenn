'use client'

import { Suspense } from "react"
import { PropertyCalculator } from "@/components/RealEstateCalculator/PropertyCalculator"
import { CalculatorTools } from "@/components/CalculatorTools"
import { PropertyHero } from "@/components/RealEstateCalculator/PropertyHero"

export default function Home() {
  return (
    <div className="w-full">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-default-500">Loading...</div>
        </div>
      }>
        <div className="space-y-6">
          <PropertyHero
            image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
            address="123 Main St, Anytown, USA"
            price="$450,000"
            beds={3}
            baths={2}
            status="Active"
          />
          
          <CalculatorTools />
          
          <PropertyCalculator />
        </div>
      </Suspense>
    </div>
  )
}
