import { useState } from 'react';
import { Card, CardBody, Button, Divider, Tooltip, Chip, ScrollShadow, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from '@nextui-org/react';
import { Info, Download, Share2, DollarSign, TrendingDown, ArrowRight, HelpCircle, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CalculatorFormData } from '@/types/calculator';

interface CalculationResultsProps {
  formData: CalculatorFormData;
  onUpdate?: (section: keyof CalculatorFormData, data: any) => void;
}

interface CostItem {
  label: string;
  amount: number;
  type: 'commission' | 'fee' | 'tax' | 'total' | 'net';
  source: 'User' | 'Default' | 'Calculated';
  tooltip: string;
  formula?: string;
  editable?: boolean;
  onUpdate?: (value: number) => void;
  isPercentage?: boolean;
  percentageValue?: number;
}

export default function CalculationResults({ formData, onUpdate }: CalculationResultsProps) {
  const [showSources, setShowSources] = useState(false);
  const [editingItem, setEditingItem] = useState<CostItem | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleUpdate = (field: string, value: number) => {
    if (!onUpdate) return;

    if (field === 'listingCommission') {
      onUpdate('commissionStructure', {
        listingAgentRate: value,
      });
    } else if (field === 'buyerCommission') {
      onUpdate('commissionStructure', {
        buyerAgentRate: value,
      });
    } else if (field in formData.additionalFees) {
      onUpdate('additionalFees', { [field]: value });
    }
  };

  // Calculate all costs
  const listingCommission = (formData.propertyDetails.salePrice * (formData.commissionStructure.listingAgentRate / 100));
  const buyerCommission = (formData.propertyDetails.salePrice * (formData.commissionStructure.buyerAgentRate / 100));
  const totalClosingCosts = listingCommission + buyerCommission + 
    formData.additionalFees.settlementFee + formData.additionalFees.titleSearch +
    formData.additionalFees.municipalLienSearch + formData.additionalFees.docStamps +
    formData.additionalFees.titleInsurance + formData.additionalFees.taxProrations;
  const netProceeds = formData.propertyDetails.salePrice - totalClosingCosts - formData.mortgageInfo.loanBalance;

  const costs: CostItem[] = [
    {
      label: 'Listing Agent Commission',
      amount: listingCommission,
      type: 'commission',
      source: 'User',
      tooltip: `${formData.commissionStructure.listingAgentRate}% of the sale price`,
      formula: `${formData.commissionStructure.listingAgentRate}% × ${formatCurrency(formData.propertyDetails.salePrice)} = ${formatCurrency(listingCommission)}`,
      editable: true,
      onUpdate: (value) => handleUpdate('listingCommission', value),
      isPercentage: true,
      percentageValue: formData.commissionStructure.listingAgentRate
    },
    {
      label: "Buyer's Agent Commission",
      amount: buyerCommission,
      type: 'commission',
      source: 'User',
      tooltip: `${formData.commissionStructure.buyerAgentRate}% of the sale price`,
      formula: `${formData.commissionStructure.buyerAgentRate}% × ${formatCurrency(formData.propertyDetails.salePrice)} = ${formatCurrency(buyerCommission)}`,
      editable: true,
      onUpdate: (value) => handleUpdate('buyerCommission', value),
      isPercentage: true,
      percentageValue: formData.commissionStructure.buyerAgentRate
    },
    {
      label: 'Settlement Fee',
      amount: formData.additionalFees.settlementFee,
      type: 'fee',
      source: 'Default',
      tooltip: 'Standard settlement fee for Florida real estate transactions',
      formula: 'Standard fee ranging from $495-$695',
      editable: true,
      onUpdate: (value) => handleUpdate('settlementFee', value)
    },
    {
      label: 'Title Search',
      amount: formData.additionalFees.titleSearch,
      type: 'fee',
      source: 'Default',
      tooltip: 'Fee for searching property records and ensuring clear title',
      formula: 'Standard fee ranging from $150-$200',
      editable: true,
      onUpdate: (value) => handleUpdate('titleSearch', value)
    },
    {
      label: 'Municipal Lien Search',
      amount: formData.additionalFees.municipalLienSearch,
      type: 'fee',
      source: 'Default',
      tooltip: 'Required search for any municipal liens or violations',
      formula: 'Standard fee ranging from $150-$200',
      editable: true,
      onUpdate: (value) => handleUpdate('municipalLienSearch', value)
    },
    {
      label: 'Documentary Stamps',
      amount: formData.additionalFees.docStamps,
      type: 'tax',
      source: 'Calculated',
      tooltip: 'Florida documentary stamp tax ($0.70 per $100 of sale price)',
      formula: `$0.70 per $100 of ${formatCurrency(formData.propertyDetails.salePrice)} = ${formatCurrency(formData.additionalFees.docStamps)}`,
      editable: true,
      onUpdate: (value) => handleUpdate('docStamps', value)
    },
    {
      label: 'Title Insurance',
      amount: formData.additionalFees.titleInsurance,
      type: 'fee',
      source: 'Calculated',
      tooltip: 'Owner\'s title insurance policy based on Florida rates',
      formula: formData.additionalFees.hasPriorTitlePolicy ? 
        `Reissue Rate: $5.75 per $1,000 up to $100,000, then $5.00 per $1,000 above $100,000 (40% discount applied for prior policy amount of ${formatCurrency(formData.additionalFees.priorTitleAmount)})` :
        `$5.75 per $1,000 up to $100,000, then $5.00 per $1,000 above $100,000`,
      editable: true,
      onUpdate: (value) => handleUpdate('titleInsurance', value)
    },
    {
      label: 'Tax Prorations',
      amount: formData.additionalFees.taxProrations,
      type: 'tax',
      source: 'User',
      tooltip: 'Property tax credits based on closing date',
      formula: 'Based on annual tax amount and days until year end',
      editable: true,
      onUpdate: (value) => handleUpdate('taxProrations', value)
    },
    {
      label: 'Total Closing Costs',
      amount: totalClosingCosts,
      type: 'total',
      source: 'Calculated',
      tooltip: 'Sum of all closing costs and fees',
      formula: 'Sum of all fees, commissions, and taxes above'
    },
    {
      label: 'Net Proceeds',
      amount: netProceeds,
      type: 'net',
      source: 'Calculated',
      tooltip: 'Sale price minus total closing costs and mortgage balance',
      formula: `${formatCurrency(formData.propertyDetails.salePrice)} - ${formatCurrency(totalClosingCosts)} - ${formatCurrency(formData.mortgageInfo.loanBalance)} = ${formatCurrency(netProceeds)}`
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSourceChip = (source: string) => {
    switch (source) {
      case 'User':
        return <Chip size="sm" variant="flat" color="primary">User Input</Chip>;
      case 'Default':
        return <Chip size="sm" variant="flat" color="secondary">FL Default</Chip>;
      case 'Calculated':
        return <Chip size="sm" variant="flat" color="success">Calculated</Chip>;
      default:
        return null;
    }
  };

  const handleEditClick = (item: CostItem) => {
    setEditingItem(item);
    setEditValue(item.isPercentage ? 
      item.percentageValue?.toString() || "0" : 
      item.amount.toString()
    );
  };

  const handleSaveEdit = () => {
    if (editingItem?.onUpdate) {
      const numericValue = parseFloat(editValue.replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        editingItem.onUpdate(numericValue);
      }
    }
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Closing Cost Breakdown</h2>
          <p className="text-default-500">Based on sale price of {formatCurrency(formData.propertyDetails.salePrice)}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="flat"
            startContent={<Share2 className="w-4 h-4" />}
          >
            Share
          </Button>
          <Button
            variant="flat"
            startContent={<Download className="w-4 h-4" />}
          >
            Download
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Card>
        <CardBody className="p-0">
          <ScrollShadow className="max-h-[600px]">
            <div className="p-6 space-y-6">
              {/* Cost Items */}
              <div className="space-y-4">
                {costs.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`flex items-center justify-between p-3 rounded-lg transition-colors
                      ${item.type === 'total' ? 'bg-default-100' : 
                        item.type === 'net' ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <Tooltip content={item.tooltip}>
                          <Info className={`w-4 h-4 cursor-help
                            ${item.type === 'commission' ? 'text-success' :
                              item.type === 'fee' ? 'text-warning' :
                              item.type === 'tax' ? 'text-danger' :
                              item.type === 'total' ? 'text-default-500' :
                              'text-primary'}`}
                          />
                        </Tooltip>
                        <span className={`font-medium ${item.type === 'net' ? 'text-xl' : ''}`}>
                          {item.label}
                        </span>
                        {showSources && getSourceChip(item.source)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${item.type === 'net' ? 'text-xl' : ''}`}>
                          {formatCurrency(item.amount)}
                        </span>
                        {item.editable && (
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => handleEditClick(item)}
                          >
                            <Calculator className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    {(item.type === 'commission' || item.type === 'total') && (
                      <Divider className="my-4" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Edit Modal */}
              <Modal 
                isOpen={!!editingItem} 
                onClose={() => setEditingItem(null)}
                size="lg"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Edit {editingItem?.label}
                      </ModalHeader>
                      <ModalBody>
                        {editingItem?.formula && (
                          <Card className="bg-default-50 mb-4">
                            <CardBody>
                              <h4 className="text-sm font-semibold mb-2">Formula:</h4>
                              <p className="text-sm text-default-600">{editingItem.formula}</p>
                            </CardBody>
                          </Card>
                        )}
                        <Input
                          type="text"
                          label={editingItem?.isPercentage ? "Percentage" : "Amount"}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          variant="bordered"
                          size="lg"
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                {editingItem?.isPercentage ? "%" : "$"}
                              </span>
                            </div>
                          }
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="light" onPress={onClose}>
                          Cancel
                        </Button>
                        <Button color="primary" onPress={handleSaveEdit}>
                          Save
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>

              {/* Sources Toggle */}
              <div className="flex justify-end">
                <Button
                  variant="light"
                  startContent={<HelpCircle className="w-4 h-4" />}
                  onPress={() => setShowSources(!showSources)}
                >
                  {showSources ? 'Hide Sources' : 'Show Sources'}
                </Button>
              </div>
            </div>
          </ScrollShadow>
        </CardBody>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-default-50">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-danger/10">
                <TrendingDown className="w-6 h-6 text-danger" />
              </div>
              <div>
                <p className="text-default-500">Total Closing Costs</p>
                <p className="text-2xl font-bold">{formatCurrency(totalClosingCosts)}</p>
                <p className="text-sm text-default-400">
                  {((totalClosingCosts / formData.propertyDetails.salePrice) * 100).toFixed(1)}% of sale price
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-primary-50/50 dark:bg-primary-900/20">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-default-500">Estimated Net Proceeds</p>
                <p className="text-2xl font-bold">{formatCurrency(netProceeds)}</p>
                <p className="text-sm text-default-400">
                  After paying off {formatCurrency(formData.mortgageInfo.loanBalance)} mortgage
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
} 