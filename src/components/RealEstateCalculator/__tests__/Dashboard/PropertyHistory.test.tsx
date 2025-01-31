import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyHistory from '../../Dashboard/PropertyHistory';
import type { Property } from '@/types/property';

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>{children}</div>
  ),
  CardBody: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card-body" className={className}>{children}</div>
  ),
  Chip: ({ 
    children,
    color,
    variant,
    size,
    startContent,
    className 
  }: { 
    children: React.ReactNode;
    color?: string;
    variant?: string;
    size?: string;
    startContent?: React.ReactNode;
    className?: string;
  }) => (
    <div 
      data-testid="chip"
      data-color={color}
      data-variant={variant}
      data-size={size}
      className={className}
    >
      {startContent}
      {children}
    </div>
  ),
  Divider: ({ className }: { className?: string }) => (
    <hr data-testid="divider" className={className} />
  ),
  Avatar: ({ 
    name,
    size,
    icon,
    className 
  }: { 
    name: string;
    size?: string;
    icon?: React.ReactNode;
    className?: string;
  }) => (
    <div 
      data-testid="avatar"
      data-name={name}
      data-size={size}
      className={className}
    >
      {icon}
    </div>
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  History: () => <span data-testid="history-icon">📜</span>,
  DollarSign: () => <span data-testid="dollar-icon">💲</span>,
  Calendar: () => <span data-testid="calendar-icon">📅</span>,
  User: () => <span data-testid="user-icon">👤</span>,
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => (
      <div data-testid="motion-div" {...props}>{children}</div>
    ),
  },
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
  }
};

describe('PropertyHistory', () => {
  it('renders history title and description', () => {
    render(<PropertyHistory property={mockProperty} />);
    
    expect(screen.getByText('Property History')).toBeInTheDocument();
    expect(screen.getByText("Track this property's history and market activity")).toBeInTheDocument();
  });

  it('renders all history events', () => {
    render(<PropertyHistory property={mockProperty} />);
    
    // Check for all event types
    expect(screen.getAllByText('Listed')).toHaveLength(2);
    expect(screen.getByText('Price Change')).toBeInTheDocument();
    expect(screen.getByText('Open House')).toBeInTheDocument();
  });

  it('applies correct colors to event chips', () => {
    render(<PropertyHistory property={mockProperty} />);
    
    const eventColors = {
      'Listed': 'primary',
      'Price Change': 'warning',
      'Open House': 'secondary'
    };
    
    Object.entries(eventColors).forEach(([event, color]) => {
      const chip = screen.getAllByTestId('chip').find(
        chip => chip.textContent === event
      );
      expect(chip).toHaveAttribute('data-color', color);
    });
  });

  it('formats dates correctly', () => {
    render(<PropertyHistory property={mockProperty} />);
    
    // Check for formatted dates (e.g., "Dec 1, 2023, 12:00 AM")
    expect(screen.getByText('Dec 1, 2023, 12:00 AM')).toBeInTheDocument();
    expect(screen.getByText('Nov 15, 2023, 12:00 AM')).toBeInTheDocument();
  });

  it('formats prices correctly', () => {
    render(<PropertyHistory property={mockProperty} />);
    
    expect(screen.getByText('$500,000')).toBeInTheDocument();
    expect(screen.getByText('$475,000')).toBeInTheDocument();
  });

  it('shows agent information when available', () => {
    render(<PropertyHistory property={mockProperty} />);
    
    expect(screen.getAllByText('John Smith')).toHaveLength(2);
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    
    const avatars = screen.getAllByTestId('avatar');
    expect(avatars).toHaveLength(3);
  });

  it('displays event descriptions', () => {
    render(<PropertyHistory property={mockProperty} />);
    
    expect(screen.getByText('Property listed on MLS')).toBeInTheDocument();
    expect(screen.getByText('Price reduced by $25,000')).toBeInTheDocument();
    expect(screen.getByText('25 visitors attended')).toBeInTheDocument();
    expect(screen.getByText('Initial listing')).toBeInTheDocument();
  });

  it('applies motion animation props', () => {
    render(<PropertyHistory property={mockProperty} />);
    
    const motionDivs = screen.getAllByTestId('motion-div');
    
    // Check container animation
    expect(motionDivs[0]).toHaveAttribute('initial', expect.stringContaining('opacity: 0'));
    expect(motionDivs[0]).toHaveAttribute('animate', expect.stringContaining('opacity: 1'));
    
    // Check item animations
    motionDivs.slice(1).forEach(div => {
      expect(div).toHaveAttribute('variants');
    });
  });

  it('shows price chips with correct styling', () => {
    render(<PropertyHistory property={mockProperty} />);
    
    const priceChips = screen.getAllByTestId('chip').filter(
      chip => chip.textContent?.includes('$')
    );
    
    priceChips.forEach(chip => {
      expect(chip).toHaveAttribute('data-color', 'success');
      expect(chip).toHaveAttribute('data-variant', 'flat');
      expect(chip).toHaveAttribute('data-size', 'sm');
    });
  });

  it('renders dividers between event sections', () => {
    render(<PropertyHistory property={mockProperty} />);
    
    const dividers = screen.getAllByTestId('divider');
    expect(dividers).toHaveLength(4); // One for each event
    
    dividers.forEach(divider => {
      expect(divider).toHaveClass('my-2');
    });
  });

  it('applies hover effects to event cards', () => {
    render(<PropertyHistory property={mockProperty} />);
    
    const cards = screen.getAllByTestId('card');
    cards.forEach(card => {
      expect(card).toHaveClass('hover:shadow-lg transition-shadow');
    });
  });

  it('renders all required icons', () => {
    render(<PropertyHistory property={mockProperty} />);
    
    expect(screen.getAllByTestId('history-icon')).toHaveLength(5); // Header + 4 events
    expect(screen.getAllByTestId('calendar-icon')).toHaveLength(4); // One per event
    expect(screen.getAllByTestId('dollar-icon')).toHaveLength(3); // For price events
    expect(screen.getAllByTestId('user-icon')).toHaveLength(3); // For events with agents
  });
});