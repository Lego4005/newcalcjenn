'use client'

import { Card, CardBody } from "@heroui/react"
import { DollarSign, TrendingUp, BarChart2, LineChart } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  metric: {
    value: string
    label: string
    trend: 'up' | 'down'
  }
  type: 'price' | 'proceeds' | 'sqft' | 'trend'
}

export function StatsCard({ title, value, metric, type }: StatsCardProps) {
  const icons = {
    price: DollarSign,
    proceeds: TrendingUp,
    sqft: BarChart2,
    trend: LineChart
  }

  const Icon = icons[type]
  const isPositive = metric.trend === 'up'

  return (
    <Card className="bg-content1/50 dark:bg-content1/5 backdrop-blur-lg border-none">
      <CardBody className="gap-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-foreground/70">{title}</p>
          <div className={`p-2 rounded-lg ${
            type === 'price' ? 'bg-pink-500/10 text-pink-500' :
            type === 'proceeds' ? 'bg-emerald-500/10 text-emerald-500' :
            type === 'sqft' ? 'bg-blue-500/10 text-blue-500' :
            'bg-purple-500/10 text-purple-500'
          }`}>
            <Icon className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-xl font-semibold">{value}</p>
          <div className={`flex items-center gap-1 text-sm ${
            isPositive ? 'text-emerald-500' : 'text-pink-500'
          }`}>
            <span>{metric.value}</span>
            <span className="text-xs text-foreground/50">{metric.label}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
} 