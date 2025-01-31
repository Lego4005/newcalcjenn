import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PropertyDashboard from '../PropertyDashboard';
import { getProperty, getTransaction, saveTransaction } from '@/lib/storage';
import { usePropertyUpdates } from '@/hooks/usePropertyUpdates';
import type { Property, TransactionDetails } from '@/types/property';

// Mock dependencies
jest.mock('@/lib/storage');
jest.mock('@/hooks/usePropertyUpdates');

// Mock child components
jest.mock('../../SellerClosingCosts/SellerClosingCalculator', () => ({
  __esModule: true,
  default: ({
    property,
    transactionDetails,
    onTransactionUpdate,
    onSearch,
  }: {
    property: Property | null;
    transactionDetails: TransactionDetails | null;
    onTransactionUpdate: (details: TransactionDetails | null) => void;
    onSearch: () => void;
  }) => (
    <div data-testid="seller-calculator">
      <button onClick={() => onTransactionUpdate(null)}>Update Transaction</button>
      <button onClick={onSearch}>Search</button>
      <div>Property: {property?.address}</div>
      <div>Transaction: {transactionDetails?.salePrice}</div>
    </div>
  ),
}));

jest.mock('../PropertyWizard/PropertyWizard', () => ({
  __esModule: true,
  default: ({
    property,
    onConfirm,
    onCancel,
  }: {
    property?: Property;
    onConfirm: (property: Property | null) => void;
    onCancel: () => void;
  }) => (
    <div data-testid="property-wizard">
      <button onClick={() => onConfirm(mockProperty)}>Confirm Property</button>
      <button onClick={onCancel}>Cancel</button>
      <div>Current: {property?.address}</div>
    </div>
  ),
}));

jest.mock('./LoadingSpinner', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-spinner">Loading...</div>,
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
    color,
    variant,
    startContent,
  }: { 
    children: React.ReactNode;
    onPress?: () => void;
    color?: string;
    variant?: string;
    startContent?: React.ReactNode;
  }) => (
    <button 
      onClick={onPress}
      data-testid="button"
      data-color={color}
      data-variant={variant}
    >
      {startContent}
      {children}
    </button>
  ),
  Modal: ({ 
    isOpen,
    onClose,
    children,
  }: { 
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }) => (
    isOpen ? (
      <div data-testid="modal">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    ) : null
  ),
  ModalContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="modal-content">{children}</div>
  ),
  ModalHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="modal-header">{children}</div>
  ),
  ModalBody: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="modal-body">{children}</div>
  ),
  ModalFooter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="modal-footer">{children}</div>
  ),
  Alert: ({ 
    children,
    color,
    className,
    onClose,
    startContent,
  }: { 
    children: React.ReactNode;
    color?: string;
    className?: string;
    onClose?: () => void;
    startContent?: React.ReactNode;
  }) => (
    <div 
      data-testid="alert"
      data-color={color}
      className={className}
    >
      {startContent}
      {children}
      {onClose && <button onClick={onClose}>Close</button>}
    </div>
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Share2: () => <span data-testid="share-icon">Share</span>,
  Download: () => <span data-testid="download-icon">Download</span>,
  Bell: () => <span data-testid="bell-icon">Bell</span>,
}));

// Mock data
const mockProperty: Property = {
  id: 'test-1',
  address: '123 Test St',
  price: 500000,
  beds: 3,
  baths: 2,
  sqft: 2000,
  yearBuilt: 2000,
  lotSize: 5000,
  propertyType: 'Single Family',
  status: 'Active',
  images: ['/test-image.jpg'],
  source: {
    name: 'Test',
    fetchDate: '2025-01-30T00:00:00Z',
  },
};

const mockTransaction: TransactionDetails = {
  salePrice: 500000,
  mortgageBalance: 300000,
  annualTaxes: 5000,
  hoaFees: 200,
  closingDate: '2025-02-01',
  hasHOA: true,
  buyerAgentCommission: 3,
  sellerAgentCommission: 3,
  costResponsibility: {
    settlementFee: 'seller',
    titleSearch: 'seller',
    municipalLienSearch: 'seller',
    titleInsurance: 'seller',
    docStamps: 'seller',
  },
};

