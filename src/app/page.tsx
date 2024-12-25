'use client'

import { Button } from "@nextui-org/react"
import { NetSellerCalculator } from "@/components/NetSellerCalculator"
import { CalculatorTools } from "@/components/CalculatorTools"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Net Seller Sheet Calculator</h1>
          <Button 
            color="primary"
            variant="flat"
            startContent={
              <span className="text-lg">📄</span>
            }
          >
            Generate PDF
          </Button>
        </div>
        <p className="text-default-500">
          Calculate your estimated proceeds from selling your property
        </p>
      </div>
      
      <div className="space-y-8">
        <NetSellerCalculator />
        <CalculatorTools />
      </div>
    </div>
  )
}
