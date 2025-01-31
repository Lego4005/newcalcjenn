import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NumericInput from '../NumericInput';

// Mock HeroUI Input component
jest.mock('@heroui/react', () => ({
  Input: ({ 
    value,
    onChange,
    startContent,
    size,
    ...props 
  }: { 
    value: string;
    onChange: (e: { target: { value: string } }) => void;
    startContent?: React.ReactNode;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
  }) => (
    <div data-testid="input-wrapper">
      {startContent && (
        <span data-testid="start-content">{startContent}</span>
      )}
      <input
        data-testid="input"
        value={value}
        onChange={onChange}
        data-size={size}
        {...props}
      />
    </div>
  ),
}));

describe('NumericInput', () => {
  it('formats number values correctly', () => {
    render(
      <NumericInput
        value={1234567}
        onChange={() => {}}
      />
    );
    
    const input = screen.getByTestId('input');
    expect(input).toHaveValue('1,234,567');
  });

  it('formats percentage values correctly', () => {
    render(
      <NumericInput
        value={42.5}
        onChange={() => {}}
        isPercentage
      />
    );
    
    const input = screen.getByTestId('input');
    expect(input).toHaveValue('42.5');
  });

  it('handles invalid number values', () => {
    render(
      <NumericInput
        value={NaN}
        onChange={() => {}}
      />
    );
    
    const input = screen.getByTestId('input');
    expect(input).toHaveValue('0');
  });

  it('filters non-numeric characters on input', () => {
    const handleChange = jest.fn();
    render(
      <NumericInput
        value={0}
        onChange={handleChange}
      />
    );
    
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'abc123.45def' } });
    
    expect(handleChange).toHaveBeenCalledWith('123.45');
  });

  it('shows percentage symbol for percentage inputs', () => {
    render(
      <NumericInput
        value={0}
        onChange={() => {}}
        isPercentage
      />
    );
    
    const startContent = screen.getByTestId('start-content');
    expect(startContent).toHaveTextContent('%');
  });

  it('shows custom start content when provided', () => {
    render(
      <NumericInput
        value={0}
        onChange={() => {}}
        startContent={<span>$</span>}
      />
    );
    
    const startContent = screen.getByTestId('start-content');
    expect(startContent).toHaveTextContent('$');
  });

  it('uses default value when none provided', () => {
    render(
      <NumericInput
        onChange={() => {}}
      />
    );
    
    const input = screen.getByTestId('input');
    expect(input).toHaveValue('0');
  });

  it('handles undefined values', () => {
    render(
      <NumericInput
        value={undefined}
        onChange={() => {}}
      />
    );
    
    const input = screen.getByTestId('input');
    expect(input).toHaveValue('0');
  });

  it('passes through additional props to Input component', () => {
    render(
      <NumericInput
        value={0}
        onChange={() => {}}
        placeholder="Enter amount"
        className="test-class"
        disabled
        size="sm"
      />
    );
    
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('placeholder', 'Enter amount');
    expect(input).toHaveAttribute('class', 'test-class');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('data-size', 'sm');
  });

  it('formats large numbers with proper grouping', () => {
    render(
      <NumericInput
        value={1234567890}
        onChange={() => {}}
      />
    );
    
    const input = screen.getByTestId('input');
    expect(input).toHaveValue('1,234,567,890');
  });

  it('handles decimal numbers correctly', () => {
    const handleChange = jest.fn();
    render(
      <NumericInput
        value={0}
        onChange={handleChange}
      />
    );
    
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: '123.45' } });
    
    expect(handleChange).toHaveBeenCalledWith('123.45');
  });

  it('preserves decimal point during input', () => {
    const handleChange = jest.fn();
    render(
      <NumericInput
        value={0}
        onChange={handleChange}
      />
    );
    
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: '123.' } });
    
    expect(handleChange).toHaveBeenCalledWith('123.');
  });

  it('handles multiple decimal points correctly', () => {
    const handleChange = jest.fn();
    render(
      <NumericInput
        value={0}
        onChange={handleChange}
      />
    );
    
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: '123.45.67' } });
    
    expect(handleChange).toHaveBeenCalledWith('123.4567');
  });

  it('formats zero correctly', () => {
    render(
      <NumericInput
        value={0}
        onChange={() => {}}
      />
    );
    
    const input = screen.getByTestId('input');
    expect(input).toHaveValue('0');
  });

  it('formats negative numbers correctly', () => {
    render(
      <NumericInput
        value={-1234.5}
        onChange={() => {}}
      />
    );
    
    const input = screen.getByTestId('input');
    expect(input).toHaveValue('-1,235'); // Rounded to nearest integer
  });
});