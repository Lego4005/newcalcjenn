import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PropertyWizard from '../PropertyWizard';
import { fetchPropertyDetails } from '@/lib/api';
import { saveProperty, saveTransaction } from '@/lib/storage';
import { getCalculatorDefaults } from '@/lib/calculator';
import { supabase } from '@/lib/supabase';
import type { Property } from '@/types/property';
import type { AddressFeature } from '@/types/address';

// Mock dependencies
jest.mock('@/lib/api');
jest.mock('@/lib/storage');
jest.mock('@/lib/calculator');
jest.mock('@/lib/supabase');

// Mock child components
jest.mock('../../Dashboard/AddressAutocomplete', () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
    onSelect,
    error,
    isDisabled,
  }: {
    value: string;
    onChange: (value: string) => void;
    onSelect: (feature: AddressFeature) => void;
    error?: string;
    isDisabled?: boolean;
  }) => (
    <div data-testid="address-autocomplete">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isDisabled}
      />
      <button onClick={() => onSelect({ 
        place_name: value,
        center: [0, 0],
        properties: {}
      })}>Select</button>
      {error && <div data-testid="error">{error}</div>}
    </div>
  ),
}));

jest.mock('../PropertyDrawer', () => ({
  __esModule: true,
  default: ({
    isOpen,
    onClose,
    property,
  }: {
    isOpen: boolean;
    onClose: () => void;
    property: Property;
  }) => (
    isOpen ? (
      <div data-testid="property-drawer">
        <button onClick={onClose}>Close</button>
        <div>Property: {property.address}</div>
      </div>
    ) : null
  ),
}));

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>{children}</div>
  ),
  CardBody: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card-body" className={className}>{children}</div>
  ),
  Button: ({ 
    children,
    onPress,
    variant,
    color,
    size,
    className,
    isDisabled,
  }: { 
    children: React.ReactNode;
    onPress?: () => void;
    variant?: string;
    color?: string;
    size?: string;
    className?: string;
    isDisabled?: boolean;
  }) => (
    <button 
      onClick={onPress}
      data-variant={variant}
      data-color={color}
      data-size={size}
      className={className}
      disabled={isDisabled}
    >
      {children}
    </button>
  ),
  Input: ({
    value,
    onChange,
    placeholder,
    className,
  }: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
  }) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  ),
  Tooltip: ({ 
    children,
    content,
  }: { 
    children: React.ReactNode;
    content: React.ReactNode;
  }) => (
    <div data-tooltip={content}>
      {children}
    </div>
  ),
  Spinner: ({ size }: { size?: string }) => (
    <div data-testid="spinner" data-size={size}>Loading...</div>
  ),
}));

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
  },
}));

