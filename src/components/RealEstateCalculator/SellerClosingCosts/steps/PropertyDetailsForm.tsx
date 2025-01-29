import { useState } from 'react';
import { Input, Chip, Tooltip, Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { DollarSign, Calendar, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyDetailsFormProps {
  data: {
    salePrice: number;
    purchaseDate: string;
  };
  onUpdate: (data: Partial<PropertyDetailsFormProps['data']>) => void;
}

export default function PropertyDetailsForm({ data, onUpdate }: PropertyDetailsFormProps) {
  const [errors, setErrors] = useState({
    salePrice: '',
    purchaseDate: '',
  });

  const [inputSources, setInputSources] = useState({
    salePrice: 'User',
    purchaseDate: 'User'
  });

  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = new Date(data.purchaseDate);
    return isNaN(date.getTime()) ? new Date() : date;
  });

  const [isMonthSelector, setIsMonthSelector] = useState(false);
  const [tempSalePrice, setTempSalePrice] = useState(data.salePrice.toString());

  const formatNumber = (value: number) => {
    if (!value && value !== 0) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const validateSalePrice = (value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9]/g, ''));
    if (isNaN(numericValue) || numericValue < 0) {
      setErrors((prev) => ({ ...prev, salePrice: 'Please enter a valid sale price' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, salePrice: '' }));
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
    // Remove all non-numeric characters
    const cleanValue = value.replace(/[^0-9]/g, '');
    setTempSalePrice(cleanValue);
    
    if (cleanValue === '') {
      onUpdate({ salePrice: 0 });
      return;
    }
    
    const numericValue = parseInt(cleanValue, 10);
    if (validateSalePrice(numericValue.toString())) {
      setInputSources(prev => ({ ...prev, salePrice: 'User' }));
      onUpdate({ salePrice: numericValue });
    }
  };

  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    if (validatePurchaseDate(dateStr)) {
      setInputSources(prev => ({ ...prev, purchaseDate: 'User' }));
      onUpdate({ purchaseDate: dateStr });
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add empty slots for days before the first of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), monthIndex));
    setIsMonthSelector(false);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Property Details</h3>
        <p className="text-gray-600 mb-6">
          Please enter the sale price and expected closing date.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-success" />
          <span className="font-medium">Sale Price</span>
          <Tooltip content="The agreed-upon sale price of the property">
            <Info className="w-4 h-4 text-default-400 cursor-help" />
          </Tooltip>
        </div>
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button
              variant="bordered"
              className="w-full justify-start text-left font-normal"
              startContent={<DollarSign className="w-4 h-4" />}
            >
              {formatNumber(data.salePrice)}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4 w-[300px]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Enter Sale Price</label>
                  <Input
                    type="text"
                    placeholder="Enter amount"
                    value={tempSalePrice}
                    onValueChange={handleSalePriceChange}
                    size="lg"
                    variant="bordered"
                    startContent={<span className="text-default-400">$</span>}
                    className="text-lg"
                  />
                </div>
                <div className="text-center text-xl font-semibold">
                  {formatNumber(parseInt(tempSalePrice || '0', 10))}
                </div>
                {errors.salePrice && (
                  <div className="text-danger text-sm">{errors.salePrice}</div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Chip size="sm" variant="flat" color="primary">Source: {inputSources.salePrice}</Chip>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5 text-warning" />
          <span className="font-medium">Closing Date</span>
          <Tooltip content="The expected date of closing for this transaction">
            <Info className="w-4 h-4 text-default-400 cursor-help" />
          </Tooltip>
        </div>
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button
              variant="bordered"
              className="w-full justify-start text-left font-normal"
              startContent={<Calendar className="w-4 h-4" />}
            >
              {formatDate(data.purchaseDate)}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4 w-[300px]">
              <div className="flex items-center justify-between mb-4">
                <Button
                  isIconOnly
                  variant="light"
                  onPress={prevMonth}
                  startContent={<ChevronLeft className="w-4 h-4" />}
                />
                <Button
                  variant="light"
                  onPress={() => setIsMonthSelector(!isMonthSelector)}
                  className="font-semibold"
                >
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </Button>
                <Button
                  isIconOnly
                  variant="light"
                  onPress={nextMonth}
                  startContent={<ChevronRight className="w-4 h-4" />}
                />
              </div>
              
              {isMonthSelector ? (
                <div className="grid grid-cols-3 gap-2">
                  {months.map((month, index) => (
                    <Button
                      key={month}
                      size="sm"
                      variant={currentMonth.getMonth() === index ? 'solid' : 'light'}
                      onPress={() => handleMonthSelect(index)}
                      className="w-full"
                    >
                      {month.slice(0, 3)}
                    </Button>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="text-small text-default-500">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentMonth).map((date, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant={date?.toISOString().split('T')[0] === data.purchaseDate ? 'solid' : 'light'}
                        className={`min-w-0 w-9 h-9 p-0 ${!date ? 'invisible' : ''}`}
                        onPress={() => date && handleDateSelect(date)}
                        isDisabled={!date}
                      >
                        {date?.getDate()}
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </PopoverContent>
        </Popover>
        <Chip size="sm" variant="flat" color="primary">Source: {inputSources.purchaseDate}</Chip>
      </div>
    </div>
  );
} 