'use client'

import { Card, CardBody } from "@nextui-org/react"
import { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  description: string
  trend?: {
    value: number
    label: string
    color: "success" | "danger" | "warning" | "primary"
  }
}

export function StatCard({ title, value, icon, description, trend }: StatCardProps) {
  return (
    <Card className="bg-content1">
      <CardBody className="gap-1">
        <div className="flex justify-between">
          <p className="text-sm font-medium text-default-600">{title}</p>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-default-100 text-default-500">
            {icon}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold text-default-900">{value}</span>
          {trend && (
            <div className="flex items-center gap-1 text-xs">
              <span className={`text-${trend.color}`}>
                {trend.value >= 0 ? "+" : ""}{trend.value.toFixed(1)}%
              </span>
              <span className="text-default-500">{trend.label}</span>
            </div>
          )}
        </div>
        <p className="text-xs text-default-500">{description}</p>
      </CardBody>
    </Card>
  )
} 