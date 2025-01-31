'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardBody, Select, SelectItem, Button, ButtonGroup, Input } from "@heroui/react"
import { DonutChart } from "../charts/DonutChart"
import { SparklineChart } from "../charts/SparklineChart"
import { ExportManager } from './ExportManager'
import { useSavedCalculations, useComparisonData } from '@/hooks/useCalculations'
import type { AdditionalFees } from '@/types/calculator'
import { usePermissions } from '@/hooks/usePermissions'

export interface SavedCalculation {
  id: string
  name: string
  property_details: {
    salePrice: number
    purchaseDate: string
    created_at: string
  }
  mortgage_info: {
    loanBalance: number
    hasHOA: boolean
  }
  commission_structure: {
    listingAgentRate: number
    buyerAgentRate: number
  }
  additional_fees: AdditionalFees
}

export interface ComparisonMetric {
  label: string
  values: { [key: string]: number | string }
  difference?: number
  isPercentage?: boolean
  trend?: boolean
}

// Extract chart data transformation functions
const getChartData = (metric: ComparisonMetric, savedCalculations: SavedCalculation[]) => {
  return Object.entries(metric.values).map(([id, value]) => ({
    name: savedCalculations.find(calc => calc.id === id)?.name ?? '',
    value: typeof value === 'number' ? value : 0
  }));
};

