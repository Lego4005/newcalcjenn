import { useState, useCallback } from 'react';
import { Input, Switch, Chip, Tooltip, Button, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { DollarSign, Home, Info } from 'lucide-react';

interface MortgageInfoFormProps {
  data: {
    loanBalance: number;
    hasHOA: boolean;
  };
  onUpdate: (data: Partial<MortgageInfoFormProps['data']>) => void;
}

export default function MortgageInfoForm({ data, onUpdate }: MortgageInfoFormProps) {
  const [errors, setErrors] = useState({
    loanBalance: '',
  });

  const [inputSources, setInputSources] = useState({
    loanBalance: 'User',
    hasHOA: 'User'
  });

  const [tempLoanBalance, setTempLoanBalance] = useState(data.loanBalance.toString());

  const formatNumber = (value: number) => {
    if (!value && value !== 0) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const validateLoanBalance = (value: string) => {
    const balance = parseFloat(value.replace(/[^0-9]/g, ''));
    if (isNaN(balance) || balance < 0) {
      setErrors((prev) => ({ ...prev, loanBalance: 'Please enter a valid loan balance' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, loanBalance: '' }));
    return true;
  };

  const handleLoanBalanceChange = useCallback((value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    setTempLoanBalance(cleanValue);
    
    if (cleanValue === '') {
      onUpdate({ loanBalance: 0 });
      return;
    }
    
    const numericValue = parseInt(cleanValue, 10);
    if (validateLoanBalance(numericValue.toString())) {
      setInputSources(prev => ({ ...prev, loanBalance: 'User' }));
      onUpdate({ loanBalance: numericValue });
    }
  }, [onUpdate]);

  const handleHOAChange = useCallback(() => {
    setInputSources(prev => ({ ...prev, hasHOA: 'User' }));
    onUpdate({ hasHOA: !data.hasHOA });
  }, [data.hasHOA, onUpdate]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Mortgage Information</h3>
        <p className="text-gray-600 mb-6">
          Enter your current mortgage balance and HOA status.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-warning" />
          <span className="font-medium">Current Mortgage Balance</span>
          <Tooltip content="The remaining balance on your mortgage that will need to be paid off at closing">
            <Info className="w-4 h-4 text-default-400 cursor-help" />
          </Tooltip>
        </div>
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button
              variant="bordered"
              className="w-full justify-start text-left font-normal"
              startContent={<DollarSign className="w-4 h-4" />}
            >
              {formatNumber(data.loanBalance)}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4 w-[300px]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Enter Loan Balance</label>
                  <Input
                    type="text"
                    placeholder="Enter amount"
                    value={tempLoanBalance}
                    onValueChange={handleLoanBalanceChange}
                    size="lg"
                    variant="bordered"
                    startContent={<span className="text-default-400">$</span>}
                    className="text-lg"
                  />
                </div>
                <div className="text-center text-xl font-semibold">
                  {formatNumber(parseInt(tempLoanBalance || '0', 10))}
                </div>
                {errors.loanBalance && (
                  <div className="text-danger text-sm">{errors.loanBalance}</div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Chip size="sm" variant="flat" color="primary">Source: {inputSources.loanBalance}</Chip>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Home className="w-5 h-5 text-primary" />
          <span className="font-medium">HOA Status</span>
          <Tooltip content="Does this property have a Homeowners Association (HOA)?">
            <Info className="w-4 h-4 text-default-400 cursor-help" />
          </Tooltip>
        </div>
        <Switch
          isSelected={data.hasHOA}
          onValueChange={handleHOAChange}
        >
          {data.hasHOA ? 'Has HOA' : 'No HOA'}
        </Switch>
        <Chip size="sm" variant="flat" color="primary">Source: {inputSources.hasHOA}</Chip>
      </div>
    </div>
  );
} 