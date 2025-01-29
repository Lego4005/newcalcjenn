import { Card, CardBody } from "@heroui/react";
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Property } from './PropertyDashboard';

type PropertyKPIsProps = {
  property: Property;
};

type KPICard = {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  timeframe: string;
};

export default function PropertyKPIs({ property }: PropertyKPIsProps) {
  // Mock KPI data - replace with real calculations
  const kpis: KPICard[] = [
    {
      title: 'Price per Sqft',
      value: `$${Math.round(property.price / property.sqft)}`,
      change: 5.2,
      trend: 'up',
      timeframe: 'vs last month',
    },
    {
      title: 'Market Value',
      value: '$465,000',
      change: 3.1,
      trend: 'up',
      timeframe: 'vs last quarter',
    },
    {
      title: 'Days on Market',
      value: '15',
      change: 25,
      trend: 'down',
      timeframe: 'vs avg',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {kpis.map((kpi, index) => (
        <Card key={index} className="w-full">
          <CardBody className="flex flex-row items-center justify-between py-4">
            <div className="space-y-1">
              <p className="text-small text-default-500">{kpi.title}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold">{kpi.value}</span>
                <div
                  className={`flex items-center gap-1 text-small ${
                    kpi.trend === 'up' ? 'text-success' : 'text-danger'
                  }`}
                >
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{kpi.change}%</span>
                </div>
              </div>
              <p className="text-tiny text-default-400">{kpi.timeframe}</p>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
} 