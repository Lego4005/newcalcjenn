import { useState, useEffect } from 'react';
import { Card, CardBody, Spinner } from "@heroui/react";
import { motion } from 'framer-motion';
import AddressAutocomplete from '../Dashboard/AddressAutocomplete';
import type { Property, TransactionDetails } from '@/types/property';
import { fetchPropertyDetails } from '@/lib/api';
import type { PropertyData } from '@/types/api';
import { useCollaboration } from '@/hooks/useCollaboration';
import CollaboratorIndicator from './CollaboratorIndicator';
import { saveProperty } from '@/lib/storage';
import NumericInput from '@/components/common/NumericInput';
import { getCalculatorDefaults, calculateTitleInsurance, calculateDocStamps } from '@/lib/calculator';
import type { CalculatorDefaults } from '@/types/calculator';
import { supabase } from '@/lib/supabase';

interface PropertyWizardProps {
  readonly property?: Property;
  readonly onConfirm: (property: Property) => void;
  readonly onCancel: () => void;
}

const steps = [
  {
    id: 1,
    title: 'Property Location',
    description: 'Enter the property address to fetch available data',
    fields: ['address']
  },
  {
    id: 2,
    title: 'Sale Details',
    description: 'Confirm or enter the primary financial information',
    fields: ['salePrice', 'mortgageBalance', 'annualTaxes', 'hoaFees']
  },
  {
    id: 3,
    title: 'Commission & Fees',
    description: 'Enter commission rates and standard fees',
    fields: ['buyerAgentCommission', 'sellerAgentCommission', 'escrowFee', 'titleFee']
  },
  {
    id: 4,
    title: 'Additional Costs',
    description: 'Enter any credits, repairs, or custom costs',
    fields: ['sellerCredits', 'repairCosts', 'customCosts']
  },
  {
    id: 5,
    title: 'Review & Calculate',
    description: 'Review all inputs and see preliminary calculation',
    fields: []
  }
];

