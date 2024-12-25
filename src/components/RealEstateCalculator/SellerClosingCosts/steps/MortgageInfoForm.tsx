import { Input, Switch, Card, CardBody } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import type { CalculatorFormData } from '../SellerClosingCalculator';

type MortgageInfoFormProps = {
  data: CalculatorFormData['mortgageInfo'];
  onUpdate: (data: Partial<CalculatorFormData['mortgageInfo']>) => void;
};

export default function MortgageInfoForm({ data, onUpdate }: MortgageInfoFormProps) {
  const [errors, setErrors] = useState({
    loanBalance: '',
  });

  const validateLoanBalance = (value: string) => {
    const balance = parseFloat(value);
    if (isNaN(balance) || balance < 0) {
      setErrors((prev) => ({ ...prev, loanBalance: 'Please enter a valid loan balance' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, loanBalance: '' }));
    return true;
  };

  const handleLoanBalanceChange = (value: string) => {
    if (validateLoanBalance(value)) {
      onUpdate({ loanBalance: parseFloat(value) });
    }
  };

  const handleHOAChange = (checked: boolean) => {
    onUpdate({ hasHOA: checked });
  };

  // Validate initial data
  useEffect(() => {
    validateLoanBalance(data.loanBalance.toString());
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Mortgage Information</h3>
        <p className="text-gray-600 mb-6">
          Please provide details about your current mortgage and HOA status.
        </p>
      </div>

      <Card>
        <CardBody>
          <Input
            type="number"
            label="Current Loan Balance"
            placeholder="Enter your current loan balance"
            value={data.loanBalance.toString()}
            onValueChange={handleLoanBalanceChange}
            errorMessage={errors.loanBalance}
            isInvalid={!!errors.loanBalance}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">.00</span>
              </div>
            }
          />

          <div className="flex items-center justify-between mt-6">
            <div className="flex flex-col gap-1">
              <span className="text-medium">HOA Status</span>
              <span className="text-small text-default-400">
                Does this property have an HOA?
              </span>
            </div>
            <Switch
              isSelected={data.hasHOA}
              onValueChange={handleHOAChange}
              aria-label="HOA Status"
              size="lg"
            />
          </div>
        </CardBody>
      </Card>

      {data.hasHOA && (
        <div className="text-small text-default-400 mt-2">
          You'll be able to enter HOA-specific fees in the Additional Fees section.
        </div>
      )}
    </div>
  );
} 