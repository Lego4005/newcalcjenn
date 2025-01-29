import { useState } from 'react';
import { Input, Chip, Tooltip, Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { DollarSign, Info } from 'lucide-react';

interface CommissionFormProps {
  data: {
    listingAgentRate: number;
    buyerAgentRate: number;
  };
  onUpdate: (data: Partial<CommissionFormProps['data']>) => void;
}

export default function CommissionForm({ data, onUpdate }: CommissionFormProps) {
  const [errors, setErrors] = useState({
    listingAgentRate: '',
    buyerAgentRate: '',
  });

  const [inputSources, setInputSources] = useState({
    listingAgentRate: 'User',
    buyerAgentRate: 'User'
  });

  const [tempRates, setTempRates] = useState({
    listingAgentRate: data.listingAgentRate.toString(),
    buyerAgentRate: data.buyerAgentRate.toString()
  });

  const formatRate = (value: number) => {
    if (!value && value !== 0) return '0%';
    return `${value.toFixed(2)}%`;
  };

  const validateRate = (value: string, field: keyof typeof errors) => {
    const rate = parseFloat(value);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      setErrors((prev) => ({ ...prev, [field]: 'Please enter a valid percentage (0-100)' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, [field]: '' }));
    return true;
  };

  const handleListingAgentRateChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setTempRates(prev => ({ ...prev, listingAgentRate: numericValue }));
    
    if (numericValue === '') {
      onUpdate({ listingAgentRate: 0 });
      return;
    }
    
    if (validateRate(numericValue, 'listingAgentRate')) {
      setInputSources(prev => ({ ...prev, listingAgentRate: 'User' }));
      onUpdate({ listingAgentRate: parseFloat(numericValue) });
    }
  };

  const handleBuyerAgentRateChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setTempRates(prev => ({ ...prev, buyerAgentRate: numericValue }));
    
    if (numericValue === '') {
      onUpdate({ buyerAgentRate: 0 });
      return;
    }
    
    if (validateRate(numericValue, 'buyerAgentRate')) {
      setInputSources(prev => ({ ...prev, buyerAgentRate: 'User' }));
      onUpdate({ buyerAgentRate: parseFloat(numericValue) });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Commission Structure</h3>
        <p className="text-gray-600 mb-6">
          Enter the commission rates for listing and buyer's agents.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-success" />
            <span className="font-medium">Listing Agent Commission</span>
            <Tooltip content="The percentage commission paid to the listing agent">
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
                {formatRate(data.listingAgentRate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-4 w-[300px]">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Enter Commission Rate</label>
                    <Input
                      type="text"
                      placeholder="Enter percentage"
                      value={tempRates.listingAgentRate}
                      onValueChange={handleListingAgentRateChange}
                      size="lg"
                      variant="bordered"
                      endContent={<span className="text-default-400">%</span>}
                      className="text-lg"
                    />
                  </div>
                  <div className="text-center text-xl font-semibold">
                    {formatRate(parseFloat(tempRates.listingAgentRate || '0'))}
                  </div>
                  {errors.listingAgentRate && (
                    <div className="text-danger text-sm">{errors.listingAgentRate}</div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Chip size="sm" variant="flat" color="primary">Source: {inputSources.listingAgentRate}</Chip>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-warning" />
            <span className="font-medium">Buyer's Agent Commission</span>
            <Tooltip content="The percentage commission paid to the buyer's agent">
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
                {formatRate(data.buyerAgentRate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-4 w-[300px]">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Enter Commission Rate</label>
                    <Input
                      type="text"
                      placeholder="Enter percentage"
                      value={tempRates.buyerAgentRate}
                      onValueChange={handleBuyerAgentRateChange}
                      size="lg"
                      variant="bordered"
                      endContent={<span className="text-default-400">%</span>}
                      className="text-lg"
                    />
                  </div>
                  <div className="text-center text-xl font-semibold">
                    {formatRate(parseFloat(tempRates.buyerAgentRate || '0'))}
                  </div>
                  {errors.buyerAgentRate && (
                    <div className="text-danger text-sm">{errors.buyerAgentRate}</div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Chip size="sm" variant="flat" color="primary">Source: {inputSources.buyerAgentRate}</Chip>
        </div>
      </div>
    </div>
  );
} 