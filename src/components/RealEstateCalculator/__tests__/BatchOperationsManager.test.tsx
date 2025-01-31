import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BatchOperationsManager } from '../BatchOperationsManager';
import Papa from 'papaparse';
import type { Property } from '../BulkCalculator';

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
  CardBody: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-body">{children}</div>
  ),
  Button: ({ 
    children,
    onPress,
    startContent,
    isDisabled,
    as,
    className,
    color,
    variant 
  }: { 
    children: React.ReactNode;
    onPress?: () => void;
    startContent?: React.ReactNode;
    isDisabled?: boolean;
    as?: string;
    className?: string;
    color?: string;
    variant?: string;
  }) => (
    <button 
      onClick={onPress}
      disabled={isDisabled}
      data-testid="button"
      data-as={as}
      className={className}
      data-color={color}
      data-variant={variant}
    >
      {startContent}
      {children}
    </button>
  ),
  ButtonGroup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="button-group">{children}</div>
  ),
  Input: ({ 
    placeholder,
    value,
    onChange 
  }: { 
    placeholder: string;
    value: string;
    onChange: (e: { target: { value: string } }) => void;
  }) => (
    <input
      data-testid="input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  ),
  Dropdown: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown">{children}</div>
  ),
  DropdownTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-trigger">{children}</div>
  ),
  DropdownMenu: ({ 
    children,
    items 
  }: { 
    children: (item: { key: string; label: string; startContent?: React.ReactNode }) => React.ReactNode;
    items: Array<{ key: string; label: string; startContent?: React.ReactNode }>;
  }) => (
    <div data-testid="dropdown-menu">
      {items.map(item => children(item))}
    </div>
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Upload: () => <span data-testid="upload-icon">↑</span>,
  Download: () => <span data-testid="download-icon">↓</span>,
  Save: () => <span data-testid="save-icon">💾</span>,
  FileSpreadsheet: () => <span data-testid="spreadsheet-icon">📊</span>,
}));

// Mock papaparse
jest.mock('papaparse', () => ({
  parse: jest.fn(),
  unparse: jest.fn().mockReturnValue('mocked,csv,data'),
}));

const mockProperties: Property[] = [{
  id: '1',
  address: 'Test Property',
  formData: {
    purchasePrice: 450000,
    downPayment: 90000,
    interestRate: 4.5,
    propertyTax: 4200,
    insurance: 1200,
    listingAgentRate: 3.0,
    buyerAgentRate: 3.0,
    settlementFee: 595,
    titleSearch: 150,
    municipalLienSearch: 150,
    docStamps: 0,
    titleInsurance: 0,
    hasPriorTitlePolicy: false,
    priorTitleAmount: 0,
    taxProrations: 0,
    hoaDues: 0,
    hoaEstoppelFee: 0,
    costResponsibility: {
      settlementFee: 'seller',
      titleSearch: 'seller',
      municipalLienSearch: 'seller',
      titleInsurance: 'seller',
      docStamps: 'seller'
    }
  }
}];

