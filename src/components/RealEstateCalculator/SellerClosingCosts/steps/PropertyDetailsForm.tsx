import { Input } from "@heroui/react";
import { useState, useEffect } from 'react';
import type { CalculatorFormData } from '../SellerClosingCalculator';

// Define default values for property details
const defaultPropertyDetails: CalculatorFormData['propertyDetails'] = {
  salePrice: 0,
  address: '',
  purchaseDate: '', // Use empty string or a default date format if needed
};

type PropertyDetailsFormProps = {
  // Allow data to be potentially null or undefined
  data: Partial<CalculatorFormData['propertyDetails']> | null | undefined;
  onUpdate: (data: Partial<CalculatorFormData['propertyDetails']>) => void;
};

export default function PropertyDetailsForm({ data: initialData, onUpdate }: PropertyDetailsFormProps) {
  // Merge initialData with defaults
  const data = { ...defaultPropertyDetails, ...(initialData || {}) };

  const [errors, setErrors] = useState({
    salePrice: '',
    address: '',
    purchaseDate: '',
  });

  const validateSalePrice = (value: string) => {
    const price = parseFloat(value);
    if (isNaN(price) || price <= 0) {
      setErrors((prev) => ({ ...prev, salePrice: 'Please enter a valid sale price' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, salePrice: '' }));
    return true;
  };

  const validateAddress = (value: string) => {
    if (!value || !value.trim()) {
      setErrors((prev) => ({ ...prev, address: 'Address is required' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, address: '' }));
    return true;
  };

  const validatePurchaseDate = (value: string) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, purchaseDate: 'Please enter a valid date' }));
      return false;
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      setErrors((prev) => ({ ...prev, purchaseDate: 'Please enter a valid date' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, purchaseDate: '' }));
    return true;
  };

  const handleSalePriceChange = (value: string) => {
    const price = parseFloat(value);
    if (validateSalePrice(value)) {
      onUpdate({ salePrice: price });
    } else {
      onUpdate({ salePrice: 0 });
    }
  };

  const handleAddressChange = (value: string) => {
    onUpdate({ address: value });
    validateAddress(value);
  };

  const handlePurchaseDateChange = (value: string) => {
    onUpdate({ purchaseDate: value });
    validatePurchaseDate(value);
  };

  // Validate initial data - now safe due to defaults
  useEffect(() => {
    validateSalePrice(data.salePrice.toString());
    validateAddress(data.address);
    validatePurchaseDate(data.purchaseDate);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Property Details</h3>
        <p className="text-gray-600 mb-6">
          Please enter the basic information about the property you&apos;re selling.
        </p>
      </div>

      <Input
        type="number"
        label="Sale Price"
        placeholder="Enter the sale price"
        value={data.salePrice.toString()}
        onValueChange={handleSalePriceChange}
        errorMessage={errors.salePrice}
        isInvalid={!!errors.salePrice}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
      />

      <Input
        type="text"
        label="Property Address"
        placeholder="Enter the property address"
        value={data.address}
        onValueChange={handleAddressChange}
        errorMessage={errors.address}
        isInvalid={!!errors.address}
      />

      <Input
        type="date"
        label="Purchase Date"
        placeholder="Select purchase date"
        value={data.purchaseDate}
        onValueChange={handlePurchaseDateChange}
        errorMessage={errors.purchaseDate}
        isInvalid={!!errors.purchaseDate}
      />
    </div>
  );
} 