import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddressAutocomplete from '../AddressAutocomplete';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock environment variable
process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token';

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Input: ({ 
    label,
    value,
    onValueChange,
    placeholder,
    description,
    errorMessage,
    isInvalid,
    isLoading,
    startContent,
    onFocus,
    classNames,
  }: { 
    label?: string;
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    description?: string;
    errorMessage?: string;
    isInvalid?: boolean;
    isLoading?: boolean;
    startContent?: React.ReactNode;
    onFocus?: () => void;
    classNames?: Record<string, string>;
  }) => (
    <div data-testid="input-wrapper" data-invalid={isInvalid}>
      {label && <label>{label}</label>}
      <input
        data-testid="input"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        onFocus={onFocus}
        className={classNames?.base}
      />
      {description && <div data-testid="description">{description}</div>}
      {errorMessage && <div data-testid="error">{errorMessage}</div>}
      {startContent}
      {isLoading && <div data-testid="loading-indicator" />}
    </div>
  ),
  Listbox: ({ 
    children,
    'aria-label': ariaLabel,
    className,
    itemClasses,
  }: { 
    children: React.ReactNode;
    'aria-label'?: string;
    className?: string;
    itemClasses?: Record<string, string>;
  }) => (
    <div 
      data-testid="listbox"
      aria-label={ariaLabel}
      className={className}
      data-item-classes={JSON.stringify(itemClasses)}
    >
      {children}
    </div>
  ),
  ListboxItem: ({ 
    children,
    onPress,
    className,
  }: { 
    children: React.ReactNode;
    onPress?: () => void;
    className?: string;
  }) => (
    <div 
      data-testid="listbox-item"
      onClick={onPress}
      className={className}
    >
      {children}
    </div>
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  MapPin: () => <span data-testid="map-pin">📍</span>,
}));

describe('AddressAutocomplete', () => {
  const mockOnChange = jest.fn();
  const mockOnSelect = jest.fn();

  const mockSuggestions = {
    features: [
      {
        place_name: '123 Main St, City, State',
        center: [0, 0],
        properties: {
          address: '123 Main St',
          city: 'City',
          state: 'State',
          postcode: '12345',
        },
      },
      {
        place_name: '456 Oak Ave, Town, State',
        center: [0, 0],
        properties: {
          address: '456 Oak Ave',
          city: 'Town',
          state: 'State',
          postcode: '67890',
        },
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockReset();
  });

  it('renders input with correct props', () => {
    render(
      <AddressAutocomplete
        value=""
        onChange={mockOnChange}
        onSelect={mockOnSelect}
      />
    );
    
    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByText('Property Address')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toHaveTextContent('Start typing to see suggestions');
    expect(screen.getByTestId('map-pin')).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(
      <AddressAutocomplete
        value=""
        onChange={mockOnChange}
        onSelect={mockOnSelect}
        error="Invalid address"
      />
    );
    
    expect(screen.getByTestId('error')).toHaveTextContent('Invalid address');
    expect(screen.getByTestId('input-wrapper')).toHaveAttribute('data-invalid', 'true');
  });

  it('shows loading indicator', () => {
    render(
      <AddressAutocomplete
        value=""
        onChange={mockOnChange}
        onSelect={mockOnSelect}
        isLoading={true}
      />
    );
    
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('fetches suggestions when typing', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSuggestions),
    });

    render(
      <AddressAutocomplete
        value="123"
        onChange={mockOnChange}
        onSelect={mockOnSelect}
      />
    );

    // Wait for debounced API call
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.mapbox.com/geocoding/v5/mapbox.places/123.json')
      );
    });

    // Verify suggestions are displayed
    const suggestions = screen.getAllByTestId('listbox-item');
    expect(suggestions).toHaveLength(2);
    expect(suggestions[0]).toHaveTextContent('123 Main St');
    expect(suggestions[1]).toHaveTextContent('456 Oak Ave');
  });

  it('handles API errors gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('API Error'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <AddressAutocomplete
        value="error"
        onChange={mockOnChange}
        onSelect={mockOnSelect}
      />
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching address suggestions:',
        expect.any(Error)
      );
    });

    expect(screen.queryByTestId('listbox')).not.toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  it('calls onSelect when suggestion is clicked', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSuggestions),
    });

    render(
      <AddressAutocomplete
        value="123"
        onChange={mockOnChange}
        onSelect={mockOnSelect}
      />
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('listbox-item')).toHaveLength(2);
    });

    fireEvent.click(screen.getAllByTestId('listbox-item')[0]);

    expect(mockOnSelect).toHaveBeenCalledWith(mockSuggestions.features[0]);
    expect(mockOnChange).toHaveBeenCalledWith(mockSuggestions.features[0].place_name);
  });

  it('debounces API calls', async () => {
    jest.useFakeTimers();

    render(
      <AddressAutocomplete
        value="test"
        onChange={mockOnChange}
        onSelect={mockOnSelect}
      />
    );

    // Fast typing shouldn't trigger immediate API calls
    expect(mockFetch).not.toHaveBeenCalled();

    // Wait for debounce timeout
    jest.advanceTimersByTime(300);

    expect(mockFetch).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  it('cleans up timeout on unmount', () => {
    jest.useFakeTimers();
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    const { unmount } = render(
      <AddressAutocomplete
        value="test"
        onChange={mockOnChange}
        onSelect={mockOnSelect}
      />
    );

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();

    jest.useRealTimers();
    clearTimeoutSpy.mockRestore();
  });

  it('shows full address details in suggestions', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSuggestions),
    });

    render(
      <AddressAutocomplete
        value="123"
        onChange={mockOnChange}
        onSelect={mockOnSelect}
      />
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('listbox-item')).toHaveLength(2);
    });

    const suggestions = screen.getAllByTestId('listbox-item');
    expect(suggestions[0]).toHaveTextContent('123 Main St, City, State, 12345');
    expect(suggestions[1]).toHaveTextContent('456 Oak Ave, Town, State, 67890');
  });

  it('applies correct styling to suggestions list', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSuggestions),
    });

    render(
      <AddressAutocomplete
        value="123"
        onChange={mockOnChange}
        onSelect={mockOnSelect}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('listbox')).toBeInTheDocument();
    });

    const listbox = screen.getByTestId('listbox');
    expect(listbox).toHaveClass('p-0 gap-0 divide-y divide-default-100 max-h-[240px] overflow-y-auto');
  });
});