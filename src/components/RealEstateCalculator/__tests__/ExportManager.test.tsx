import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExportManager } from '../ExportManager';
import type { SavedCalculation } from '../PropertyComparison';

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
    startContent,
    disabled,
    variant,
    color,
    className 
  }: { 
    children: React.ReactNode;
    onPress?: () => void;
    startContent?: React.ReactNode;
    disabled?: boolean;
    variant?: string;
    color?: string;
    className?: string;
  }) => {
    if (disabled) {
      return null;
    }
    return (
      <button 
        onClick={onPress}
        disabled={disabled}
        data-testid="button"
        data-variant={variant}
        data-color={color}
        className={className}
      >
        {startContent}
        {children}
      </button>
    );
  }
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Download: () => <span data-testid="download-icon">↓</span>,
  FileText: () => <span data-testid="file-text-icon">📄</span>,
  Table: () => <span data-testid="table-icon">📊</span>,
  FileJson: () => <span data-testid="file-json-icon">{ }</span>,
}));

// Mock react-pdf/renderer
jest.mock('@react-pdf/renderer', () => ({
  BlobProvider: ({ 
    children, 
    document 
  }: { 
    children: (props: { url: string; blob: Blob; loading: boolean; error: Error | null }) => React.ReactNode;
    document: React.ReactNode;
  }) => {
    // Render document to ensure it's mounted
    React.useEffect(() => {}, [document]);
    
    return children({
      url: 'blob:mock-url',
      blob: new Blob(['test']),
      loading: false,
      error: null
    });
  }
}));

// Mock PropertyReport and ComparisonPDF components
jest.mock('../PropertyReport', () => ({
  PropertyReport: () => <div data-testid="property-report">Property Report</div>
}));

jest.mock('../ComparisonPDF', () => ({
  ComparisonPDF: () => <div data-testid="comparison-pdf">Comparison PDF</div>
}));

const mockCalculation: SavedCalculation = {
  id: '1',
  name: 'Test Property',
  property_details: {
    salePrice: 500000,
    purchaseDate: '2024-01-30',
    created_at: '2024-01-30T00:00:00Z'
  },
  mortgage_info: {
    loanBalance: 400000,
    hasHOA: true
  },
  commission_structure: {
    listingAgentRate: 3,
    buyerAgentRate: 3
  },
  additional_fees: {
    settlementFee: 500,
    titleSearch: 150,
    municipalLienSearch: 100,
    docStamps: 3500,
    titleInsurance: 2500,
    hasPriorTitlePolicy: false,
    priorTitleAmount: 0,
    taxProrations: 0,
    hoaDues: 200,
    hoaEstoppelFee: 250,
    costResponsibility: {
      settlementFee: 'seller',
      titleSearch: 'seller',
      municipalLienSearch: 'seller',
      titleInsurance: 'seller',
      docStamps: 'seller'
    }
  }
};

