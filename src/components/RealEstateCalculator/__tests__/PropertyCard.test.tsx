import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyCard } from '../PropertyCard';
import type { Property } from '../BulkCalculator';

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Button: ({ children, onPress, isIconOnly, variant, color, size }: { 
    children: React.ReactNode;
    onPress: () => void;
    isIconOnly?: boolean;
    variant?: string;
    color?: string;
    size?: string;
  }) => (
    <button 
      onClick={onPress}
      data-testid="remove-button"
      data-icon-only={isIconOnly}
      data-variant={variant}
      data-color={color}
      data-size={size}
    >
      {children}
    </button>
  ),
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="property-card">{children}</div>
  ),
  CardHeader: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card-header" className={className}>{children}</div>
  ),
  CardBody: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card-body" className={className}>{children}</div>
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Trash2: () => <span data-testid="trash-icon">🗑️</span>,
}));

// Mock NumericInput component
jest.mock('../../common/NumericInput', () => {
  return function MockNumericInput({ 
    label,
    value,
    onChange,
    isPercentage,
    startContent,
    classNames
  }: {
    label: string;
    value: number;
    onChange: (value: string) => void;
    isPercentage?: boolean;
    startContent?: React.ReactNode;
    classNames?: Record<string, string>;
  }) {
    return (
      <div data-testid={`numeric-input-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        <label>{label}</label>
        <div className={classNames?.inputWrapper}>
          {startContent}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            data-is-percentage={isPercentage}
          />
        </div>
      </div>
    );
  };
});

const mockProperty: Property = {
  id: '1',
  address: '123 Test St',
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
    } as const
  }
};

describe('PropertyCard', () => {
  const onRemove = jest.fn();
  const onUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders property address', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onRemove={onRemove}
        onUpdate={onUpdate}
        showRemove={true}
      />
    );
    
    expect(screen.getByText('123 Test St')).toBeInTheDocument();
  });

  it('shows remove button when showRemove is true', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onRemove={onRemove}
        onUpdate={onUpdate}
        showRemove={true}
      />
    );
    
    const removeButton = screen.getByTestId('remove-button');
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveAttribute('data-icon-only', 'true');
    expect(removeButton).toHaveAttribute('data-variant', 'light');
    expect(removeButton).toHaveAttribute('data-color', 'danger');
    expect(removeButton).toHaveAttribute('data-size', 'sm');
  });

  it('hides remove button when showRemove is false', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onRemove={onRemove}
        onUpdate={onUpdate}
        showRemove={false}
      />
    );
    
    expect(screen.queryByTestId('remove-button')).not.toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onRemove={onRemove}
        onUpdate={onUpdate}
        showRemove={true}
      />
    );
    
    fireEvent.click(screen.getByTestId('remove-button'));
    expect(onRemove).toHaveBeenCalledWith(mockProperty.id);
  });

  it('renders all numeric input fields', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onRemove={onRemove}
        onUpdate={onUpdate}
        showRemove={true}
      />
    );
    
    expect(screen.getByTestId('numeric-input-purchase-price')).toBeInTheDocument();
    expect(screen.getByTestId('numeric-input-down-payment')).toBeInTheDocument();
    expect(screen.getByTestId('numeric-input-interest-rate')).toBeInTheDocument();
    expect(screen.getByTestId('numeric-input-property-tax-(annual)')).toBeInTheDocument();
    expect(screen.getByTestId('numeric-input-insurance-(annual)')).toBeInTheDocument();
    expect(screen.getByTestId('numeric-input-settlement-fee')).toBeInTheDocument();
  });

  it('calls onUpdate with correct parameters when input values change', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onRemove={onRemove}
        onUpdate={onUpdate}
        showRemove={true}
      />
    );
    
    const purchasePriceInput = screen.getByTestId('numeric-input-purchase-price')
      .querySelector('input') as HTMLInputElement;
    
    fireEvent.change(purchasePriceInput, { target: { value: '600000' } });
    expect(onUpdate).toHaveBeenCalledWith(mockProperty.id, 'purchasePrice', 600000);
  });

  it('handles invalid numeric input by passing 0', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onRemove={onRemove}
        onUpdate={onUpdate}
        showRemove={true}
      />
    );
    
    const purchasePriceInput = screen.getByTestId('numeric-input-purchase-price')
      .querySelector('input') as HTMLInputElement;
    
    fireEvent.change(purchasePriceInput, { target: { value: 'invalid' } });
    expect(onUpdate).toHaveBeenCalledWith(mockProperty.id, 'purchasePrice', 0);
  });

  it('applies correct styling classes', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onRemove={onRemove}
        onUpdate={onUpdate}
        showRemove={true}
      />
    );
    
    const cardHeader = screen.getByTestId('card-header');
    expect(cardHeader).toHaveClass('flex flex-row items-center justify-between');
    
    const cardBody = screen.getByTestId('card-body');
    expect(cardBody).toHaveClass('grid grid-cols-1 md:grid-cols-2 gap-6');
  });

  it('marks interest rate input as percentage', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onRemove={onRemove}
        onUpdate={onUpdate}
        showRemove={true}
      />
    );
    
    const interestRateInput = screen.getByTestId('numeric-input-interest-rate')
      .querySelector('input') as HTMLInputElement;
    expect(interestRateInput).toHaveAttribute('data-is-percentage', 'true');
  });

  it('adds currency symbol to monetary inputs', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onRemove={onRemove}
        onUpdate={onUpdate}
        showRemove={true}
      />
    );
    
    const monetaryInputs = [
      'purchase-price',
      'down-payment',
      'property-tax-(annual)',
      'insurance-(annual)',
      'settlement-fee'
    ];
    
    monetaryInputs.forEach(inputName => {
      const input = screen.getByTestId(`numeric-input-${inputName}`);
      expect(input.textContent).toContain('$');
    });
  });

  it('applies correct input wrapper classes', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onRemove={onRemove}
        onUpdate={onUpdate}
        showRemove={true}
      />
    );
    
    const purchasePriceInput = screen.getByTestId('numeric-input-purchase-price')
      .querySelector('div:nth-child(2)') as HTMLElement;
    
    expect(purchasePriceInput.className).toContain('bg-content2/50');
    expect(purchasePriceInput.className).toContain('hover:bg-content2');
    expect(purchasePriceInput.className).toContain('data-[focused=true]:bg-content2');
    expect(purchasePriceInput.className).toContain('!cursor-text');
    expect(purchasePriceInput.className).toContain('border');
    expect(purchasePriceInput.className).toContain('border-content3');
  });
});