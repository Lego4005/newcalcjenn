import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppLayout } from '../AppLayout';

// Mock CommandMenu component
jest.mock('@/components/RealEstateCalculator/CommandMenu', () => ({
  CommandMenu: ({ onAction }: { onAction: (action: string) => void }) => (
    <div data-testid="command-menu">
      <button onClick={() => onAction('test')}>Mock Command Menu</button>
    </div>
  ),
}));

// Mock Sidebar component
jest.mock('../Sidebar/index', () => ({
  Sidebar: ({ 
    isCollapsed,
    onCollapse 
  }: { 
    isCollapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
  }) => (
    <div 
      data-testid="sidebar"
      data-collapsed={isCollapsed}
    >
      <button onClick={() => onCollapse(!isCollapsed)}>
        Toggle Sidebar
      </button>
    </div>
  ),
}));

describe('AppLayout', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders children content', () => {
    render(
      <AppLayout>
        <div data-testid="test-content">Test Content</div>
      </AppLayout>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders sidebar and command menu', () => {
    render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>
    );
    
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('command-menu')).toBeInTheDocument();
  });

  it('loads sidebar state from localStorage', () => {
    localStorage.setItem('sidebarCollapsed', 'true');
    
    render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>
    );
    
    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-collapsed', 'true');
    expect(screen.getByRole('main')).toHaveClass('pl-20');
  });

  it('updates sidebar state when toggled', () => {
    render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>
    );
    
    const toggleButton = screen.getByText('Toggle Sidebar');
    fireEvent.click(toggleButton);
    
    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-collapsed', 'true');
    expect(screen.getByRole('main')).toHaveClass('pl-20');
  });

  it('persists sidebar state to localStorage', () => {
    render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>
    );
    
    const toggleButton = screen.getByText('Toggle Sidebar');
    fireEvent.click(toggleButton);
    
    expect(localStorage.getItem('sidebarCollapsed')).toBe('true');
  });

  it('applies correct layout classes when expanded', () => {
    render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>
    );
    
    const main = screen.getByRole('main');
    expect(main).toHaveClass('pl-72');
    expect(main).toHaveClass('transition-all');
    expect(main).toHaveClass('duration-300');
  });

  it('applies correct layout classes when collapsed', () => {
    localStorage.setItem('sidebarCollapsed', 'true');
    
    render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>
    );
    
    const main = screen.getByRole('main');
    expect(main).toHaveClass('pl-20');
    expect(main).toHaveClass('transition-all');
    expect(main).toHaveClass('duration-300');
  });

  it('maintains consistent padding and max width', () => {
    render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>
    );
    
    const main = screen.getByRole('main');
    expect(main).toHaveClass('pr-6');
    
    const container = main.firstElementChild;
    expect(container).toHaveClass('max-w-6xl');
    expect(container).toHaveClass('mx-auto');
  });

  it('centers command menu with correct width', () => {
    render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>
    );
    
    const commandMenuWrapper = screen.getByTestId('command-menu').parentElement;
    expect(commandMenuWrapper).toHaveClass('w-full');
    expect(commandMenuWrapper).toHaveClass('max-w-lg');
    expect(commandMenuWrapper).toHaveClass('mt-2');
  });

  it('logs command menu actions', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>
    );
    
    const commandMenuButton = screen.getByText('Mock Command Menu');
    fireEvent.click(commandMenuButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('test');
    
    consoleSpy.mockRestore();
  });

  it('applies background gradient', () => {
    render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>
    );
    
    const container = screen.getByRole('main').parentElement;
    expect(container).toHaveClass('bg-gradient-to-br');
    expect(container).toHaveClass('from-background');
    expect(container).toHaveClass('to-content1');
    expect(container).toHaveClass('min-h-screen');
  });

  it('maintains layout structure with nested content', () => {
    render(
      <AppLayout>
        <div>Level 1
          <div>Level 2
            <div>Level 3</div>
          </div>
        </div>
      </AppLayout>
    );
    
    const contentWrapper = screen.getByRole('main').firstElementChild?.firstElementChild;
    expect(contentWrapper).toHaveClass('flex');
    expect(contentWrapper).toHaveClass('flex-col');
    expect(contentWrapper).toHaveClass('items-center');
    expect(contentWrapper).toHaveClass('gap-6');
  });
});