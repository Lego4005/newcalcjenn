'use client'

import { useState, useCallback, useTransition, useRef } from 'react'
import { DollarSign, Plus } from 'lucide-react'
import { 
  Button,
  Card,
  CardBody,
  CardHeader,
  Progress,
  Alert
} from '@heroui/react'
import { BatchOperationsManager } from './BatchOperationsManager'
import { PropertyCard } from './PropertyCard'
import { calculatePropertyMetrics } from '@/lib/metrics'

export interface Property {
  id: string
  address: string
  formData: {
    purchasePrice: number
    downPayment: number
    interestRate: number
    propertyTax: number
    insurance: number
    listingAgentRate: number
    buyerAgentRate: number
    settlementFee: number
    titleSearch: number
    municipalLienSearch: number
    docStamps: number
    titleInsurance: number
    hasPriorTitlePolicy: boolean
    priorTitleAmount: number
    taxProrations: number
    hoaDues: number
    hoaEstoppelFee: number
    costResponsibility: {
      settlementFee: 'seller' | 'buyer'
      titleSearch: 'seller' | 'buyer'
      municipalLienSearch: 'seller' | 'buyer'
      titleInsurance: 'seller' | 'buyer'
      docStamps: 'seller' | 'buyer'
    }
  }
}

const defaultProperty = {
  purchasePrice: 450000,
  downPayment: 90000,
  interestRate: 4.5,
  propertyTax: 4200,
  insurance: 1200,
  listingAgentRate: 3.0,
  buyerAgentRate: 3.0,
  settlementFee: 595,
  titleSearch: 150,
  municipalLienSearch: 150,
  docStamps: 0,
  titleInsurance: 0,
  hasPriorTitlePolicy: false,
  priorTitleAmount: 0,
  taxProrations: 0,
  hoaDues: 0,
  hoaEstoppelFee: 0,
  costResponsibility: {
    settlementFee: 'seller',
    titleSearch: 'seller',
    municipalLienSearch: 'seller',
    titleInsurance: 'seller',
    docStamps: 'seller'
  } as const
}

export function BulkCalculator() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [savedTemplate, setSavedTemplate] = useState<Partial<Property['formData']> | null>(null);
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      address: 'Property 1',
      formData: { ...defaultProperty }
    }
  ]);

  const handleImport = (importedProperties: Property[]) => {
    setProperties(importedProperties);
  };

  const handleSaveTemplate = (template: Partial<Property['formData']>) => {
    setSavedTemplate(template);
  };

  const handleLoadTemplate = () => {
    return savedTemplate || defaultProperty;
  };

  const addProperty = () => {
    const newId = (properties.length + 1).toString()
    setProperties([
      ...properties,
      {
        id: newId,
        address: `Property ${newId}`,
        formData: { ...defaultProperty }
      }
    ])
  }

  const removeProperty = (id: string) => {
    setProperties(properties.filter(p => p.id !== id))
  }

  const updateProperty = useCallback((id: string, field: keyof Property['formData'], value: number) => {
    setProperties(properties.map(p => {
      if (p.id === id) {
        return {
          ...p,
          formData: {
            ...p.formData,
            [field]: value
          }
        }
      }
      return p
    }))
  }, [properties])

  const cancelCalculation = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setProgress(0);
      setError(null);
    }
  };

  const calculateAll = useCallback(async () => {
    try {
      setError(null);
      setProgress(0);
      
      // Update progress for calculations
      const progressStep = 50 / properties.length;
      setProgress(0);

      // Calculate metrics sequentially to show progress
      const metrics = await Promise.all(properties.map(async (property, index) => {
          const result = await calculatePropertyMetrics(property);
          // Update progress after each calculation
          setProgress(prevProgress => {
            const calculationProgress = Math.min(50, (index + 1) * progressStep);
            return Math.max(prevProgress, Math.round(calculationProgress));
          });
          return result;
        })
      );
      
      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      setProgress(50); // Calculations complete, starting save

      // Send to batch API
      const response = await fetch('/dashboard/calculator/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: properties.map((property, index) => ({
            ...property,
            metrics: metrics[index]
          }))
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        const error = await response.json() as { message?: string };
        throw new Error(error.message ?? 'Failed to save calculations');
      }

      const result = await response.json();
      setProgress(100);
      return result;
      
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        setError('Calculation cancelled');
        return;
      }
      const message = error instanceof Error ? error.message : 'An error occurred';
      setError(message);
    }
    setProgress(0);
  }, [properties]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <BatchOperationsManager
        onImport={handleImport}
        onSaveTemplate={handleSaveTemplate}
        onLoadTemplate={handleLoadTemplate}
        properties={properties}
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Bulk Property Analysis</h2>
          </div>
          <Button
            variant="flat"
            startContent={<Plus className="w-4 h-4" />}
            onPress={addProperty}
          >
            Add Property
          </Button>
        </CardHeader>

        <CardBody>
          <div className="space-y-8">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onRemove={removeProperty}
                onUpdate={updateProperty}
                showRemove={properties.length > 1}
              />
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            {isPending && progress > 0 && (
              <div className="flex items-center gap-2">
                <Progress
                  size="sm"
                  value={progress}
                  className="w-24"
                  color="primary"
                />
                <span className="text-sm text-default-500">{progress}%</span>
              </div>
            )}
            <Button
              variant="flat"
              color="primary"
              disabled={isPending}
              onPress={() => startTransition(() => calculateAll())}
            >
              {isPending ? 'Processing...' : 'Calculate All Properties'}
            </Button>
            <Button 
              variant="light" 
              disabled={!isPending} 
              onPress={cancelCalculation}
            >
              Cancel
            </Button>
          </div>

          {error && (
            <Alert className="mt-4" color="danger">
              {error}
            </Alert>
          )}
        </CardBody>
      </Card>
    </div>
  );
}