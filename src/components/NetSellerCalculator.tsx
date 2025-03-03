'use client'

import { useState, useEffect } from 'react'
import { 
  Card, 
  CardBody, 
  Input, 
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
    <Card className="border border-divider bg-content1">
      <div className="flex p-4">
        <div className="flex flex-col gap-y-2">
          <dt className="text-small font-medium text-foreground-500">{title}</dt>
          <dd className="text-2xl font-semibold text-foreground">{value}</dd>
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
  
  // For debugging - log inputs whenever they change
  useEffect(() => {
    console.log("Current inputs state:", inputs);
  }, [inputs]);

  // Fixed handleInputChange function with better validation and error handling
  const handleInputChange = (field: keyof CalculatorInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      // Get the raw input value and clean it
      const rawValue = e.target.value;
      const cleanValue = rawValue.replace(/,/g, '').trim();
      
      // Parse the value, defaulting to 0 if invalid
      const value = cleanValue === '' ? 0 : Number(cleanValue);
      
      // Validate the parsed value
      if (isNaN(value)) {
        console.error(`Invalid input for ${field}: ${rawValue}`);
        return; // Don't update state with invalid values
      }
      
      // Log the parsing process
      console.log(`Field: ${field}, Raw: "${rawValue}", Clean: "${cleanValue}", Parsed: ${value}`);
      
      // Update the state with the validated value
      setInputs(prev => {
        const newInputs = { ...prev, [field]: value };
        console.log(`New ${field} value:`, value);
        return newInputs;
      });
    } catch (error) {
      console.error(`Error processing input for ${field}:`, error);
    }
  }

  // Calculate derived values
  const totalMortgagePayoff = inputs.firstMortgage + inputs.secondMortgage;
  const closingCosts = inputs.salePrice * 0.06; // Example: 6% closing costs
  const estimatedNetProceeds = inputs.salePrice - totalMortgagePayoff - closingCosts - inputs.propertyTax;

  // Calculate percentages safely (avoid division by zero)
  const mortgagePercentage = inputs.salePrice > 0 ? (totalMortgagePayoff / inputs.salePrice * 100) : 0;
  const closingCostsPercentage = inputs.salePrice > 0 ? (closingCosts / inputs.salePrice * 100) : 0;
  const propertyTaxPercentage = inputs.salePrice > 0 ? (inputs.propertyTax / inputs.salePrice * 100) : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  return (
    <div className="space-y-6">
      <Tabs 
        selectedKey={selectedTab} 
        onSelectionChange={(key) => setSelectedTab(key.toString())}
        aria-label="Calculator Options"
        classNames={{
          tabContent: "text-foreground group-data-[selected=true]:text-primary"
        }}
      >
        <Tab key="basic" title="Basic Calculator">
          <ScrollShadow className="max-h-[800px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              <Card className="bg-content1">
                <CardBody className="gap-4">
                  <Accordion>
                    <AccordionItem key="inputs" title="Sale Details">
                      <div className="space-y-4">
                        <div>
                          <Tooltip content="Enter the total sale price of the property">
                            <label className="block text-sm font-medium mb-1 text-foreground">Sale Price</label>
                          </Tooltip>
                          <Input
                            type="number"
                            placeholder="Enter sale price"
                            value={inputs.salePrice === 0 ? '' : inputs.salePrice.toString()}
                            onChange={handleInputChange('salePrice')}
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-foreground-500 text-small">$</span>
                              </div>
                            }
                            classNames={{
                              input: "text-foreground",
                              inputWrapper: "bg-content2 data-[hover=true]:bg-content3"
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1 text-foreground">First Mortgage Payoff</label>
                          <Input
                            type="number"
                            placeholder="Enter first mortgage payoff"
                            value={inputs.firstMortgage === 0 ? '' : inputs.firstMortgage.toString()}
                            onChange={handleInputChange('firstMortgage')}
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-foreground-500 text-small">$</span>
                              </div>
                            }
                            classNames={{
                              input: "text-foreground",
                              inputWrapper: "bg-content2 data-[hover=true]:bg-content3"
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1 text-foreground">Second Mortgage Payoff</label>
                          <Input
                            type="number"
                            placeholder="Enter second mortgage payoff"
                            value={inputs.secondMortgage === 0 ? '' : inputs.secondMortgage.toString()}
                            onChange={handleInputChange('secondMortgage')}
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-foreground-500 text-small">$</span>
                              </div>
                            }
                            classNames={{
                              input: "text-foreground",
                              inputWrapper: "bg-content2 data-[hover=true]:bg-content3"
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1 text-foreground">Property Tax (Annual)</label>
                          <Input
                            type="number"
                            placeholder="Enter property tax"
                            value={inputs.propertyTax === 0 ? '' : inputs.propertyTax.toString()}
                            onChange={handleInputChange('propertyTax')}
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-foreground-500 text-small">$</span>
                              </div>
                            }
                            classNames={{
                              input: "text-foreground",
                              inputWrapper: "bg-content2 data-[hover=true]:bg-content3"
                            }}
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
                        track: "stroke-default-300 dark:stroke-default-700",
                        value: "text-3xl font-semibold text-primary",
                      }}
                      value={mortgagePercentage}
                      strokeWidth={4}
                      showValueLabel={true}
                      label={<span className="text-foreground">Mortgage</span>}
                    />
                  </div>
                  <div className="flex justify-center">
                    <CircularProgress
                      classNames={{
                        svg: "w-36 h-36 drop-shadow-md",
                        indicator: "stroke-warning",
                        track: "stroke-default-300 dark:stroke-default-700",
                        value: "text-3xl font-semibold text-warning",
                      }}
                      value={closingCostsPercentage}
                      strokeWidth={4}
                      showValueLabel={true}
                      label={<span className="text-foreground">Closing Costs</span>}
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
                    change={`${mortgagePercentage.toFixed(1)}%`}
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
                    change={`${propertyTaxPercentage.toFixed(1)}%`}
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

      <Card className="bg-primary-100 dark:bg-primary-900/30">
        <CardBody>
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-foreground">Estimated Net Proceeds</span>
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(estimatedNetProceeds)}
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}