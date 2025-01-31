import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyKPIs from '../../Dashboard/PropertyKPIs';
import type { Property } from '@/types/property';

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => 
    <div data-testid="card" className={className}>{children}</div>,
  CardBody: ({ children, className }: { children: React.ReactNode; className?: string }) => 
    <div data-testid="card-body" className={className}>{children}</div>,
  Chip: ({ 
    children, 
    startContent, 
    color,
    size 
  }: { 
    children: React.ReactNode; 
    startContent?: React.ReactNode;
    color?: string;
    size?: string;
  }) => (
    <span data-testid={`chip-${color}`} data-size={size}>
      {startContent && <span data-testid="chip-icon">{startContent}</span>}
      {children}
    </span>
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  TrendingUp: () => <span data-testid="trending-up-icon">↑</span>,
  TrendingDown: () => <span data-testid="trending-down-icon">↓</span>,
}));

const mockProperty: Property = {
  id: '1',
  address: '123 Test St',
  price: 500000,
  beds: 3,
  baths: 2,
  sqft: 2000,
  yearBuilt: 2020,
  lotSize: 5000,
  propertyType: 'Single Family',
  status: 'Active',
  images: [],
  transactionDetails: {
    salePrice: 500000,
    mortgageBalance: 400000,
    annualTaxes: 5000,
    hoaFees: 200,
    hoaEstoppelFee: 250,
    buyerAgentCommission: 0.03,
    sellerAgentCommission: 0.03,
    hasHOA: true,
    settlementFee: 500,
    titleSearch: 150,
    municipalLienSearch: 100,
    docStamps: 3500,
    titleInsurance: 2500,
    costResponsibility: {
      settlementFee: 'seller',
      titleSearch: 'seller',
      municipalLienSearch: 'seller',
      titleInsurance: 'seller',
      docStamps: 'seller'
    } as const
  }
};

