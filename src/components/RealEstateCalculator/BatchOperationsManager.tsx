import React, { useState } from 'react';
import { Card, CardBody, Button, ButtonGroup, Input, Dropdown, DropdownTrigger, DropdownMenu } from "@heroui/react";
import { Upload, Download, Save, FileSpreadsheet } from "lucide-react";
import Papa, { ParseResult } from 'papaparse';
import type { Property } from './BulkCalculator';

interface BatchOperationsManagerProps {
  readonly onImport: (properties: Property[]) => void;
  readonly onSaveTemplate: (template: Partial<Property['formData']>) => void;
  readonly onLoadTemplate: () => Partial<Property['formData']>;
  readonly properties: Property[];
}

interface Template {
  name: string;
  data: Partial<Property['formData']>;
}

interface MenuItem {
  key: string;
  label: string;
  startContent?: React.ReactNode;
}

type CostResponsibility = 'seller' | 'buyer';

interface CSVRow {
  address: string;
  purchasePrice: string;
  downPayment: string;
  interestRate: string;
  propertyTax: string;
  insurance: string;
  listingAgentRate: string;
  buyerAgentRate: string;
  settlementFee: string;
  titleSearch: string;
  municipalLienSearch: string;
  docStamps: string;
  titleInsurance: string;
  hasPriorTitlePolicy: string;
  priorTitleAmount: string;
  taxProrations: string;
  hoaDues: string;
  hoaEstoppelFee: string;
  settlementFeeResponsibility: string;
  titleSearchResponsibility: string;
  municipalLienSearchResponsibility: string;
  titleInsuranceResponsibility: string;
  docStampsResponsibility: string;
}

const validateResponsibility = (value: string): CostResponsibility => {
  const normalized = value.toLowerCase();
  if (normalized === 'seller' || normalized === 'buyer') {
    return normalized;
  }
  return 'seller'; // Default to seller if invalid
};

