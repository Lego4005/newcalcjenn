import { Input, Switch, Card, CardBody, Tooltip } from '@nextui-org/react';
import { InfoIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { CalculatorFormData } from '../SellerClosingCalculator';

type AdditionalFeesFormProps = {
  data: CalculatorFormData['additionalFees'];
  onUpdate: (data: Partial<CalculatorFormData['additionalFees']>) => void;
};

export default function AdditionalFeesForm({ data, onUpdate }: AdditionalFeesFormProps) {
  const [errors, setErrors] = useState({
    taxProrations: '',
    hoaDues: '',
  });

  const validateAmount = (value: string, field: 'taxProrations' | 'hoaDues') => {
    const amount = parseFloat(value);
    if (isNaN(amount) || amount < 0) {
      setErrors((prev) => ({
        ...prev,
        [field]: 'Please enter a valid amount',
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, [field]: '' }));
    return true;
  };

  const handleTaxProrationsChange = (value: string) => {
    if (validateAmount(value, 'taxProrations')) {
      onUpdate({ taxProrations: parseFloat(value) });
    }
  };

  const handleHOADuesChange = (value: string) => {
    if (validateAmount(value, 'hoaDues')) {
      onUpdate({ hoaDues: parseFloat(value) });
    }
  };

  const handlePriorTitlePolicyChange = (checked: boolean) => {
    onUpdate({ hasPriorTitlePolicy: checked });
  };

  // Validate initial data
  useEffect(() => {
    validateAmount(data.taxProrations.toString(), 'taxProrations');
    validateAmount(data.hoaDues.toString(), 'hoaDues');
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Additional Fees</h3>
        <p className="text-gray-600 mb-6">
          Enter additional costs and fees associated with the sale.
        </p>
      </div>

      <Card>
        <CardBody className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-medium">Tax Prorations</span>
              <Tooltip content="Property tax adjustments between buyer and seller">
                <InfoIcon className="w-4 h-4 text-default-400" />
              </Tooltip>
            </div>
            <Input
              type="number"
              placeholder="Enter tax prorations amount"
              value={data.taxProrations.toString()}
              onValueChange={handleTaxProrationsChange}
              errorMessage={errors.taxProrations}
              isInvalid={!!errors.taxProrations}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-medium">Prior Title Policy</span>
                <Tooltip content="Having a prior title policy may qualify you for a discount">
                  <InfoIcon className="w-4 h-4 text-default-400" />
                </Tooltip>
              </div>
              <span className="text-small text-default-400">
                Do you have a prior title policy?
              </span>
            </div>
            <Switch
              isSelected={data.hasPriorTitlePolicy}
              onValueChange={handlePriorTitlePolicyChange}
              aria-label="Prior Title Policy Status"
              size="lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-medium">HOA Dues/Fees</span>
              <Tooltip content="Include any HOA transfer fees, dues, or assessments">
                <InfoIcon className="w-4 h-4 text-default-400" />
              </Tooltip>
            </div>
            <Input
              type="number"
              placeholder="Enter HOA dues/fees"
              value={data.hoaDues.toString()}
              onValueChange={handleHOADuesChange}
              errorMessage={errors.hoaDues}
              isInvalid={!!errors.hoaDues}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
          </div>
        </CardBody>
      </Card>

      {data.hasPriorTitlePolicy && (
        <div className="text-small text-success mt-2">
          You may qualify for a title policy discount!
        </div>
      )}
    </div>
  );
} 