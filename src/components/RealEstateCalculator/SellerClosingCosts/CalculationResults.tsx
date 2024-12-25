import { Card, CardBody, Button, Divider } from '@nextui-org/react';
import { Download } from 'lucide-react';
import type { CalculatorFormData } from './SellerClosingCalculator';

type CalculationResultsProps = {
  formData: CalculatorFormData;
};

type CostBreakdown = {
  label: string;
  amount: number;
  description?: string;
};

export default function CalculationResults({ formData }: CalculationResultsProps) {
  // Calculate commission costs
  const listingCommission = (formData.propertyDetails.salePrice * formData.commissionStructure.listingAgentRate) / 100;
  const buyerCommission = (formData.propertyDetails.salePrice * formData.commissionStructure.buyerAgentRate) / 100;

  // Calculate title insurance (example rate - should be adjusted based on location)
  const baseTitleRate = formData.propertyDetails.salePrice * 0.00575;
  const titleInsurance = formData.additionalFees.hasPriorTitlePolicy
    ? baseTitleRate * 0.7 // 30% discount for prior policy
    : baseTitleRate;

  // Standard recording and transfer fees (example rates - should be adjusted based on location)
  const recordingFees = 150;
  const transferTaxes = (formData.propertyDetails.salePrice * 0.001);

  // Calculate escrow fees (example rate - should be adjusted based on location)
  const escrowFees = Math.min(formData.propertyDetails.salePrice * 0.001, 1200);

  const costs: CostBreakdown[] = [
    {
      label: "Listing Agent Commission",
      amount: listingCommission,
      description: `${formData.commissionStructure.listingAgentRate}% of sale price`
    },
    {
      label: "Buyer's Agent Commission",
      amount: buyerCommission,
      description: `${formData.commissionStructure.buyerAgentRate}% of sale price`
    },
    {
      label: "Title Insurance",
      amount: titleInsurance,
      description: formData.additionalFees.hasPriorTitlePolicy ? "Includes prior policy discount" : undefined
    },
    {
      label: "Recording Fees",
      amount: recordingFees
    },
    {
      label: "Transfer Taxes",
      amount: transferTaxes
    },
    {
      label: "Escrow Fees",
      amount: escrowFees
    },
    {
      label: "Tax Prorations",
      amount: formData.additionalFees.taxProrations
    }
  ];

  if (formData.additionalFees.hoaDues > 0) {
    costs.push({
      label: "HOA Fees",
      amount: formData.additionalFees.hoaDues
    });
  }

  const totalCosts = costs.reduce((sum, cost) => sum + cost.amount, 0);
  const netProceeds = formData.propertyDetails.salePrice - totalCosts - formData.mortgageInfo.loanBalance;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleDownloadPDF = () => {
    // Implement PDF generation and download
    console.log('Downloading PDF...');
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Calculation Results</h3>
        <p className="text-gray-600 mb-6">
          Here's a detailed breakdown of your closing costs and net proceeds.
        </p>
      </div>

      <Card className="bg-primary-50 dark:bg-primary-900">
        <CardBody>
          <div className="text-center">
            <h4 className="text-xl mb-2">Estimated Net Proceeds</h4>
            <div className="text-4xl font-bold text-primary">
              {formatCurrency(netProceeds)}
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">Sale Price</h4>
              <span className="text-xl">{formatCurrency(formData.propertyDetails.salePrice)}</span>
            </div>

            <Divider />

            <div className="space-y-4">
              <h4 className="font-semibold">Costs & Fees</h4>
              {costs.map((cost, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{cost.label}</div>
                    {cost.description && (
                      <div className="text-small text-gray-500">{cost.description}</div>
                    )}
                  </div>
                  <span className="text-danger">{formatCurrency(cost.amount)}</span>
                </div>
              ))}
            </div>

            <Divider />

            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Total Costs</h4>
              <span className="text-xl text-danger">{formatCurrency(totalCosts)}</span>
            </div>

            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Loan Payoff</h4>
              <span className="text-xl text-danger">{formatCurrency(formData.mortgageInfo.loanBalance)}</span>
            </div>
          </div>
        </CardBody>
      </Card>

      <Button
        color="primary"
        startContent={<Download className="w-4 h-4" />}
        onPress={handleDownloadPDF}
        className="mt-4"
      >
        Download PDF Summary
      </Button>
    </div>
  );
} 