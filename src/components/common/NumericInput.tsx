import { Input, InputProps } from "@nextui-org/react";

interface NumericInputProps extends Omit<InputProps, 'onChange'> {
  value: number;
  onChange: (value: string) => void;
  isPercentage?: boolean;
}

export default function NumericInput({ value, onChange, isPercentage, startContent, ...props }: NumericInputProps) {
  // Format number for display
  const formatValue = (num: number) => {
    if (isPercentage) {
      return num.toString();
    }
    return startContent ? num.toLocaleString() : num.toString();
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    onChange(value);
  };

  return (
    <Input
      value={formatValue(value)}
      onChange={handleChange}
      startContent={!isPercentage ? startContent : null}
      {...props}
    />
  );
} 