describe('PropertyDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    
    // Reset mocks without type assertions
    const mockGetProperty = getProperty as jest.Mock;
    const mockGetTransaction = getTransaction as jest.Mock;
    const mockSaveTransaction = saveTransaction as jest.Mock;
    const mockUsePropertyUpdates = usePropertyUpdates as jest.Mock;
    
    mockGetProperty.mockReset();
    mockGetTransaction.mockReset();
    mockSaveTransaction.mockReset();
    mockUsePropertyUpdates.mockReturnValue({ error: null });
  });

  it('loads property from URL parameter', () => {
    const searchParams = new URLSearchParams('?propertyId=test-1');
    Object.defineProperty(window, 'location', {
      value: { search: searchParams.toString() },
    });
    
    const mockGetProperty = getProperty as jest.Mock;
    const mockGetTransaction = getTransaction as jest.Mock;
    
    mockGetProperty.mockReturnValue(mockProperty);
    mockGetTransaction.mockReturnValue(mockTransaction);
    
    render(<PropertyDashboard />);
    
    expect(mockGetProperty).toHaveBeenCalledWith('test-1');
    expect(mockGetTransaction).toHaveBeenCalledWith('test-1');
    expect(screen.getByText(mockProperty.address)).toBeInTheDocument();
  });

  it('handles demo mode', async () => {
    render(<PropertyDashboard />);
    
    // Trigger demo mode
    const calculator = screen.getByTestId('seller-calculator');
    const updateButton = calculator.querySelector('button');
    if (!updateButton) throw new Error('Update button not found');
    fireEvent.click(updateButton);
    
    // Show property wizard
    const propertyWizard = screen.getByTestId('property-wizard');
    expect(propertyWizard).toBeInTheDocument();
    
    // Confirm property
    const confirmButton = screen.getByText('Confirm Property');
    fireEvent.click(confirmButton);
    
    // Should show demo property
    await waitFor(() => {
      const bayshoreText = screen.getByText(/Bayshore/);
      expect(bayshoreText).toBeInTheDocument();
    });
    
    // Should show exit demo button
    const exitButton = screen.getByText('Exit Demo Mode');
    expect(exitButton).toBeInTheDocument();
  });

  it('handles real-time updates', () => {
    render(<PropertyDashboard />);
    
    const mockUsePropertyUpdates = usePropertyUpdates as jest.Mock;
    const { onUpdate } = mockUsePropertyUpdates.mock.calls[0][0];
    
    // Simulate property update
    onUpdate({
      type: 'UPDATE',
      property: { ...mockProperty, price: 600000 },
    });
    
    expect(screen.getByText('Property details have been updated')).toBeInTheDocument();
  });

  it('shows error alerts', () => {
    (usePropertyUpdates as jest.Mock).mockReturnValue({
      error: new Error('Update subscription failed'),
    });
    
    render(<PropertyDashboard />);
    
    expect(screen.getByText(/Failed to subscribe to property updates/)).toBeInTheDocument();
  });

  it('handles transaction updates', async () => {
    (getProperty as jest.Mock).mockReturnValue(mockProperty);
    
    render(<PropertyDashboard />);
    
    const calculator = screen.getByTestId('seller-calculator');
    const updateButton = calculator.querySelector('button');
    fireEvent.click(updateButton!);
    
    expect(screen.getByTestId('property-wizard')).toBeInTheDocument();
  });

  it('updates URL when property changes', () => {
    const replaceStateSpy = jest.spyOn(window.history, 'replaceState');
    
    render(<PropertyDashboard />);
    
    // Confirm property
    const calculator = screen.getByTestId('seller-calculator');
    const updateButton = calculator.querySelector('button');
    fireEvent.click(updateButton!);
    
    fireEvent.click(screen.getByText('Confirm Property'));
    
    expect(replaceStateSpy).toHaveBeenCalledWith(
      {},
      '',
      expect.stringContaining('propertyId=test-1')
    );
    
    replaceStateSpy.mockRestore();
  });

  it('exits demo mode', () => {
    const replaceStateSpy = jest.spyOn(window.history, 'replaceState');
    
    render(<PropertyDashboard />);
    
    // Enter demo mode
    const calculator = screen.getByTestId('seller-calculator');
    const updateButton = calculator.querySelector('button');
    fireEvent.click(updateButton!);
    
    fireEvent.click(screen.getByText('Confirm Property'));
    
    // Exit demo mode
    fireEvent.click(screen.getByText('Exit Demo Mode'));
    
    expect(replaceStateSpy).toHaveBeenCalledWith(
      {},
      '',
      expect.not.stringContaining('propertyId')
    );
    
    replaceStateSpy.mockRestore();
  });

  it('shows loading spinner', () => {
    render(<PropertyDashboard />);
    
    // Enter demo mode
    const calculator = screen.getByTestId('seller-calculator');
    const updateButton = calculator.querySelector('button');
    fireEvent.click(updateButton!);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('handles share and download actions', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    render(<PropertyDashboard />);
    
    // Enter demo mode to show action buttons
    const calculator = screen.getByTestId('seller-calculator');
    const updateButton = calculator.querySelector('button');
    fireEvent.click(updateButton!);
    
    fireEvent.click(screen.getByText('Confirm Property'));
    
    // Click share button
    fireEvent.click(screen.getByText('Share'));
    expect(consoleSpy).toHaveBeenCalledWith('Share clicked');
    
    // Click download button
    fireEvent.click(screen.getByText('Download PDF'));
    expect(consoleSpy).toHaveBeenCalledWith('Download clicked');
    
    consoleSpy.mockRestore();
  });
});