import React, { useState } from 'react';
import { Input, Button } from '@heroui/react';
import { Search } from 'lucide-react';

interface AddressSearchBarProps {
  onSearch: (address: string) => void;
  isLoading?: boolean; 
}

export default function AddressSearchBar({ onSearch, isLoading }: AddressSearchBarProps) {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      onSearch(address.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-lg">
      <Input
        aria-label="Search Address"
        placeholder="Enter property address (e.g., 123 Main St, City, ST)"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        disabled={isLoading}
        fullWidth
        isClearable
        onClear={() => setAddress('')}
      />
      <Button 
        type="submit" 
        color="primary" 
        isIconOnly 
        aria-label="Search"
        isLoading={isLoading}
      >
        {!isLoading && <Search className="w-5 h-5" />}
      </Button>
    </form>
  );
} 