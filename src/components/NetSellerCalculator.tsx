'use client'

import { useState } from 'react'
import { 
  Card, 
  CardBody, 
  Input, 
  Button, 
  Chip,
  Tabs,
  Tab,
  CircularProgress,
  Accordion,
  AccordionItem,
  Tooltip,
  ScrollShadow
} from "@nextui-org/react"

interface CalculatorInputs {
  salePrice: number
  firstMortgage: number
  secondMortgage: number
  propertyTax: number
  closingCosts: number
}

interface StatCardProps {
  title: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
}

function StatCard({ title, value, change, changeType = 'neutral' }: StatCardProps) {
  return (
    <Card className="border border-transparent dark:border-default-100">
      <div className="flex p-4">
        <div className="flex flex-col gap-y-2">
          <dt className="text-small font-medium text-default-500">{title}</dt>
          <dd className="text-2xl font-semibold text-default-700">{value}</dd>
        </div>
        {change && (
          <Chip
            className="absolute right-4 top-4"
            classNames={{
              content: "font-medium text-[0.65rem]",
            }}
            color={
              changeType === "positive" ? "success" : changeType === "neutral" ? "warning" : "danger"
            }
            radius="sm"
            size="sm"
            variant="flat"
          >
            {change}
          </Chip>
        )}
      </div>
    </Card>
  )
}

export function NetSellerCalculator() {
  const [selectedTab, setSelectedTab] = useState("basic")
  const [inputs, setInputs] = useState<CalculatorInputs>({
    salePrice: 0,
    firstMortgage: 0,
    secondMortgage: 0,
    propertyTax: 0,
    closingCosts: 0
  })

  const handleInputChange = (field: keyof CalculatorInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const totalMortgagePayoff = inputs.firstMortgage + inputs.secondMortgage
  const closingCosts = inputs.salePrice * 0.06 // Example: 6% closing costs
  const estimatedNetProceeds = inputs.salePrice - totalMortgagePayoff - closingCosts - inputs.propertyTax

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <Tabs 
        selectedKey={selectedTab} 
        onSelectionChange={(key) => setSelectedTab(key.toString())}
        aria-label="Calculator Options"
      >
        <Tab key="basic" title="Basic Calculator">
          <ScrollShadow className="max-h-[800px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              <Card>
                <CardBody className="gap-4">
                  <Accordion>
                    <AccordionItem key="inputs" title="Sale Details">
                      <div className="space-y-4">
                        <div>
                          <Tooltip content="Enter the total sale price of the property">
                            <label className="block text-sm font-medium mb-1">Sale Price</label>
                          </Tooltip>
                          <Input
                            type="number"
                            placeholder="Enter sale price"
                            value={inputs.salePrice || ''}
                            onChange={handleInputChange('salePrice')}
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">$</span>
                              </div>
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">First Mortgage Payoff</label>
                          <Input
                            type="number"
                            placeholder="Enter first mortgage payoff"
                            value={inputs.firstMortgage || ''}
                            onChange={handleInputChange('firstMortgage')}
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">$</span>
                              </div>
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Second Mortgage Payoff</label>
                          <Input
                            type="number"
                            placeholder="Enter second mortgage payoff"
                            value={inputs.secondMortgage || ''}
                            onChange={handleInputChange('secondMortgage')}
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">$</span>
                              </div>
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Property Tax (Annual)</label>
                          <Input
                            type="number"
                            placeholder="Enter property tax"
                            value={inputs.propertyTax || ''}
                            onChange={handleInputChange('propertyTax')}
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">$</span>
                              </div>
                            }
                          />
                        </div>
                      </div>
                    </AccordionItem>
                  </Accordion>
                </CardBody>
              </Card>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex justify-center">
                    <CircularProgress
                      classNames={{
                        svg: "w-36 h-36 drop-shadow-md",
                        indicator: "stroke-primary",
                        track: "stroke-default-300",
                        value: "text-3xl font-semibold text-primary",
                      }}
                      value={totalMortgagePayoff / inputs.salePrice * 100}
                      strokeWidth={4}
                      showValueLabel={true}
                      label="Mortgage"
                    />
                  </div>
                  <div className="flex justify-center">
                    <CircularProgress
                      classNames={{
                        svg: "w-36 h-36 drop-shadow-md",
                        indicator: "stroke-warning",
                        track: "stroke-default-300",
                        value: "text-3xl font-semibold text-warning",
                      }}
                      value={closingCosts / inputs.salePrice * 100}
                      strokeWidth={4}
                      showValueLabel={true}
                      label="Closing Costs"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <StatCard
                    title="Sale Price"
                    value={formatCurrency(inputs.salePrice)}
                  />
                  <StatCard
                    title="Total Mortgage Payoff"
                    value={formatCurrency(totalMortgagePayoff)}
                    change={`${((totalMortgagePayoff / inputs.salePrice) * 100).toFixed(1)}%`}
                    changeType="negative"
                  />
                  <StatCard
                    title="Closing Costs"
                    value={formatCurrency(closingCosts)}
                    change="6.0%"
                    changeType="negative"
                  />
                  <StatCard
                    title="Property Tax"
                    value={formatCurrency(inputs.propertyTax)}
                    change={`${((inputs.propertyTax / inputs.salePrice) * 100).toFixed(1)}%`}
                    changeType="negative"
                  />
                </div>
              </div>
            </div>
          </ScrollShadow>
        </Tab>
        <Tab key="advanced" title="Advanced Calculator">
          {/* Advanced calculator content */}
        </Tab>
        <Tab key="history" title="History">
          {/* Transaction history content */}
        </Tab>
      </Tabs>

      <Card className="bg-primary-50 dark:bg-primary-900/20">
        <CardBody>
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Estimated Net Proceeds</span>
            <span className="text-2xl font-bold text-primary-600">
              {formatCurrency(estimatedNetProceeds)}
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  )
} 