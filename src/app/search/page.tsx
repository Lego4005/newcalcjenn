'use client'

import { PropertyContext } from "@/components/PropertyContext"

export default function PropertySearchPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Property Search</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <PropertyContext />
      </div>
    </div>
  )
}