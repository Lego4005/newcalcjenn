'use client'

import { useState, useEffect } from 'react'
import { Input, Spinner } from '@nextui-org/react'

interface AddressAutocompleteProps {
  onAddressSelect: (address: string) => void
  placeholder?: string
  label?: string
}

interface Suggestion {
  id: string
  place_name: string
  text: string
}

interface MapboxFeature {
  id: string
  place_name: string
  text: string
  properties: Record<string, unknown>
  geometry: {
    type: string
    coordinates: [number, number]
  }
}

export function AddressAutocomplete({
  onAddressSelect,
  placeholder = 'Enter an address',
  label = 'Address'
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query || query.length < 3) {
        setSuggestions([])
        return
      }

      setIsLoading(true)
      try {
        const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${accessToken}&country=us&types=address&limit=5`

        const response = await fetch(endpoint)
        const data = await response.json()

        if (data.features) {
          setSuggestions(
            data.features.map((feature: MapboxFeature) => ({
              id: feature.id,
              place_name: feature.place_name,
              text: feature.text
            }))
          )
          setShowSuggestions(true)
        }
      } catch (error) {
        console.error('Error fetching address suggestions:', error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  const handleSelectAddress = (suggestion: Suggestion) => {
    setQuery(suggestion.place_name)
    setSuggestions([])
    setShowSuggestions(false)
    onAddressSelect(suggestion.place_name)
  }

  return (
    <div className="relative">
      <Input
        label={label}
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        endContent={isLoading && <Spinner size="sm" />}
        className="w-full"
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handleSelectAddress(suggestion)}
              >
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}