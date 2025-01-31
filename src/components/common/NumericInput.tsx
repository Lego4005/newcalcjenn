import { Input, InputProps } from "@heroui/react";

interface NumericInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  readonly value?: number;
  readonly onChange: (value: string) => void;
  readonly isPercentage?: boolean;
}

export default function NumericInput({ 
  value = 0, 
  onChange, 
  isPercentage = false, 
  startContent, 
  ...props 
}: NumericInputProps) {
  // Format number for display
  const displayValue = (() => {
    try {
      if (typeof value !== 'number') return '0';
      return isPercentage 
        ? value.toFixed(1)
        : value.toLocaleString('en-US', { maximumFractionDigits: 0 });
    } catch {
      return '0';
    }
  })();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    onChange(value);
  };

  const inputStartContent = isPercentage 
    ? <span className="text-default-400">%</span>
    : startContent;

  return (
    <Input
      {...props}
      value={displayValue}
      onChange={handleChange}
      startContent={inputStartContent}
    />
  );
}