export function BatchOperationsManager({
  onImport,
  onSaveTemplate,
  onLoadTemplate,
  properties
}: BatchOperationsManagerProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [templateName, setTemplateName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results: ParseResult<CSVRow>) => {
        const properties = results.data.map((row, index) => ({
          id: (index + 1).toString(),
          address: row.address || `Property ${index + 1}`,
          formData: {
            purchasePrice: parseFloat(row.purchasePrice) || 0,
            downPayment: parseFloat(row.downPayment) || 0,
            interestRate: parseFloat(row.interestRate) || 0,
            propertyTax: parseFloat(row.propertyTax) || 0,
            insurance: parseFloat(row.insurance) || 0,
            listingAgentRate: parseFloat(row.listingAgentRate) || 0,
            buyerAgentRate: parseFloat(row.buyerAgentRate) || 0,
            settlementFee: parseFloat(row.settlementFee) || 0,
            titleSearch: parseFloat(row.titleSearch) || 0,
            municipalLienSearch: parseFloat(row.municipalLienSearch) || 0,
            docStamps: parseFloat(row.docStamps) || 0,
            titleInsurance: parseFloat(row.titleInsurance) || 0,
            hasPriorTitlePolicy: row.hasPriorTitlePolicy === 'true',
            priorTitleAmount: parseFloat(row.priorTitleAmount) || 0,
            taxProrations: parseFloat(row.taxProrations) || 0,
            hoaDues: parseFloat(row.hoaDues) || 0,
            hoaEstoppelFee: parseFloat(row.hoaEstoppelFee) || 0,
            costResponsibility: {
              settlementFee: validateResponsibility(row.settlementFeeResponsibility),
              titleSearch: validateResponsibility(row.titleSearchResponsibility),
              municipalLienSearch: validateResponsibility(row.municipalLienSearchResponsibility),
              titleInsurance: validateResponsibility(row.titleInsuranceResponsibility),
              docStamps: validateResponsibility(row.docStampsResponsibility)
            }
          }
        }));

        onImport(properties);
      }
    });
  };

  const exportToCSV = () => {
    const csvData = properties.map(property => ({
      address: property.address,
      purchasePrice: property.formData.purchasePrice,
      downPayment: property.formData.downPayment,
      interestRate: property.formData.interestRate,
      propertyTax: property.formData.propertyTax,
      insurance: property.formData.insurance,
      listingAgentRate: property.formData.listingAgentRate,
      buyerAgentRate: property.formData.buyerAgentRate,
      settlementFee: property.formData.settlementFee,
      titleSearch: property.formData.titleSearch,
      municipalLienSearch: property.formData.municipalLienSearch,
      docStamps: property.formData.docStamps,
      titleInsurance: property.formData.titleInsurance,
      hasPriorTitlePolicy: property.formData.hasPriorTitlePolicy,
      priorTitleAmount: property.formData.priorTitleAmount,
      taxProrations: property.formData.taxProrations,
      hoaDues: property.formData.hoaDues,
      hoaEstoppelFee: property.formData.hoaEstoppelFee,
      settlementFeeResponsibility: property.formData.costResponsibility.settlementFee,
      titleSearchResponsibility: property.formData.costResponsibility.titleSearch,
      municipalLienSearchResponsibility: property.formData.costResponsibility.municipalLienSearch,
      titleInsuranceResponsibility: property.formData.costResponsibility.titleInsurance,
      docStampsResponsibility: property.formData.costResponsibility.docStamps
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `properties-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSaveTemplate = () => {
    if (!templateName) return;

    const template: Template = {
      name: templateName,
      data: {
        purchasePrice: properties[0]?.formData.purchasePrice,
        downPayment: properties[0]?.formData.downPayment,
        interestRate: properties[0]?.formData.interestRate,
        propertyTax: properties[0]?.formData.propertyTax,
        insurance: properties[0]?.formData.insurance,
        listingAgentRate: properties[0]?.formData.listingAgentRate,
        buyerAgentRate: properties[0]?.formData.buyerAgentRate,
        settlementFee: properties[0]?.formData.settlementFee,
        titleSearch: properties[0]?.formData.titleSearch,
        municipalLienSearch: properties[0]?.formData.municipalLienSearch,
        docStamps: properties[0]?.formData.docStamps,
        titleInsurance: properties[0]?.formData.titleInsurance,
        hasPriorTitlePolicy: properties[0]?.formData.hasPriorTitlePolicy,
        priorTitleAmount: properties[0]?.formData.priorTitleAmount,
        taxProrations: properties[0]?.formData.taxProrations,
        hoaDues: properties[0]?.formData.hoaDues,
        hoaEstoppelFee: properties[0]?.formData.hoaEstoppelFee,
        costResponsibility: properties[0]?.formData.costResponsibility
      }
    };

    setTemplates([...templates, template]);
    onSaveTemplate(template.data);
    setShowSaveDialog(false);
    setTemplateName('');
  };

  return (
    <Card className="mb-6">
      <CardBody>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Batch Operations</h3>
            <ButtonGroup>
              <Button
                startContent={<Upload className="w-4 h-4" />}
                as="label"
                className="relative"
              >Import CSV<input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </Button>
              <Button
                variant="flat"
                startContent={<Download className="w-4 h-4" />}
                onPress={exportToCSV}
                isDisabled={properties.length === 0}
              >
                Export CSV
              </Button>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    startContent={<FileSpreadsheet className="w-4 h-4" />}
                  >
                    Templates
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  items={([
                    { key: 'save', label: 'Save as Template', startContent: <Save className="w-4 h-4" /> },
                    ...templates.map((template, index) => ({ key: index.toString(), label: template.name }))
                  ] as MenuItem[])}
                >
                  {(item) => (
                    <Button
                      onPress={() => item.key === 'save' ? setShowSaveDialog(true) : onLoadTemplate()}
                      startContent={item.startContent || undefined}
                    >{item.label}</Button>
                  )}
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
          </div>

          {showSaveDialog && (
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Template name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
              <Button
                color="primary"
                onPress={handleSaveTemplate}
                isDisabled={!templateName}
              >
                Save
              </Button>
              <Button
                variant="flat"
                onPress={() => {
                  setShowSaveDialog(false);
                  setTemplateName('');
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}