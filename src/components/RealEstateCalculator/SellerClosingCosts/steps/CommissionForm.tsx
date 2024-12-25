import { Input, Card, CardBody, Tooltip } from '@nextui-org/react';
import { InfoIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { CalculatorFormData } from '../SellerClosingCalculator';

type CommissionFormProps = {
  data: CalculatorFormData['commissionStructure'];
  onUpdate: (data: Partial<CalculatorFormData['commissionStructure']>) => void;
};

export default function CommissionForm({ data, onUpdate }: CommissionFormProps) {
  const [errors, setErrors] = useState({
    listingAgentRate: '',
    buyerAgentRate: '',
  });

  const validateRate = (value: string, field: 'listingAgentRate' | 'buyerAgentRate') => {
    const rate = parseFloat(value);
    if (isNaN(rate) || rate < 0 || rate > 10) {
      setErrors((prev) => ({
        ...prev,
        [field]: 'Please enter a valid rate between 0% and 10%',
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, [field]: '' }));
    return true;
  };

  const handleListingRateChange = (value: string) => {
    if (validateRate(value, 'listingAgentRate')) {
      onUpdate({ listingAgentRate: parseFloat(value) });
    }
  };

  const handleBuyerRateChange = (value: string) => {
    if (validateRate(value, 'buyerAgentRate')) {
      onUpdate({ buyerAgentRate: parseFloat(value) });
    }
  };

  // Validate initial data
  useEffect(() => {
    validateRate(data.listingAgentRate.toString(), 'listingAgentRate');
    validateRate(data.buyerAgentRate.toString(), 'buyerAgentRate');
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Commission Structure</h3>
        <p className="text-gray-600 mb-6">
          Enter the commission rates for both listing and buyer's agents.
        </p>
      </div>

      <Card>
        <CardBody className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-medium">Listing Agent Commission</span>
              <Tooltip content="The percentage of the sale price that goes to your listing agent">
                <InfoIcon className="w-4 h-4 text-default-400" />
              </Tooltip>
            </div>
            <Input
              type="number"
              placeholder="Enter listing agent rate"
              value={data.listingAgentRate.toString()}
              onValueChange={handleListingRateChange}
              errorMessage={errors.listingAgentRate}
              isInvalid={!!errors.listingAgentRate}
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">%</span>
                </div>
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-medium">Buyer's Agent Commission</span>
              <Tooltip content="The percentage of the sale price that goes to the buyer's agent">
                <InfoIcon className="w-4 h-4 text-default-400" />
              </Tooltip>
            </div>
            <Input
              type="number"
              placeholder="Enter buyer's agent rate"
              value={data.buyerAgentRate.toString()}
              onValueChange={handleBuyerRateChange}
              errorMessage={errors.buyerAgentRate}
              isInvalid={!!errors.buyerAgentRate}
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">%</span>
                </div>
              }
            />
          </div>
        </CardBody>
      </Card>

      <div className="text-small text-default-400 mt-2">
        Typical commission rates range from 2.5% to 3% per agent.
      </div>
    </div>
  );
} 