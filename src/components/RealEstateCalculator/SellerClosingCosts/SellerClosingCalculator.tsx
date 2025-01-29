import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button, Tabs, Tab } from "@heroui/react";
import PropertyDetailsForm from './steps/PropertyDetailsForm';
import MortgageInfoForm from './steps/MortgageInfoForm';
import CommissionForm from './steps/CommissionForm';
import AdditionalFeesForm from './steps/AdditionalFeesForm';
import CalculationResults from './CalculationResults';
import PropertyWizard from '../PropertyWizard/PropertyWizard';
import type { CalculatorFormData } from '@/types/calculator';
import type { Property } from '@/types/property';
import { Home, PlayCircle, Calculator, PieChart, Clock, FileText } from 'lucide-react';

interface SellerClosingCalculatorProps {
  property?: Property | null;
  transactionDetails?: any;
  onTransactionUpdate?: (details: any) => void;
  onSearch?: () => void;
}

// Default fees from math.md documentation
const DEFAULT_FEES = {
  SETTLEMENT_FEE: 595, // average of $495-695
  TITLE_SEARCH: 175,   // average of $150-200
  MUNICIPAL_LIEN_SEARCH: 175, // average of $150-200
  DOC_STAMPS_RATE: 0.70, // $0.70 per $100 in FL
  TITLE_INSURANCE_RATES: {
    FIRST_100K: 5.75,  // $5.75 per thousand up to $100,000
    ABOVE_100K: 5.00   // $5.00 per thousand between $100,000 and $1 million
  },
  COMMISSION_RATES: {
    LISTING_AGENT: 6.00, // Default 6%
    BUYER_AGENT: 3.00    // Default 3%
  }
};

const initialFormData: CalculatorFormData = {
  propertyDetails: {
    salePrice: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
  },
  mortgageInfo: {
    loanBalance: 0,
    hasHOA: false,
  },
  commissionStructure: {
    listingAgentRate: DEFAULT_FEES.COMMISSION_RATES.LISTING_AGENT,
    buyerAgentRate: DEFAULT_FEES.COMMISSION_RATES.BUYER_AGENT,
  },
  additionalFees: {
    hasPriorTitlePolicy: false,
    priorTitleAmount: 0,
    taxProrations: 0,
    hoaDues: 0,
    hoaEstoppelFee: 0,
    settlementFee: DEFAULT_FEES.SETTLEMENT_FEE,
    titleSearch: DEFAULT_FEES.TITLE_SEARCH,
    municipalLienSearch: DEFAULT_FEES.MUNICIPAL_LIEN_SEARCH,
    docStamps: 0,
    titleInsurance: 0,
    costResponsibility: {
      settlementFee: 'seller',
      titleSearch: 'seller',
      municipalLienSearch: 'seller',
      titleInsurance: 'seller',
      docStamps: 'seller',
    },
  },
};

// Calculate title insurance based on FL formula and prior policy
const calculateTitleInsurance = (salePrice: number, hasPriorPolicy: boolean = false, priorAmount: number = 0) => {
  let baseRate;
  if (salePrice <= 100000) {
    baseRate = (salePrice / 1000) * DEFAULT_FEES.TITLE_INSURANCE_RATES.FIRST_100K;
  } else {
    const firstTier = 100000 / 1000 * DEFAULT_FEES.TITLE_INSURANCE_RATES.FIRST_100K;
    const remainingAmount = (salePrice - 100000) / 1000 * DEFAULT_FEES.TITLE_INSURANCE_RATES.ABOVE_100K;
    baseRate = firstTier + remainingAmount;
  }

  // Apply reissue rate if there's a prior policy
  if (hasPriorPolicy && priorAmount > 0) {
    // Calculate reissue credit (typically 40% of the overlapping coverage)
    const overlapAmount = Math.min(priorAmount, salePrice);
    const reissueCredit = calculateTitleInsurance(overlapAmount) * 0.4;
    return baseRate - reissueCredit;
  }

  return baseRate;
};

// Calculate doc stamps based on FL rate
const calculateDocStamps = (salePrice: number) => {
  return (salePrice / 100) * DEFAULT_FEES.DOC_STAMPS_RATE;
};

