import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyDrawer from '../PropertyDrawer';

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Modal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ModalContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ModalBody: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({ 
    children,
    onPress,
    isIconOnly,
    variant,
    className,
    'aria-label': ariaLabel,
  }: { 
    children: React.ReactNode;
    onPress?: () => void;
    isIconOnly?: boolean;
    variant?: string;
    className?: string;
    'aria-label'?: string;
  }) => (
    <button 
      onClick={onPress}
      data-icon-only={isIconOnly}
      data-variant={variant}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  ),
  Image: ({
    src,
    alt,
    className,
    onError,
  }: {
    src: string;
    alt: string;
    className?: string;
    onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  }) => (
    <div
      data-testid="property-image"
      data-src={src}
      data-alt={alt}
      className={className}
      onError={onError}
    />
  ),
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  CardBody: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  Progress: ({ 
    value, 
    className,
    'aria-label': ariaLabel 
  }: { 
    value: number; 
    className?: string;
    'aria-label'?: string;
  }) => (
    <progress
      aria-label={ariaLabel} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} value={value} max={100} className={className} />
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
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  X: () => <span data-testid="close-icon">×</span>,
  Bed: () => <span data-testid="bed-icon">🛏️</span>,
  Bath: () => <span data-testid="bath-icon">🛁</span>,
  Square: () => <span data-testid="square-icon">📏</span>,
  Calendar: () => <span data-testid="calendar-icon">📅</span>,
  Car: () => <span data-testid="car-icon">🚗</span>,
  Ruler: () => <span data-testid="ruler-icon">📏</span>,
  School: () => <span data-testid="school-icon">🏫</span>,
  Train: () => <span data-testid="train-icon">🚂</span>,
  Navigation2: () => <span data-testid="navigation-icon">🧭</span>,
  DollarSign: () => <span data-testid="dollar-icon">💲</span>,
  Home: () => <span data-testid="home-icon">🏠</span>,
  Tag: () => <span data-testid="tag-icon">🏷️</span>,
  ChevronUp: () => <span data-testid="chevron-up-icon">↑</span>,
  ChevronDown: () => <span data-testid="chevron-down-icon">↓</span>,
  ChevronLeft: () => <span data-testid="chevron-left-icon">←</span>,
  ChevronRight: () => <span data-testid="chevron-right-icon">→</span>,
  Info: () => <span data-testid="info-icon">i️</span>,
}));

describe('PropertyDrawer', () => {
  const mockProperty = {
    address: '123 Test St, City, State 12345',
    price: 500000,
    beds: 3,
    baths: 2,
    sqft: 2000,
    yearBuilt: 2020,
    propertyType: 'Single Family',
    images: ['/image1.jpg', '/image2.jpg', '/image3.jpg'],
    description: 'A beautiful test property',
    features: ['Feature 1', 'Feature 2'],
    schools: [
      {
        name: 'Test School',
        rating: 8,
        distance: 0.5,
        type: 'Elementary',
      },
    ],
    walkScore: 85,
    transitScore: 75,
    zestimate: 520000,
    taxes: 5000,
    hoaFees: 200,
  };

  it('renders property details when open', () => {
    render(
      <PropertyDrawer
        isOpen={true}
        onClose={() => {}}
        property={mockProperty}
      />
    );
    
    expect(screen.getByText('Property Details')).toBeInTheDocument();
    expect(screen.getByText('$500,000')).toBeInTheDocument();
    expect(screen.getByText('123 Test St, City, State 12345')).toBeInTheDocument();
    expect(screen.getByText('Single Family')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <PropertyDrawer
        isOpen={false}
        onClose={() => {}}
        property={mockProperty}
      />
    );
    
    expect(screen.queryByText('Property Details')).not.toBeInTheDocument();
  });

  it('handles image navigation', () => {
    render(
      <PropertyDrawer
        isOpen={true}
        onClose={() => {}}
        property={mockProperty}
      />
    );
    
    const nextButton = screen.getByTestId('chevron-right-icon').parentElement;
    const prevButton = screen.getByTestId('chevron-left-icon').parentElement;
    const image = screen.getByTestId('property-image');
    
    if (!nextButton || !prevButton) {
      throw new Error('Navigation buttons not found');
    }
    
    expect(image).toHaveAttribute('data-src', '/image1.jpg');
    
    fireEvent.click(nextButton);
    expect(image).toHaveAttribute('data-src', '/image2.jpg');
    
    fireEvent.click(nextButton);
    expect(image).toHaveAttribute('data-src', '/image3.jpg');
    
    fireEvent.click(prevButton);
    expect(image).toHaveAttribute('data-src', '/image2.jpg');
  });

  it('shows image counter', () => {
    render(
      <PropertyDrawer
        isOpen={true}
        onClose={() => {}}
        property={mockProperty}
      />
    );
    
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('handles image errors', () => {
    render(
      <PropertyDrawer
        isOpen={true}
        onClose={() => {}}
        property={mockProperty}
      />
    );
    
    const image = screen.getByTestId('property-image');
    fireEvent.error(image);
    
    expect(image).toHaveAttribute('data-src', '/placeholder-house.jpg');
  });

  it('displays key stats', () => {
    render(
      <PropertyDrawer
        isOpen={true}
        onClose={() => {}}
        property={mockProperty}
      />
    );
    
    expect(screen.getByText('3 beds')).toBeInTheDocument();
    expect(screen.getByText('2 baths')).toBeInTheDocument();
    expect(screen.getByText('2,000 sqft')).toBeInTheDocument();
  });

  it('shows financial details', () => {
    render(
      <PropertyDrawer
        isOpen={true}
        onClose={() => {}}
        property={mockProperty}
      />
    );
    
    expect(screen.getByText('$520,000')).toBeInTheDocument(); // Zestimate
    expect(screen.getByText('$5,000')).toBeInTheDocument(); // Taxes
    expect(screen.getByText('$200/month')).toBeInTheDocument(); // HOA
  });

  it('displays school information', () => {
    render(
      <PropertyDrawer
        isOpen={true}
        onClose={() => {}}
        property={mockProperty}
      />
    );
    
    expect(screen.getByText('Test School')).toBeInTheDocument();
    expect(screen.getByText('Elementary • 0.5 miles')).toBeInTheDocument();
    expect(screen.getByText('8/10')).toBeInTheDocument();
  });

  it('shows transportation scores', () => {
    render(
      <PropertyDrawer
        isOpen={true}
        onClose={() => {}}
        property={mockProperty}
      />
    );
    
    const walkScore = screen.getByRole('progressbar', { name: /walk score/i });
    const transitScore = screen.getByRole('progressbar', { name: /transit score/i });
    
    expect(walkScore).toHaveAttribute('aria-valuenow', '85');
    expect(transitScore).toHaveAttribute('aria-valuenow', '75');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <PropertyDrawer
        isOpen={true}
        onClose={onClose}
        property={mockProperty}
      />
    );
    
    const closeButton = screen.getByLabelText('Close property details');
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalled();
  });

  it('displays property features', () => {
    render(
      <PropertyDrawer
        isOpen={true}
        onClose={() => {}}
        property={mockProperty}
      />
    );
    
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
  });

  it('shows property description', () => {
    render(
      <PropertyDrawer
        isOpen={true}
        onClose={() => {}}
        property={mockProperty}
      />
    );
    
    expect(screen.getByText('A beautiful test property')).toBeInTheDocument();
  });
});
