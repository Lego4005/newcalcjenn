import { useState, useEffect, useRef } from 'react';
import { Input, Listbox, ListboxItem } from '@nextui-org/react';
import { MapPin } from 'lucide-react';

type AddressFeature = {
  place_name: string;
  center: [number, number];
  properties: {
    address?: string;
    postcode?: string;
    city?: string;
    state?: string;
  };
};

type AddressAutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (feature: AddressFeature) => void;
  error?: string;
  isLoading?: boolean;
};

export default function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  error,
  isLoading
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
        new URLSearchParams({
          access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
          country: 'US',
          types: 'address',
          limit: '5',
        })
      );

      if (!response.ok) throw new Error('Failed to fetch suggestions');

      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value) {
      timeoutRef.current = setTimeout(() => {
        fetchSuggestions(value);
      }, 300);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  const handleSelect = (feature: AddressFeature) => {
    onChange(feature.place_name);
    onSelect(feature);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <Input
        label="Property Address"
        placeholder="Enter property address"
        value={value}
        onValueChange={(val) => {
          onChange(val);
          setShowSuggestions(true);
        }}
        description="Start typing to see suggestions"
        errorMessage={error}
        isInvalid={!!error}
        isLoading={isLoading}
        startContent={<MapPin className="w-4 h-4 text-default-400" />}
        onFocus={() => setShowSuggestions(true)}
        classNames={{
          base: "w-full",
          mainWrapper: "w-full",
          inputWrapper: "w-full",
        }}
      />

      {showSuggestions && suggestions.length > 0 && (
        <div 
          className="absolute left-0 right-0 top-[100%] mt-2"
          style={{ zIndex: 100000 }}
        >
          <div className="bg-content1 border border-default-100 rounded-medium shadow-large overflow-hidden">
            <Listbox
              aria-label="Address suggestions"
              className="p-0 gap-0 divide-y divide-default-100 max-h-[240px] overflow-y-auto"
              itemClasses={{
                base: [
                  "px-3 first:rounded-t-medium last:rounded-b-medium",
                  "data-[hover=true]:bg-default-100",
                  "cursor-pointer",
                ].join(" "),
              }}
              style={{ zIndex: 100000 }}
            >
              {suggestions.map((feature, index) => (
                <ListboxItem
                  key={index}
                  onPress={() => handleSelect(feature)}
                  className="py-2 px-3"
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-default-400 mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate">{feature.place_name}</div>
                      {feature.properties.address && (
                        <div className="text-small text-default-400 truncate">
                          {[
                            feature.properties.address,
                            feature.properties.city,
                            feature.properties.state,
                            feature.properties.postcode,
                          ]
                            .filter(Boolean)
                            .join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </ListboxItem>
              ))}
            </Listbox>
          </div>
        </div>
      )}
    </div>
  );
} 