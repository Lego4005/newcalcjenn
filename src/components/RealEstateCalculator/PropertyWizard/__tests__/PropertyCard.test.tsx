import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyCard from '../PropertyCard';

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>{children}</div>
  ),
  CardBody: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card-body" className={className}>{children}</div>
  ),
  Image: ({
    src,
    alt,
    className,
    radius,
  }: {
    src: string;
    alt: string;
    className?: string;
    radius?: string;
  }) => (
    <div 
      data-testid="property-image"
      data-src={src}
      data-alt={alt}
      data-radius={radius}
      className={className}
    />
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Bed: () => <span data-testid="bed-icon">🛏️</span>,
  Bath: () => <span data-testid="bath-icon">🛁</span>,
  Square: () => <span data-testid="square-icon">📏</span>,
  Calendar: () => <span data-testid="calendar-icon">📅</span>,
  TrendingUp: () => <span data-testid="trending-up-icon">📈</span>,
  DollarSign: () => <span data-testid="dollar-icon">💲</span>,
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { 
    src: string; 
    alt: string; 
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    quality?: number;
    loading?: 'lazy' | 'eager';
    sizes?: string;
  }) => (
    <div data-testid="next-image" {...props}>
      <div data-src={src} data-alt={alt} />
    </div>
  ),
}));

describe('PropertyCard', () => {
  const mockProperty = {
    address: '123 Test St, City, State 12345',
    price: 500000,
    beds: 3,
    baths: 2,
    sqft: 2000,
    yearBuilt: 2020,
    pricePerSqft: 250,
    marketValue: 550000,
    imageUrl: '/test-image.jpg',
  };

  it('renders property image with correct attributes', () => {
    render(<PropertyCard property={mockProperty} />);
    
    const image = screen.getByTestId('property-image');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Property at 123 Test St, City, State 12345');
    expect(image).toHaveAttribute('data-radius', 'none');
  });

  it('uses placeholder image when imageUrl is not provided', () => {
    const propertyWithoutImage = { ...mockProperty, imageUrl: undefined };
    render(<PropertyCard property={propertyWithoutImage} />);
    
    const image = screen.getByTestId('property-image');
    expect(image).toHaveAttribute('src', '/placeholder-house.jpg');
  });

  it('displays formatted price overlay', () => {
    render(<PropertyCard property={mockProperty} />);
    
    expect(screen.getByText('$500,000')).toBeInTheDocument();
  });

  it('splits and displays address correctly', () => {
    render(<PropertyCard property={mockProperty} />);
    
    expect(screen.getByText('123 Test St')).toBeInTheDocument();
    expect(screen.getByText('City, State 12345')).toBeInTheDocument();
  });

  it('shows property stats with icons', () => {
    render(<PropertyCard property={mockProperty} />);
    
    expect(screen.getByTestId('bed-icon')).toBeInTheDocument();
    expect(screen.getByText('3 Beds')).toBeInTheDocument();
    
    expect(screen.getByTestId('bath-icon')).toBeInTheDocument();
    expect(screen.getByText('2 Baths')).toBeInTheDocument();
    
    expect(screen.getByTestId('square-icon')).toBeInTheDocument();
    expect(screen.getByText('2,000 sqft')).toBeInTheDocument();
    
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
  });

  it('displays market stats', () => {
    render(<PropertyCard property={mockProperty} />);
    
    expect(screen.getByText('$250')).toBeInTheDocument(); // Price per sqft
    expect(screen.getByText('$550,000')).toBeInTheDocument(); // Market value
  });

  it('calculates and displays market trend percentage', () => {
    render(<PropertyCard property={mockProperty} />);
    
    // Market trend: ((550000 - 500000) / 500000 * 100) = 10.0%
    const trend = screen.getByText('10.0%');
    expect(trend).toBeInTheDocument();
    expect(trend).toHaveClass('text-success'); // Positive trend
  });

  it('shows negative market trend in red', () => {
    const propertyWithNegativeTrend = {
      ...mockProperty,
      marketValue: 450000, // Lower than price
    };
    
    render(<PropertyCard property={propertyWithNegativeTrend} />);
    
    // Market trend: ((450000 - 500000) / 500000 * 100) = -10.0%
    const trend = screen.getByText('-10.0%');
    expect(trend).toBeInTheDocument();
    expect(trend).toHaveClass('text-danger'); // Negative trend
  });

  it('handles missing optional properties with defaults', () => {
    const minimalProperty = {
      address: '123 Test St, City, State 12345',
      price: 500000,
    };
    
    render(<PropertyCard property={minimalProperty} />);
    
    expect(screen.getByText('0 Beds')).toBeInTheDocument();
    expect(screen.getByText('0 Baths')).toBeInTheDocument();
    expect(screen.getByText('0 sqft')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument(); // Year built
    expect(screen.getByText('$0')).toBeInTheDocument(); // Price per sqft
    expect(screen.getByText('$0')).toBeInTheDocument(); // Market value
  });

  it('applies correct layout classes', () => {
    render(<PropertyCard property={mockProperty} />);
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('w-full overflow-hidden');
    
    const cardBody = screen.getByTestId('card-body');
    expect(cardBody).toHaveClass('p-0');
  });

  it('formats large numbers with commas', () => {
    const propertyWithLargeNumbers = {
      ...mockProperty,
      price: 1500000,
      sqft: 10000,
      marketValue: 1750000,
    };
    
    render(<PropertyCard property={propertyWithLargeNumbers} />);
    
    expect(screen.getByText('$1,500,000')).toBeInTheDocument();
    expect(screen.getByText('10,000 sqft')).toBeInTheDocument();
    expect(screen.getByText('$1,750,000')).toBeInTheDocument();
  });
});