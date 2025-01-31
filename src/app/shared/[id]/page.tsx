'use client';

import { useEffect, useState } from 'react';
import { DonutChart } from '@/components/charts/DonutChart';
import { Button } from '@heroui/react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface SharedCalculation {
  name: string;
  property_details: {
    salePrice: number;
    purchaseDate: string;
  };
  commission_structure: {
    listingAgentRate: number;
    buyerAgentRate: number;
  };
  mortgage_info: {
    costs: Array<{
      label: string;
      amount: number;
      type: string;
      source: string;
      tooltip?: string;
      formula?: string;
    }>;
    totalClosingCosts: number;
    netProceeds: number;
  };
}

export default function SharedCalculationPage({
  params,
}: {
  readonly params: { readonly id: string };
}) {
  const [calculation, setCalculation] = useState<SharedCalculation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalculation = async () => {
      try {
        const response = await fetch(`/api/shared/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch shared calculation');
        }
        const data = await response.json();
        setCalculation(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load calculation');
      } finally {
        setLoading(false);
      }
    };

    fetchCalculation();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error ?? !calculation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-xl font-semibold text-danger">
          {error ?? 'Calculation not found'}
        </h1>
        <Link href="/">
          <Button
            variant="flat"
            startContent={<ArrowLeft className="w-4 h-4" />}
          >
            Return Home
          </Button>
        </Link>
      </div>
    );
  }

  const chartData = calculation.mortgage_info.costs.map(cost => ({
    name: cost.label,
    value: cost.amount
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/">
          <Button
            variant="light"
            startContent={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Calculator
          </Button>
        </Link>
      </div>

      <div className="bg-content1 rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">
          Shared Calculation: {calculation.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Cost Distribution</h2>
            <DonutChart
              data={chartData}
              className="h-64"
              colors={['hsl(var(--primary))', 'hsl(var(--warning))', 'hsl(var(--danger))']}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-content2">
                <div className="text-sm text-default-500">Sale Price</div>
                <div className="text-xl font-semibold">
                  ${calculation.property_details.salePrice.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-content2">
                <div className="text-sm text-default-500">Total Closing Costs</div>
                <div className="text-xl font-semibold">
                  ${calculation.mortgage_info.totalClosingCosts.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-success/10">
                <div className="text-sm text-success">Net Proceeds</div>
                <div className="text-xl font-semibold text-success">
                  ${calculation.mortgage_info.netProceeds.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Detailed Breakdown</h2>
          <div className="space-y-3">
            {calculation.mortgage_info.costs.map((cost) => (
              <div
                key={`cost-${cost.label}`}
                className="flex justify-between items-center p-3 bg-content2/50 rounded-lg"
              >
                <div>
                  <div className="font-medium">{cost.label}</div>
                  {cost.formula && (
                    <div className="text-sm text-default-500">{cost.formula}</div>
                  )}
                </div>
                <div className="font-semibold">${cost.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}