import React from 'react';
import { Button, Card, CardBody } from "@heroui/react";
import { Download, FileText, Table, FileJson } from "lucide-react";
import { type CostResponsibility } from '@/types/calculator';
import { SavedCalculation } from './PropertyComparison';
import { ComparisonPDF } from './ComparisonPDF';
import { PropertyReport } from './PropertyReport';
import { BlobProvider } from '@react-pdf/renderer';

interface ExportManagerProps {
  readonly calculations: SavedCalculation[];
  readonly selectedIds?: string[];
  readonly onExport?: () => void;
}

interface ExportFormat {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const exportFormats: ExportFormat[] = [
  {
    id: 'pdf',
    label: 'PDF Report',
    icon: <FileText className="w-4 h-4" />,
    description: 'Detailed PDF report with charts and comparisons'
  },
  {
    id: 'csv',
    label: 'CSV Spreadsheet',
    icon: <Table className="w-4 h-4" />,
    description: 'Export data to CSV for spreadsheet analysis'
  },
  {
    id: 'json',
    label: 'JSON Data',
    icon: <FileJson className="w-4 h-4" />,
    description: 'Raw JSON data for system integration'
  }
];

const generateCSV = (calculations: SavedCalculation[]): string => {
  const headers = [
    'Property Name',
    'Sale Price',
    'Purchase Date',
    'Loan Balance',
    'HOA',
    'Listing Agent Rate',
    'Buyer Agent Rate',
    'Settlement Fee',
    'Title Search',
    'Municipal Lien Search',
    'Doc Stamps',
    'Title Insurance'
  ].join(',');

  const rows = calculations.map(calc => [
    calc.name,
    calc.property_details.salePrice,
    calc.property_details.purchaseDate,
    calc.mortgage_info.loanBalance,
    calc.mortgage_info.hasHOA ? 'Yes' : 'No',
    calc.commission_structure.listingAgentRate,
    calc.commission_structure.buyerAgentRate,
    calc.additional_fees.settlementFee,
    calc.additional_fees.titleSearch,
    calc.additional_fees.municipalLienSearch,
    calc.additional_fees.docStamps,
    calc.additional_fees.titleInsurance
  ].join(','));

  return [headers, ...rows].join('\n');
};

const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export function ExportManager({ calculations, selectedIds, onExport }: ExportManagerProps) {
  const [selectedFormat, setSelectedFormat] = React.useState<string>('pdf');
  
  const transformCostResponsibility = (costs: CostResponsibility): { [key: string]: 'seller' | 'buyer' } => {
    const result: { [key: string]: 'seller' | 'buyer' } = {};
    Object.entries(costs).forEach(([key, value]) => {
      result[key] = value;
    });
    return result;
  };
  
  const getTransactionDetails = (calc: SavedCalculation) => ({
    ...calc.mortgage_info,
    ...calc.commission_structure,
    ...calc.additional_fees,
    salePrice: calc.property_details.salePrice,
    costResponsibility: transformCostResponsibility(calc.additional_fees.costResponsibility)
  });
  const selectedCalculations = selectedIds 
    ? calculations.filter(calc => selectedIds.includes(calc.id))
    : calculations;

  const handleExport = (format: string) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const prefix = selectedCalculations.length > 1 ? 'comparison' : 'property';
    
    let exportData;
    let exportFileName;
    let jsonContent;
    
    switch (format) {
      case 'csv':
        exportData = generateCSV(selectedCalculations);
        exportFileName = `${prefix}-data-${timestamp}.csv`;
        break;
      
      case 'json':
        jsonContent = JSON.stringify(selectedCalculations, null, 2);
        exportData = jsonContent;
        exportFileName = `${prefix}-data-${timestamp}.json`;
        break;
      
      // PDF is handled separately through BlobProvider
      default:
        throw new Error('Unsupported export type');
    }

    downloadFile(exportData, exportFileName, format === 'json' ? 'application/json' : 'text/csv');
    onExport?.();
  };

  return (
    <Card className="w-full">
      <CardBody className="p-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Export Data</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exportFormats.map(format => (
              <Button
                key={format.id}
                variant={selectedFormat === format.id ? "solid" : "ghost"}
                onPress={() => setSelectedFormat(format.id)}
                className="justify-start"
                startContent={format.icon}
              >
                <div className="text-left">
                  <div className="font-medium">{format.label}</div>
                  <div className="text-sm text-default-500">{format.description}</div>
                </div>
              </Button>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            {selectedFormat === 'pdf' ? (
              <BlobProvider
                document={selectedCalculations.length === 1 ? (
                  <PropertyReport
                    property={{                      
                      id: selectedCalculations[0].id,
                      address: selectedCalculations[0].name,
                      price: selectedCalculations[0].property_details.salePrice,
                      beds: 0, // These fields aren't in SavedCalculation
                      baths: 0,
                      sqft: 0,
                      yearBuilt: 0,
                      lotSize: 0,
                      propertyType: 'Unknown',
                      status: 'Active',
                      images: [],
                      transactionDetails: getTransactionDetails(selectedCalculations[0]),
                      source: { name: 'Saved Calculation', fetchDate: new Date().toISOString() }
                    }}
                  />
                ) : (
                  <ComparisonPDF calculations={selectedCalculations} metrics={[]} />
                )
              }
              >
                {({ url, loading }) => (
                  <Button
                    color="primary"
                    disabled={loading || !url}
                    onPress={() => {
                      if (url) {
                        window.open(url);
                        onExport?.();
                      }
                    }}
                    startContent={<Download className="w-4 h-4" />}
                  >
                    {loading ? 'Generating PDF...' : 'Download PDF'}
                  </Button>
                )}
              </BlobProvider>
            ) : (
              <Button
                color="primary"
                onPress={() => handleExport(selectedFormat)}
                startContent={<Download className="w-4 h-4" />}
              >
                Download {selectedFormat.toUpperCase()}
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}