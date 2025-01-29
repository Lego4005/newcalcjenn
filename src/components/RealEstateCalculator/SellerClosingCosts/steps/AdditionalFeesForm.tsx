import { useState } from 'react';
import { Input, Switch, Card, CardBody, Button, Popover, PopoverTrigger, PopoverContent, Tooltip } from "@heroui/react";
import { DollarSign, Info } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface AdditionalFeesFormProps {
  data: {
    hasPriorTitlePolicy: boolean;
    priorTitleAmount?: number;
    taxProrations: number;
    hoaDues: number;
    hoaEstoppelFee?: number;
    settlementFee: number;
    titleSearch: number;
    municipalLienSearch: number;
    docStamps: number;
    titleInsurance: number;
    costResponsibility: {
      settlementFee: 'seller' | 'buyer';
      titleSearch: 'seller' | 'buyer';
      municipalLienSearch: 'seller' | 'buyer';
      titleInsurance: 'seller' | 'buyer';
      docStamps: 'seller' | 'buyer';
    };
  };
  onUpdate: (data: Partial<AdditionalFeesFormProps['data']>) => void;
}

export default function AdditionalFeesForm({ data, onUpdate }: AdditionalFeesFormProps) {
  const [tempValues, setTempValues] = useState({
    priorTitleAmount: data.priorTitleAmount?.toString() || '',
    taxProrations: data.taxProrations.toString(),
    hoaDues: data.hoaDues.toString(),
    hoaEstoppelFee: data.hoaEstoppelFee?.toString() || '',
    settlementFee: data.settlementFee.toString(),
    titleSearch: data.titleSearch.toString(),
    municipalLienSearch: data.municipalLienSearch.toString(),
    docStamps: data.docStamps.toString(),
    titleInsurance: data.titleInsurance.toString(),
  });

  const handleNumberChange = (field: keyof typeof tempValues, value: string) => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setTempValues(prev => ({ ...prev, [field]: cleanValue }));
    
    if (cleanValue === '') {
      onUpdate({ [field]: 0 });
      return;
    }
    
    const numericValue = parseFloat(cleanValue);
    if (!isNaN(numericValue)) {
      onUpdate({ [field]: numericValue });
    }
  };

  const handleCostResponsibilityChange = (field: keyof typeof data.costResponsibility) => {
    onUpdate({
      costResponsibility: {
        ...data.costResponsibility,
        [field]: data.costResponsibility[field] === 'seller' ? 'buyer' : 'seller'
      }
    });
  };

  const renderMoneyInput = (
    field: keyof typeof tempValues,
    label: string,
    tooltip: string,
    showResponsibility = false
  ) => (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">{label}</span>
          <Tooltip content={tooltip}>
            <Info className="w-4 h-4 text-default-400 cursor-help" />
          </Tooltip>
        </div>
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button
              variant="bordered"
              className="w-[200px] justify-start text-left font-normal"
              startContent={<DollarSign className="w-4 h-4" />}
            >
              {formatCurrency(parseFloat(tempValues[field] || '0'))}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4 w-[300px]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Enter Amount</label>
                  <Input
                    type="text"
                    placeholder="Enter amount"
                    value={tempValues[field]}
                    onValueChange={(value) => handleNumberChange(field, value)}
                    size="lg"
                    variant="bordered"
                    startContent={<span className="text-default-400">$</span>}
                    className="text-lg"
                  />
                </div>
                <div className="text-center text-xl font-semibold">
                  {formatCurrency(parseFloat(tempValues[field] || '0'))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {showResponsibility && (
        <Switch
          isSelected={data.costResponsibility[field as keyof typeof data.costResponsibility] === 'seller'}
          onValueChange={() => handleCostResponsibilityChange(field as keyof typeof data.costResponsibility)}
        >
          {data.costResponsibility[field as keyof typeof data.costResponsibility] === 'seller' ? 'Seller Pays' : 'Buyer Pays'}
        </Switch>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Additional Fees</h3>
        <p className="text-gray-600 mb-6">
          Enter any additional fees and select who is responsible for payment.
        </p>
      </div>

      <Card>
        <CardBody className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <Switch
              isSelected={data.hasPriorTitlePolicy}
              onValueChange={(checked) => onUpdate({ hasPriorTitlePolicy: checked })}
            >
              Has Prior Title Policy
            </Switch>
            {data.hasPriorTitlePolicy && (
              renderMoneyInput(
                'priorTitleAmount',
                'Prior Title Amount',
                'The amount of the prior title policy'
              )
            )}
          </div>

          {renderMoneyInput(
            'settlementFee',
            'Settlement Fee',
            'Fee charged by the title company for handling the closing',
            true
          )}

          {renderMoneyInput(
            'titleSearch',
            'Title Search',
            'Fee for searching property records',
            true
          )}

          {renderMoneyInput(
            'municipalLienSearch',
            'Municipal Lien Search',
            'Fee for searching municipal records for liens',
            true
          )}

          {renderMoneyInput(
            'titleInsurance',
            'Title Insurance',
            'Insurance protecting against title defects',
            true
          )}

          {renderMoneyInput(
            'docStamps',
            'Doc Stamps',
            'Documentary stamp tax on the deed',
            true
          )}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h3 className="text-lg font-semibold mb-4">Tax & HOA</h3>
          <div className="space-y-6">
            {renderMoneyInput(
              'taxProrations',
              'Annual Tax Amount',
              'The annual property tax amount'
            )}

            {renderMoneyInput(
              'hoaDues',
              'HOA Dues',
              'Annual HOA dues amount'
            )}

            {renderMoneyInput(
              'hoaEstoppelFee',
              'HOA Estoppel Fee',
              'Fee charged by the HOA for providing closing documents'
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 