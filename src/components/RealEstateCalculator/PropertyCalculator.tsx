'use client'

import { DollarSign, TrendingUp, Calculator, Loader2 } from "lucide-react"
import { generateDemoPropertyData } from "@/lib/demoData"
import { Button } from "@heroui/react"
import Link from "next/link"
import { usePermissions } from "@/hooks/usePermissions"
import { DonutChart } from "../charts/DonutChart"
import { SparklineChart } from "../charts/SparklineChart"
import { TrendAnalysis } from "./TrendAnalysis"
import ShareButton from "./ShareButton"
import NumericInput from "../common/NumericInput"
import { useState, useEffect, useCallback } from "react"
import { 
  calculatePropertyTrends, 
  storePropertyMetrics, 
  calculateMetricTrend,
  type PropertyTrends,
  type MetricsHistory 
} from "@/lib/metrics"

interface StatCardProps {
  readonly title: string
  readonly value: string
  readonly trend?: {
    readonly value: string
    readonly label: string
    readonly isPositive?: boolean
    readonly data?: Array<{ readonly value: number }>
  }
  readonly icon?: React.ReactNode
}

// Move LoadingSpinner outside parent component
function LoadingSpinner() {
  return <Loader2 className="w-4 h-4 animate-spin text-primary" />;
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
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm">
            <span className={trend.isPositive ? "text-success" : "text-danger"}>
              {trend.value}
            </span>
            <span className="text-default-400">{trend.label}</span>
          </div>
          {trend.data && (
            <SparklineChart 
              data={trend.data}
              color={trend.isPositive ? 'hsl(var(--success))' : 'hsl(var(--danger))'}
              height={24}
            />
          )}
        </div>
      )}
    </div>
  )
}

interface PropertyCalculatorProps {
  readonly isDemoMode?: boolean
}

