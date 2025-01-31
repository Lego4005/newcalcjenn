import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../Dashboard/LoadingSpinner';

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Card: ({ 
    children,
    className 
  }: { 
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="card" className={className}>{children}</div>
  ),
  CardBody: ({ 
    children,
    className 
  }: { 
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="card-body" className={className}>{children}</div>
  ),
  Spinner: ({ 
    size,
    color 
  }: { 
    size?: string;
    color?: string;
  }) => (
    <div 
      data-testid="spinner"
      data-size={size}
      data-color={color}
    >
      ⌛
    </div>
  ),
}));

describe('LoadingSpinner', () => {
  it('renders loading text', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders spinner with correct props', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveAttribute('data-size', 'lg');
    expect(spinner).toHaveAttribute('data-color', 'primary');
  });

  it('applies correct container styles', () => {
    render(<LoadingSpinner />);
    
    const container = screen.getByTestId('card').parentElement;
    expect(container).toHaveClass('absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10');
  });

  it('applies correct card styles', () => {
    render(<LoadingSpinner />);
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('p-8 bg-background/80');
  });

  it('applies correct card body styles', () => {
    render(<LoadingSpinner />);
    
    const cardBody = screen.getByTestId('card-body');
    expect(cardBody).toHaveClass('flex flex-col items-center gap-4');
  });

  it('applies correct text styles', () => {
    render(<LoadingSpinner />);
    
    const text = screen.getByText('Loading...');
    expect(text).toHaveClass('text-default-600');
  });

  it('maintains proper component hierarchy', () => {
    render(<LoadingSpinner />);
    
    // Container -> Card -> CardBody -> (Spinner + Text)
    const container = screen.getByTestId('card').parentElement;
    const card = screen.getByTestId('card');
    const cardBody = screen.getByTestId('card-body');
    const spinner = screen.getByTestId('spinner');
    const text = screen.getByText('Loading...');
    
    expect(container).toContainElement(card);
    expect(card).toContainElement(cardBody);
    expect(cardBody).toContainElement(spinner);
    expect(cardBody).toContainElement(text);
  });

  it('renders in a portal-friendly way', () => {
    render(<LoadingSpinner />);
    
    // Check that the container has absolute positioning and high z-index
    // This allows it to work well when rendered in a portal
    const container = screen.getByTestId('card').parentElement;
    expect(container).toHaveClass('absolute z-10');
  });

  it('uses semi-transparent backdrop', () => {
    render(<LoadingSpinner />);
    
    const container = screen.getByTestId('card').parentElement;
    expect(container).toHaveClass('bg-background/50 backdrop-blur-sm');
  });

  it('centers content both vertically and horizontally', () => {
    render(<LoadingSpinner />);
    
    const container = screen.getByTestId('card').parentElement;
    expect(container).toHaveClass('flex items-center justify-center');
  });
});