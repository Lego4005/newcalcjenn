'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, Button, Input } from "@heroui/react";
import { getCalculatorDefaults, updateCalculatorDefaults } from '@/lib/calculator';
import type { CalculatorDefaults } from '@/types/calculator';
import NumericInput from '@/components/common/NumericInput';

export default function CalculatorDefaultsPage() {
  const [defaults, setDefaults] = useState<CalculatorDefaults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadDefaults();
  }, []);

  async function loadDefaults() {
    setIsLoading(true);
    try {
      const data = await getCalculatorDefaults();
      setDefaults(data);
    } catch (error) {
      console.error('Error loading calculator defaults:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    if (!defaults) return;
    
    setIsSaving(true);
    try {
      await updateCalculatorDefaults(defaults);
    } catch (error) {
      console.error('Error saving calculator defaults:', error);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading || !defaults) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardBody className="p-6">
          <h1 className="text-2xl font-bold mb-6">Calculator Default Settings</h1>
          
          <div className="space-y-8">
            {/* Variable Costs */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Variable Costs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumericInput
                  label="Default Buyer Agent Commission"
                  value={defaults.defaultBuyerAgentCommission}
                  onChange={(value) => setDefaults({ ...defaults, defaultBuyerAgentCommission: value })}
                  suffix="%"
                  prefix=""
                  tooltip="Default commission rate for buyer's agent"
                />
                <NumericInput
                  label="Default Seller Agent Commission"
                  value={defaults.defaultSellerAgentCommission}
                  onChange={(value) => setDefaults({ ...defaults, defaultSellerAgentCommission: value })}
                  suffix="%"
                  prefix=""
                  tooltip="Default commission rate for seller's agent"
                />
              </div>
            </div>

            {/* Fixed Costs */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Fixed Costs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumericInput
                  label="Settlement Fee"
                  value={defaults.defaultSettlementFee}
                  onChange={(value) => setDefaults({ ...defaults, defaultSettlementFee: value })}
                  tooltip="Default settlement/closing fee"
                />
                <NumericInput
                  label="Title Search"
                  value={defaults.defaultTitleSearch}
                  onChange={(value) => setDefaults({ ...defaults, defaultTitleSearch: value })}
                  tooltip="Default title search fee"
                />
                <NumericInput
                  label="Municipal Lien Search"
                  value={defaults.defaultMunicipalLienSearch}
                  onChange={(value) => setDefaults({ ...defaults, defaultMunicipalLienSearch: value })}
                  tooltip="Default municipal lien search fee"
                />
                <NumericInput
                  label="Doc Stamp Rate"
                  value={defaults.defaultDocStampRate}
                  onChange={(value) => setDefaults({ ...defaults, defaultDocStampRate: value })}
                  tooltip="Documentary stamp rate per $100"
                  prefix="$"
                />
              </div>
            </div>

            {/* Title Insurance Rates */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Title Insurance Rates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumericInput
                  label="Base Rate (up to $100k)"
                  value={defaults.titleInsuranceBaseRate}
                  onChange={(value) => setDefaults({ ...defaults, titleInsuranceBaseRate: value })}
                  tooltip="Rate per $1,000 up to $100,000"
                  prefix="$"
                />
                <NumericInput
                  label="Excess Rate ($100k-$1M)"
                  value={defaults.titleInsuranceExcessRate}
                  onChange={(value) => setDefaults({ ...defaults, titleInsuranceExcessRate: value })}
                  tooltip="Rate per $1,000 between $100,000 and $1 million"
                  prefix="$"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-8">
              <Button
                color="primary"
                onPress={handleSave}
                isLoading={isSaving}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 