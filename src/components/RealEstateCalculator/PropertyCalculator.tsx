'use client'

import { Card, Input } from "@heroui/react"
import { DollarSign, TrendingUp } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  trend?: {
    value: string
    label: string
    isPositive?: boolean
  }
  icon?: React.ReactNode
}

function StatCard({ title, value, trend, icon }: StatCardProps) {
  return (
    <div className="p-4 rounded-xl bg-content1 border border-content2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-default-500">{title}</span>
        {icon}
      </div>
      <div className="text-2xl font-semibold text-foreground mb-1">
        {value}
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-sm">
          <span className={trend.isPositive ? "text-success" : "text-danger"}>
            {trend.value}
          </span>
          <span className="text-default-400">{trend.label}</span>
        </div>
      )}
    </div>
  )
}

export function PropertyCalculator() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Total Investment"
          value="$450,000"
          trend={{
            value: "+2.5%",
            label: "vs last month",
            isPositive: true
          }}
          icon={<DollarSign className="w-4 h-4 text-primary" />}
        />
        <StatCard
          title="Monthly Income"
          value="$3,200"
          trend={{
            value: "+5.2%",
            label: "vs last month",
            isPositive: true
          }}
          icon={<DollarSign className="w-4 h-4 text-primary" />}
        />
        <StatCard
          title="Property Value"
          value="$475,000"
          trend={{
            value: "+8.1%",
            label: "vs purchase",
            isPositive: true
          }}
          icon={<DollarSign className="w-4 h-4 text-primary" />}
        />
        <StatCard
          title="ROI"
          value="8.5%"
          trend={{
            value: "+0.5%",
            label: "vs target",
            isPositive: true
          }}
          icon={<TrendingUp className="w-4 h-4 text-primary" />}
        />
      </div>

      <div className="p-6 rounded-xl bg-content1 border border-content2">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Property Analysis</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Input
                label="Purchase Price"
                placeholder="Enter amount"
                value="450000"
                classNames={{
                  label: "text-default-500",
                  input: "text-foreground",
                  inputWrapper: [
                    "bg-content2/50",
                    "hover:bg-content2",
                    "data-[focused=true]:bg-content2",
                    "!cursor-text",
                    "border",
                    "border-content3",
                  ].join(" ")
                }}
                startContent={<span className="text-default-400">$</span>}
              />
            </div>
            <div>
              <Input
                label="Down Payment"
                placeholder="Enter amount"
                classNames={{
                  label: "text-default-500",
                  input: "text-foreground",
                  inputWrapper: [
                    "bg-content2/50",
                    "hover:bg-content2",
                    "data-[focused=true]:bg-content2",
                    "!cursor-text",
                    "border",
                    "border-content3",
                  ].join(" ")
                }}
                startContent={<span className="text-default-400">$</span>}
              />
            </div>
            <div>
              <Input
                label="Interest Rate"
                placeholder="Enter percentage"
                classNames={{
                  label: "text-default-500",
                  input: "text-foreground",
                  inputWrapper: [
                    "bg-content2/50",
                    "hover:bg-content2",
                    "data-[focused=true]:bg-content2",
                    "!cursor-text",
                    "border",
                    "border-content3",
                  ].join(" ")
                }}
                startContent={<span className="text-default-400">%</span>}
              />
            </div>
            <div>
              <Input
                label="Property Tax (Annual)"
                placeholder="Enter amount"
                classNames={{
                  label: "text-default-500",
                  input: "text-foreground",
                  inputWrapper: [
                    "bg-content2/50",
                    "hover:bg-content2",
                    "data-[focused=true]:bg-content2",
                    "!cursor-text",
                    "border",
                    "border-content3",
                  ].join(" ")
                }}
                startContent={<span className="text-default-400">$</span>}
              />
            </div>
            <div>
              <Input
                label="Insurance (Annual)"
                placeholder="Enter amount"
                classNames={{
                  label: "text-default-500",
                  input: "text-foreground",
                  inputWrapper: [
                    "bg-content2/50",
                    "hover:bg-content2",
                    "data-[focused=true]:bg-content2",
                    "!cursor-text",
                    "border",
                    "border-content3",
                  ].join(" ")
                }}
                startContent={<span className="text-default-400">$</span>}
              />
            </div>
          </div>

          <div className="p-6 rounded-xl bg-content2/50 border border-content3">
            <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Payment Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-default-500">Principal & Interest</span>
                <span className="font-semibold text-foreground">$2,150.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-default-500">Property Tax</span>
                <span className="font-semibold text-foreground">$350.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-default-500">Insurance</span>
                <span className="font-semibold text-foreground">$100.00</span>
              </div>
              <div className="h-px bg-content3 my-4" />
              <div className="flex justify-between">
                <span className="text-default-500">Total Monthly Payment</span>
                <span className="font-semibold text-success">$2,600.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-default-500">Down Payment Required</span>
                <span className="font-semibold text-primary">$90,000.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 