describe('ExportManager', () => {
  beforeEach(() => {
    // Mock URL and document APIs
    URL.createObjectURL = jest.fn(() => 'mock-url');
    URL.revokeObjectURL = jest.fn();
    
    // Create a partial mock of HTMLAnchorElement
    const mockLink = Object.assign(document.createElement('a'), {
      click: jest.fn(),
      href: '',
      download: ''
    });
    mockLink.click = jest.fn();

    document.createElement = jest.fn(() => mockLink);
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
  });

  it('renders export format options', () => {
    render(<ExportManager calculations={[mockCalculation]} />);
    
    expect(screen.getByRole('button', { name: /PDF Report/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /CSV Spreadsheet/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /JSON Data/i })).toBeInTheDocument();
  });

  it('shows format descriptions', () => {
    render(<ExportManager calculations={[mockCalculation]} />);
    
    expect(screen.getByText(/Detailed PDF report/i)).toBeInTheDocument();
    expect(screen.getByText(/Export data to CSV/i)).toBeInTheDocument();
    expect(screen.getByText(/Raw JSON data/i)).toBeInTheDocument();
  });

  it('changes selected format when clicked', () => {
    render(<ExportManager calculations={[mockCalculation]} />);
    
    // Initially PDF is selected
    expect(screen.getByRole('button', { name: /PDF Report/i })).toHaveAttribute('data-variant', 'solid');
    
    // Click CSV format
    fireEvent.click(screen.getByRole('button', { name: /CSV Spreadsheet/i }));
    expect(screen.getByRole('button', { name: /CSV Spreadsheet/i })).toHaveAttribute('data-variant', 'solid');
  });

  it('generates CSV file correctly', () => {
    render(<ExportManager calculations={[mockCalculation]} />);
    
    // Select CSV format and download
    fireEvent.click(screen.getByRole('button', { name: /CSV Spreadsheet/i }));
    fireEvent.click(screen.getByRole('button', { name: /Download CSV/i }));
    
    expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
  });

  it('generates JSON file correctly', () => {
    render(<ExportManager calculations={[mockCalculation]} />);
    
    // Select JSON format and download
    fireEvent.click(screen.getByRole('button', { name: /JSON Data/i }));
    fireEvent.click(screen.getByRole('button', { name: /Download JSON/i }));
    
    expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
  });

  it('handles PDF generation for single property', () => {
    render(<ExportManager calculations={[mockCalculation]} />);
    
    // PDF format is selected by default
    fireEvent.click(screen.getByRole('button', { name: /Download PDF/i }));
    
    expect(screen.getByTestId('property-report')).toBeInTheDocument();
  });

  it('handles PDF generation for multiple properties', () => {
    const calculations = [mockCalculation, { ...mockCalculation, id: '2', name: 'Test Property 2' }];
    render(<ExportManager calculations={calculations} />);
    
    // PDF format is selected by default
    fireEvent.click(screen.getByRole('button', { name: /Download PDF/i }));
    
    expect(screen.getByTestId('comparison-pdf')).toBeInTheDocument();
  });

  it('filters calculations by selectedIds', () => {
    const calculations = [
      mockCalculation,
      { ...mockCalculation, id: '2', name: 'Test Property 2' }
    ];
    
    render(
      <ExportManager 
        calculations={calculations}
        selectedIds={['1']}
      />
    );
    
    // PDF format is selected by default
    fireEvent.click(screen.getByRole('button', { name: /Download PDF/i }));
    
    // Should show single property report
    expect(screen.getByTestId('property-report')).toBeInTheDocument();
  });

  it('calls onExport callback after successful export', () => {
    const onExport = jest.fn();
    render(
      <ExportManager 
        calculations={[mockCalculation]}
        onExport={onExport}
      />
    );
    
    // Select CSV format and download
    fireEvent.click(screen.getByRole('button', { name: /CSV Spreadsheet/i }));
    fireEvent.click(screen.getByRole('button', { name: /Download CSV/i }));
    
    expect(onExport).toHaveBeenCalled();
  });

  it('transforms cost responsibility correctly', () => {
    render(<ExportManager calculations={[mockCalculation]} />);
    
    // Select JSON format to see the transformed data
    fireEvent.click(screen.getByRole('button', { name: /JSON Data/i }));
    fireEvent.click(screen.getByRole('button', { name: /Download JSON/i }));
    
    const blob = (URL.createObjectURL as jest.Mock).mock.calls[0][0];
    const reader = new FileReader();
    
    reader.onload = () => {
      const content = reader.result as string;
      const data = JSON.parse(content);
      expect(data[0].additional_fees.costResponsibility.settlementFee).toBe('seller');
    };
    
    reader.readAsText(blob);
  });

  it('generates correct file names with timestamps', () => {
    const mockDate = new Date('2024-01-30');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    
    render(<ExportManager calculations={[mockCalculation]} />);
    
    // Test CSV filename
    fireEvent.click(screen.getByRole('button', { name: /CSV Spreadsheet/i }));
    fireEvent.click(screen.getByRole('button', { name: /Download CSV/i }));
    
    const mockLink = (document.createElement as jest.Mock).mock.results[0].value;
    expect(mockLink.download).toBe('property-data-2024-01-30.csv');
    
    // Test JSON filename
    fireEvent.click(screen.getByRole('button', { name: /JSON Data/i }));
    fireEvent.click(screen.getByRole('button', { name: /Download JSON/i }));
    
    const jsonLink = (document.createElement as jest.Mock).mock.results[1].value;
    expect(jsonLink.download).toBe('property-data-2024-01-30.json');
  });

  it('handles empty calculations array', () => {
    render(<ExportManager calculations={[]} />);
    
    // Should still render but with disabled download button
    expect(screen.queryByRole('button', { name: /Download PDF/i })).not.toBeInTheDocument();
  });
});