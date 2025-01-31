import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import PropertyPreview from '../../Dashboard/PropertyPreview';
import type { Property } from '@/types/property';

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>{children}</div>
  ),
  CardHeader: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card-header" className={className}>{children}</div>
  ),
  CardBody: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-body">{children}</div>
  ),
  Chip: ({ 
    children,
    color,
    size,
    variant,
    className,
    startContent 
  }: { 
    children: React.ReactNode;
    color?: string;
    size?: string;
    variant?: string;
    className?: string;
    startContent?: React.ReactNode;
  }) => (
    <div 
      data-testid="chip"
      data-color={color}
      data-size={size}
      data-variant={variant}
      className={className}
    >
      {startContent}
      {children}
    </div>
  ),
  Image: ({ 
    alt,
    src,
    className,
    removeWrapper,
    'aria-label': ariaLabel 
  }: { 
    alt: string;
    src: string;
    className?: string;
    removeWrapper?: boolean;
    'aria-label'?: string;
  }) => (
    <img
      data-testid="image"
      alt={alt}
      src={src}
      className={className}
      data-remove-wrapper={removeWrapper}
      aria-label={ariaLabel}
    />
  ),
  Tooltip: ({ 
    children,
    content,
    placement 
  }: { 
    children: React.ReactNode;
    content: string;
    placement: string;
  }) => (
    <div data-testid="tooltip" data-content={content} data-placement={placement}>
      {children}
    </div>
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Bed: () => <span data-testid="bed-icon">🛏️</span>,
  Bath: () => <span data-testid="bath-icon">🛁</span>,
  Square: () => <span data-testid="square-icon">📏</span>,
  Calendar: () => <span data-testid="calendar-icon">📅</span>,
  Map: () => <span data-testid="map-icon">🗺️</span>,
  Info: () => <span data-testid="info-icon">i️</span>,
  TrendingUp: () => <span data-testid="trending-up-icon">📈</span>,
  TrendingDown: () => <span data-testid="trending-down-icon">📉</span>,
  Minus: () => <span data-testid="trend-neutral-icon">➖</span>,
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => (
      <div data-testid="motion-div" {...props}>{children}</div>
    ),
    h3: ({ children, ...props }: { children: React.ReactNode }) => (
      <h3 data-testid="motion-h3" {...props}>{children}</h3>
    ),
  },
}));

