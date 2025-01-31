'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Info } from 'lucide-react'
import { Button, Tooltip } from '@heroui/react'
import { SparklineChart } from '../charts/SparklineChart'
import type { PropertyTrends, PropertyMetrics } from '@/lib/metrics'
import { formatMetricValue, getMetricDescription } from '@/lib/metrics'

interface TrendAnalysisProps {
  readonly trends: PropertyTrends
  readonly onTimeRangeChange: (timeRange: '1M' | '3M' | '6M' | '1Y' | 'ALL') => void
  readonly className?: string
}

interface MetricCardProps {
  readonly title: string
  readonly metricKey: keyof PropertyMetrics
  readonly trend: PropertyTrends[keyof PropertyTrends]
  readonly description: string
}

function MetricCard({ title, metricKey, trend, description }: MetricCardProps) {
  const TrendIcon = trend.isPositive ? TrendingUp : TrendingDown
  const trendColor = trend.isPositive ? 'text-success' : 'text-danger'
  
  return (
    <div className="p-4 rounded-xl bg-content1 border border-content2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-default-500">{title}</span>
          <Tooltip content={description}>
            <Info className="w-4 h-4 text-default-400" />
          </Tooltip>
        </div>
      </div>
      <div className="text-2xl font-semibold text-foreground mb-1">
        {formatMetricValue(trend.current, metricKey)}
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-sm">
          <TrendIcon className={`w-4 h-4 ${trendColor}`} />
          <span className={trendColor}>
            {trend.change >= 0 ? '+' : ''}{trend.change.toFixed(2)}%
          </span>
          <span className="text-default-400">vs previous</span>
        </div>
        {trend.data.length > 0 && (
          <SparklineChart 
            data={trend.data}
            color={trend.isPositive ? 'hsl(var(--success))' : 'hsl(var(--danger))'}
            height={24}
          />
        )}
      </div>
    </div>
  )
}

export function TrendAnalysis({ trends, onTimeRangeChange, className = '' }: TrendAnalysisProps) {
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('1Y')
  
  // Time range buttons
  const timeRangeButtons = [
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1Y', value: '1Y' },
    { label: 'ALL', value: 'ALL' }
  ]

  const handleTimeRangeChange = (range: typeof timeRange) => {
    setTimeRange(range)
    onTimeRangeChange?.(range)
  }

  // Metric definitions
  const metrics: Array<{
    title: string
    key: keyof PropertyMetrics
  }> = [
    { title: 'Property Value', key: 'propertyValue' },
    { title: 'Monthly Income', key: 'monthlyIncome' },
    { title: 'ROI', key: 'roi' },
    { title: 'Cap Rate', key: 'capRate' },
    { title: 'Cash on Cash', key: 'cashOnCash' },
    { title: 'DSCR', key: 'debtServiceCoverage' },
    { title: 'GRM', key: 'grossRentMultiplier' },
    { title: 'NOI', key: 'netOperatingIncome' }
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Time range selector */}
      <div className="flex justify-end gap-2">
        {timeRangeButtons.map(({ label, value }) => (
          <Button
            key={value}
            size="sm"
            variant={timeRange === value ? 'solid' : 'flat'}
            onPress={() => handleTimeRangeChange(value as typeof timeRange)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(({ title, key }) => (
          <MetricCard
            key={key}
            title={title}
            metricKey={key}
            trend={trends[key]}
            description={getMetricDescription(key)}
          />
        ))}
      </div>

      {/* Additional analysis section */}
      <div className="p-6 rounded-xl bg-content2/50 border border-content3">
        <h3 className="text-lg font-semibold text-foreground mb-4">Key Insights</h3>
        <div className="space-y-3">
          {/* Property Value vs NOI */}
          <div className="flex justify-between items-center">
            <span className="text-default-500">Value to NOI Ratio</span>
            <span className="font-semibold text-foreground">
              {(trends.propertyValue.current / trends.netOperatingIncome.current).toFixed(2)}
            </span>
          </div>
          
          {/* Monthly Income vs Debt Service */}
          <div className="flex justify-between items-center">
            <span className="text-default-500">Income to Debt Ratio</span>
            <span className="font-semibold text-foreground">
              {trends.debtServiceCoverage.current.toFixed(2)}
            </span>
          </div>
          
          {/* ROI vs Market Average */}
          <div className="flex justify-between items-center">
            <span className="text-default-500">ROI Performance</span>
            <span className="font-semibold text-foreground">
              {trends.roi.current.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}