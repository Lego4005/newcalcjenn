import { useState } from 'react';
import type { CalculatorDefaults } from '@/types/calculator';
import type { Property, TransactionDetails } from '@/types/property';
import { saveProperty, saveTransaction } from '@/lib/storage';
import { generateUniqueId } from '@/lib/utils';

interface PropertyWizardProps {
  initialProperty?: Partial<Property>;
  calculatorDefaults?: CalculatorDefaults;
  onComplete?: (property: Property) => void;
}

export function PropertyWizard({ initialProperty, calculatorDefaults, onComplete }: PropertyWizardProps) {
  const [error, setError] = useState<string>('');
  const [selectedProperty, setSelectedProperty] = useState<Property>(() => {
    if (initialProperty) {
      return {
        ...initialProperty,
        id: initialProperty.id || generateUniqueId(),
        status: initialProperty.status || 'Active',
        images: initialProperty.images || []
      } as Property;
    }
    return {
      id: generateUniqueId(),
      address: '',
      price: 0,
      beds: 0,
      baths: 0,
      sqft: 0,
      yearBuilt: 0,
      lotSize: 0,
      propertyType: 'Single Family',
      status: 'Active',
      images: []
    };
  });

  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails>({
    salePrice: selectedProperty.price,
    mortgageBalance: 0,
    annualTaxes: 0,
    propertyTax: 0,
    insurance: 0,
    hoaFees: 0,
    hoaEstoppelFee: 0,
    buyerAgentCommission: calculatorDefaults?.defaultBuyerAgentCommission || 3,
    sellerAgentCommission: calculatorDefaults?.defaultSellerAgentCommission || 3,
    closingDate: new Date().toISOString().split('T')[0],
    hasHOA: false,
    settlementFee: calculatorDefaults?.defaultSettlementFee || 595,
    titleSearch: calculatorDefaults?.defaultTitleSearch || 150,
    municipalLienSearch: calculatorDefaults?.defaultMunicipalLienSearch || 150,
    docStamps: 0,
    titleInsurance: 0,
    hasPriorTitlePolicy: false,
    priorTitleAmount: 0,
    escrowFee: 595,
    titleFee: 175,
    sellerCredits: 0,
    repairCosts: 0,
    customCosts: 0
  });

  const handleCalculatorDefaultsChange = (defaults: CalculatorDefaults) => {
    setTransactionDetails(prev => ({
      ...prev,
      buyerAgentCommission: defaults.defaultBuyerAgentCommission,
      sellerAgentCommission: defaults.defaultSellerAgentCommission,
      settlementFee: defaults.defaultSettlementFee,
      titleSearch: defaults.defaultTitleSearch,
      municipalLienSearch: defaults.defaultMunicipalLienSearch
    }));
  };

  const handlePropertyUpdate = (field: keyof Property, value: string | number) => {
    setSelectedProperty(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!selectedProperty.id) {
      setError('Property ID is required');
      return;
    }

    try {
      const savedProperty = await saveProperty({
        ...selectedProperty,
        status: 'Active'
      });

      if (savedProperty) {
        await saveTransaction(savedProperty.id, {
          ...transactionDetails,
          closingDate: transactionDetails.closingDate || new Date().toISOString().split('T')[0]
        });
        onComplete?.(savedProperty);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="property-wizard">
      {error && <div className="error-message">{error}</div>}
      <div className="wizard-step">
        <input
          type="text"
          value={selectedProperty.address}
          onChange={(e) => handlePropertyUpdate('address', e.target.value)}
          placeholder="Enter property address"
        />
      </div>
      
      {calculatorDefaults && (
        <div className="calculator-defaults">
          <h3>Calculator Defaults</h3>
          <div className="defaults-grid">
            <div className="default-item">
              <label>Buyer Agent Commission (%)</label>
              <input
                type="number"
                value={calculatorDefaults.defaultBuyerAgentCommission}
                onChange={(e) => handleCalculatorDefaultsChange({
                  ...calculatorDefaults,
                  defaultBuyerAgentCommission: parseFloat(e.target.value)
                })}
              />
            </div>
            <div className="default-item">
              <label>Seller Agent Commission (%)</label>
              <input
                type="number"
                value={calculatorDefaults.defaultSellerAgentCommission}
                onChange={(e) => handleCalculatorDefaultsChange({
                  ...calculatorDefaults,
                  defaultSellerAgentCommission: parseFloat(e.target.value)
                })}
              />
            </div>
            <div className="default-item">
              <label>Settlement Fee ($)</label>
              <input
                type="number"
                value={calculatorDefaults.defaultSettlementFee}
                onChange={(e) => handleCalculatorDefaultsChange({
                  ...calculatorDefaults,
                  defaultSettlementFee: parseFloat(e.target.value)
                })}
              />
            </div>
          </div>
        </div>
      )}

      <div className="wizard-controls">
        <button 
          type="button" 
          onClick={handleSubmit}
          className="submit-button"
        >
          Save Property
        </button>
      </div>
    </div>
  );
} 