// Mock SparklineChart component
jest.mock('@/components/charts/SparklineChart', () => ({
  SparklineChart: ({ 
    data, 
    color 
  }: { data: Array<{ value: number; timestamp?: string }>; color: string }) => (
    <div data-testid="sparkline-chart" data-color={color}>
      {JSON.stringify(data)}
    </div>
  ),
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
  images: ['test-image.jpg'],
  source: {
    name: 'MLS',
    fetchDate: '2024-01-30T00:00:00Z'
  },
  metrics: {
    propertyValue: {
      current: 500000,
      previous: 480000,
      change: 4.17,
      history: [
        { value: 450000 },
        { value: 465000 },
        { value: 480000 },
        { value: 500000 }
      ]
    },
    capRate: {
      current: 5.5,
      previous: 5.2,
      change: 5.77,
      history: [
        { value: 5.0 },
        { value: 5.2 },
        { value: 5.4 },
        { value: 5.5 }
      ]
    },
    roi: {
      current: 8.2,
      previous: 7.8,
      change: 5.13,
      history: [
        { value: 7.5 },
        { value: 7.8 },
        { value: 8.0 },
        { value: 8.2 }
      ]
    },
    monthlyIncome: {
      current: 3000,
      previous: 2800,
      change: 7.14,
      history: [
        { value: 2600 },
        { value: 2800 },
        { value: 2900 },
        { value: 3000 }
      ]
    },
    cashOnCash: {
      current: 7.5,
      previous: 7.5,
      change: 0,
      history: []
    }
  }
};

describe('PropertyPreview', () => {
  afterEach(cleanup);

  it('renders property details correctly', () => {
    render(<PropertyPreview property={mockProperty} />);
    
    // Check price formatting
    expect(screen.getByText('$500,000')).toBeInTheDocument();
    
    // Check address
    expect(screen.getByText('123 Test St')).toBeInTheDocument();
    
    // Check property features
    expect(screen.getByText('3')).toBeInTheDocument(); // Beds
    expect(screen.getByText('2')).toBeInTheDocument(); // Baths
    expect(screen.getByText('2,000')).toBeInTheDocument(); // sqft
    expect(screen.getByText('2020')).toBeInTheDocument(); // Year built
  });

  it('renders property image with correct attributes', () => {
    render(<PropertyPreview property={mockProperty} />);
    
    const image = screen.getByTestId('image');
    expect(image).toHaveAttribute('src', 'test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Property Image');
    expect(image).toHaveAttribute('aria-label', 'Image of 123 Test St');
  });

  it('shows correct status chip color', () => {
    const statuses = [
      { status: 'Active', color: 'success' },
      { status: 'Pending', color: 'warning' },
      { status: 'Sold', color: 'default' }
    ];

    statuses.forEach(({ status, color }) => {
      render(
        <PropertyPreview 
          property={{ ...mockProperty, status: status as Property['status'] }} 
        />
      );
      
      const statusChip = screen.getAllByTestId('chip')[0];
      expect(statusChip).toHaveAttribute('data-color', color);
      expect(statusChip).toHaveTextContent(status);
      
      cleanup();
    });
  });

  it('displays source information when available', () => {
    render(<PropertyPreview property={mockProperty} />);
    
    const tooltips = screen.getAllByTestId('tooltip');
    const sourceTooltip = tooltips.find(tooltip => 
      tooltip.getAttribute('data-content')?.includes('Data from MLS')
    );
    expect(sourceTooltip).toHaveAttribute(
      'data-content',
      'Data from MLS (Jan 29, 2024, 07:00 PM)'
    );
  });

  it('hides source information when not available', () => {
    const propertyWithoutSource = { ...mockProperty, source: undefined };
    render(<PropertyPreview property={propertyWithoutSource} />);
    
    expect(screen.queryByText('Source')).not.toBeInTheDocument();
  });

  it('formats numbers correctly', () => {
    const propertyWithLargeNumbers = {
      ...mockProperty,
      price: 1500000,
      sqft: 5000
    };
    
    render(<PropertyPreview property={propertyWithLargeNumbers} />);
    
    expect(screen.getByText('$1,500,000')).toBeInTheDocument();
    expect(screen.getByText('5,000')).toBeInTheDocument();
  });

  it('displays property type chip', () => {
    render(<PropertyPreview property={mockProperty} />);
    
    const propertyTypeChip = screen.getAllByTestId('chip')[2];
    expect(propertyTypeChip).toHaveAttribute('data-variant', 'flat');
    expect(propertyTypeChip).toHaveAttribute('data-color', 'secondary');
    expect(propertyTypeChip).toHaveTextContent('Single Family');
  });

  it('applies correct CSS classes for layout', () => {
    render(<PropertyPreview property={mockProperty} />);
    
    expect(screen.getByTestId('card')).toHaveClass('w-full group');
    expect(screen.getByTestId('image')).toHaveClass(
      'z-0 w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-110'
    );
  });

  it('formats dates correctly', () => {
    render(<PropertyPreview property={mockProperty} />);
    
    const tooltips = screen.getAllByTestId('tooltip');
    const sourceTooltip = tooltips.find(tooltip => 
      tooltip.getAttribute('data-content')?.includes('Data from MLS')
    );
    expect(sourceTooltip).toHaveAttribute(
      'data-content',
      'Data from MLS (Jan 29, 2024, 07:00 PM)'
    );
  });

  it('renders all property icons', () => {
    render(<PropertyPreview property={mockProperty} />);
    
    expect(screen.getByTestId('bed-icon')).toBeInTheDocument();
    expect(screen.getByTestId('bath-icon')).toBeInTheDocument();
    expect(screen.getByTestId('square-icon')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    expect(screen.getByTestId('map-icon')).toBeInTheDocument();
  });

  it('handles missing images gracefully', () => {
    const propertyWithoutImages = { ...mockProperty, images: [] };
    render(<PropertyPreview property={propertyWithoutImages} />);
    
    const image = screen.getByTestId('image');
    expect(image).toHaveAttribute('src', '');
  });

  it('applies motion animations', () => {
    render(<PropertyPreview property={mockProperty} />);
    
    const motionDiv = screen.getAllByTestId('motion-div')[0];
    expect(motionDiv).toHaveAttribute('initial', JSON.stringify({ opacity: 0, y: 20 }));
    expect(motionDiv).toHaveAttribute('animate', JSON.stringify({ opacity: 1, y: 0 }));
  });

  describe('Market Analysis Features', () => {
    it('renders property value trend indicator', () => {
      render(<PropertyPreview property={mockProperty} />);
      
      const tooltips = screen.getAllByTestId('tooltip');
      const valueTooltip = tooltips.find(tooltip => 
        tooltip.getAttribute('data-content')?.includes('Changed from $480,000')
      );
      expect(valueTooltip).toBeInTheDocument();
    });

    it('displays all financial metrics correctly', () => {
      render(<PropertyPreview property={mockProperty} />);
      
      // Cap Rate
      expect(screen.getByText('5.5%')).toBeInTheDocument();
      expect(screen.getByText('Cap Rate')).toBeInTheDocument();
      
      // ROI
      expect(screen.getByText('8.2%')).toBeInTheDocument();
      expect(screen.getByText('ROI')).toBeInTheDocument();
      
      // Monthly Income
      expect(screen.getByText('$3,000')).toBeInTheDocument();
      expect(screen.getByText('Monthly Income')).toBeInTheDocument();
      
      // Cash on Cash
      expect(screen.getByText('7.5%')).toBeInTheDocument();
      expect(screen.getByText('Cash on Cash')).toBeInTheDocument();
    });

    it('shows correct trend icons based on metric changes', () => {
      const propertyWithMixedTrends: Property = {
        ...mockProperty,
        metrics: {
          propertyValue: mockProperty.metrics?.propertyValue,
          capRate: {
            current: 5.3,
            previous: 5.5,
            change: -2.5,
            history: [
              { value: 5.5 },
              { value: 5.4 },
              { value: 5.3 }
            ]
          },
          roi: {
            current: 8.0,
            previous: 8.0,
            change: 0,
            history: [
              { value: 7.8 },
              { value: 7.9 },
              { value: 8.0 }
            ]
          },
          monthlyIncome: mockProperty.metrics?.monthlyIncome,
          cashOnCash: mockProperty.metrics?.cashOnCash
        }
      };
      
      render(<PropertyPreview property={propertyWithMixedTrends} />);
      
      const upIcons = screen.getAllByTestId('trending-up-icon');
      const downIcons = screen.getAllByTestId('trending-down-icon');
      const neutralIcons = screen.getAllByTestId('trend-neutral-icon');
      
      expect(upIcons.length).toBeGreaterThan(0);
      expect(downIcons.length).toBeGreaterThan(0);
      expect(neutralIcons.length).toBeGreaterThan(0);
    });

    it('formats percentage changes correctly', () => {
      render(<PropertyPreview property={mockProperty} />);
      
      const tooltips = screen.getAllByTestId('tooltip');
      const capRateTooltip = tooltips.find(tooltip => 
        tooltip.getAttribute('data-content')?.includes('5.8%')
      );
      expect(capRateTooltip).toHaveAttribute(
        'data-content',
        'Changed from 5.2% (5.8%)'
      );
    });

    it('renders sparkline charts for metrics with history', () => {
      render(<PropertyPreview property={mockProperty} />);
      
      const sparklines = screen.getAllByTestId('sparkline-chart');
      expect(sparklines).toHaveLength(3); // Only metrics with history should have sparklines
      
      // Verify sparkline data
      const capRateSparkline = sparklines.find(chart => 
        chart.textContent?.includes('5.5')
      );
      expect(capRateSparkline).toBeInTheDocument();
    });

    it('does not render sparkline for metrics without history', () => {
      const propertyWithoutHistory: Property = {
        ...mockProperty,
        metrics: {
          propertyValue: {
            current: 500000,
            previous: 480000,
            change: 4.17,
            history: []
          },
          capRate: {
            current: 5.5,
            previous: 5.2,
            change: 5.77,
            history: []
          },
          roi: {
            current: 8.2,
            previous: 7.8,
            change: 5.13,
            history: []
          },
          monthlyIncome: {
            current: 3000,
            previous: 2800,
            change: 7.14,
            history: []
          },
          cashOnCash: {
            current: 7.5,
            previous: 7.5,
            change: 0,
            history: []
          }
        }
      };
      
      render(<PropertyPreview property={propertyWithoutHistory} />);
      
      const sparklines = screen.getAllByTestId('sparkline-chart');
      expect(sparklines.length).toBeLessThan(4);
    });
  });
});