import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyContext } from '../PropertyContext';

// Define minimal router interface
interface RouterInstance {
  push: (url: string) => void;
  back: () => void;
  forward: () => void;
  refresh: () => void;
  replace: (url: string) => void;
  prefetch: (url: string) => void;
}

// Mock next/navigation
const mockPush = jest.fn();
const mockRouter: RouterInstance = {
  push: mockPush,
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
    fill,
    sizes,
  }: {
    src: string;
    alt: string;
    className?: string;
    fill?: boolean;
    sizes?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      data-testid="next-image"
      data-fill={fill}
      data-sizes={sizes}
    />
  ),
}));

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Button: ({ 
    children,
    className,
    variant,
    onPress 
  }: { 
    children: React.ReactNode;
    className?: string;
    variant?: string;
    onPress?: () => void;
  }) => (
    <button 
      onClick={onPress}
      data-testid="button"
      className={className}
      data-variant={variant}
    >
      {children}
    </button>
  ),
  Tooltip: ({ 
    children,
    content,
    placement 
  }: { 
    children: React.ReactNode;
    content: React.ReactNode;
    placement?: string;
  }) => (
    <div 
      data-testid="tooltip"
      data-content={content?.toString()}
      data-placement={placement}
    >
      {children}
    </div>
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Building2: () => <span data-testid="building-icon">🏢</span>,
}));

describe('PropertyContext', () => {
  const mockProperties = [
    {
      id: '1',
      address: '123 Main Street, City, State',
      price: 500000,
      images: ['image1.jpg'],
      beds: 3,
      baths: 2,
      sqft: 2000,
      source: {
        name: 'MLS',
        fetchDate: '2025-01-30T00:00:00Z',
      },
    },
    {
      id: '2',
      address: '456 Oak Avenue, City, State',
      price: 750000,
      beds: 4,
      baths: 3,
      sqft: 3000,
      source: {
        name: 'MLS',
        fetchDate: '2025-01-29T00:00:00Z',
      },
    },
  ];

  const mockTransactions = {
    '1': {
      salePrice: 480000,
      mortgageBalance: 400000,
      annualTaxes: 5000,
      hoaFees: 300,
    },
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('loads and displays properties from localStorage', () => {
    localStorage.setItem('roca_properties', JSON.stringify(mockProperties));
    
    render(<PropertyContext isCompact={false} />);
    
    expect(screen.getByText('123 Main')).toBeInTheDocument();
    expect(screen.getByText('$500,000')).toBeInTheDocument();
    expect(screen.getByText('456 Oak')).toBeInTheDocument();
    expect(screen.getByText('$750,000')).toBeInTheDocument();
  });

  it('handles compact view correctly', () => {
    localStorage.setItem('roca_properties', JSON.stringify(mockProperties));
    
    render(<PropertyContext isCompact={true} />);
    
    expect(screen.queryByText('123 Main')).not.toBeInTheDocument();
    expect(screen.queryByText('$500,000')).not.toBeInTheDocument();
    
    const buttons = screen.getAllByTestId('button');
    buttons.forEach(button => {
      expect(button.firstElementChild).toHaveClass('justify-center');
    });
  });

  it('displays property images when available', () => {
    localStorage.setItem('roca_properties', JSON.stringify(mockProperties));
    
    render(<PropertyContext isCompact={false} />);
    
    const images = screen.getAllByTestId('next-image');
    expect(images[0]).toHaveAttribute('src', 'image1.jpg');
    expect(images[0]).toHaveAttribute('alt', '123 Main Street, City, State');
  });

  it('shows building icon when no image is available', () => {
    localStorage.setItem('roca_properties', JSON.stringify([{
      ...mockProperties[0],
      images: undefined,
    }]));
    
    render(<PropertyContext isCompact={false} />);
    
    expect(screen.getByTestId('building-icon')).toBeInTheDocument();
  });

  it('displays transaction details in tooltip', () => {
    localStorage.setItem('roca_properties', JSON.stringify(mockProperties));
    localStorage.setItem('roca_transactions', JSON.stringify(mockTransactions));
    
    render(<PropertyContext isCompact={false} />);
    
    const tooltips = screen.getAllByTestId('tooltip');
    const firstTooltip = tooltips[0];
    
    expect(firstTooltip).toHaveAttribute('data-content', expect.stringContaining('$480,000'));
    expect(firstTooltip).toHaveAttribute('data-content', expect.stringContaining('$400,000'));
    expect(firstTooltip).toHaveAttribute('data-content', expect.stringContaining('$5,000'));
    expect(firstTooltip).toHaveAttribute('data-content', expect.stringContaining('$300'));
  });

  it('navigates to property details on click', () => {
    localStorage.setItem('roca_properties', JSON.stringify(mockProperties));
    
    render(<PropertyContext isCompact={false} />);
    
    const propertyButton = screen.getAllByTestId('button')[0];
    fireEvent.click(propertyButton);
    
    expect(mockPush).toHaveBeenCalledWith('/dashboard?propertyId=1');
  });

  it('cleans up duplicate properties', () => {
    const duplicateProperties = [
      ...mockProperties,
      {
        ...mockProperties[0],
        id: '3', // Same address as first property
      },
    ];
    
    localStorage.setItem('roca_properties', JSON.stringify(duplicateProperties));
    
    render(<PropertyContext isCompact={false} />);
    
    // Should only show two properties
    const propertyButtons = screen.getAllByTestId('button');
    expect(propertyButtons).toHaveLength(2);
  });

  it('sorts properties by fetch date', () => {
    localStorage.setItem('roca_properties', JSON.stringify(mockProperties));
    
    render(<PropertyContext isCompact={false} />);
    
    const propertyButtons = screen.getAllByTestId('button');
    expect(propertyButtons[0]).toHaveTextContent('123 Main'); // More recent date
    expect(propertyButtons[1]).toHaveTextContent('456 Oak'); // Older date
  });

  it('handles localStorage errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem('roca_properties', 'invalid json');
    
    render(<PropertyContext isCompact={false} />);
    
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error parsing saved properties:',
      expect.any(Error)
    );
    
    consoleSpy.mockRestore();
  });

  it('formats addresses correctly', () => {
    localStorage.setItem('roca_properties', JSON.stringify([{
      ...mockProperties[0],
      address: '1234 Long Street Name Boulevard, City, State',
    }]));
    
    render(<PropertyContext isCompact={false} />);
    
    expect(screen.getByText('1234 Long')).toBeInTheDocument();
  });

  it('applies correct styling to property buttons', () => {
    localStorage.setItem('roca_properties', JSON.stringify(mockProperties));
    
    render(<PropertyContext isCompact={false} />);
    
    const buttons = screen.getAllByTestId('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('w-full justify-start text-default-600');
      expect(button).toHaveAttribute('data-variant', 'light');
    });
  });
});