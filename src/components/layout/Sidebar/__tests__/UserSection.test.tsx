import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserSection } from '../UserSection';
import * as nextThemes from 'next-themes';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
    themes: ['light', 'dark'],
    systemTheme: 'light',
    resolvedTheme: 'light',
    forcedTheme: undefined,
  }),
}));

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Avatar: ({ 
    name,
    className,
    src 
  }: { 
    name: string;
    className?: string;
    src?: string;
  }) => (
    <div 
      data-testid="avatar"
      className={className}
      data-name={name}
      data-src={src}
    >
      {name}
    </div>
  ),
  Button: ({ 
    children,
    onPress,
    isIconOnly,
    variant,
    className,
    size 
  }: { 
    children: React.ReactNode;
    onPress?: () => void;
    isIconOnly?: boolean;
    variant?: string;
    className?: string;
    size?: string;
  }) => (
    <button 
      onClick={() => onPress?.()}
      data-testid="button"
      data-icon-only={isIconOnly}
      data-variant={variant}
      data-size={size}
      className={className}
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
    content: string;
    placement?: string;
  }) => (
    <div 
      data-testid="tooltip"
      data-content={content}
      data-placement={placement}
    >
      {children}
    </div>
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Bell: () => <span data-testid="bell-icon">🔔</span>,
  Moon: () => <span data-testid="moon-icon">🌙</span>,
}));

describe('UserSection', () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Update theme mock for each test
    jest.spyOn(nextThemes, 'useTheme').mockImplementation(() => ({
      theme: 'light',
      setTheme: mockSetTheme,
      themes: ['light', 'dark'],
      systemTheme: 'light',
      resolvedTheme: 'light',
      forcedTheme: undefined,
    }));
  });

  it('renders user information when expanded', () => {
    render(<UserSection isCollapsed={false} />);
    
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveAttribute('data-name', 'John Smith');
    expect(avatar).toHaveAttribute('data-src', '/avatars/avatar-1.png');
    expect(avatar).toHaveClass('w-8 h-8');
    
    const nameElement = screen.getAllByText('John Smith').find(el => el.tagName === 'P');
    expect(nameElement).toHaveClass('text-sm font-medium text-white truncate');
    expect(screen.getByText('Agent', { selector: 'p' })).toHaveClass('text-xs text-white/60 truncate');
  });

  it('hides user information when collapsed', () => {
    render(<UserSection isCollapsed={true} />);
    
    // When collapsed, the text elements should not be visible, but the avatar should still exist
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    expect(screen.queryByText('John Smith', { selector: 'p' })).not.toBeInTheDocument();
    expect(screen.queryByText('Agent', { selector: 'p' })).not.toBeInTheDocument();
  });

  it('shows avatar tooltip when collapsed', () => {
    render(<UserSection isCollapsed={true} />);
    
    const tooltip = screen.getAllByTestId('tooltip')[2]; // Third tooltip is for avatar
    expect(tooltip).toHaveAttribute('data-content', 'John Smith');
    expect(tooltip).toHaveAttribute('data-placement', 'right');
  });

  it('renders notification button with tooltip', () => {
    render(<UserSection isCollapsed={false} />);
    
    const tooltip = screen.getAllByTestId('tooltip')[0]; // First tooltip is for notifications
    expect(tooltip).toHaveAttribute('data-content', 'Notifications');
    expect(tooltip).toHaveAttribute('data-placement', 'top');
    
    const button = screen.getAllByTestId('button')[0];
    expect(button).toHaveAttribute('data-icon-only', 'true');
    expect(button).toHaveAttribute('data-variant', 'light');
    expect(button).toHaveAttribute('data-size', 'sm');
    expect(button).toHaveClass('text-white/60');
    
    expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
  });

  it('renders theme toggle button with tooltip', () => {
    render(<UserSection isCollapsed={false} />);
    
    const tooltip = screen.getAllByTestId('tooltip')[1]; // Second tooltip is for theme toggle
    expect(tooltip).toHaveAttribute('data-content', 'Toggle theme');
    expect(tooltip).toHaveAttribute('data-placement', 'top');
    
    const button = screen.getAllByTestId('button')[1];
    expect(button).toHaveAttribute('data-icon-only', 'true');
    expect(button).toHaveAttribute('data-variant', 'light');
    expect(button).toHaveAttribute('data-size', 'sm');
    expect(button).toHaveClass('text-white/60');
    
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('toggles theme when theme button is clicked', () => {
    render(<UserSection isCollapsed={false} />);
    
    const themeButton = screen.getAllByTestId('button')[1];
    fireEvent.click(themeButton);
    
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('applies correct layout in expanded state', () => {
    render(<UserSection isCollapsed={false} />);
    
    const container = screen.getByRole('complementary');
    expect(container).toHaveClass('flex items-center gap-2 px-2');
    expect(container).not.toHaveClass('justify-center');
    
    const userInfo = container?.firstElementChild;
    expect(userInfo).toHaveClass('flex-1 min-w-0');
  });

  it('applies correct layout in collapsed state', () => {
    render(<UserSection isCollapsed={true} />);
    
    const container = screen.getByRole('complementary');
    expect(container).toHaveClass('flex items-center gap-2 justify-center');
    expect(container).not.toHaveClass('px-2');
  });

  it('maintains consistent button styling', () => {
    render(<UserSection isCollapsed={false} />);
    
    const buttons = screen.getAllByTestId('button');
    buttons.forEach(button => {
      expect(button.className).toContain('text-white/60');
    });
  });
});