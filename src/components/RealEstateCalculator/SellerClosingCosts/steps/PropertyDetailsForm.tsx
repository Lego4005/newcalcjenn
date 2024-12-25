import { Input } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import type { CalculatorFormData } from '../SellerClosingCalculator';

type PropertyDetailsFormProps = {
  data: CalculatorFormData['propertyDetails'];
  onUpdate: (data: Partial<CalculatorFormData['propertyDetails']>) => void;
};

export default function PropertyDetailsForm({ data, onUpdate }: PropertyDetailsFormProps) {
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
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, address: 'Address is required' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, address: '' }));
    return true;
  };

  const validatePurchaseDate = (value: string) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      setErrors((prev) => ({ ...prev, purchaseDate: 'Please enter a valid date' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, purchaseDate: '' }));
    return true;
  };

  const handleSalePriceChange = (value: string) => {
    if (validateSalePrice(value)) {
      onUpdate({ salePrice: parseFloat(value) });
    }
  };

  const handleAddressChange = (value: string) => {
    if (validateAddress(value)) {
      onUpdate({ address: value });
    }
  };

  const handlePurchaseDateChange = (value: string) => {
    if (validatePurchaseDate(value)) {
      onUpdate({ purchaseDate: value });
    }
  };

  // Validate initial data
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
          Please enter the basic information about the property you're selling.
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
        endContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">.00</span>
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