describe('PropertyKPIs', () => {
  it('renders all KPI cards', () => {
    render(<PropertyKPIs property={mockProperty} />);
    
    // Check for KPI titles
    expect(screen.getByText('Price per Sqft')).toBeInTheDocument();
    expect(screen.getByText('Market Value')).toBeInTheDocument();
    expect(screen.getByText('Days on Market')).toBeInTheDocument();
  });

  it('displays correct price per sqft calculation', () => {
    render(<PropertyKPIs property={mockProperty} />);
    
    // Price per sqft should be $500,000 / 2,000 = $250
    expect(screen.getByText('$250')).toBeInTheDocument();
  });

  it('displays market value', () => {
    render(<PropertyKPIs property={mockProperty} />);
    
    // Market value should be $500,000 * 0.93 = $465,000
    expect(screen.getByText('$465,000')).toBeInTheDocument();
  });

  it('shows trend indicators', () => {
    render(<PropertyKPIs property={mockProperty} />);
    
    // Check for trend percentages
    expect(screen.getByText('5.2%')).toBeInTheDocument();
    expect(screen.getByText('3.1%')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('displays timeframe comparisons', () => {
    render(<PropertyKPIs property={mockProperty} />);
    
    expect(screen.getByText('vs last month')).toBeInTheDocument();
    expect(screen.getByText('vs last quarter')).toBeInTheDocument();
    expect(screen.getByText('vs avg')).toBeInTheDocument();
  });

  it('applies correct color to trend chips', () => {
    render(<PropertyKPIs property={mockProperty} />);
    
    // First two KPIs have upward trends (success color)
    const successChips = screen.getAllByTestId('chip-success');
    expect(successChips).toHaveLength(2);

    // Last KPI has downward trend (danger color)
    const dangerChips = screen.getAllByTestId('chip-danger');
    expect(dangerChips).toHaveLength(1);
  });

  it('renders trend icons correctly', () => {
    render(<PropertyKPIs property={mockProperty} />);
    
    const upIcons = screen.getAllByTestId('trending-up-icon');
    const downIcons = screen.getAllByTestId('trending-down-icon');
    expect(upIcons).toHaveLength(2);
    expect(downIcons).toHaveLength(1);
  });

  it('uses small size for trend chips', () => {
    render(<PropertyKPIs property={mockProperty} />);
    
    const chips = [...screen.getAllByTestId('chip-success'), ...screen.getAllByTestId('chip-danger')];
    chips.forEach(chip => {
      expect(chip).toHaveAttribute('data-size', 'sm');
    });
  });

  it('renders in a responsive grid layout', () => {
    render(<PropertyKPIs property={mockProperty} />);
    
    const grid = screen.getByTestId('kpi-grid');
    expect(grid).toHaveClass('grid grid-cols-1 md:grid-cols-3 gap-4');
  });

  it('handles edge case with zero square footage', () => {
    const propertyWithZeroSqft = {
      ...mockProperty,
      sqft: 0
    };
    
    render(<PropertyKPIs property={propertyWithZeroSqft} />);
    
    // Should display "$0" instead of NaN/Infinity
    expect(screen.getByText('$0')).toBeInTheDocument();
  });

  it('handles missing transaction details', () => {
    const propertyWithoutTransactionDetails = {
      ...mockProperty,
      transactionDetails: undefined
    };
    
    render(<PropertyKPIs property={propertyWithoutTransactionDetails} />);
    
    // Should use property price for calculations
    expect(screen.getByText('$465,000')).toBeInTheDocument(); // 500,000 * 0.93
  });

  // New test cases
  it('calculates days on market from source fetch date', () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    const propertyWithSource = {
      ...mockProperty,
      source: {
        name: 'MLS',
        fetchDate: thirtyDaysAgo.toISOString()
      }
    };
    
    render(<PropertyKPIs property={propertyWithSource} />);
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('handles missing source data for days on market', () => {
    render(<PropertyKPIs property={mockProperty} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('uses transaction price over property price when available', () => {
    const propertyWithDifferentPrices = {
      ...mockProperty,
      price: 600000, // Higher list price
      transactionDetails: {
        ...mockProperty.transactionDetails,
        salePrice: 500000 // Actual sale price
      }
    };
    
    render(<PropertyKPIs property={propertyWithDifferentPrices} />);
    
    // Should use sale price for market value calculation
    expect(screen.getByText('$465,000')).toBeInTheDocument(); // 500,000 * 0.93
  });

  it('formats large numbers correctly', () => {
    const propertyWithLargePrice = {
      ...mockProperty,
      price: 1500000,
      sqft: 3000
    };
    
    render(<PropertyKPIs property={propertyWithLargePrice} />);
    
    // Price per sqft should be $1,500,000 / 3,000 = $500
    expect(screen.getByText('$500')).toBeInTheDocument();
    
    // Market value should be $1,500,000 * 0.93 = $1,395,000
    expect(screen.getByText('$1,395,000')).toBeInTheDocument();
  });

  it('handles invalid days on market calculation', () => {
    const propertyWithInvalidDate = {
      ...mockProperty,
      source: {
        name: 'MLS',
        fetchDate: 'invalid-date'
      }
    };
    
    render(<PropertyKPIs property={propertyWithInvalidDate} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('applies correct CSS classes for text styling', () => {
    render(<PropertyKPIs property={mockProperty} />);
    
    // Title should have small text and default-500 color
    const titles = screen.getAllByText(/.+/);
    const title = titles.find(el => el.className.includes('text-small text-default-500'));
    expect(title).toBeInTheDocument();
    
    // Value should be large and semibold
    const values = screen.getAllByText(/\$\d+/);
    const value = values.find(el => el.className.includes('text-2xl font-semibold'));
    expect(value).toBeInTheDocument();
    
    // Timeframe should be tiny and muted
    const timeframes = screen.getAllByText(/vs.+/);
    const timeframe = timeframes.find(el => el.className.includes('text-tiny text-default-400'));
    expect(timeframe).toBeInTheDocument();
  });
});