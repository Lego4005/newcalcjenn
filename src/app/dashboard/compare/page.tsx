'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { PropertyComparison } from "@/components/RealEstateCalculator/PropertyComparison"
import { Card, CardBody, Spinner } from "@heroui/react"

export default function ComparePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error: authError } = await supabase.auth.getSession()
        if (authError) throw authError
        if (!session) throw new Error('No session')
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load comparison')
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [supabase.auth])

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      );
    }
    
    if (error) {
      return (
        <Card className="bg-danger-50">
          <CardBody>{error}</CardBody>
        </Card>
      );
    }
    
    return <PropertyComparison />;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Compare Properties</h1>
        <p className="text-default-500">Compare multiple properties side by side to make informed decisions.</p>
      </div>
      {renderContent()}
    </div>
  );
}