const generateUniqueId = () => `property-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

const initialPropertyState: Property = {
  id: generateUniqueId(),
  status: 'Active',
  address: '',
  price: 0,
  beds: 0,
  baths: 0,
  sqft: 0,
  yearBuilt: 0,
  lotSize: 0,
  propertyType: 'Single Family',
  images: [],
  source: {
    name: 'Manual Entry',
    fetchDate: new Date().toISOString()
  }
};

const calculateNetProceeds = (details: TransactionDetails): number => {
  const salePrice = details.salePrice ?? 0;
  const mortgageBalance = details.mortgageBalance ?? 0;
  const buyerCommission = details.buyerAgentCommission ?? 0;
  const sellerCommission = details.sellerAgentCommission ?? 0;
  const escrowFee = details.escrowFee ?? 0;
  const titleFee = details.titleFee ?? 0;
  const sellerCredits = details.sellerCredits ?? 0;
  const repairCosts = details.repairCosts ?? 0;
  const customCosts = details.customCosts ?? 0;

  const totalCommission = (salePrice * (buyerCommission + sellerCommission)) / 100;

  return salePrice - mortgageBalance - totalCommission - escrowFee - titleFee - 
         sellerCredits - repairCosts - customCosts;
};

const getStepStyle = (currentStep: number, stepId: number) => {
  if (currentStep === stepId) return 'bg-white text-primary-900';
  if (currentStep > stepId) return 'bg-success/90 text-white';
  return 'bg-white/20 text-white';
};

export default function PropertyWizard({
  property: initialProperty,
  onConfirm,
  onCancel
}: PropertyWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState<Property>(initialProperty ?? initialPropertyState);
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [propertyDetails, setPropertyDetails] = useState<PropertyData>({
    id: selectedProperty.id,
    status: selectedProperty.status,
    address: selectedProperty.address,
    price: selectedProperty.price,
    beds: selectedProperty.beds,
    baths: selectedProperty.baths,
    sqft: selectedProperty.sqft,
    yearBuilt: selectedProperty.yearBuilt,
    lotSize: selectedProperty.lotSize,
    propertyType: selectedProperty.propertyType,
    images: selectedProperty.images
  });
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails>({
    salePrice: selectedProperty.price,
    mortgageBalance: 0,
    annualTaxes: 0,
    hoaFees: 0,
    buyerAgentCommission: 3.00,
    sellerAgentCommission: 3.00,
    settlementFee: 595,
    titleSearch: 175,
    municipalLienSearch: 175,
    titleInsurance: 0,
    docStamps: 0,
    escrowFee: 595,
    titleFee: 175,
    sellerCredits: 0,
    repairCosts: 0,
    customCosts: 0,
    closingDate: new Date().toISOString().split('T')[0]
  });

  const [isLoading, setIsLoading] = useState(false);
  const { collaborators } = useCollaboration(selectedProperty.id);
  const [calculatorDefaults, setCalculatorDefaults] = useState<CalculatorDefaults | null>(null);

  useEffect(() => {
    async function loadDefaults() {
      const defaults = await getCalculatorDefaults();
      if (!defaults) return;
      
      setCalculatorDefaults(defaults);
      setTransactionDetails(prev => ({
        ...prev,
        buyerAgentCommission: defaults.defaultBuyerAgentCommission ?? prev.buyerAgentCommission,
        sellerAgentCommission: defaults.defaultSellerAgentCommission ?? prev.sellerAgentCommission,
        settlementFee: defaults.defaultSettlementFee ?? prev.settlementFee,
        titleSearch: defaults.defaultTitleSearch ?? prev.titleSearch,
        municipalLienSearch: defaults.defaultMunicipalLienSearch ?? prev.municipalLienSearch
      }));
    }
    
    void loadDefaults();
  }, []);

  useEffect(() => {
    if (!calculatorDefaults || !transactionDetails.salePrice) return;
    
    const titleInsurance = calculateTitleInsurance(
      transactionDetails.salePrice,
      false,
      0,
      calculatorDefaults.titleInsuranceBaseRate,
      calculatorDefaults.titleInsuranceExcessRate
    );
    
    const docStamps = calculateDocStamps(
      transactionDetails.salePrice,
      calculatorDefaults.defaultDocStampRate
    );
    
    setTransactionDetails(prev => ({
      ...prev,
      titleInsurance,
      docStamps
    }));
  }, [transactionDetails.salePrice, calculatorDefaults]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      const finalProperty: Property = {
        ...selectedProperty,
        address: propertyDetails.address ?? '',
        price: propertyDetails.price ?? 0,
        beds: propertyDetails.beds ?? 0,
        baths: propertyDetails.baths ?? 0,
        sqft: propertyDetails.sqft ?? 0,
        yearBuilt: propertyDetails.yearBuilt ?? 0,
        lotSize: propertyDetails.lotSize ?? 0,
        propertyType: propertyDetails.propertyType ?? 'Single Family',
        images: propertyDetails.images ?? [],
        status: 'Active',
        transactionDetails,
        source: {
          name: 'User',
          fetchDate: new Date().toISOString()
        }
      };

      void saveProperty(finalProperty).then(onConfirm);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onCancel();
    }
  };

  const handleAddressSelect = async (feature: { place_name: string }) => {
    try {
      setError(undefined);
      setIsLoading(true);
      
      const fullAddress = feature.place_name;
      const propertyData = await fetchPropertyDetails(fullAddress);
      
      // Check for existing property
      const { data: existingProperties } = await supabase
        .from('saved_calculations')
        .select('*')
        .eq('address', fullAddress)
        .order('created_at', { ascending: false })
        .limit(1);

      // Validate required fields
      if (!propertyData.address || !propertyData.price) {
        throw new Error('Missing required property data');
      }

      // Prepare property data
      const newPropertyData: Property = {
        id: existingProperties?.[0]?.id || generateUniqueId(),
        address: propertyData.address,
        price: propertyData.price,
        beds: propertyData.beds ?? 0,
        baths: propertyData.baths ?? 0,
        sqft: propertyData.sqft ?? 0,
        yearBuilt: propertyData.yearBuilt ?? 0,
        lotSize: propertyData.lotSize ?? 0,
        propertyType: propertyData.propertyType ?? 'Single Family',
        images: propertyData.images ?? [],
        status: 'Active',
        source: {
          name: 'Zillow API',
          fetchDate: new Date().toISOString()
        }
      };
      
      const storedProperty = await saveProperty(newPropertyData);
      
      setTransactionDetails(prev => ({
        ...prev,
        salePrice: propertyData.price ?? prev.salePrice,
        hoaFees: propertyData.hoaFees ?? prev.hoaFees,
        annualTaxes: propertyData.taxes ?? prev.annualTaxes
      }));
      
      setSelectedProperty(storedProperty);
      setPropertyDetails(newPropertyData);
      setCurrentStep(2);
    } catch (err) {
      console.error('Error in handleAddressSelect:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch property details');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="content-wrapper transition-all duration-300">
        <Card className="w-full max-w-[1200px] mx-auto my-4">
          <CardBody className="p-0">
            <div className="flex h-[calc(100vh-2rem)]">
              {/* Navigation Steps */}
              <div className="w-[380px] bg-gradient-to-b from-primary-900 to-primary-800 text-white p-12 overflow-y-auto">
                <div className="space-y-8">
                  {collaborators.length > 0 && (
                    <CollaboratorIndicator
                      collaborators={collaborators}
                      className="mb-6"
                    />
                  )}
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Net Seller Calculator</h2>
                    <p className="text-lg text-white/80">Calculate your estimated proceeds from the sale.</p>
                  </div>
                  
                  <div className="space-y-12 mt-12">
                    {steps.map((step) => (
                      <div key={step.id} className="flex items-start gap-6">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-lg font-semibold
                          ${getStepStyle(currentStep, step.id)}
                        `}>
                          {currentStep > step.id ? '✓' : step.id}
                        </div>
                        <div className={`space-y-2 ${currentStep === step.id ? 'opacity-100' : 'opacity-70'}`}>
                          <h3 className="text-xl font-semibold">{step.title}</h3>
                          <p className="text-base text-white/80 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 flex flex-col h-full bg-background">
                <div className="flex-1 p-12 overflow-y-auto">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full"
                  >
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-semibold mb-2">Property Location</h3>
                          <p className="text-default-500">Enter the property address to fetch available data.</p>
                        </div>
                        <div className="bg-content1 p-8 rounded-xl">
                          <div className="form-group">
                            <AddressAutocomplete
                              value={address}
                              onChange={setAddress}
                              onSelect={handleAddressSelect}
                              error={error}
                              isLoading={isLoading}
                            />
                          </div>
                          {isLoading && (
                            <div className="mt-4 flex items-center gap-2 text-primary">
                              <Spinner size="sm" />
                              <span>Fetching property data...</span>
                            </div>
                          )}
                          {error && (
                            <div className="mt-4 text-danger text-sm">
                              {error}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-semibold mb-2">Sale Details</h3>
                          <p className="text-default-500">Confirm or enter the primary financial information.</p>
                        </div>
                        <div className="bg-content1 p-8 rounded-xl space-y-6">
                          <div className="form-group">
                            <label htmlFor="sale-price" className="block text-sm font-medium mb-2">
                              Sale Price
                              <span className="ml-2 text-xs text-default-400">
                                (Source: {propertyDetails.price ? 'API' : 'Manual'})
                              </span>
                            </label>
                            <NumericInput
                              id="sale-price"
                              value={transactionDetails.salePrice}
                              onChange={(value) => setTransactionDetails(prev => ({
                                ...prev,
                                salePrice: parseFloat(value) || 0
                              }))}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="mortgage-balance" className="block text-sm font-medium mb-2">
                              Outstanding Mortgage Balance
                            </label>
                            <NumericInput
                              id="mortgage-balance"
                              value={transactionDetails.mortgageBalance}
                              onChange={(value) => setTransactionDetails(prev => ({
                                ...prev,
                                mortgageBalance: parseFloat(value) || 0
                              }))}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="annual-taxes" className="block text-sm font-medium mb-2">
                              Annual Property Taxes
                              {' '}
                              <span className="ml-2 text-xs text-default-400">
                                (Source: {transactionDetails.annualTaxes ? 'API' : 'Manual'})
                              </span>
                            </label>
                            <NumericInput
                              id="annual-taxes"
                              value={transactionDetails.annualTaxes}
                              onChange={(value) => setTransactionDetails(prev => ({
                                ...prev,
                                annualTaxes: parseFloat(value) || 0
                              }))}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="hoa-fees" className="block text-sm font-medium mb-2">
                              Monthly HOA Fees
                              {' '}
                              <span className="ml-2 text-xs text-default-400">
                                (Source: {transactionDetails.hoaFees ? 'API' : 'Manual'})
                              </span>
                            </label>
                            <NumericInput
                              id="hoa-fees"
                              value={transactionDetails.hoaFees}
                              onChange={(value) => setTransactionDetails(prev => ({
                                ...prev,
                                hoaFees: parseFloat(value) || 0
                              }))}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-semibold mb-2">Commission & Fees</h3>
                          <p className="text-default-500">Enter commission rates and standard fees.</p>
                        </div>
                        <div className="bg-content1 p-8 rounded-xl space-y-6">
                          <div className="form-group">
                            <label htmlFor="buyer-commission" className="block text-sm font-medium mb-2">
                              Buyer&apos;s Agent Commission (%)
                            </label>
                            <NumericInput
                              id="buyer-commission"
                              value={transactionDetails.buyerAgentCommission}
                              onChange={(value) => setTransactionDetails(prev => ({
                                ...prev,
                                buyerAgentCommission: parseFloat(value) || 0
                              }))}
                              isPercentage
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="seller-commission" className="block text-sm font-medium mb-2">
                              Seller&apos;s Agent Commission (%)
                            </label>
                            <NumericInput
                              id="seller-commission"
                              value={transactionDetails.sellerAgentCommission}
                              onChange={(value) => setTransactionDetails(prev => ({
                                ...prev,
                                sellerAgentCommission: parseFloat(value) || 0
                              }))}
                              isPercentage
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="escrow-fee" className="block text-sm font-medium mb-2">
                              Escrow Fee
                            </label>
                            <NumericInput
                              id="escrow-fee"
                              value={transactionDetails.escrowFee}
                              onChange={(value) => setTransactionDetails(prev => ({
                                ...prev,
                                escrowFee: parseFloat(value) || 0
                              }))}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="title-fee" className="block text-sm font-medium mb-2">
                              Title Fee
                            </label>
                            <NumericInput
                              id="title-fee"
                              value={transactionDetails.titleFee}
                              onChange={(value) => setTransactionDetails(prev => ({
                                ...prev,
                                titleFee: parseFloat(value) || 0
                              }))}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-semibold mb-2">Additional Costs</h3>
                          <p className="text-default-500">Enter any credits, repairs, or custom costs.</p>
                        </div>
                        <div className="bg-content1 p-8 rounded-xl space-y-6">
                          <div className="form-group">
                            <label htmlFor="seller-credits" className="block text-sm font-medium mb-2">
                              Seller Credits
                            </label>
                            <NumericInput
                              id="seller-credits"
                              value={transactionDetails.sellerCredits}
                              onChange={(value) => setTransactionDetails(prev => ({
                                ...prev,
                                sellerCredits: parseFloat(value) || 0
                              }))}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="repair-costs" className="block text-sm font-medium mb-2">
                              Repair Costs
                            </label>
                            <NumericInput
                              id="repair-costs"
                              value={transactionDetails.repairCosts}
                              onChange={(value) => setTransactionDetails(prev => ({
                                ...prev,
                                repairCosts: parseFloat(value) || 0
                              }))}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="custom-costs" className="block text-sm font-medium mb-2">
                              Custom Costs
                            </label>
                            <NumericInput
                              id="custom-costs"
                              value={transactionDetails.customCosts}
                              onChange={(value) => setTransactionDetails(prev => ({
                                ...prev,
                                customCosts: parseFloat(value) || 0
                              }))}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-semibold mb-2">Review & Calculate</h3>
                          <p className="text-default-500">Review all inputs and see preliminary calculation.</p>
                        </div>
                        <div className="bg-content1 p-8 rounded-xl space-y-6">
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <h4 className="text-lg font-semibold mb-4">Property Details</h4>
                              <dl className="space-y-2">
                                <div className="flex justify-between">
                                  <dt className="text-default-500">Address:</dt>
                                  <dd>{propertyDetails.address}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-default-500">Sale Price:</dt>
                                  <dd>${(transactionDetails.salePrice ?? 0).toLocaleString()}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-default-500">Mortgage Balance:</dt>
                                  <dd>${(transactionDetails.mortgageBalance ?? 0).toLocaleString()}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-default-500">Annual Taxes:</dt>
                                  <dd>${(transactionDetails.annualTaxes ?? 0).toLocaleString()}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-default-500">Monthly HOA:</dt>
                                  <dd>${(transactionDetails.hoaFees ?? 0).toLocaleString()}</dd>
                                </div>
                              </dl>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold mb-4">Commission & Fees</h4>
                              <dl className="space-y-2">
                                <div className="flex justify-between">
                                  <dt className="text-default-500">Buyer&apos;s Agent:</dt>
                                  <dd>{transactionDetails.buyerAgentCommission ?? 0}%</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-default-500">Seller&apos;s Agent:</dt>
                                  <dd>{transactionDetails.sellerAgentCommission ?? 0}%</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-default-500">Escrow Fee:</dt>
                                  <dd>${(transactionDetails.escrowFee ?? 0).toLocaleString()}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-default-500">Title Fee:</dt>
                                  <dd>${(transactionDetails.titleFee ?? 0).toLocaleString()}</dd>
                                </div>
                              </dl>
                            </div>
                          </div>

                          <div className="mt-8">
                            <h4 className="text-lg font-semibold mb-4">Additional Costs</h4>
                            <dl className="space-y-2">
                              <div className="flex justify-between">
                                <dt className="text-default-500">Seller Credits:</dt>
                                <dd>${(transactionDetails.sellerCredits ?? 0).toLocaleString()}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-default-500">Repair Costs:</dt>
                                <dd>${(transactionDetails.repairCosts ?? 0).toLocaleString()}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-default-500">Custom Costs:</dt>
                                <dd>${(transactionDetails.customCosts ?? 0).toLocaleString()}</dd>
                              </div>
                            </dl>
                          </div>

                          <div className="mt-8 pt-8 border-t">
                            <div className="flex justify-between items-center">
                              <h4 className="text-xl font-semibold">Estimated Net Proceeds</h4>
                              <div className="text-3xl font-bold text-success">
                                ${calculateNetProceeds(transactionDetails).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
                
                {/* Navigation Buttons */}
                <div className="p-6 border-t border-divider">
                  <div className="flex justify-between">
                    <button
                      onClick={handlePrevious}
                      className="px-4 py-2 text-default-600 hover:text-default-900"
                    >
                      {currentStep === 1 ? 'Cancel' : 'Previous'}
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600"
                      disabled={currentStep === 1 && !selectedProperty.address}
                    >
                      {currentStep === steps.length ? 'Complete' : 'Next'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
