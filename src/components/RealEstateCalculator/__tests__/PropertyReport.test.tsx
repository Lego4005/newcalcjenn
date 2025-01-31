import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { PropertyReport } from '../PropertyReport';
import type { Property } from '@/types/property';
import { formatCurrency, formatNumber } from '@/utils/formatters';

type StyleProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

type SvgProps = {
  children: React.ReactNode;
  width?: number;
  height?: number;
  viewBox?: string;
};

type PathProps = {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
};

// Mock @react-pdf/renderer components
jest.mock('@react-pdf/renderer', () => ({
  Document: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Page: ({ children, style }: StyleProps) => (
    <div data-testid="pdf-page" style={style}>{children}</div>
  ),
  View: ({ children, style }: StyleProps) => (
    <div data-testid="pdf-view" style={style}>{children}</div>
  ),
  Text: ({ children, style }: StyleProps) => (
    <span data-testid="pdf-text" style={style}>{children}</span>
  ),
  StyleSheet: {
    create: (styles: Record<string, React.CSSProperties>) => styles,
  },
  Svg: ({ children, ...props }: SvgProps) => (
    <svg data-testid="pdf-svg" {...props}>{children}</svg>
  ),
  Path: ({ d, stroke, strokeWidth, fill }: PathProps) => (
    <path 
      data-testid="pdf-path" 
      d={d} 
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
    />
  ),
}));

const mockTransactionDetails = {
  salePrice: 500000,
  mortgageBalance: 400000,
  monthlyPayment: 2500,
  annualTaxes: 5000,
  propertyTax: 5000,
  insurance: 1200,
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
} as const;

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
  transactionDetails: mockTransactionDetails,
  formData: {
    purchasePrice: 500000,
    monthlyIncome: 3500,
    downPayment: 100000,
    interestRate: 0.05,
    loanTerm: 30,
    propertyTax: 5000,
    insurance: 1200,
    maintenanceReserve: 0.01,
    vacancyReserve: 0.05,
    managementFee: 0.1
  }
};

const getSection = (title: string) => {
  const element = screen.getByText(title).closest('[data-testid="pdf-view"]');
  if (!element) throw new Error(`Section "${title}" not found`);
  return element as HTMLElement;
};

