import { renderHook, act } from '@testing-library/react';
import { usePropertyUpdates } from '../usePropertyUpdates';
import { supabase } from '@/lib/supabase';
import type { RealtimeChannel, REALTIME_SUBSCRIBE_STATES } from '@supabase/supabase-js';

// Mock Supabase client
jest.mock('@/lib/supabase', () => ({
  supabase: {
    channel: jest.fn()
  }
}));

type MockChannelType = Partial<RealtimeChannel> & {
  on: jest.Mock;
  subscribe: jest.Mock;
  unsubscribe: jest.Mock;
};

const mockProperty = {
  id: '1',
  address: '123 Test St',
  price: 500000,
  beds: 3,
  baths: 2,
  sqft: 2000,
  yearBuilt: 2020,
  lotSize: 5000,
  propertyType: 'Single Family',
  status: 'Active',
  images: []
};

describe('usePropertyUpdates', () => {
  let mockChannel: MockChannelType;
  let mockSubscribe: jest.Mock;
  let mockOn: jest.Mock;
  let mockUnsubscribe: jest.Mock;

  beforeEach(() => {
    mockSubscribe = jest.fn().mockImplementation((callback) => {
      callback('SUBSCRIBED' as REALTIME_SUBSCRIBE_STATES);
      return mockChannel;
    });
    mockOn = jest.fn().mockReturnThis();
    mockUnsubscribe = jest.fn().mockResolvedValue('ok' as const);

    mockChannel = {
      on: mockOn,
      subscribe: mockSubscribe,
      unsubscribe: mockUnsubscribe,
      topic: 'property_updates'
    };

    (supabase.channel as jest.Mock).mockReturnValue(mockChannel);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sets up subscription on mount', () => {
    renderHook(() => usePropertyUpdates());

    expect(supabase.channel).toHaveBeenCalledWith('property_updates');
    expect(mockOn).toHaveBeenCalledWith(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'saved_calculations',
        filter: undefined
      },
      expect.any(Function)
    );
    expect(mockSubscribe).toHaveBeenCalled();
  });

  it('filters by propertyIds when provided', () => {
    const propertyIds = ['1', '2', '3'];
    renderHook(() => usePropertyUpdates({ propertyIds }));

    expect(mockOn).toHaveBeenCalledWith(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'saved_calculations',
        filter: 'id=in.(1,2,3)'
      },
      expect.any(Function)
    );
  });

  it('calls onUpdate callback when update received', () => {
    const onUpdate = jest.fn();
    renderHook(() => usePropertyUpdates({ onUpdate }));

    // Get the callback function passed to mockOn
    const updateCallback = mockOn.mock.calls[0][2];

    // Simulate an update
    act(() => {
      updateCallback({
        new: mockProperty,
        eventType: 'UPDATE'
      });
    });

    expect(onUpdate).toHaveBeenCalledWith({
      property: mockProperty,
      type: 'UPDATE',
      timestamp: expect.any(String)
    });
  });

  it('maintains updates state with latest updates first', () => {
    const { result } = renderHook(() => usePropertyUpdates());
    const updateCallback = mockOn.mock.calls[0][2];

    // Simulate multiple updates
    act(() => {
      updateCallback({
        new: { ...mockProperty, id: '1' },
        eventType: 'INSERT'
      });
      updateCallback({
        new: { ...mockProperty, id: '2' },
        eventType: 'UPDATE'
      });
    });

    expect(result.current.updates).toHaveLength(2);
    expect(result.current.updates[0].property.id).toBe('2');
    expect(result.current.updates[1].property.id).toBe('1');
  });

  it('limits updates array to 50 items', () => {
    const { result } = renderHook(() => usePropertyUpdates());
    const updateCallback = mockOn.mock.calls[0][2];

    // Simulate 51 updates
    act(() => {
      for (let i = 0; i < 51; i++) {
        updateCallback({
          new: { ...mockProperty, id: String(i) },
          eventType: 'UPDATE'
        });
      }
    });

    expect(result.current.updates).toHaveLength(50);
    expect(result.current.updates[0].property.id).toBe('50');
  });

  it('handles subscription errors', () => {
    mockSubscribe.mockImplementation((callback) => {
      callback('CHANNEL_ERROR' as REALTIME_SUBSCRIBE_STATES);
      return mockChannel;
    });

    const { result } = renderHook(() => usePropertyUpdates());

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Failed to subscribe to property updates');
  });

  it('cleans up subscription on unmount', () => {
    const { unmount } = renderHook(() => usePropertyUpdates());

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  it('provides refresh function to manually reset subscription', async () => {
    const { result } = renderHook(() => usePropertyUpdates());

    await act(async () => {
      await result.current.refresh();
    });

    expect(mockUnsubscribe).toHaveBeenCalled();
    expect(result.current.updates).toHaveLength(0);
    expect(result.current.error).toBeNull();
  });
});