export function PropertyCalculator({ isDemoMode = false }: PropertyCalculatorProps) {
  const { can } = usePermissions()
  const [trends, setTrends] = useState<PropertyTrends | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Form state
  const [formData, setFormData] = useState({
    purchasePrice: 450000,
    downPayment: 90000,
    interestRate: 4.5,
    propertyTax: 4200,
    insurance: 1200,
    // Commission structure
    listingAgentRate: 3.0,
    buyerAgentRate: 3.0,
    // Additional fees
    settlementFee: 595,
    titleSearch: 150,
    municipalLienSearch: 150,
    docStamps: 0, // Calculated based on sale price
    titleInsurance: 0, // Calculated based on sale price
    hasPriorTitlePolicy: false,
    priorTitleAmount: 0,
    taxProrations: 0,
    hoaDues: 0,
    hoaEstoppelFee: 0,
    // Cost responsibility
    costResponsibility: {
      settlementFee: 'seller',
      titleSearch: 'seller',
      municipalLienSearch: 'seller',
      titleInsurance: 'seller',
      docStamps: 'seller'
    } as const
  });

  // Load demo data
  useEffect(() => {
    if (isDemoMode) {
      const { property, historicalData } = generateDemoPropertyData();
      setFormData(prev => ({
        ...prev,
        purchasePrice: property.purchasePrice,
        downPayment: property.purchasePrice * 0.2,
        propertyTax: property.propertyTax,
        insurance: property.insurance,
        listingAgentRate: property.listingAgentRate,
        buyerAgentRate: property.buyerAgentRate,
        hoaDues: property.hoaDues,
        hoaEstoppelFee: property.hoaEstoppelFee,
      }))
      
      const history = historicalData as MetricsHistory[];
      
      // Initialize trends from historical data
      if (historicalData.length > 0) {
        setTrends({
          propertyValue: calculateMetricTrend(history, 'propertyValue'),
          monthlyIncome: calculateMetricTrend(history, 'monthlyIncome'),
          roi: calculateMetricTrend(history, 'roi'),
          capRate: calculateMetricTrend(history, 'capRate'),
          cashOnCash: calculateMetricTrend(history, 'cashOnCash'),
          debtServiceCoverage: calculateMetricTrend(history, 'debtServiceCoverage'),
          grossRentMultiplier: calculateMetricTrend(history, 'grossRentMultiplier'),
          netOperatingIncome: calculateMetricTrend(history, 'netOperatingIncome')
        });
      }
    }
  }, [isDemoMode]);

  // Payment breakdown data for donut chart display
  const chartData = [
    { name: 'Principal & Interest', value: 2150 },
    { name: 'Property Tax', value: 350 },
    { name: 'Insurance', value: 100 }
  ];

  // Payment breakdown data for sharing
  const sharingBreakdown = [
    { 
      label: 'Principal & Interest',
      amount: 2150,
      type: 'payment',
      source: 'calculation',
      formula: 'Monthly P&I payment based on loan terms'
    },
    { 
      label: 'Property Tax',
      amount: 350,
      type: 'tax',
      source: 'input',
    },
    { 
      label: 'Insurance',
      amount: 100,
      type: 'insurance',
      source: 'input',
    }
  ];

  // Calculate monthly expenses
  const calculateMonthlyExpenses = useCallback(() => {
    return (
      (formData.propertyTax + formData.insurance + (formData.hoaDues * 12)) / 12 +
      formData.settlementFee / 12 +
      formData.titleSearch / 12 +
      formData.municipalLienSearch / 12
    );
  }, [
    formData.propertyTax,
    formData.insurance,
    formData.hoaDues,
    formData.settlementFee,
    formData.titleSearch,
    formData.municipalLienSearch
  ]);

  // Calculate annual debt service
  const calculateAnnualDebtService = useCallback(() => {
    const loanAmount = formData.purchasePrice - formData.downPayment;
    const monthlyRate = formData.interestRate / 100 / 12;
    const numberOfPayments = 30 * 12; // 30-year mortgage
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return monthlyPayment * 12;
  }, [formData.purchasePrice, formData.downPayment, formData.interestRate]);

  // Store and load metrics
  const storeAndLoadMetrics = useCallback(async () => {
    try {
      // In demo mode, use demo data directly without database operations
      if (isDemoMode) {
        const { historicalData } = generateDemoPropertyData();
        const history = historicalData as MetricsHistory[];
        
        setTrends({
          propertyValue: calculateMetricTrend(history, 'propertyValue'),
          monthlyIncome: calculateMetricTrend(history, 'monthlyIncome'),
          roi: calculateMetricTrend(history, 'roi'),
          capRate: calculateMetricTrend(history, 'capRate'),
          cashOnCash: calculateMetricTrend(history, 'cashOnCash'),
          debtServiceCoverage: calculateMetricTrend(history, 'debtServiceCoverage'),
          grossRentMultiplier: calculateMetricTrend(history, 'grossRentMultiplier'),
          netOperatingIncome: calculateMetricTrend(history, 'netOperatingIncome')
        });
        setIsLoading(false);
        return;
      }

      setIsLoading(true)
      await storePropertyMetrics(
        'current', // Use 'current' as placeholder ID for unsaved calculations
        formData.purchasePrice,
        3200, // Example monthly income - should be from form
        formData.purchasePrice,
        formData.downPayment,
        calculateMonthlyExpenses(),
        calculateAnnualDebtService()
      );
      
      const propertyTrends = await calculatePropertyTrends('current');
      setTrends(propertyTrends);
    } catch (error) {
      console.error('Error updating metrics:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData, isDemoMode, calculateMonthlyExpenses, calculateAnnualDebtService]);

  // Update metrics when form data changes
  useEffect(() => {
    storeAndLoadMetrics();
  }, [storeAndLoadMetrics]);

  const handleInputChange = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Total Investment"
          value="$450,000"
          trend={{
            value: "+2.5%",
            label: "vs last month",
            isPositive: trends?.propertyValue.isPositive ?? true,
            data: trends?.propertyValue.data ?? []
          }}
          icon={isLoading ? <LoadingSpinner /> : <DollarSign className="w-4 h-4 text-primary" />}
        />
        <StatCard
          title="Monthly Income"
          value="$3,200"
          trend={{
            value: "+5.2%",
            label: "vs last month",
            isPositive: trends?.monthlyIncome.isPositive ?? true,
            data: trends?.monthlyIncome.data ?? []
          }}
          icon={isLoading ? <LoadingSpinner /> : <DollarSign className="w-4 h-4 text-primary" />}
        />
        <StatCard
          title="Property Value"
          value="$475,000"
          trend={{
            value: "+8.1%",
            label: "vs purchase",
            isPositive: trends?.propertyValue.isPositive ?? true,
            data: trends?.propertyValue.data ?? []
          }}
          icon={isLoading ? <LoadingSpinner /> : <DollarSign className="w-4 h-4 text-primary" />}
        />
        <StatCard
          title="ROI"
          value="8.5%"
          trend={{
            value: "+0.5%",
            label: "vs target",
            isPositive: trends?.roi.isPositive ?? true,
            data: trends?.roi.data ?? []
          }}
          icon={isLoading ? <LoadingSpinner /> : <TrendingUp className="w-4 h-4 text-primary" />}
        />
      </div>
      
      {/* Trend Analysis */}
      {trends && (
        <TrendAnalysis 
          trends={trends} 
          onTimeRangeChange={storeAndLoadMetrics} 
          className={isLoading ? 'opacity-50' : ''}
        />
      )}

      <div className="p-6 rounded-xl bg-content1 border border-content2">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Property Analysis</h2>
        </div>

        {can('BULK_CALCULATOR') && (
          <Link href="/dashboard/calculator/bulk">
            <Button
              variant="flat"
              startContent={<Calculator className="w-4 h-4" />}
            >
              Bulk Calculator
            </Button>
          </Link>
        )}

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <NumericInput
                label="Purchase Price"
                placeholder="Enter amount"
                value={formData.purchasePrice}
                onChange={handleInputChange('purchasePrice')}
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
              <NumericInput
                label="Down Payment"
                placeholder="Enter amount"
                value={formData.downPayment}
                onChange={handleInputChange('downPayment')}
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
              <NumericInput
                label="Interest Rate"
                placeholder="Enter percentage"
                value={formData.interestRate}
                onChange={handleInputChange('interestRate')}
                isPercentage
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
              />
            </div>
            <div>
              <NumericInput
                label="Property Tax (Annual)"
                placeholder="Enter amount"
                value={formData.propertyTax}
                onChange={handleInputChange('propertyTax')}
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
              <NumericInput
                label="Insurance (Annual)"
                placeholder="Enter amount"
                value={formData.insurance}
                onChange={handleInputChange('insurance')}
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

            {/* Commission Structure */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Commission Structure</h3>
              <div className="space-y-4">
                <NumericInput
                  label="Listing Agent Rate"
                  placeholder="Enter percentage"
                  value={formData.listingAgentRate}
                  onChange={handleInputChange('listingAgentRate')}
                  isPercentage
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
                />
                <NumericInput
                  label="Buyer Agent Rate"
                  placeholder="Enter percentage"
                  value={formData.buyerAgentRate}
                  onChange={handleInputChange('buyerAgentRate')}
                  isPercentage
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
                />
              </div>
            </div>

            {/* Additional Fees */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Additional Fees</h3>
              <div className="space-y-4">
                <NumericInput
                  label="Settlement Fee"
                  placeholder="Enter amount"
                  value={formData.settlementFee}
                  onChange={handleInputChange('settlementFee')}
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
                <NumericInput
                  label="Title Search"
                  placeholder="Enter amount"
                  value={formData.titleSearch}
                  onChange={handleInputChange('titleSearch')}
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
                <NumericInput
                  label="Municipal Lien Search"
                  placeholder="Enter amount"
                  value={formData.municipalLienSearch}
                  onChange={handleInputChange('municipalLienSearch')}
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
                <NumericInput
                  label="HOA Dues"
                  placeholder="Enter amount"
                  value={formData.hoaDues}
                  onChange={handleInputChange('hoaDues')}
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
                <NumericInput
                  label="HOA Estoppel Fee"
                  placeholder="Enter amount"
                  value={formData.hoaEstoppelFee}
                  onChange={handleInputChange('hoaEstoppelFee')}
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
          </div>

          <div className="p-6 rounded-xl bg-content2/50 border border-content3">
            <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Payment Breakdown</h3>
            <div className="mb-6">
              <DonutChart 
                data={chartData}
                className="h-48"
                colors={['hsl(var(--primary))', 'hsl(var(--warning))', 'hsl(var(--danger))']}
              />
            </div>
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
              <div className="mt-6 pt-4 border-t border-content3">
                <ShareButton 
                  formData={{
                    propertyDetails: {
                      salePrice: formData.purchasePrice,
                      purchaseDate: new Date().toISOString().split('T')[0]
                    },
                    mortgageInfo: {
                      loanBalance: formData.purchasePrice - formData.downPayment,
                      hasHOA: false
                    },
                    commissionStructure: {
                      listingAgentRate: formData.listingAgentRate / 100,
                      buyerAgentRate: formData.buyerAgentRate / 100
                    },
                    additionalFees: {
                      hasPriorTitlePolicy: formData.hasPriorTitlePolicy,
                      priorTitleAmount: formData.priorTitleAmount,
                      taxProrations: formData.taxProrations,
                      hoaDues: formData.hoaDues,
                      hoaEstoppelFee: formData.hoaEstoppelFee,
                      settlementFee: formData.settlementFee,
                      titleSearch: formData.titleSearch,
                      municipalLienSearch: formData.municipalLienSearch,
                      docStamps: formData.docStamps,
                      titleInsurance: formData.titleInsurance,
                      costResponsibility: formData.costResponsibility
                    }
                  }}
                  costs={sharingBreakdown}
                  totalClosingCosts={2600}
                  netProceeds={formData.purchasePrice - 2600}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}