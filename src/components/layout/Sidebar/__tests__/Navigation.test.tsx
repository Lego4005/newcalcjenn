import React from 'react';
import { render, screen } from '@testing-library/react';
import { Navigation } from '../Navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/dashboard'),
}));

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  );
  MockLink.displayName = 'Link';
  return MockLink;
});

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Button: ({ 
    children,
    className,
    variant 
  }: { 
    children: React.ReactNode;
    className?: string;
    variant?: string;
  }) => (
    <button 
      data-testid="button"
      className={className}
      data-variant={variant}
    >
      {children}
    </button>
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Home: () => <span data-testid="icon-home">🏠</span>,
  Building2: () => <span data-testid="icon-building">🏢</span>,
  Users: () => <span data-testid="icon-users">👥</span>,
  FileText: () => <span data-testid="icon-file">📄</span>,
  BarChart: () => <span data-testid="icon-chart">📊</span>,
}));

describe('Navigation', () => {
  const routes = [
    { label: 'Dashboard', href: '/dashboard', icon: 'home' },
    { label: 'Properties', href: '/dashboard/properties', icon: 'building' },
    { label: 'Team', href: '/dashboard/team', icon: 'users' },
    { label: 'Documents', href: '/dashboard/documents', icon: 'file' },
    { label: 'Analytics', href: '/dashboard/analytics', icon: 'chart' },
  ];

  it('renders all navigation routes', () => {
    render(<Navigation isCollapsed={false} />);
    
    routes.forEach(route => {
      const link = screen.getByText(route.label);
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', route.href);
    });
  });

  it('renders all route icons', () => {
    render(<Navigation isCollapsed={false} />);
    
    expect(screen.getByTestId('icon-home')).toBeInTheDocument();
    expect(screen.getByTestId('icon-building')).toBeInTheDocument();
    expect(screen.getByTestId('icon-users')).toBeInTheDocument();
    expect(screen.getByTestId('icon-file')).toBeInTheDocument();
    expect(screen.getByTestId('icon-chart')).toBeInTheDocument();
  });

  it('hides labels when collapsed', () => {
    render(<Navigation isCollapsed={true} />);
    
    routes.forEach(route => {
      expect(screen.queryByText(route.label)).not.toBeInTheDocument();
    });
  });

  it('shows labels when expanded', () => {
    render(<Navigation isCollapsed={false} />);
    
    routes.forEach(route => {
      expect(screen.getByText(route.label)).toBeInTheDocument();
    });
  });

  it('applies active styles to current route', () => {
    render(<Navigation isCollapsed={false} />);
    
    // Dashboard route should be active
    const activeButton = screen.getByText('Dashboard').closest('button');
    expect(activeButton).toHaveClass('bg-white/10 text-white');
    
    // Other routes should be inactive
    const inactiveButtons = routes
      .filter(route => route.href !== '/dashboard')
      .map(route => screen.getByText(route.label).closest('button'));
    
    inactiveButtons.forEach(button => {
      expect(button).toHaveClass('text-white/60 hover:text-white hover:bg-white/5');
    });
  });

  it('applies correct icon colors based on active state', () => {
    render(<Navigation isCollapsed={false} />);
    
    // Active route icon
    const activeIcon = screen.getByTestId('icon-home').parentElement;
    expect(activeIcon).toHaveClass('text-white');
    
    // Inactive route icons
    const inactiveIcons = [
      screen.getByTestId('icon-building'),
      screen.getByTestId('icon-users'),
      screen.getByTestId('icon-file'),
      screen.getByTestId('icon-chart'),
    ].map(icon => icon.parentElement);
    
    inactiveIcons.forEach(icon => {
      expect(icon).toHaveClass('text-white/60');
    });
  });

  it('applies correct font weights based on active state', () => {
    render(<Navigation isCollapsed={false} />);
    
    // Active route label
    const activeLabel = screen.getByText('Dashboard');
    expect(activeLabel).toHaveClass('font-medium');
    
    // Inactive route labels
    const inactiveLabels = routes
      .filter(route => route.href !== '/dashboard')
      .map(route => screen.getByText(route.label));
    
    inactiveLabels.forEach(label => {
      expect(label).toHaveClass('font-normal');
    });
  });

  it('applies correct button sizing based on collapsed state', () => {
    const { rerender } = render(<Navigation isCollapsed={false} />);
    
    // Expanded state
    const expandedButtons = screen.getAllByTestId('button');
    expandedButtons.forEach(button => {
      expect(button).toHaveClass('h-11');
      expect(button).not.toHaveClass('justify-center px-0');
    });
    
    // Collapsed state
    rerender(<Navigation isCollapsed={true} />);
    const collapsedButtons = screen.getAllByTestId('button');
    collapsedButtons.forEach(button => {
      expect(button).toHaveClass('h-12 justify-center px-0');
    });
  });

  it('maintains consistent layout structure', () => {
    render(<Navigation isCollapsed={false} />);
    
    const container = screen.getAllByTestId('button')[0].parentElement?.parentElement;
    expect(container).toHaveClass('flex flex-col gap-2');
  });

  it('wraps buttons in Next.js Link components', () => {
    render(<Navigation isCollapsed={false} />);
    
    const links = screen.getAllByTestId('next-link');
    expect(links).toHaveLength(routes.length);
    
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', routes[index].href);
    });
  });
});