describe('BatchOperationsManager', () => {
  const onImport = jest.fn();
  const onSaveTemplate = jest.fn();
  const onLoadTemplate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    URL.createObjectURL = jest.fn();
    URL.revokeObjectURL = jest.fn();
  });

  it('renders batch operations title and buttons', () => {
    render(
      <BatchOperationsManager
        onImport={onImport}
        onSaveTemplate={onSaveTemplate}
        onLoadTemplate={onLoadTemplate}
        properties={mockProperties}
      />
    );
    
    expect(screen.getByText('Batch Operations')).toBeInTheDocument();
    expect(screen.getByText('Import CSV')).toBeInTheDocument();
    expect(screen.getByText('Export CSV')).toBeInTheDocument();
    expect(screen.getByText('Templates')).toBeInTheDocument();
  });

  it('handles CSV file import', () => {
    render(
      <BatchOperationsManager
        onImport={onImport}
        onSaveTemplate={onSaveTemplate}
        onLoadTemplate={onLoadTemplate}
        properties={mockProperties}
      />
    );
    
    const file = new File(['test,csv,data'], 'test.csv', { type: 'text/csv' });
    const input = screen.getByLabelText('Import CSV') as HTMLInputElement;
    
    Object.defineProperty(input, 'files', {
      value: [file]
    });
    
    fireEvent.change(input);
    
    expect(Papa.parse).toHaveBeenCalledWith(file, expect.any(Object));
  });

  it('exports properties to CSV', () => {
    render(
      <BatchOperationsManager
        onImport={onImport}
        onSaveTemplate={onSaveTemplate}
        onLoadTemplate={onLoadTemplate}
        properties={mockProperties}
      />
    );
    
    fireEvent.click(screen.getByText('Export CSV'));
    
    expect(Papa.unparse).toHaveBeenCalledWith(expect.any(Array));
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalled();
  });

  it('disables export button when no properties exist', () => {
    render(
      <BatchOperationsManager
        onImport={onImport}
        onSaveTemplate={onSaveTemplate}
        onLoadTemplate={onLoadTemplate}
        properties={[]}
      />
    );
    
    const exportButton = screen.getByText('Export CSV').closest('button');
    expect(exportButton).toBeDisabled();
  });

  it('shows template save dialog', () => {
    render(
      <BatchOperationsManager
        onImport={onImport}
        onSaveTemplate={onSaveTemplate}
        onLoadTemplate={onLoadTemplate}
        properties={mockProperties}
      />
    );
    
    // Open templates dropdown and click save
    const saveButton = screen.getByText('Save as Template');
    fireEvent.click(saveButton);
    
    expect(screen.getByPlaceholderText('Template name')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('saves template with name', () => {
    render(
      <BatchOperationsManager
        onImport={onImport}
        onSaveTemplate={onSaveTemplate}
        onLoadTemplate={onLoadTemplate}
        properties={mockProperties}
      />
    );
    
    // Open save dialog
    fireEvent.click(screen.getByText('Save as Template'));
    
    // Enter template name
    const input = screen.getByPlaceholderText('Template name');
    fireEvent.change(input, { target: { value: 'Test Template' } });
    
    // Save template
    fireEvent.click(screen.getByText('Save'));
    
    expect(onSaveTemplate).toHaveBeenCalledWith(expect.objectContaining({
      purchasePrice: mockProperties[0].formData.purchasePrice
    }));
  });

  it('cancels template save', () => {
    render(
      <BatchOperationsManager
        onImport={onImport}
        onSaveTemplate={onSaveTemplate}
        onLoadTemplate={onLoadTemplate}
        properties={mockProperties}
      />
    );
    
    // Open save dialog
    fireEvent.click(screen.getByText('Save as Template'));
    
    // Enter template name
    const input = screen.getByPlaceholderText('Template name');
    fireEvent.change(input, { target: { value: 'Test Template' } });
    
    // Cancel save
    fireEvent.click(screen.getByText('Cancel'));
    
    expect(onSaveTemplate).not.toHaveBeenCalled();
    expect(screen.queryByPlaceholderText('Template name')).not.toBeInTheDocument();
  });

  it('loads saved template', () => {
    render(
      <BatchOperationsManager
        onImport={onImport}
        onSaveTemplate={onSaveTemplate}
        onLoadTemplate={onLoadTemplate}
        properties={mockProperties}
      />
    );
    
    // Save a template first
    fireEvent.click(screen.getByText('Save as Template'));
    fireEvent.change(screen.getByPlaceholderText('Template name'), {
      target: { value: 'Test Template' }
    });
    fireEvent.click(screen.getByText('Save'));
    
    // Load the template
    fireEvent.click(screen.getByText('Test Template'));
    
    expect(onLoadTemplate).toHaveBeenCalled();
  });

  it('validates CSV data on import', () => {
    const mockCSVData = [{
      address: '123 Test St',
      purchasePrice: '500000',
      downPayment: '100000',
      interestRate: '4.5',
      propertyTax: '5000',
      insurance: '1200',
      listingAgentRate: '3',
      buyerAgentRate: '3',
      settlementFee: '500',
      titleSearch: '150',
      municipalLienSearch: '100',
      docStamps: '3500',
      titleInsurance: '2500',
      hasPriorTitlePolicy: 'false',
      priorTitleAmount: '0',
      taxProrations: '0',
      hoaDues: '0',
      hoaEstoppelFee: '0',
      settlementFeeResponsibility: 'seller',
      titleSearchResponsibility: 'seller',
      municipalLienSearchResponsibility: 'seller',
      titleInsuranceResponsibility: 'seller',
      docStampsResponsibility: 'seller'
    }];

    (Papa.parse as jest.Mock).mockImplementation((_, options) => {
      options.complete({ data: mockCSVData });
    });

    render(
      <BatchOperationsManager
        onImport={onImport}
        onSaveTemplate={onSaveTemplate}
        onLoadTemplate={onLoadTemplate}
        properties={mockProperties}
      />
    );
    
    const file = new File(['test,csv,data'], 'test.csv', { type: 'text/csv' });
    const input = screen.getByLabelText('Import CSV') as HTMLInputElement;
    
    Object.defineProperty(input, 'files', {
      value: [file]
    });
    
    fireEvent.change(input);
    
    expect(onImport).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({
        address: '123 Test St',
        formData: expect.objectContaining({
          purchasePrice: 500000,
          downPayment: 100000
        })
      })
    ]));
  });

  it('handles invalid CSV data gracefully', () => {
    const mockCSVData = [{
      address: '123 Test St',
      purchasePrice: 'invalid',
      downPayment: 'invalid',
      settlementFeeResponsibility: 'invalid'
    }];

    (Papa.parse as jest.Mock).mockImplementation((_, options) => {
      options.complete({ data: mockCSVData });
    });

    render(
      <BatchOperationsManager
        onImport={onImport}
        onSaveTemplate={onSaveTemplate}
        onLoadTemplate={onLoadTemplate}
        properties={mockProperties}
      />
    );
    
    const file = new File(['test,csv,data'], 'test.csv', { type: 'text/csv' });
    const input = screen.getByLabelText('Import CSV') as HTMLInputElement;
    
    Object.defineProperty(input, 'files', {
      value: [file]
    });
    
    fireEvent.change(input);
    
    expect(onImport).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({
        address: '123 Test St',
        formData: expect.objectContaining({
          purchasePrice: 0,
          downPayment: 0,
          costResponsibility: expect.objectContaining({
            settlementFee: 'seller' // Default value
          })
        })
      })
    ]));
  });
});