describe('PropertyWizard', () => {
  const mockProperty: Property = {
    id: 'test-1',
    address: '123 Test St, City, State',
    price: 500000,
    beds: 3,
    baths: 2,
    sqft: 2000,
    yearBuilt: 2020,
    lotSize: 5000,
    propertyType: 'Single Family',
    status: 'Active',
    images: ['/test-image.jpg'],
    source: {
      name: 'Test',
      fetchDate: '2025-01-30T00:00:00Z',
    },
    transactionDetails: {
      salePrice: 500000,
      annualTaxes: 5000,
      hoaFees: 200,
      mortgageBalance: 400000,
      buyerAgentCommission: 3,
      sellerAgentCommission: 3,
      closingDate: '2025-02-01',
      hasHOA: true,
    },
  };

  const mockCalculatorDefaults = {
    defaultBuyerAgentCommission: 3,
    defaultSellerAgentCommission: 3,
    defaultSettlementFee: 595,
    defaultTitleSearch: 175,
    defaultMunicipalLienSearch: 175,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getCalculatorDefaults as jest.Mock).mockResolvedValue(mockCalculatorDefaults);
    (fetchPropertyDetails as jest.Mock).mockResolvedValue(mockProperty);
    (saveProperty as jest.Mock).mockResolvedValue(mockProperty);
    (saveTransaction as jest.Mock).mockResolvedValue({});
    (supabase.from as jest.Mock).mockReturnValue({
      select: () => ({
        eq: () => ({
          order: () => ({
            limit: () => Promise.resolve({ data: [] }),
          }),
        }),
      }),
      delete: () => ({
        eq: () => Promise.resolve({}),
      }),
    });
  });

  it('renders initial step with address input', () => {
    render(
      <PropertyWizard
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    
    expect(screen.getByText('Property Location')).toBeInTheDocument();
    expect(screen.getByTestId('address-autocomplete')).toBeInTheDocument();
  });

  it('handles property selection and moves to next step', async () => {
    const onConfirm = jest.fn();
    render(
      <PropertyWizard
        onConfirm={onConfirm}
        onCancel={() => {}}
      />
    );
    
    const input = screen.getByTestId('address-autocomplete').querySelector('input');
    const selectButton = screen.getByText('Select');
    
    fireEvent.change(input!, { target: { value: '123 Test St' } });
    fireEvent.click(selectButton);
    
    await waitFor(() => {
      expect(fetchPropertyDetails).toHaveBeenCalledWith('123 Test St');
      expect(screen.getByText('Sale Details')).toBeInTheDocument();
    });
  });

  it('shows loading state while fetching property data', async () => {
    render(
      <PropertyWizard
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    
    const selectButton = screen.getByText('Select');
    fireEvent.click(selectButton);
    
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByText('Fetching property data...')).toBeInTheDocument();
  });

  it('handles property fetch errors', async () => {
    (fetchPropertyDetails as jest.Mock).mockRejectedValue(new Error('API Error'));
    
    render(
      <PropertyWizard
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    
    const selectButton = screen.getByText('Select');
    fireEvent.click(selectButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Failed to fetch property details');
    });
  });

  it('loads calculator defaults on mount', async () => {
    render(
      <PropertyWizard
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    
    await waitFor(() => {
      expect(getCalculatorDefaults).toHaveBeenCalled();
    });
  });

  it('navigates through steps', async () => {
    render(
      <PropertyWizard
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    
    // Select property to move to step 2
    const selectButton = screen.getByText('Select');
    fireEvent.click(selectButton);
    
    await waitFor(() => {
      expect(screen.getByText('Sale Details')).toBeInTheDocument();
    });
    
    // Move to step 3
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(screen.getByText('Commission & Fees')).toBeInTheDocument();
    
    // Move to step 4
    fireEvent.click(nextButton);
    expect(screen.getByText('Additional Costs')).toBeInTheDocument();
    
    // Move to final step
    fireEvent.click(nextButton);
    expect(screen.getByText('Review & Calculate')).toBeInTheDocument();
  });

  it('saves transaction details on each step', async () => {
    render(
      <PropertyWizard
        property={mockProperty}
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(saveTransaction).toHaveBeenCalled();
    });
  });

  it('calls onConfirm with final property data', async () => {
    const onConfirm = jest.fn();
    render(
      <PropertyWizard
        property={mockProperty}
        onConfirm={onConfirm}
        onCancel={() => {}}
      />
    );
    
    // Navigate to final step
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    
    // Click confirm
    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledWith(expect.objectContaining({
        id: mockProperty.id,
        address: mockProperty.address,
      }));
    });
  });

  it('calls onCancel when clicking cancel button', () => {
    const onCancel = jest.fn();
    render(
      <PropertyWizard
        onConfirm={() => {}}
        onCancel={onCancel}
      />
    );
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(onCancel).toHaveBeenCalled();
  });

  it('disables next button on first step without property', () => {
    render(
      <PropertyWizard
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('calculates net proceeds correctly', async () => {
    render(
      <PropertyWizard
        property={mockProperty}
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    
    // Navigate to final step
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    
    // Check net proceeds calculation
    const netProceeds = screen.getByText(/\$[0-9,]+/);
    expect(netProceeds).toBeInTheDocument();
  });
});