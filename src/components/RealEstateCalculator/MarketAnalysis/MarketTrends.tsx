'use client'

import { useMemo } from 'react'
import {
  Card,
  CardBody,
  CardHeader
} from "@heroui/react"
import { LineChart } from '../charts/LineChart'
import type { Property } from '@/types/property'

interface MarketTrendsProps {
  readonly property: Property
}

export function MarketTrends({ property }: MarketTrendsProps) {
  const trendData = useMemo(() => {
    // Generate sample trend data (replace with real API data)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const basePrice = property.price
    const priceData = months.map((month) => ({
      month,
      price: basePrice * (1 + (Math.random() * 0.1 - 0.05)) // +/- 5% variation
    }))
    return priceData
  }, [property.price])

  const chartData = {
    labels: trendData.map(d => d.month),
    datasets: [
      {
        label: 'Property Value',
        data: trendData.map(d => d.price),
        borderColor: 'hsl(var(--heroui-primary))',
        backgroundColor: 'hsl(var(--heroui-primary) / 0.1)',
        tension: 0.4
      }
    ]
  }

  return (
    <div className="space-y-4 py-4">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Price Trends</h3>
          <p className="text-small text-default-500">
            6-month price history for this area
          </p>
        </CardHeader>
        <CardBody>
          <div className="h-[300px]">
            <LineChart data={chartData} />
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-small text-default-500">Median Price</p>
              <p className="text-xl font-semibold">
                ${Math.round(property.price * 0.98).toLocaleString()}
              </p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-small text-default-500">Price Change (6mo)</p>
              <p className="text-xl font-semibold text-success">
                +2.3%
              </p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-small text-default-500">Days on Market</p>
              <p className="text-xl font-semibold">
                45
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}