import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CommandMenu } from '../CommandMenu';

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Modal: ({ 
    isOpen,
    onOpenChange,
    size,
    classNames,
    children 
  }: { 
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    size?: string;
    classNames?: { base?: string };
    children: (onClose: () => void) => React.ReactNode;
  }) => (
    isOpen ? (
      <div 
        data-testid="modal"
        data-size={size}
        className={classNames?.base}
      >
        {children(() => onOpenChange(false))}
      </div>
    ) : null
  ),
  ModalContent: ({ children }: { children: React.ReactNode | ((onClose: () => void) => React.ReactNode) }) => (
    <div data-testid="modal-content">
      {typeof children === 'function' 
        ? children(() => {
            // Mock onClose callback
          }) 
        : children}
    </div>
  ),
  Button: ({ 
    children,
    onPress,
    variant,
    size,
    startContent,
    endContent,
    className 
  }: { 
    children?: React.ReactNode;
    onPress?: () => void;
    variant?: string;
    size?: string;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    className?: string;
  }) => (
    <button 
      onClick={onPress}
      data-testid="button"
      data-variant={variant}
      data-size={size}
      className={className}
    >
      {startContent}
      {children}
      {endContent}
    </button>
  ),
  Input: ({ 
    value,
    onValueChange,
    placeholder,
    startContent,
    variant,
    classNames,
    autoFocus 
  }: { 
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    startContent?: React.ReactNode;
    variant?: string;
    classNames?: { input?: string };
    autoFocus?: boolean;
  }) => (
    <div data-testid="input-wrapper">
      {startContent}
      <input
        data-testid="input"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        data-variant={variant}
        className={classNames?.input}
        autoFocus={autoFocus}
      />
    </div>
  ),
  ScrollShadow: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="scroll-shadow" className={className}>{children}</div>
  ),
  Listbox: ({ 
    children,
    onAction,
    className,
    'aria-label': ariaLabel 
  }: { 
    children: React.ReactNode;
    onAction: (key: string | number) => void;
    className?: string;
    'aria-label'?: string;
  }) => (
    <select 
      data-testid="listbox"
      multiple
      size={5}
      className={className}
      aria-label={ariaLabel}
      onChange={(e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const key = selectedOption.getAttribute('data-key');
        if (key) {
          onAction(key);
        }
      }}
    >
      {children}
    </select>
  ),
  ListboxItem: ({ 
    children,
    startContent,
    endContent,
    description,
    className,
    key 
  }: { 
    children: React.ReactNode;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    description?: string;
    className?: string;
    key: string;
  }) => (
    <option 
      data-testid="listbox-item"
      data-key={key}
      className={className}
      value={key}
    >
      {startContent}
      {children}
      {description && ` - ${description}`}
      {endContent}
    </option>
  ),
  Kbd: ({ keys }: { keys: string[] }) => (
    <kbd data-testid="kbd">
      {keys.join('+')}
    </kbd>
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Command: () => <span data-testid="command-icon">⌘</span>,
}));

// Mock Iconify
jest.mock('@iconify/react', () => ({
  Icon: ({ icon }: { icon: string }) => (
    <span data-testid="icon" data-icon={icon}>icon</span>
  ),
}));