const getTrendData = (metric: ComparisonMetric, savedCalculations: SavedCalculation[]) => {
  return Object.entries(metric.values)
    .map(([id]) => {
      const property = savedCalculations.find(calc => calc.id === id);
      if (!property?.property_details.created_at) return null;
      return {
        value: typeof metric.values[id] === 'number' ? metric.values[id] : 0,
        timestamp: property.property_details.created_at
      };
    })
    .filter((data): data is { value: number; timestamp: string } => data !== null)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

export function PropertyComparison(): React.ReactElement {
  const { can } = usePermissions()
  const { calculations: savedCalculations, isLoading } = useSavedCalculations()
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])
  const [comparisonMetrics, setComparisonMetrics] = useState<ComparisonMetric[]>([])
  const [minPrice, setMinPrice] = useState<string>('0')
  const [maxPrice, setMaxPrice] = useState<string>('1000000')
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' })
  const [filteredCalculations, setFilteredCalculations] = useState<SavedCalculation[]>([])
  const { setupSubscriptions, prefetchData } = useComparisonData(selectedProperties)

  // Set up real-time subscriptions when selected properties change
  useEffect(() => {
    if (selectedProperties.length >= 2) {
      const cleanup = setupSubscriptions();
      return () => {
        cleanup();
      };
    }
  }, [selectedProperties, setupSubscriptions]);

  useEffect(() => {
    if (selectedProperties.length >= 2) {
      prefetchData();
    }
  }, [selectedProperties, prefetchData]);

  // Filter calculations based on price and date range
  useEffect(() => {
    const filtered = savedCalculations.filter(calc => {
      const price = calc.property_details.salePrice
      const date = new Date(calc.property_details.purchaseDate)
      const startDate = dateRange.start ? new Date(dateRange.start) : new Date(0)
      const endDate = dateRange.end ? new Date(dateRange.end) : new Date()
      const min = parseFloat(minPrice) || 0
      const max = parseFloat(maxPrice) || Infinity
      
      return (
        price >= min &&
        price <= max &&
        date >= startDate &&
        date <= endDate
      )
    })
    
    setFilteredCalculations(filtered)
  }, [savedCalculations, minPrice, maxPrice, dateRange])

  // Initialize filtered calculations
  useEffect(() => {
    if (savedCalculations.length > 0) {
      setFilteredCalculations(savedCalculations)
    }
  }, [savedCalculations])

  const calculateTotalFees = (fees: AdditionalFees): number => {
    return Object.entries(fees)
      .filter(([key]) => 
        key !== 'hasPriorTitlePolicy' && 
        key !== 'priorTitleAmount' &&
        key !== 'costResponsibility'
      )
      .reduce((sum, [, value]) => 
        typeof value === 'number' ? sum + value : sum, 0
      );
  }

  const calculateHOACosts = (fees: AdditionalFees): number => {
    return fees.hoaDues + fees.hoaEstoppelFee;
  }

  const calculateTitleCosts = (fees: AdditionalFees): number => {
    return fees.titleSearch + fees.titleInsurance;
  }

  const calculateMetrics = useCallback((properties: SavedCalculation[]) => {
    if (properties.length < 2) return

    const getMetricValues = (metric: string) => {
      const values: { [key: string]: number } = {}
      properties.forEach(prop => {
        switch (metric) {
          case 'Purchase Price':
            values[prop.id] = prop.property_details.salePrice
            break
          case 'Down Payment':
            values[prop.id] = prop.property_details.salePrice - prop.mortgage_info.loanBalance
            break
          case 'Down Payment %':
            values[prop.id] = (prop.property_details.salePrice - prop.mortgage_info.loanBalance) / prop.property_details.salePrice
            break
          case 'Mortgage Amount':
            values[prop.id] = prop.mortgage_info.loanBalance
            break
          case 'Total Closing Costs':
            values[prop.id] = prop.additional_fees.settlementFee + 
                             prop.additional_fees.titleSearch + 
                             prop.additional_fees.municipalLienSearch + 
                             prop.additional_fees.docStamps
            break
          case 'Total Commission':
            values[prop.id] = prop.property_details.salePrice * 
                             (prop.commission_structure.listingAgentRate + 
                              prop.commission_structure.buyerAgentRate)
            break
          case 'HOA Costs':
            values[prop.id] = calculateHOACosts(prop.additional_fees)
            break
          case 'Title Costs':
            values[prop.id] = calculateTitleCosts(prop.additional_fees)
            break
          case 'Tax Prorations':
            values[prop.id] = prop.additional_fees.taxProrations
            break
          case 'Total Fees':
            values[prop.id] = calculateTotalFees(prop.additional_fees)
            break
          case 'Monthly HOA':
            values[prop.id] = prop.additional_fees.hoaDues
            break
          case 'Title Insurance':
            values[prop.id] = prop.additional_fees.titleInsurance
            break
          case 'Doc Stamps':
            values[prop.id] = prop.additional_fees.docStamps
            break
        }
      })
      return values
    }

    const metrics: ComparisonMetric[] = [
      {
        label: 'Purchase Price',
        values: getMetricValues('Purchase Price'),
        trend: true
      },
      {
        label: 'Down Payment',
        values: getMetricValues('Down Payment')
      },
      {
        label: 'Down Payment %',
        values: getMetricValues('Down Payment %'),
        isPercentage: true
      },
      {
        label: 'Mortgage Amount',
        values: getMetricValues('Mortgage Amount')
      },
      {
        label: 'Total Closing Costs',
        values: getMetricValues('Total Closing Costs')
      },
      {
        label: 'Total Commission',
        values: getMetricValues('Total Commission'),
        isPercentage: true
      },
      {
        label: 'HOA Costs',
        values: getMetricValues('HOA Costs')
      },
      {
        label: 'Monthly HOA',
        values: getMetricValues('Monthly HOA')
      },
      {
        label: 'Title Costs',
        values: getMetricValues('Title Costs')
      },
      {
        label: 'Title Insurance',
        values: getMetricValues('Title Insurance')
      },
      {
        label: 'Tax Prorations',
        values: getMetricValues('Tax Prorations')
      },
      {
        label: 'Doc Stamps',
        values: getMetricValues('Doc Stamps')
      },
      {
        label: 'Total Fees',
        values: getMetricValues('Total Fees'),
        trend: true
      }
    ]

    setComparisonMetrics(metrics)
  }, [])

  useEffect(() => {
    if (selectedProperties.length >= 2) {
      const selectedCalcs = savedCalculations.filter(
        calc => selectedProperties.includes(calc.id)
      )
      
      if (selectedCalcs.length >= 2) {
        calculateMetrics(selectedCalcs)
      }
    }
  }, [selectedProperties, savedCalculations, calculateMetrics])

  const formatValue = (value: number | string, isPercentage: boolean = false) => {
    if (typeof value === 'number') {
      return isPercentage
        ? `${(value * 100).toFixed(2)}%`
        : `$${value.toLocaleString()}`
    }
    return value
  }

  const handlePropertySelect = (value: string) => {
    setSelectedProperties(prev => {
      if (prev.includes(value)) {
        return prev.filter(id => id !== value)
      }
      return [...prev, value]
    })
  }

  const handleClearSelection = () => {
    setSelectedProperties([])
  }

  const renderCharts = () => {
    return (
      <div className="space-y-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comparisonMetrics.map((metric) => (
            <Card key={metric.label} className="p-4">
              <h4 className="text-lg font-semibold mb-4">{metric.label} Comparison</h4>
              <div className="h-64">
                <DonutChart
                  data={getChartData(metric, savedCalculations)}
                />
              </div>
              {metric.trend && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Historical Trend</h5>
                  <SparklineChart
                    data={getTrendData(metric, savedCalculations)}
                    height={48}
                    className="h-12"
                  />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {isLoading && (
        <div className="text-center py-4">Loading calculations...</div>
      )}
      
      <Card className="p-4 mb-6">
        <h4 className="text-lg font-semibold mb-4">Filters</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="min-price" className="text-sm font-medium mb-2 block">Min Price</label>
              <Input
                id="min-price"
                type="number"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                placeholder="Min price"
                startContent="$"
              />
            </div>
            <div>
              <label htmlFor="max-price" className="text-sm font-medium mb-2 block">Max Price</label>
              <Input
                id="max-price"
                type="number"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                placeholder="Max price"
                startContent="$"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="start-date" className="text-sm font-medium mb-2 block">Start Date</label>
              <Input
                id="start-date"
                type="date"
                value={dateRange.start}
                onChange={e => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="end-date" className="text-sm font-medium mb-2 block">End Date</label>
              <Input
                id="end-date"
                type="date"
                value={dateRange.end}
                onChange={e => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="text-sm text-default-500">
            Showing {filteredCalculations.length} of {savedCalculations.length} properties
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Select Properties"
          placeholder="Choose properties to compare"
          value={selectedProperties}
          onChange={(value) => handlePropertySelect(value.target.value)}
          multiple
        >
          {filteredCalculations.map((calc) => (
            <SelectItem key={calc.id} value={calc.id}>
              {calc.name}
            </SelectItem>
          ))}
        </Select>
        
        <ButtonGroup className="flex items-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onPress={handleClearSelection}
          >
            Clear
          </Button>
          <Button
            onPress={() => setSelectedProperties(filteredCalculations.map(calc => calc.id))}
          >
            Select All
          </Button>
          {can('export_comparison') && selectedProperties.length >= 2 && (
            <div className="mt-4">
              <ExportManager
                calculations={savedCalculations}
                selectedIds={selectedProperties}
              />
            </div>
          )}
        </ButtonGroup>
      </div>

      {selectedProperties.length >= 2 && (
        <Card className="w-full bg-content1 border border-content2">
          <CardBody className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">Property Comparison</h3>
            
            <div className="space-y-4">
              {comparisonMetrics.map((metric) => {
                const values = Object.entries(metric.values)
                const firstValue = values[0]?.[1] as number
                const maxDiff = values.reduce((max, [, val]) => 
                  Math.max(max, Math.abs((val as number) - firstValue)), 0)

                return (
                  <div key={`metric-${metric.label}`} className="p-4 rounded-lg bg-content2/50 border border-content3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-default-500">{metric.label}</span>
                      {maxDiff > 0 && (
                        <span className="text-sm font-medium text-default-500">
                          Max Difference: {formatValue(maxDiff, metric.isPercentage)}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(metric.values).map(([id, value]) => (
                        <div key={id} className="text-lg font-semibold text-foreground">
                          <span className="text-sm text-default-500 block">
                            {savedCalculations.find(calc => calc.id === id)?.name}
                          </span>
                          {formatValue(value, metric.isPercentage)}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {selectedProperties.length >= 2 && renderCharts()}
          </CardBody>
        </Card>
      )}
    </div>
  )
}