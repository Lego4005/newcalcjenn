import { Card, CardBody, Button, Divider, Spinner } from "@heroui/react";
import { Download } from 'lucide-react';
import type { CalculatorFormData } from './SellerClosingCalculator';

type CalculationResultsProps = {
  formData: CalculatorFormData | null | undefined;
};

type CostBreakdown = {
  label: string;
  amount: number;
  description?: string;
};

// Helper function for Florida Title Insurance calculation
function calculateFlTitleInsurance(salePrice: number, hasPriorPolicy: boolean): number {
  let rate = 0;
  if (salePrice <= 0) return 0;

  if (salePrice <= 100000) {
    rate = (salePrice / 1000) * 5.75;
  } else {
    rate = (100000 / 1000) * 5.75; // Rate for first 100k
    if (salePrice <= 1000000) {
       rate += ((salePrice - 100000) / 1000) * 5.00;
    } else {
       // Assuming rate stays $5.00/thousand above $1M for this example
       // TODO: Verify exact FL calculation for > $1M
       rate += ((1000000 - 100000) / 1000) * 5.00; // Rate for 100k to 1M
       rate += ((salePrice - 1000000) / 1000) * 5.00; // Rate above 1M 
    }
  }
  
  // Apply 30% discount if prior policy exists (example discount)
  // TODO: Verify standard reissue discount rate
  return hasPriorPolicy ? rate * 0.7 : rate;
}

// Helper function for Florida Doc Stamps calculation
function calculateFlDocStamps(salePrice: number): number {
   if (salePrice <= 0) return 0;
   // Round up to the nearest $100 before calculating
   const taxableAmount = Math.ceil(salePrice / 100) * 100;
   return (taxableAmount / 100) * 0.70;
}

export default function CalculationResults({ formData }: CalculationResultsProps) {
  // Check if formData or propertyDetails is missing
  if (!formData || !formData.propertyDetails) {
    // Optionally show a loading spinner or a message
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner label="Loading results..." color="primary" labelColor="primary" />
        {/* Or return <p>Waiting for property details...</p>; */}
      </div>
    );
  }

  // --- Calculations (Florida Specific Rates/Formulas) --- 
  // NOTE: Title Insurance and Doc Stamps use FL formulas from calc_fees.md.
  // Other fixed fees use averages from calc_fees.md. 
  // These need localization for other states.

  const salePrice = formData.propertyDetails.salePrice;

  // Commissions
  const listingCommission = (salePrice * formData.commissionStructure.listingAgentRate) / 100;
  const buyerCommission = (salePrice * formData.commissionStructure.buyerAgentRate) / 100;
  const totalCommission = listingCommission + buyerCommission;

  // Florida Title Insurance (from function)
  const titleInsurance = calculateFlTitleInsurance(salePrice, formData.additionalFees.hasPriorTitlePolicy);

  // Florida Doc Stamps (from function)
  const docStamps = calculateFlDocStamps(salePrice);

  // Fixed Fees (using averages from calc_fees.md)
  const settlementFee = 595;
  const titleSearchFee = 175;
  const lienSearchFee = 175; 

  // TODO: Implement accurate Tax Proration calculation based on closing date
  const taxProrations = formData.additionalFees.taxProrations; // Use user input for now

  const costs: CostBreakdown[] = [
    {
      label: "Real Estate Commissions",
      amount: totalCommission,
      description: `Listing (${formData.commissionStructure.listingAgentRate}%) + Buyer's (${formData.commissionStructure.buyerAgentRate}%)`
    },
    {
      label: "Owner's Title Insurance (FL Rate)",
      amount: titleInsurance,
      description: formData.additionalFees.hasPriorTitlePolicy ? "Includes estimated reissue discount" : "Based on FL promulgated rate"
    },
    {
      label: "Doc Stamps (FL Rate)",
      amount: docStamps,
      description: "$0.70 per $100"
    },
    {
      label: "Settlement Fee (Est.)",
      amount: settlementFee
    },
    {
      label: "Title Search (Est.)",
      amount: titleSearchFee
    },
     {
      label: "Municipal Lien Search (Est.)",
      amount: lienSearchFee
    },
    {
      label: "Tax Prorations",
      amount: taxProrations,
      description: "Seller's portion of property taxes (Input)"
    }
  ];

  if (formData.additionalFees.hoaDues > 0) {
    costs.push({
      label: "HOA Dues/Fees",
      amount: formData.additionalFees.hoaDues,
      description: "Prorated HOA fees"
    });
  }

  const mortgagePayoff = formData.mortgageInfo.loanBalance;
  const totalClosingCosts = costs.reduce((sum, cost) => sum + cost.amount, 0);
  const netProceeds = salePrice - totalClosingCosts - mortgagePayoff;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation
    console.log('Downloading PDF...');
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Calculation Results</h3>
        <p className="text-default-500 mb-6">
          Here&apos;s an estimated breakdown of your closing costs and net proceeds.
        </p>
      </div>

      <Card className="bg-primary-50 dark:bg-primary-900 border border-primary/20">
        <CardBody>
          <div className="text-center">
            <h4 className="text-default-600 text-lg mb-2">Estimated Net Proceeds</h4>
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
              <span className="text-lg font-medium">{formatCurrency(formData.propertyDetails.salePrice)}</span>
            </div>

            <Divider />

            <div className="space-y-3">
              <h4 className="font-semibold text-default-700">Estimated Closing Costs</h4>
              {costs.map((cost, index) => (
                <div key={index} className="flex justify-between items-start text-sm">
                  <div>
                    <div className="font-medium text-default-700">{cost.label}</div>
                    {cost.description && (
                      <div className="text-xs text-default-500">{cost.description}</div>
                    )}
                  </div>
                  <span className="font-medium text-default-700">({formatCurrency(cost.amount)})</span>
                </div>
              ))}
            </div>

            <Divider />

            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Total Estimated Costs</h4>
              <span className="text-lg font-medium text-danger">({formatCurrency(totalClosingCosts)})</span>
            </div>

            <Divider />

            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Mortgage Payoff</h4>
              <span className="text-lg font-medium text-danger">({formatCurrency(mortgagePayoff)})</span>
            </div>

            <Divider className="my-2"/>

            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">Estimated Net Proceeds</h4>
              <span className="text-xl font-bold text-primary">{formatCurrency(netProceeds)}</span>
            </div>
          </div>
        </CardBody>
      </Card>

      <Button
        color="primary"
        startContent={<Download className="w-4 h-4" />}
        onPress={handleDownloadPDF}
        className="mt-4 self-start"
        isDisabled
      >
        Download PDF Summary (Coming Soon)
      </Button>
    </div>
  );
} 