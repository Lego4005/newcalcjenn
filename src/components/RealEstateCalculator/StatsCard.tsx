'use client'

import { 
  Card, 
  CardBody, 
  Chip,
  Spacer,
  cn
} from "@heroui/react"

import { DollarSign, TrendingUp, BarChart2, LineChart } from "lucide-react"

interface StatsCardProps {
  readonly title: string
  readonly value: string
  readonly metric: {
    readonly value: string
    readonly label: string
    readonly trend: 'up' | 'down'
  }
  readonly type: 'price' | 'proceeds' | 'sqft' | 'trend'
}

export function StatsCard({ title, value, metric, type }: StatsCardProps) {
  const icons = {
    price: DollarSign,
    proceeds: TrendingUp,
    sqft: BarChart2,
    trend: LineChart
  }

  const colors = {
    price: "secondary",
    proceeds: "success",
    sqft: "primary",
    trend: "warning"
  } as const

  const Icon = icons[type]
  const color = colors[type]
  const isPositive = metric.trend === 'up'

  return (
    <Card 
      className={cn(
        "backdrop-blur-lg",
        "bg-content1/50 dark:bg-content1/5",
        "border-none"
      )}
    >
      <CardBody className="gap-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-foreground/70">{title}</p>
          <div className={cn(
            "p-2 rounded-lg",
            `bg-${color}/10 text-${color}`
          )}>
            <Icon className="w-4 h-4" />
          </div>
        </div>
        <Spacer y={1} />
        <div className="flex items-end justify-between">
          <p className="text-xl font-semibold">{value}</p>
          <Chip color={isPositive ? "success" : "danger"} size="sm">
            {metric.value} <span className="text-xs opacity-70">{metric.label}</span>
          </Chip>
        </div>
      </CardBody>
    </Card>
  )
} 