export default function SellerClosingCalculator({ 
  property, 
  transactionDetails,
  onTransactionUpdate,
  onSearch
}: SellerClosingCalculatorProps) {
  const [currentStep, setCurrentStep] = useState(property && transactionDetails ? "results" : "details");
  const [formData, setFormData] = useState<CalculatorFormData>(() => {
    if (property && transactionDetails) {
      const salePrice = transactionDetails.salePrice || property.price || 0;
      console.log('Initializing with sale price:', salePrice);
      
      return {
        propertyDetails: {
          salePrice: salePrice,
          purchaseDate: transactionDetails.closingDate || new Date().toISOString().split('T')[0],
        },
        mortgageInfo: {
          loanBalance: transactionDetails.mortgageBalance || 0,
          hasHOA: transactionDetails.hasHOA || false,
        },
        commissionStructure: {
          listingAgentRate: transactionDetails.sellerAgentCommission || DEFAULT_FEES.COMMISSION_RATES.LISTING_AGENT,
          buyerAgentRate: transactionDetails.buyerAgentCommission || DEFAULT_FEES.COMMISSION_RATES.BUYER_AGENT,
        },
        additionalFees: {
          hasPriorTitlePolicy: false,
          priorTitleAmount: 0,
          taxProrations: transactionDetails.annualTaxes || 0,
          hoaDues: transactionDetails.hoaFees || 0,
          hoaEstoppelFee: transactionDetails.hasHOA ? (transactionDetails.hoaFees || 0) : 0,
          settlementFee: DEFAULT_FEES.SETTLEMENT_FEE,
          titleSearch: DEFAULT_FEES.TITLE_SEARCH,
          municipalLienSearch: DEFAULT_FEES.MUNICIPAL_LIEN_SEARCH,
          docStamps: calculateDocStamps(salePrice),
          titleInsurance: calculateTitleInsurance(salePrice),
          costResponsibility: {
            settlementFee: 'seller',
            titleSearch: 'seller',
            municipalLienSearch: 'seller',
            titleInsurance: 'seller',
            docStamps: 'seller',
          },
        },
      };
    }
    return initialFormData;
  });

  const features = [
    {
      icon: <Calculator className="w-6 h-6 text-primary" />,
      title: "Accurate Calculations",
      description: "Florida-specific closing costs with up-to-date rates and fees"
    },
    {
      icon: <PieChart className="w-6 h-6 text-success" />,
      title: "Visual Breakdowns",
      description: "Clear visual representation of all costs and fees"
    },
    {
      icon: <Clock className="w-6 h-6 text-warning" />,
      title: "Real-time Updates",
      description: "Instantly see how changes affect your bottom line"
    },
    {
      icon: <FileText className="w-6 h-6 text-danger" />,
      title: "Detailed Reports",
      description: "Generate comprehensive closing cost reports"
    }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case "details":
        return (
          <>
            <PropertyDetailsForm
              data={formData.propertyDetails}
              onUpdate={(data) => updateFormData('propertyDetails', data)}
            />
            <div className="mt-8">
              <MortgageInfoForm
                data={formData.mortgageInfo}
                onUpdate={(data) => updateFormData('mortgageInfo', data)}
              />
            </div>
          </>
        );
      case "commission":
        return (
          <CommissionForm
            data={formData.commissionStructure}
            onUpdate={(data) => updateFormData('commissionStructure', data)}
          />
        );
      case "fees":
        return (
          <AdditionalFeesForm
            data={formData.additionalFees}
            onUpdate={(data) => updateFormData('additionalFees', data)}
          />
        );
      case "results":
        return <CalculationResults formData={formData} />;
      default:
        return null;
    }
  };

  const updateFormData = (
    section: keyof CalculatorFormData,
    data: Partial<CalculatorFormData[keyof CalculatorFormData]>
  ) => {
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [section]: { ...prev[section], ...data },
      };

      // Recalculate fees if sale price changes
      if (section === 'propertyDetails' && 'salePrice' in data) {
        const salePrice = data.salePrice as number;
        newFormData.additionalFees = {
          ...newFormData.additionalFees,
          docStamps: calculateDocStamps(salePrice),
          titleInsurance: calculateTitleInsurance(
            salePrice,
            newFormData.additionalFees.hasPriorTitlePolicy,
            newFormData.additionalFees.priorTitleAmount
          ),
        };
      }

      // Recalculate title insurance if prior policy status changes
      if (section === 'additionalFees' && 
         ('hasPriorTitlePolicy' in data || 'priorTitleAmount' in data)) {
        const salePrice = newFormData.propertyDetails.salePrice;
        newFormData.additionalFees = {
          ...newFormData.additionalFees,
          titleInsurance: calculateTitleInsurance(
            salePrice,
            newFormData.additionalFees.hasPriorTitlePolicy,
            newFormData.additionalFees.priorTitleAmount
          ),
        };
      }
      
      // Update transaction details when form data changes
      if (onTransactionUpdate) {
        const updatedDetails = {
          salePrice: newFormData.propertyDetails.salePrice,
          mortgageBalance: newFormData.mortgageInfo.loanBalance,
          annualTaxes: newFormData.additionalFees.taxProrations,
          hoaFees: newFormData.mortgageInfo.hasHOA ? (newFormData.additionalFees.hoaDues || 0) : 0,
          hoaEstoppelFee: newFormData.mortgageInfo.hasHOA ? (newFormData.additionalFees.hoaEstoppelFee || 0) : 0,
          buyerAgentCommission: newFormData.commissionStructure.buyerAgentRate,
          sellerAgentCommission: newFormData.commissionStructure.listingAgentRate,
          closingDate: newFormData.propertyDetails.purchaseDate,
          hasHOA: newFormData.mortgageInfo.hasHOA,
          settlementFee: newFormData.additionalFees.settlementFee,
          titleSearch: newFormData.additionalFees.titleSearch,
          municipalLienSearch: newFormData.additionalFees.municipalLienSearch,
          docStamps: newFormData.additionalFees.docStamps,
          titleInsurance: newFormData.additionalFees.titleInsurance,
          hasPriorTitlePolicy: newFormData.additionalFees.hasPriorTitlePolicy,
          priorTitleAmount: newFormData.additionalFees.priorTitleAmount,
          costResponsibility: newFormData.additionalFees.costResponsibility,
        };
        onTransactionUpdate(updatedDetails);
      }
      
      return newFormData;
    });
  };

  if (!property || !transactionDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
        <Card className="w-full max-w-[1000px] bg-content1">
          <CardBody className="p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="space-y-4">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-4 mx-auto shadow-lg">
                  <span className="text-4xl font-bold text-white">$</span>
                </div>
                <h1 className="text-4xl font-bold text-primary">
                  Seller's Closing Costs Calculator
                </h1>
                <p className="text-xl text-default-600 max-w-2xl mx-auto">
                  Make informed decisions with our comprehensive closing costs calculator designed specifically for Florida real estate.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
                <Button
                  size="lg"
                  color="primary"
                  variant="shadow"
                  onPress={() => {
                    console.log('Search button clicked');
                    if (onSearch) {
                      onSearch();
                    }
                  }}
                  startContent={<Home className="w-4 h-4" />}
                  className="h-14 px-8 text-lg w-full sm:w-auto"
                >
                  Search Property
                </Button>
                <Button
                  size="lg"
                  variant="bordered"
                  onPress={() => {
                    if (onTransactionUpdate) {
                      onTransactionUpdate({
                        salePrice: 450000,
                        mortgageBalance: 250000,
                        annualTaxes: 5000,
                        hoaFees: 200,
                        buyerAgentCommission: 3,
                        sellerAgentCommission: 3,
                        closingDate: new Date().toISOString().split('T')[0],
                        hasHOA: true,
                      });
                    }
                  }}
                  startContent={<PlayCircle className="w-5 h-5" />}
                  className="h-14 px-8 text-lg w-full sm:w-auto"
                >
                  Try Demo Mode
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-12">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center text-center p-6 rounded-xl bg-content2 hover:bg-content3 transition-colors"
                  >
                    <div className="mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-default-500 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-default-500">
                  Trusted by Florida real estate professionals • Updated with latest 2024 rates
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-[1200px] mx-auto">
      <CardHeader className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Seller's Closing Costs Calculator</h1>
        <Tabs 
          selectedKey={currentStep}
          onSelectionChange={(key) => setCurrentStep(key.toString())}
          className="w-full"
        >
          <Tab key="details" title="Property Details" />
          <Tab key="commission" title="Commissions" />
          <Tab key="fees" title="Other Fees" />
          <Tab key="results" title="Results" />
        </Tabs>
      </CardHeader>
      <CardBody>
        {renderStep()}
      </CardBody>
    </Card>
  );
} 