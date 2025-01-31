import React from 'react';
import { render, screen } from '@testing-library/react';
import { CalculatorTools } from '../CalculatorTools';
import * as nextNavigation from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
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
    variant,
    color 
  }: { 
    children: React.ReactNode;
    className?: string;
    variant?: string;
    color?: string;
  }) => (
    <button 
      data-testid="button"
      className={className}
      data-variant={variant}
      data-color={color}
    >
      {children}
    </button>
  ),
}));

describe('CalculatorTools', () => {
  const tools = [
    { name: "Newly built", icon: "🏗️", href: "/newly-built" },
    { name: "Secondary", icon: "🏢", href: "/" },
    { name: "Cottage", icon: "🏡", href: "/cottage" },
    { name: "Refinance", icon: "💰", href: "/refinance" },
    { name: "Earth", icon: "🌍", href: "/earth" },
    { name: "Military Mortgage", icon: "🎖️", href: "/military" },
    { name: "God's support", icon: "🙏", href: "/support" },
    { name: "More meters", icon: "📏", href: "/meters" },
  ];

  it('renders all calculator tools', () => {
    render(<CalculatorTools />);
    
    tools.forEach(tool => {
      expect(screen.getByText(tool.name)).toBeInTheDocument();
      expect(screen.getByText(tool.icon)).toBeInTheDocument();
    });
  });

  it('wraps each tool in a Next.js Link', () => {
    render(<CalculatorTools />);
    
    const links = screen.getAllByTestId('next-link');
    expect(links).toHaveLength(tools.length);
    
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', tools[index].href);
    });
  });

  it('applies correct button styling', () => {
    render(<CalculatorTools />);
    
    const buttons = screen.getAllByTestId('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('w-full h-full min-h-[80px] flex-col gap-2');
    });
  });

  it('applies active styles to current path button', () => {
    jest.spyOn(nextNavigation, 'usePathname').mockReturnValue('/');
    
    render(<CalculatorTools />);
    
    const buttons = screen.getAllByTestId('button');
    const activeButton = buttons[1]; // Secondary tool has href="/"
    const inactiveButtons = buttons.filter((_, index) => index !== 1);
    
    expect(activeButton).toHaveAttribute('data-variant', 'solid');
    expect(activeButton).toHaveAttribute('data-color', 'primary');
    
    inactiveButtons.forEach(button => {
      expect(button).toHaveAttribute('data-variant', 'light');
      expect(button).toHaveAttribute('data-color', 'default');
    });
  });

  it('displays tool icons with correct size', () => {
    render(<CalculatorTools />);
    
    tools.forEach(tool => {
      const icon = screen.getByText(tool.icon);
      expect(icon).toHaveClass('text-2xl');
    });
  });

  it('displays tool names with correct styling', () => {
    render(<CalculatorTools />);
    
    tools.forEach(tool => {
      const name = screen.getByText(tool.name);
      expect(name).toHaveClass('text-xs text-center');
    });
  });

  it('maintains grid layout structure', () => {
    render(<CalculatorTools />);
    
    const grid = screen.getByTestId('button').parentElement?.parentElement;
    expect(grid).toHaveClass('grid grid-cols-4 sm:grid-cols-8 gap-2');
  });

  it('handles different active paths', () => {
    const testPaths = ['/newly-built', '/cottage', '/refinance'];
    
    testPaths.forEach(path => {
      jest.spyOn(nextNavigation, 'usePathname').mockReturnValue(path);
      render(<CalculatorTools />);
      
      const buttons = screen.getAllByTestId('button');
      const activeIndex = tools.findIndex(tool => tool.href === path);
      
      buttons.forEach((button, index) => {
        if (index === activeIndex) {
          expect(button).toHaveAttribute('data-variant', 'solid');
          expect(button).toHaveAttribute('data-color', 'primary');
        } else {
          expect(button).toHaveAttribute('data-variant', 'light');
          expect(button).toHaveAttribute('data-color', 'default');
        }
      });
    });
  });

  it('applies block display to link wrapper', () => {
    render(<CalculatorTools />);
    
    const links = screen.getAllByTestId('next-link');
    links.forEach(link => {
      expect(link).toHaveClass('block');
    });
  });
});