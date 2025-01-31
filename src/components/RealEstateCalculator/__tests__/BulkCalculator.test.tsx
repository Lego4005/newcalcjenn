import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BulkCalculator, type Property } from '../BulkCalculator';
import { calculatePropertyMetrics } from '@/lib/metrics';

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Button: ({ 
    children, 
    onPress, 
    disabled,
    variant,
    color,
    startContent 
  }: { 
    children: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    variant?: string;
    color?: string;
    startContent?: React.ReactNode;
  }) => (
    <button 
      onClick={onPress}
      disabled={disabled}
      data-testid="button"
      data-variant={variant}
      data-color={color}
    >
      {startContent}
      {children}
    </button>
  ),
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
  CardHeader: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card-header" className={className}>{children}</div>
  ),
  CardBody: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-body">{children}</div>
  ),
  Progress: ({ 
    value,
    size,
    className,
    color 
  }: { 
    value: number;
    size?: string;
    className?: string;
    color?: string;
  }) => (
    <div 
      data-testid="progress"
      data-value={value}
      data-size={size}
      className={className}
      data-color={color}
    />
  ),
  Alert: ({ children, className, color }: { children: React.ReactNode; className?: string; color?: string }) => (
    <div data-testid="alert" className={className} data-color={color}>{children}</div>
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  DollarSign: () => <span data-testid="dollar-icon">$</span>,
  Plus: () => <span data-testid="plus-icon">+</span>,
}));

// Mock BatchOperationsManager component
jest.mock('../BatchOperationsManager', () => ({
  BatchOperationsManager: ({ 
    onImport,
    onSaveTemplate,
    onLoadTemplate
  }: { 
    onImport: (properties: Property[]) => void;
    onSaveTemplate: (template: Partial<Property['formData']>) => void;
    onLoadTemplate: () => Property['formData'];
  }) => (
    <div data-testid="batch-operations">
      <button onClick={() => onImport([{
        id: 'imported',
        address: 'Imported Property',
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
      }])}>
        Import
      </button>
      <button onClick={() => onSaveTemplate({ purchasePrice: 500000 })}>
        Save Template
      </button>
      <button onClick={() => onLoadTemplate()}>
        Load Template
      </button>
    </div>
  ),
}));

// Mock PropertyCard component
jest.mock('../PropertyCard', () => ({
  PropertyCard: ({ 
    property,
    onRemove,
    onUpdate,
    showRemove 
  }: { 
    property: Property;
    onRemove: (id: string) => void;
    onUpdate: (id: string, field: keyof Property['formData'], value: number) => void;
    showRemove: boolean;
  }) => (
    <div data-testid={`property-card-${property.id}`}>
      <span>{property.address}</span>
      {showRemove && (
        <button onClick={() => onRemove(property.id)}>Remove</button>
      )}
      <button onClick={() => onUpdate(property.id, 'purchasePrice', 600000)}>
        Update Price
      </button>
    </div>
  ),
}));

// Mock metrics calculation
jest.mock('@/lib/metrics', () => ({
  calculatePropertyMetrics: jest.fn().mockResolvedValue({
    propertyValue: 500000,
    monthlyIncome: 3000,
    capRate: 7.2,
    roi: 12.5
  })
}));

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('BulkCalculator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockReset();
  });

  it('renders initial property card', () => {
    render(<BulkCalculator />);
    
    expect(screen.getByTestId('property-card-1')).toBeInTheDocument();
    expect(screen.getByText('Property 1')).toBeInTheDocument();
  });

  it('adds new property when Add Property button is clicked', () => {
    render(<BulkCalculator />);
    
    const addButton = screen.getByText('Add Property');
    fireEvent.click(addButton);
    
    expect(screen.getByTestId('property-card-2')).toBeInTheDocument();
    expect(screen.getByText('Property 2')).toBeInTheDocument();
  });

  it('removes property when remove button is clicked', () => {
    render(<BulkCalculator />);
    
    // Add a second property first
    fireEvent.click(screen.getByText('Add Property'));
    expect(screen.getByTestId('property-card-2')).toBeInTheDocument();
    
    // Remove the second property
    fireEvent.click(screen.getByText('Remove'));
    expect(screen.queryByTestId('property-card-2')).not.toBeInTheDocument();
  });

  it('updates property when update is triggered', () => {
    render(<BulkCalculator />);
    
    fireEvent.click(screen.getByText('Update Price'));
    
    // The next calculation should use the updated price
    fireEvent.click(screen.getByText('Calculate All Properties'));
    expect(calculatePropertyMetrics).toHaveBeenCalledWith(
      expect.objectContaining({
        formData: expect.objectContaining({
          purchasePrice: 600000
        })
      })
    );
  });

  it('imports properties from BatchOperationsManager', () => {
    render(<BulkCalculator />);
    
    fireEvent.click(screen.getByText('Import'));
    
    expect(screen.getByText('Imported Property')).toBeInTheDocument();
  });

  it('saves and loads templates', () => {
    render(<BulkCalculator />);
    
    // Save template
    fireEvent.click(screen.getByText('Save Template'));
    
    // Load template
    fireEvent.click(screen.getByText('Load Template'));
    
    // Add new property which should use the template
    fireEvent.click(screen.getByText('Add Property'));
    
    // Verify the template was used
    expect(calculatePropertyMetrics).toHaveBeenCalledWith(
      expect.objectContaining({
        formData: expect.objectContaining({
          purchasePrice: 500000
        })
      })
    );
  });

  it('shows progress during calculation', async () => {
    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
      })
    );

    render(<BulkCalculator />);
    
    fireEvent.click(screen.getByText('Calculate All Properties'));
    
    // Should show progress component
    await waitFor(() => {
      expect(screen.getByTestId('progress')).toBeInTheDocument();
    });
    
    // Should update progress value
    await waitFor(() => {
      expect(screen.getByTestId('progress')).toHaveAttribute('data-value', '50');
    });
    
    // Should complete progress
    await waitFor(() => {
      expect(screen.getByTestId('progress')).toHaveAttribute('data-value', '100');
    });
  });

  it('handles calculation errors', async () => {
    const errorMessage = 'API Error';
    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage })
      })
    );

    render(<BulkCalculator />);
    
    fireEvent.click(screen.getByText('Calculate All Properties'));
    
    await waitFor(() => {
      expect(screen.getByTestId('alert')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('cancels ongoing calculation', async () => {
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');
    
    mockFetch.mockImplementationOnce(() => new Promise(() => {})); // Never resolves

    render(<BulkCalculator />);
    
    fireEvent.click(screen.getByText('Calculate All Properties'));
    
    await waitFor(() => {
      expect(screen.getByText('Cancel')).not.toBeDisabled();
    });
    
    fireEvent.click(screen.getByText('Cancel'));
    
    expect(abortSpy).toHaveBeenCalled();
    expect(screen.getByText('Calculation cancelled')).toBeInTheDocument();
  });

  it('disables calculate button during processing', async () => {
    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
      })
    );

    render(<BulkCalculator />);
    
    const calculateButton = screen.getByText('Calculate All Properties');
    fireEvent.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText('Processing...')).toBeInTheDocument();
      expect(calculateButton).toBeDisabled();
    });
  });

  it('sends correct data to API', async () => {
    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
      })
    );

    render(<BulkCalculator />);
    
    fireEvent.click(screen.getByText('Calculate All Properties'));
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/dashboard/calculator/bulk',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: expect.any(String)
        })
      );
      
      const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(requestBody).toHaveProperty('properties');
      expect(requestBody.properties[0]).toHaveProperty('metrics');
    });
  });
});