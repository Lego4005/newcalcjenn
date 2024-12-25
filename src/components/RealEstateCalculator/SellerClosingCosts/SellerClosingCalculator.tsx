import { useState } from 'react';
import { Card, CardBody, CardHeader, Progress, Button } from '@nextui-org/react';
import PropertyDetailsForm from './steps/PropertyDetailsForm';
import MortgageInfoForm from './steps/MortgageInfoForm';
import CommissionForm from './steps/CommissionForm';
import AdditionalFeesForm from './steps/AdditionalFeesForm';
import CalculationResults from './CalculationResults';

export type CalculatorFormData = {
  propertyDetails: {
    salePrice: number;
    address: string;
    purchaseDate: string;
  };
  mortgageInfo: {
    loanBalance: number;
    hasHOA: boolean;
  };
  commissionStructure: {
    listingAgentRate: number;
    buyerAgentRate: number;
  };
  additionalFees: {
    hasPriorTitlePolicy: boolean;
    taxProrations: number;
    hoaDues: number;
  };
};

const initialFormData: CalculatorFormData = {
  propertyDetails: {
    salePrice: 0,
    address: '',
    purchaseDate: '',
  },
  mortgageInfo: {
    loanBalance: 0,
    hasHOA: false,
  },
  commissionStructure: {
    listingAgentRate: 3,
    buyerAgentRate: 3,
  },
  additionalFees: {
    hasPriorTitlePolicy: false,
    taxProrations: 0,
    hoaDues: 0,
  },
};

const steps = [
  'Property Details',
  'Mortgage Information',
  'Commission Structure',
  'Additional Fees',
  'Results',
];

export default function SellerClosingCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<CalculatorFormData>(initialFormData);

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const updateFormData = (
    section: keyof CalculatorFormData,
    data: Partial<CalculatorFormData[keyof CalculatorFormData]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PropertyDetailsForm
            data={formData.propertyDetails}
            onUpdate={(data) => updateFormData('propertyDetails', data)}
          />
        );
      case 1:
        return (
          <MortgageInfoForm
            data={formData.mortgageInfo}
            onUpdate={(data) => updateFormData('mortgageInfo', data)}
          />
        );
      case 2:
        return (
          <CommissionForm
            data={formData.commissionStructure}
            onUpdate={(data) => updateFormData('commissionStructure', data)}
          />
        );
      case 3:
        return (
          <AdditionalFeesForm
            data={formData.additionalFees}
            onUpdate={(data) => updateFormData('additionalFees', data)}
          />
        );
      case 4:
        return <CalculationResults formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Seller's Closing Costs Calculator</h2>
        <div className="w-full">
          <Progress
            aria-label="Calculator Progress"
            value={progress}
            className="max-w-md"
            color="primary"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            {steps.map((step, index) => (
              <span
                key={step}
                className={`${
                  index === currentStep ? 'text-primary font-semibold' : ''
                }`}
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardBody>
        {renderStep()}
        <div className="flex justify-between mt-6">
          <Button
            variant="flat"
            onPress={handleBack}
            isDisabled={currentStep === 0}
          >
            Back
          </Button>
          <Button
            color="primary"
            onPress={handleNext}
            isDisabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 2 ? 'Calculate' : 'Next'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
} 