'use client'

import { useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Spinner
} from "@heroui/react"
import { TrendingUp, Home, Map } from "lucide-react"
import { MarketTrends } from './MarketTrends'
import { PropertyComparison } from './PropertyComparison'
import { AreaStats } from './AreaStats'
import type { Property } from '@/types/property'

interface MarketAnalysisProps {
  readonly property: Property
  readonly isLoading?: boolean
}

export function MarketAnalysis({ property, isLoading = false }: MarketAnalysisProps) {
  const [activeTab, setActiveTab] = useState("trends")

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-xl font-semibold">Market Analysis</h2>
        <p className="text-small text-default-500">
          Analysis for {property.address}
        </p>
      </CardHeader>
      <CardBody>
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key.toString())}
        >
          <Tab
            key="trends"
            title={
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Market Trends</span>
              </div>
            }
          >
            <MarketTrends property={property} />
          </Tab>
          <Tab
            key="comparison"
            title={
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>Property Comparison</span>
              </div>
            }
          >
            <PropertyComparison property={property} />
          </Tab>
          <Tab
            key="area"
            title={
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4" />
                <span>Area Statistics</span>
              </div>
            }
          >
            <AreaStats property={property} />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  )
}