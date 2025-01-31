import { Card, CardBody, Chip } from "@heroui/react";
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Property } from '@/types/property';
import { formatCurrency } from '@/utils/formatters';

type PropertyKPIsProps = Readonly<{
  property: Property;
}>;

type KPICard = Readonly<{
  id: string;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  timeframe: string;
}>;

function calculatePricePerSqft(price: number, sqft: number): string {
  if (!sqft || sqft <= 0) return '$0';
  return formatCurrency(price / sqft);
}

function calculateMarketValue(property: Property): string {
  const { price, transactionDetails } = property;
  
  // Use transaction price if available, otherwise use property price
  const basePrice = transactionDetails?.salePrice ?? price;
  
  // Apply market adjustment based on property details
  const marketAdjustment = 0.93; // 7% below list price (market average)
  return formatCurrency(basePrice * marketAdjustment);
}

function calculateDaysOnMarket(property: Property): string {
  if (!property.source?.fetchDate) return 'N/A';
  
  const listedDate = new Date(property.source.fetchDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - listedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays.toString();
}

function calculatePriceChange(property: Property): number {
  // In a real implementation, this would use historical price data
  // For now, using a placeholder calculation
  const basePrice = property.transactionDetails?.salePrice ?? property.price;
  const previousPrice = basePrice * 0.95; // Assume 5% lower last month
  return Number(((basePrice - previousPrice) / previousPrice * 100).toFixed(1));
}

function calculateMarketValueChange(property: Property): number {
  // In a real implementation, this would use market trend data
  // For now, using a placeholder calculation
  const currentValue = Number(calculateMarketValue(property).replace(/[^0-9.-]+/g, ''));
  const previousValue = currentValue * 0.97; // Assume 3% lower last quarter
  return Number(((currentValue - previousValue) / previousValue * 100).toFixed(1));
}

function calculateDaysOnMarketChange(daysOnMarket: string): number {
  // In a real implementation, this would compare to market average
  // For now, using a placeholder calculation
  const avgDaysOnMarket = 20; // Market average
  const currentDays = Number(daysOnMarket);
  if (isNaN(currentDays) || daysOnMarket === 'N/A') return 0;
  
  return Number((((avgDaysOnMarket - currentDays) / avgDaysOnMarket) * 100).toFixed(1));
}

const PropertyKPIs = ({ property }: PropertyKPIsProps) => {
  const pricePerSqft = calculatePricePerSqft(property.price, property.sqft);
  const marketValue = calculateMarketValue(property);
  const daysOnMarket = calculateDaysOnMarket(property);

  const priceChange = calculatePriceChange(property);
  const marketValueChange = calculateMarketValueChange(property);
  const daysChange = calculateDaysOnMarketChange(daysOnMarket);

  const kpis: KPICard[] = [
    {
      id: 'price-per-sqft',
      title: 'Price per Sqft',
      value: pricePerSqft,
      change: priceChange,
      trend: priceChange >= 0 ? 'up' : 'down',
      timeframe: 'vs last month',
    },
    {
      id: 'market-value',
      title: 'Market Value',
      value: marketValue,
      change: marketValueChange,
      trend: marketValueChange >= 0 ? 'up' : 'down',
      timeframe: 'vs last quarter',
    },
    {
      id: 'days-on-market',
      title: 'Days on Market',
      value: daysOnMarket,
      change: Math.abs(daysChange),
      trend: daysChange >= 0 ? 'down' : 'up', // Lower days on market is better
      timeframe: 'vs avg',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="kpi-grid">
      {kpis.map((kpi) => (
        <Card key={kpi.id} className="w-full">
          <CardBody className="flex flex-row items-center justify-between py-4">
            <div className="space-y-1">
              <p className="text-small text-default-500">{kpi.title}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold">{kpi.value}</span>
                <Chip
                  size="sm"
                  color={kpi.trend === 'up' ? 'success' : 'danger'}
                  startContent={
                    kpi.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )
                  }
                >
                  {kpi.change}%
                </Chip>
              </div>
              <p className="text-tiny text-default-400">{kpi.timeframe}</p>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default PropertyKPIs;