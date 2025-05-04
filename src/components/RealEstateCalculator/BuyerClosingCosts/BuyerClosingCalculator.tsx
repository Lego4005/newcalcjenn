import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Slider,
  Divider,
  Checkbox,
} from '@heroui/react';
import { Property } from '../Dashboard/PropertyDashboard';
import { formatPrice } from '@/lib/utils';

interface BuyerClosingCalculatorProps {
  property: Property | null; // Accept property data for auto-filling
}

// Basic mortgage calculation (simplified)
function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || annualRate <= 0 || years <= 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  return isNaN(payment) ? 0 : payment;
}

export default function BuyerClosingCalculator({ property }: BuyerClosingCalculatorProps) {
  const [purchasePrice, setPurchasePrice] = useState<number>(property?.price || 500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanYears, setLoanYears] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [propertyTaxesAnnual, setPropertyTaxesAnnual] = useState<number>(purchasePrice * 0.012); // Example 1.2%
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<number>(1500); // Example
  const [includePmi, setIncludePmi] = useState<boolean>(downPaymentPercent < 20);

  // Update defaults if property data changes
  useEffect(() => {
    if (property?.price) {
      setPurchasePrice(property.price);
      setPropertyTaxesAnnual(property.price * 0.012); // Re-estimate taxes
    }
  }, [property]);

  // Update PMI inclusion based on down payment
  useEffect(() => {
    setIncludePmi(downPaymentPercent < 20);
  }, [downPaymentPercent]);

  const downPaymentAmount = purchasePrice * (downPaymentPercent / 100);
  const loanAmount = purchasePrice - downPaymentAmount;
  
  const pAndI = calculateMonthlyPayment(loanAmount, interestRate, loanYears);
  const monthlyTaxes = propertyTaxesAnnual / 12;
  const monthlyInsurance = homeInsuranceAnnual / 12;
  // Simplified PMI estimate (e.g., 0.5% of loan amount annually)
  const monthlyPmi = includePmi ? (loanAmount * 0.005) / 12 : 0; 

  const totalMonthlyPayment = pAndI + monthlyTaxes + monthlyInsurance + monthlyPmi;

  // TODO: Implement detailed closing cost estimation
  const estimatedClosingCosts = purchasePrice * 0.03; // Rough 3% placeholder
  const estimatedCashToClose = downPaymentAmount + estimatedClosingCosts;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Buyer Financing Calculator</h2>
      </CardHeader>
      <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Input
            type="number"
            label="Purchase Price"
            startContent="$"
            value={String(purchasePrice)}
            onValueChange={(val) => setPurchasePrice(Number(val) || 0)}
          />
          <Slider   
            label={`Down Payment (${downPaymentPercent}%)`}
            step={1}
            minValue={0}
            maxValue={100} 
            value={downPaymentPercent}
            onChange={(val) => setDownPaymentPercent(val as number)}
            getValue={(value) => `${formatPrice(purchasePrice * (value as number / 100))} (${value}%)`}
            className="max-w-md"
          />
          <Input
            type="number"
            label="Loan Term (Years)"
            value={String(loanYears)}
            onValueChange={(val) => setLoanYears(Number(val) || 0)}
            step={1}
          />
          <Input
            type="number"
            label="Interest Rate (%)"
            endContent="%"
            value={String(interestRate)}
            onValueChange={(val) => setInterestRate(Number(val) || 0)}
            step={0.125}
          />
          <Input
            type="number"
            label="Annual Property Taxes"
            startContent="$"
            value={String(propertyTaxesAnnual)}
            onValueChange={(val) => setPropertyTaxesAnnual(Number(val) || 0)}
            description="Estimated based on price, adjust as needed"
          />
           <Input
            type="number"
            label="Annual Home Insurance"
            startContent="$"
            value={String(homeInsuranceAnnual)}
            onValueChange={(val) => setHomeInsuranceAnnual(Number(val) || 0)}
            description="Enter estimated annual premium"
          />
           <Checkbox isSelected={includePmi} onValueChange={setIncludePmi} isDisabled={downPaymentPercent >= 20}>
            Include PMI Estimate (if down payment &lt; 20%)
          </Checkbox>
        </div>

        {/* Results Section */}
        <div className="space-y-4 rounded-lg bg-content1 p-4">
          <h3 className="text-lg font-semibold border-b pb-2">Estimated Monthly Payment</h3>
          <div className="flex justify-between">
            <span>Principal & Interest</span>
            <span>{formatPrice(pAndI)}</span>
          </div>
          <div className="flex justify-between">
            <span>Property Taxes</span>
            <span>{formatPrice(monthlyTaxes)}</span>
          </div>
          <div className="flex justify-between">
            <span>Home Insurance</span>
            <span>{formatPrice(monthlyInsurance)}</span>
          </div>
          {includePmi && (
            <div className="flex justify-between text-warning">
              <span>PMI (Estimate)</span>
              <span>{formatPrice(monthlyPmi)}</span>
            </div>
          )}
          <Divider />
          <div className="flex justify-between font-bold text-lg">
            <span>Total Monthly</span>
            <span>{formatPrice(totalMonthlyPayment)}</span>
          </div>

          <h3 className="text-lg font-semibold border-b pb-2 pt-4">Estimated Closing Costs</h3>
          <div className="flex justify-between">
            <span>Down Payment</span>
            <span>{formatPrice(downPaymentAmount)}</span>
          </div>
           <div className="flex justify-between">
            <span>Est. Closing Costs</span>
            <span className="text-warning">{formatPrice(estimatedClosingCosts)}</span>
          </div>
           <Divider />
            <div className="flex justify-between font-bold text-lg">
            <span>Est. Cash To Close</span>
            <span>{formatPrice(estimatedCashToClose)}</span>
          </div>
          <p className="text-xs text-default-500 pt-2">
            Closing costs are estimates (e.g., lender fees, title, appraisal) and vary. Does not include prepaids/escrows.
          </p>
        </div>
      </CardBody>
    </Card>
  );
} 