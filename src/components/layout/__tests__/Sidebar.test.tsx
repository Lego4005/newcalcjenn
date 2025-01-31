import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from '../Sidebar';

// Mock child components
jest.mock('../Logo', () => ({
  __esModule: true,
  default: ({ isCollapsed }: { isCollapsed: boolean }) => (
    <div data-testid="logo" data-collapsed={isCollapsed}>Logo</div>
  ),
}));

jest.mock('../Sidebar/Navigation', () => ({
  Navigation: ({ isCollapsed }: { isCollapsed: boolean }) => (
    <div data-testid="navigation" data-collapsed={isCollapsed}>Navigation</div>
  ),
}));

jest.mock('../Sidebar/UserSection', () => ({
  UserSection: ({ isCollapsed }: { isCollapsed: boolean }) => (
    <div data-testid="user-section" data-collapsed={isCollapsed}>UserSection</div>
  ),
}));

jest.mock('@/components/PropertyContext', () => ({
  PropertyContext: ({ isCompact }: { isCompact: boolean }) => (
    <div data-testid="property-context" data-compact={isCompact}>PropertyContext</div>
  ),
}));

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Button: ({ 
    children,
    onClick,
    isIconOnly,
    variant,
    className,
    radius,
    size 
  }: { 
    children: React.ReactNode;
    onClick?: () => void;
    isIconOnly?: boolean;
    variant?: string;
    className?: string;
    radius?: string;
    size?: string;
  }) => (
    <button 
      onClick={onClick}
      data-testid="button"
      data-icon-only={isIconOnly}
      data-variant={variant}
      data-radius={radius}
      data-size={size}
      className={className}
    >
      {children}
    </button>
  ),
  Tooltip: ({ children, content }: { children: React.ReactNode; content: string }) => (
    <div data-testid="tooltip" data-content={content}>{children}</div>
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  ChevronLeft: () => <span data-testid="chevron-icon">←</span>,
  Plus: () => <span data-testid="plus-icon">+</span>,
}));

describe('Sidebar', () => {
  const mockOnCollapse = jest.fn();
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    jest.clearAllMocks();
  });

  it('renders all child components', () => {
    render(<Sidebar isCollapsed={false} onCollapse={mockOnCollapse} />);
    
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('property-context')).toBeInTheDocument();
    expect(screen.getByTestId('user-section')).toBeInTheDocument();
  });

  it('applies correct width classes based on collapsed state', () => {
    const { rerender } = render(<Sidebar isCollapsed={false} onCollapse={mockOnCollapse} />);
    
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass('w-72');
    
    rerender(<Sidebar isCollapsed={true} onCollapse={mockOnCollapse} />);
    expect(sidebar).toHaveClass('w-20');
  });

  it('passes collapse state to child components', () => {
    render(<Sidebar isCollapsed={true} onCollapse={mockOnCollapse} />);
    
    expect(screen.getByTestId('logo')).toHaveAttribute('data-collapsed', 'true');
    expect(screen.getByTestId('navigation')).toHaveAttribute('data-collapsed', 'true');
    expect(screen.getByTestId('user-section')).toHaveAttribute('data-collapsed', 'true');
    expect(screen.getByTestId('property-context')).toHaveAttribute('data-compact', 'true');
  });

  it('toggles collapse state when button is clicked', () => {
    render(<Sidebar isCollapsed={false} onCollapse={mockOnCollapse} />);
    
    const collapseButton = screen.getAllByTestId('button')[0];
    fireEvent.click(collapseButton);
    
    expect(mockOnCollapse).toHaveBeenCalledWith(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('sidebarCollapsed', 'true');
  });

  it('rotates chevron icon based on collapse state', () => {
    const { rerender } = render(<Sidebar isCollapsed={false} onCollapse={mockOnCollapse} />);
    
    const chevronIcon = screen.getByTestId('chevron-icon').parentElement;
    expect(chevronIcon).not.toHaveClass('rotate-180');
    
    rerender(<Sidebar isCollapsed={true} onCollapse={mockOnCollapse} />);
    expect(chevronIcon).toHaveClass('rotate-180');
  });

  it('hides properties section header when collapsed', () => {
    const { rerender } = render(<Sidebar isCollapsed={false} onCollapse={mockOnCollapse} />);
    
    expect(screen.getByText('Properties')).toBeInTheDocument();
    
    rerender(<Sidebar isCollapsed={true} onCollapse={mockOnCollapse} />);
    expect(screen.queryByText('Properties')).not.toBeInTheDocument();
  });

  it('shows add property tooltip', () => {
    render(<Sidebar isCollapsed={false} onCollapse={mockOnCollapse} />);
    
    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toHaveAttribute('data-content', 'Add Property');
  });

  it('applies correct styling to buttons', () => {
    render(<Sidebar isCollapsed={false} onCollapse={mockOnCollapse} />);
    
    const [collapseButton, addButton] = screen.getAllByTestId('button');
    
    // Collapse button
    expect(collapseButton).toHaveAttribute('data-icon-only', 'true');
    expect(collapseButton).toHaveAttribute('data-variant', 'light');
    expect(collapseButton).toHaveAttribute('data-radius', 'full');
    expect(collapseButton).toHaveClass('text-white/80');
    
    // Add button
    expect(addButton).toHaveAttribute('data-icon-only', 'true');
    expect(addButton).toHaveAttribute('data-variant', 'light');
    expect(addButton).toHaveAttribute('data-size', 'sm');
    expect(addButton).toHaveClass('text-white/80');
  });

  it('maintains layout structure', () => {
    render(<Sidebar isCollapsed={false} onCollapse={mockOnCollapse} />);
    
    const sidebar = screen.getByRole('complementary');
    
    // Check main layout classes
    expect(sidebar).toHaveClass('fixed top-0 left-0 z-40 h-screen bg-[#051B2C] text-white');
    
    // Check flex layout
    const flexContainer = sidebar.firstElementChild;
    expect(flexContainer).toHaveClass('flex flex-col h-full');
    
    // Check sections
    const sections = flexContainer?.children;
    expect(sections?.[0]).toHaveClass('relative');
    expect(sections?.[1]).toHaveClass('flex-1');
    expect(sections?.[2]).toHaveClass('border-t border-white/10');
  });
});