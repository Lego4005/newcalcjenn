import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

// Mock CommandMenu component
jest.mock('@/components/RealEstateCalculator/CommandMenu', () => ({
  CommandMenu: ({ onAction }: { onAction: (action: string) => void }) => (
    <div data-testid="command-menu">
      <button onClick={() => onAction('test-action')}>Mock Command Menu</button>
    </div>
  ),
}));

describe('Header', () => {
  it('renders CommandMenu component', () => {
    render(<Header />);
    expect(screen.getByTestId('command-menu')).toBeInTheDocument();
  });

  it('passes console.log as onAction to CommandMenu', () => {
    // Mock console.log
    const consoleSpy = jest.spyOn(console, 'log');
    
    render(<Header />);
    
    // Trigger action through mock CommandMenu
    screen.getByText('Mock Command Menu').click();
    
    expect(consoleSpy).toHaveBeenCalledWith('test-action');
    
    // Cleanup
    consoleSpy.mockRestore();
  });
});