describe('CommandMenu', () => {
  const onAction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders command button with keyboard shortcut', () => {
    render(<CommandMenu onAction={onAction} />);
    
    expect(screen.getByText('Quick Actions...')).toBeInTheDocument();
    expect(screen.getByTestId('command-icon')).toBeInTheDocument();
    expect(screen.getByTestId('kbd')).toHaveTextContent('command+K');
  });

  it('opens modal on button click', () => {
    render(<CommandMenu onAction={onAction} />);
    
    fireEvent.click(screen.getByText('Quick Actions...'));
    
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search actions...')).toBeInTheDocument();
  });

  it('opens modal on Command+K', () => {
    render(<CommandMenu onAction={onAction} />);
    
    fireEvent.keyDown(document, { key: 'k', metaKey: true });
    
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('closes modal on Escape', () => {
    render(<CommandMenu onAction={onAction} />);
    
    // Open modal
    fireEvent.click(screen.getByText('Quick Actions...'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    
    // Close with Escape
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('filters actions by search text', () => {
    render(<CommandMenu onAction={onAction} />);
    
    // Open modal
    fireEvent.click(screen.getByText('Quick Actions...'));
    
    // Type in search
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'pdf' } });
    
    // Should only show PDF-related actions
    const listItems = screen.getAllByTestId('listbox-item');
    expect(listItems).toHaveLength(1);
    expect(listItems[0]).toHaveTextContent('Generate PDF Report');
  });

  it('filters actions by category', () => {
    render(<CommandMenu onAction={onAction} />);
    
    // Open modal
    fireEvent.click(screen.getByText('Quick Actions...'));
    
    // Click Documents category
    fireEvent.click(screen.getByText('Documents'));
    
    // Should only show Document actions
    const listItems = screen.getAllByTestId('listbox-item');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('Generate PDF Report');
    expect(listItems[1]).toHaveTextContent('Export Data');
  });

  it('combines search and category filters', () => {
    render(<CommandMenu onAction={onAction} />);
    
    // Open modal
    fireEvent.click(screen.getByText('Quick Actions...'));
    
    // Select Documents category
    fireEvent.click(screen.getByText('Documents'));
    
    // Search for "export"
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'export' } });
    
    // Should only show Export Data action
    const listItems = screen.getAllByTestId('listbox-item');
    expect(listItems).toHaveLength(1);
    expect(listItems[0]).toHaveTextContent('Export Data');
  });

  it('calls onAction with correct action ID', () => {
    render(<CommandMenu onAction={onAction} />);
    
    // Open modal
    fireEvent.click(screen.getByText('Quick Actions...'));
    
    // Click an action
    const listItems = screen.getAllByTestId('listbox-item');
    fireEvent.click(listItems[0]);
    
    expect(onAction).toHaveBeenCalledWith('generate-pdf');
  });

  it('shows keyboard shortcuts for actions', () => {
    render(<CommandMenu onAction={onAction} />);
    
    // Open modal
    fireEvent.click(screen.getByText('Quick Actions...'));
    
    const kbds = screen.getAllByTestId('kbd');
    
    // Each action should have its shortcut
    expect(kbds[1]).toHaveTextContent('⌘+P'); // PDF Report
    expect(kbds[2]).toHaveTextContent('⌘+S'); // Share
    expect(kbds[3]).toHaveTextContent('⌘+I'); // Invite
    expect(kbds[4]).toHaveTextContent('⌘+E'); // Export
    expect(kbds[5]).toHaveTextContent('⌘+M'); // Market Analysis
  });

  it('resets filters when modal is closed', () => {
    render(<CommandMenu onAction={onAction} />);
    
    // Open modal and apply filters
    fireEvent.click(screen.getByText('Quick Actions...'));
    
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'pdf' } });
    
    // Close modal
    fireEvent.keyDown(document, { key: 'Escape' });
    
    // Reopen modal
    fireEvent.click(screen.getByText('Quick Actions...'));
    
    // Should show all actions again
    const listItems = screen.getAllByTestId('listbox-item');
    expect(listItems).toHaveLength(5);
  });

  it('shows action categories', () => {
    render(<CommandMenu onAction={onAction} />);
    
    // Open modal
    fireEvent.click(screen.getByText('Quick Actions...'));
    
    const descriptions = screen.getAllByTestId('description');
    
    expect(descriptions[0]).toHaveTextContent('Documents');
    expect(descriptions[1]).toHaveTextContent('Share');
    expect(descriptions[2]).toHaveTextContent('Team');
    expect(descriptions[3]).toHaveTextContent('Documents');
    expect(descriptions[4]).toHaveTextContent('Analysis');
  });

  it('shows icons for actions', () => {
    render(<CommandMenu onAction={onAction} />);
    
    // Open modal
    fireEvent.click(screen.getByText('Quick Actions...'));
    
    const icons = screen.getAllByTestId('icon');
    
    expect(icons[0]).toHaveAttribute('data-icon', 'solar:file-text-linear');
    expect(icons[1]).toHaveAttribute('data-icon', 'solar:share-linear');
    expect(icons[2]).toHaveAttribute('data-icon', 'solar:users-group-rounded-linear');
    expect(icons[3]).toHaveAttribute('data-icon', 'solar:file-download-linear');
    expect(icons[4]).toHaveAttribute('data-icon', 'solar:chart-linear');
  });
});