describe('PropertyReport', () => {
  it('renders property details correctly', () => {
    render(<PropertyReport property={mockProperty} />);
    
    // Check header
    expect(screen.getByText('Property Report')).toBeInTheDocument();
    expect(screen.getByText('123 Test St')).toBeInTheDocument();
    
    // Check property details
    expect(screen.getByText('Property Type')).toBeInTheDocument();
    expect(screen.getByText('Single Family')).toBeInTheDocument();
    expect(screen.getByText('Square Footage')).toBeInTheDocument();
    expect(screen.getByText('2,000 sqft')).toBeInTheDocument();
  });

  it('renders KPIs correctly', () => {
    render(<PropertyReport property={mockProperty} />);
    
    const metricsSection = getSection('Key Metrics');
    expect(within(metricsSection).getByText('Price per Sqft')).toBeInTheDocument();
    expect(within(metricsSection).getByText('Market Value')).toBeInTheDocument();
    expect(within(metricsSection).getByText('Days on Market')).toBeInTheDocument();
  });

  it('renders financial metrics correctly', () => {
    render(<PropertyReport property={mockProperty} />);
    
    const financialSection = getSection('Financial Metrics');
    expect(within(financialSection).getByText('Cap Rate')).toBeInTheDocument();
    expect(within(financialSection).getByText('ROI')).toBeInTheDocument();
    expect(within(financialSection).getByText('Cash on Cash Return')).toBeInTheDocument();
    expect(within(financialSection).getByText('Debt Service Coverage')).toBeInTheDocument();
    
    // Check calculated values
    expect(within(financialSection).getByText('8.40%')).toBeInTheDocument(); // Cap Rate
    expect(within(financialSection).getByText('42.00%')).toBeInTheDocument(); // ROI
    expect(screen.getByText('1.40')).toBeInTheDocument(); // DSCR
  });

  it('renders cost breakdown chart when transaction details exist', () => {
    render(<PropertyReport property={mockProperty} />);
    
    const costBreakdownSection = getSection('Cost Breakdown');
    expect(within(costBreakdownSection).getByTestId('pdf-svg')).toBeInTheDocument();
  });

  it('renders historical trends when metrics are provided', () => {
    const historicalMetrics = [
      { timestamp: '2024-01-01', value: 490000 },
      { timestamp: '2024-01-15', value: 495000 },
      { timestamp: '2024-01-30', value: 500000 }
    ];

    render(<PropertyReport property={mockProperty} historicalMetrics={historicalMetrics} />);
    
    const historicalSection = getSection('Historical Value Trend');
    expect(within(historicalSection).getByTestId('pdf-svg')).toBeInTheDocument();
  });

  it('includes footer with generation date', () => {
    render(<PropertyReport property={mockProperty} />);
    expect(screen.getByText(/Generated on/)).toBeInTheDocument();
  });

  it('handles missing transaction details gracefully', () => {
    const propertyWithoutTransactionDetails = {
      ...mockProperty,
      transactionDetails: undefined
    };
    
    render(<PropertyReport property={propertyWithoutTransactionDetails} />);
    
    // Should not show transaction details section
    expect(screen.queryByText('Transaction Details')).not.toBeInTheDocument();
  });

  it('handles missing form data gracefully', () => {
    const propertyWithoutFormData = {
      ...mockProperty,
      formData: undefined
    };
    
    render(<PropertyReport property={propertyWithoutFormData} />);
    
    // Should still show financial metrics with fallback values
    const financialSection = getSection('Financial Metrics');
    expect(within(financialSection).getByText('Cap Rate')).toBeInTheDocument();
    expect(within(financialSection).getByText('0.00%')).toBeInTheDocument();
  });

  // New test cases
  it('renders trend indicators correctly', () => {
    render(<PropertyReport property={mockProperty} />);
    
    const metricsSection = getSection('Key Metrics');
    const upTrendPaths = within(metricsSection).getAllByTestId('pdf-path')
      .filter(path => path.getAttribute('d')?.includes('M23 6l-9.5 9.5-5-5L1 18'));
    const downTrendPaths = within(metricsSection).getAllByTestId('pdf-path')
      .filter(path => path.getAttribute('d')?.includes('M23 18l-9.5-9.5-5 5L1 6'));
    
    expect(upTrendPaths.length).toBeGreaterThan(0);
    expect(downTrendPaths.length).toBeGreaterThan(0);
  });

  it('generates correct donut chart paths', () => {
    render(<PropertyReport property={mockProperty} />);
    
    const costBreakdownSection = getSection('Cost Breakdown');
    const paths = within(costBreakdownSection).getAllByTestId('pdf-path');
    
    // Should have paths for each cost item plus the inner circle
    expect(paths.length).toBe(6); // 5 cost items + 1 inner circle
    
    // Check inner circle path
    const innerCirclePath = paths[paths.length - 1];
    expect(innerCirclePath.getAttribute('d')).toContain('a 30,30 0 1,0');
    expect(innerCirclePath.getAttribute('fill')).toBe('white');
  });

  it('generates correct sparkline chart path', () => {
    const historicalMetrics = [
      { timestamp: '2024-01-01', value: 490000 },
      { timestamp: '2024-01-15', value: 495000 },
      { timestamp: '2024-01-30', value: 500000 }
    ];

    render(<PropertyReport property={mockProperty} historicalMetrics={historicalMetrics} />);
    
    const historicalSection = getSection('Historical Value Trend');
    const path = within(historicalSection).getByTestId('pdf-path');
    
    expect(path.getAttribute('stroke')).toBe('#3b82f6');
    expect(path.getAttribute('strokeWidth')).toBe('2');
    expect(path.getAttribute('fill')).toBe('none');
  });

  it('handles single historical data point', () => {
    const singleMetric = [
      { timestamp: '2024-01-01', value: 490000 }
    ];

    render(<PropertyReport property={mockProperty} historicalMetrics={singleMetric} />);
    
    const historicalSection = getSection('Historical Value Trend');
    const path = within(historicalSection).getByTestId('pdf-path');
    expect(path).toBeInTheDocument();
  });

  it('formats currency values correctly', () => {
    render(<PropertyReport property={mockProperty} />);
    
    expect(screen.getByText(formatCurrency(500000))).toBeInTheDocument();
    expect(screen.getByText(formatCurrency(2500))).toBeInTheDocument();
  });

  it('formats numbers with commas correctly', () => {
    render(<PropertyReport property={mockProperty} />);
    
    expect(screen.getByText(`${formatNumber(2000)} sqft`)).toBeInTheDocument();
    expect(screen.getByText(`${formatNumber(5000)} sqft`)).toBeInTheDocument();
  });

  it('handles zero values in cost breakdown', () => {
    const propertyWithZeroCosts = {
      ...mockProperty,
      transactionDetails: {
        ...mockTransactionDetails,
        hoaFees: 0,
        settlementFee: 0
      }
    };
    
    render(<PropertyReport property={propertyWithZeroCosts} />);
    
    const costBreakdownSection = getSection('Cost Breakdown');
    const paths = within(costBreakdownSection).getAllByTestId('pdf-path');
    
    // Should have fewer paths due to filtered zero values
    expect(paths.length).toBe(4); // 3 cost items + 1 inner circle
  });

  it('uses property metrics when available', () => {
    const propertyWithMetrics = {
      ...mockProperty,
      metrics: {
        propertyValue: { current: 550000 },
        monthlyIncome: { current: 4000 },
        capRate: { current: 9.5 },
        roi: { current: 45 },
        cashOnCash: { current: 12 },
        debtServiceCoverage: { current: 1.5 }
      }
    };
    
    render(<PropertyReport property={propertyWithMetrics} />);
    
    const financialSection = getSection('Financial Metrics');
    expect(within(financialSection).getByText('9.50%')).toBeInTheDocument(); // Cap Rate
    expect(within(financialSection).getByText('45.00%')).toBeInTheDocument(); // ROI
    expect(within(financialSection).getByText('1.5')).toBeInTheDocument(); // DSCR
  });
});