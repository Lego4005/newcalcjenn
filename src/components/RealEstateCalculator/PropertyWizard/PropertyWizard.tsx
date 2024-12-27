import { useState, useEffect } from 'react';
import { Card, CardBody, Button, Input, Tooltip, Spinner, Image } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { Home, DollarSign, Calendar, Info, Building2, Scale, Bed, Bath, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import AddressAutocomplete from '../Dashboard/AddressAutocomplete';
import type { Property } from '@/types/property';
import type { AddressFeature } from '@/types/address';
import { fetchPropertyData, fetchTaxAssessment, fetchHOAData, fetchPropertyDetails } from '@/lib/api';
import PropertyDrawer from './PropertyDrawer';
import { saveProperty, saveTransaction } from '@/lib/storage';
import NumericInput from '@/components/common/NumericInput';
import { getCalculatorDefaults, calculateTitleInsurance, calculateDocStamps } from '@/lib/calculator';
import type { CalculatorDefaults } from '@/types/calculator';
import { supabase } from '@/lib/supabase';

interface PropertyWizardProps {
  property?: Property;
  onConfirm: (property: Property) => void;
  onCancel: () => void;
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

interface PropertyDetailsCard {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  tooltip?: string;
  editable?: boolean;
  onChange?: (value: any) => void;
}

interface TransactionDetails {
  salePrice: number;
  mortgageBalance: number;
  annualTaxes: number;
  hoaFees: number;
  buyerAgentCommission: number;
  sellerAgentCommission: number;
  // Fixed Costs
  settlementFee: number;
  titleSearch: number;
  municipalLienSearch: number;
  titleInsurance: number;
  docStamps: number;
  escrowFee: number;
  titleFee: number;
  // Additional Costs
  sellerCredits: number;
  repairCosts: number;
  customCosts: number;
  closingDate: string;
}

export default function PropertyWizard({
  property: initialProperty,
  onConfirm,
  onCancel
}: PropertyWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>(initialProperty);
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails>({
    salePrice: initialProperty?.price || 0,
    mortgageBalance: 0,
    annualTaxes: initialProperty?.taxes || 0,
    hoaFees: initialProperty?.hoaFees || 0,
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [calculatorDefaults, setCalculatorDefaults] = useState<CalculatorDefaults | null>(null);

  // Fetch calculator defaults on mount
  useEffect(() => {
    async function loadDefaults() {
      const defaults = await getCalculatorDefaults();
      setCalculatorDefaults(defaults);
      
      // Update transaction details with defaults
      setTransactionDetails(prev => ({
        ...prev,
        buyerAgentCommission: defaults.defaultBuyerAgentCommission,
        sellerAgentCommission: defaults.defaultSellerAgentCommission,
        settlementFee: defaults.defaultSettlementFee,
        titleSearch: defaults.defaultTitleSearch,
        municipalLienSearch: defaults.defaultMunicipalLienSearch
      }));
    }
    
    loadDefaults();
  }, []);

  // Update calculated values when sale price changes
  useEffect(() => {
    if (calculatorDefaults && transactionDetails.salePrice) {
      const titleInsurance = calculateTitleInsurance(transactionDetails.salePrice, calculatorDefaults);
      const docStamps = calculateDocStamps(transactionDetails.salePrice, calculatorDefaults);
      
      setTransactionDetails(prev => ({
        ...prev,
        titleInsurance,
        docStamps
      }));
    }
  }, [transactionDetails.salePrice, calculatorDefaults]);

  // Add property details state
  const [propertyDetails, setPropertyDetails] = useState({
    address: '',
    price: 0,
    beds: 0,
    baths: 0,
    sqft: 0,
    yearBuilt: 0,
    pricePerSqft: 0,
    marketValue: 0,
    images: [] as string[],
    taxes: 0,
    hoaFees: 0,
    zestimate: 0,
    description: '',
    lotSize: 0,
    parkingSpaces: 0,
    propertyType: '',
    lastSoldPrice: 0,
    lastSoldDate: '',
    priceHistory: [] as Array<{date: string; price: number; event: string}>,
    features: [] as string[],
    schools: [] as Array<{name: string; rating: number; distance: number; type: string}>,
    walkScore: 0,
    transitScore: 0
  });

  // Add state for current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Add state to track input sources
  const [inputSources, setInputSources] = useState({
    salePrice: 'zillow',
    mortgageBalance: 'user',
    taxes: 'zillow',
    hoaFees: 'zillow'
  });

  // Calculate prorated taxes
  const calculateProratedTaxes = () => {
    const closingDate = new Date(transactionDetails.closingDate);
    const startOfYear = new Date(closingDate.getFullYear(), 0, 1);
    const daysOwned = Math.floor((closingDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    return (propertyDetails.taxes * daysOwned) / 365;
  };

  // Calculate estimated net proceeds
  const calculateNetProceeds = () => {
    const totalCommission = (transactionDetails.buyerAgentCommission + transactionDetails.sellerAgentCommission) 
      * transactionDetails.salePrice / 100;
    const closingCosts = transactionDetails.escrowFee + transactionDetails.titleFee;
    const proratedTaxes = calculateProratedTaxes();
    const additionalCosts = transactionDetails.sellerCredits + transactionDetails.repairCosts + transactionDetails.customCosts;

    return transactionDetails.salePrice - totalCommission - closingCosts - proratedTaxes - 
           transactionDetails.mortgageBalance - transactionDetails.hoaFees - additionalCosts;
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      // Save transaction details on each step
      if (selectedProperty?.id) {
        const dbTransaction = {
          property_id: selectedProperty.id,
          sale_price: transactionDetails.salePrice,
          mortgage_balance: transactionDetails.mortgageBalance,
          hoa_fees: transactionDetails.hoaFees,
          buyer_agent_commission: transactionDetails.buyerAgentCommission,
          seller_agent_commission: transactionDetails.sellerAgentCommission,
          escrow_fee: transactionDetails.escrowFee,
          title_fee: transactionDetails.titleFee,
          seller_credits: transactionDetails.sellerCredits,
          repair_costs: transactionDetails.repairCosts,
          custom_costs: transactionDetails.customCosts,
          closing_date: transactionDetails.closingDate
        };
        saveTransaction(selectedProperty.id, dbTransaction);
      }
      setCurrentStep(currentStep + 1);
    } else {
      // Final confirmation
      if (selectedProperty?.id) {
        const dbTransaction = {
          property_id: selectedProperty.id,
          sale_price: transactionDetails.salePrice,
          mortgage_balance: transactionDetails.mortgageBalance,
          hoa_fees: transactionDetails.hoaFees,
          buyer_agent_commission: transactionDetails.buyerAgentCommission,
          seller_agent_commission: transactionDetails.sellerAgentCommission,
          escrow_fee: transactionDetails.escrowFee,
          title_fee: transactionDetails.titleFee,
          seller_credits: transactionDetails.sellerCredits,
          repair_costs: transactionDetails.repairCosts,
          custom_costs: transactionDetails.customCosts,
          closing_date: transactionDetails.closingDate
        };
        saveTransaction(selectedProperty.id, dbTransaction);
      }
      // Pass both property and transaction details back
      const finalProperty = {
        ...selectedProperty,
        ...propertyDetails,
        transactionDetails: transactionDetails,
        images: propertyDetails.images,
        source: {
          name: 'User',
          fetchDate: new Date().toISOString()
        }
      };

      // Save to localStorage for the sidebar
      const savedProperty = saveProperty({
        ...finalProperty,
        price: transactionDetails.salePrice,
        taxes: transactionDetails.annualTaxes,
        hoaFees: transactionDetails.hoaFees,
        mortgageBalance: transactionDetails.mortgageBalance,
        status: 'Active'
      });

      onConfirm(savedProperty);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onCancel();
    }
  };

  const handleAddressSelect = async (feature: AddressFeature) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const fullAddress = feature.place_name;

      // Fetch and save new property
      const propertyData = await fetchPropertyDetails(fullAddress);
      console.log('Fetched property data:', propertyData);

      // Check if property already exists
      const { data: existingProperties } = await supabase
        .from('properties')
        .select('*')
        .eq('address', fullAddress)
        .order('created_at', { ascending: false })
        .limit(1);

      let storedProperty;
      
      if (existingProperties && existingProperties.length > 0) {
        // Update existing property with new data
        const existingProperty = existingProperties[0];
        storedProperty = await saveProperty({
          ...propertyData,
          id: existingProperty.id
        });
        
        // Delete any existing transactions
        await supabase
          .from('transactions')
          .delete()
          .eq('property_id', existingProperty.id);
      } else {
        // Save new property
        storedProperty = await saveProperty(propertyData);
      }
      
      // Set initial transaction details with default values
      const initialTransactionDetails = {
        salePrice: propertyData.price || 3345400,
        mortgageBalance: 0,
        hoaFees: propertyData.hoaFees || 0,
        buyerAgentCommission: 3.00,
        sellerAgentCommission: 3.00,
        escrowFee: 595,
        titleFee: 175,
        sellerCredits: 0,
        repairCosts: 0,
        customCosts: 0,
        closingDate: new Date().toISOString().split('T')[0]
      };
      
      setTransactionDetails(initialTransactionDetails);

      // Save new transaction with snake_case fields
      const dbTransaction = {
        property_id: storedProperty.id,
        sale_price: propertyData.price || 3345400,
        mortgage_balance: 0,
        hoa_fees: propertyData.hoaFees || 0,
        buyer_agent_commission: 3.00,
        seller_agent_commission: 3.00,
        escrow_fee: 595,
        title_fee: 175,
        seller_credits: 0,
        repair_costs: 0,
        custom_costs: 0,
        closing_date: new Date().toISOString().split('T')[0]
      };
      
      await saveTransaction(storedProperty.id, dbTransaction);

      setSelectedProperty(storedProperty);
      setPropertyDetails({
        address: storedProperty.address,
        price: propertyData.price || 3345400,
        beds: storedProperty.beds || 0,
        baths: storedProperty.baths || 0,
        sqft: storedProperty.sqft || 0,
        yearBuilt: storedProperty.yearBuilt || 0,
        pricePerSqft: storedProperty.pricePerSqft || 0,
        marketValue: storedProperty.marketValue || 0,
        images: storedProperty.images || [],
        taxes: storedProperty.taxes || 0,
        hoaFees: storedProperty.hoaFees || 0,
        zestimate: storedProperty.marketValue || 0,
        description: '',
        lotSize: storedProperty.lotSize || 0,
        parkingSpaces: 0,
        propertyType: storedProperty.propertyType || '',
        lastSoldPrice: 0,
        lastSoldDate: '',
        priceHistory: [],
        features: [],
        schools: [],
        walkScore: 0,
        transitScore: 0
      });

      // Move to step 2 (Sale Details) after property is selected
      setCurrentStep(2);

    } catch (error) {
      console.error('Error in handleAddressSelect:', error);
      setError('Failed to fetch property details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const propertyDetailsCards: PropertyDetailsCard[] = [
    {
      icon: <DollarSign className="w-6 h-6 text-success" />,
      title: "Sale Price",
      value: selectedProperty?.price || 0,
      tooltip: "The agreed-upon sale price of the property",
      editable: true,
      onChange: (value) => setSelectedProperty(prev => prev ? { ...prev, price: parseInt(value) } : undefined)
    },
    {
      icon: <Scale className="w-6 h-6 text-warning" />,
      title: "Annual Property Taxes",
      value: selectedProperty?.taxes || 0,
      tooltip: "Current annual property tax amount - will be prorated based on closing date",
      editable: true,
      onChange: (value) => setSelectedProperty(prev => prev ? { ...prev, taxes: parseInt(value) } : undefined)
    },
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      title: "Tax Due Date",
      value: selectedProperty?.taxDueDate || new Date().toISOString().split('T')[0],
      tooltip: "Next property tax payment due date - important for accurate proration",
      editable: true,
      onChange: (value) => setSelectedProperty(prev => prev ? { ...prev, taxDueDate: value } : undefined)
    },
    {
      icon: <DollarSign className="w-6 h-6 text-danger" />,
      title: "Outstanding Mortgage",
      value: selectedProperty?.mortgageBalance || 0,
      tooltip: "Current mortgage balance to be paid off at closing",
      editable: true,
      onChange: (value) => setSelectedProperty(prev => prev ? { ...prev, mortgageBalance: parseInt(value) } : undefined)
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    const numericValue = parseFloat(value.replace(/,/g, '')) || 0;
    
    // Update source to 'user' when they modify a value
    setInputSources(prev => ({
      ...prev,
      [field]: 'user'
    }));
    
    if (field === 'taxes' || field === 'hoaFees') {
      setPropertyDetails(prev => ({
        ...prev,
        [field]: numericValue
      }));
    } else {
      setTransactionDetails(prev => ({
        ...prev,
        [field]: numericValue
      }));
    }
  };

  const handleSearch = async () => {
    if (!address) return;
    
    try {
      setError(null);
      setIsLoading(true);
      
      const propertyData = await fetchPropertyDetails(address);
      console.log('Fetched property data:', propertyData);
      
      if (propertyData) {
        const storedProperty = await saveProperty(propertyData);
        
        const newTransactionDetails = {
          salePrice: propertyData.price || transactionDetails.salePrice,
          mortgageBalance: transactionDetails.mortgageBalance,
          hoaFees: propertyData.hoaFees || transactionDetails.hoaFees,
          buyerAgentCommission: transactionDetails.buyerAgentCommission,
          sellerAgentCommission: transactionDetails.sellerAgentCommission,
          escrowFee: transactionDetails.escrowFee,
          titleFee: transactionDetails.titleFee,
          sellerCredits: transactionDetails.sellerCredits,
          repairCosts: transactionDetails.repairCosts,
          customCosts: transactionDetails.customCosts,
          closingDate: transactionDetails.closingDate
        };
        
        setTransactionDetails(newTransactionDetails);
        
        if (storedProperty.id) {
          saveTransaction(storedProperty.id, newTransactionDetails);
        }
        
        setSelectedProperty(storedProperty);
        onConfirm(storedProperty);
      }
    } catch (error) {
      console.error('Error in handleSearch:', error);
      setError('Failed to fetch property details. Please try again.');
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
              {/* Left Sidebar - Fixed */}
              <div className="w-[380px] bg-gradient-to-b from-primary-900 to-primary-800 text-white p-12 overflow-y-auto">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Net Seller Calculator</h2>
                    <p className="text-lg text-white/80">Calculate your estimated proceeds from the sale.</p>
                  </div>
                  
                  <div className="space-y-12 mt-12">
                    {steps.map((step) => (
                      <div key={step.id} className="flex items-start gap-6">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-lg font-semibold
                          ${currentStep === step.id ? 'bg-white text-primary-900' : 
                            currentStep > step.id ? 'bg-success/90 text-white' : 'bg-white/20 text-white'}
                          transition-all duration-200
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

              {/* Right Content - Scrollable */}
              <div className="flex-1 flex flex-col h-full bg-background">
                <div className="flex-1 p-12 overflow-y-auto">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full"
                  >
                    {currentStep === 1 ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-semibold mb-2">Property Location</h3>
                          <p className="text-default-500">Enter the property address to fetch available data.</p>
                        </div>
                        <div className="bg-content1 p-8 rounded-xl">
                          <AddressAutocomplete
                            value={address}
                            onChange={setAddress}
                            onSelect={handleAddressSelect}
                            error={error}
                            placeholder="Enter property address"
                            className="text-lg"
                            isDisabled={isLoading}
                          />
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
                    ) : null}

                    {currentStep === 2 ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-semibold mb-2">Sale Details</h3>
                          <p className="text-default-500">Confirm or enter the primary financial information.</p>
                        </div>
                        <div className="bg-content1 p-8 rounded-xl space-y-6">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2">
                                <label className="text-sm font-medium">Sale Price</label>
                                <Tooltip content="The agreed-upon sale price of the property">
                                  <Info className="w-4 h-4 text-default-400 cursor-help" />
                                </Tooltip>
                              </div>
                              <span className={`text-xs ${inputSources.salePrice === 'zillow' ? 'text-success' : 'text-warning'}`}>
                                Source: {inputSources.salePrice}
                              </span>
                            </div>
                            <Button
                              variant="flat"
                              className="w-full justify-between px-4 py-3 h-auto"
                              onPress={() => setIsDrawerOpen(true)}
                            >
                              <span>${transactionDetails.salePrice.toLocaleString()}</span>
                              <span className="text-default-400">Edit</span>
                            </Button>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2">
                                <label className="text-sm font-medium">Outstanding Mortgage Balance</label>
                                <Tooltip content="Current mortgage balance to be paid off at closing">
                                  <Info className="w-4 h-4 text-default-400 cursor-help" />
                                </Tooltip>
                              </div>
                              <span className={`text-xs ${inputSources.mortgageBalance === 'user' ? 'text-warning' : 'text-success'}`}>
                                Source: {inputSources.mortgageBalance}
                              </span>
                            </div>
                            <Button
                              variant="flat"
                              className="w-full justify-between px-4 py-3 h-auto"
                              onPress={() => setIsDrawerOpen(true)}
                            >
                              <span>${transactionDetails.mortgageBalance.toLocaleString()}</span>
                              <span className="text-default-400">Edit</span>
                            </Button>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2">
                                <label className="text-sm font-medium">Annual Property Taxes</label>
                                <Tooltip content="Current annual property tax amount - Zillow's estimate is often inaccurate, please verify">
                                  <Info className="w-4 h-4 text-warning cursor-help" />
                                </Tooltip>
                              </div>
                              <span className={`text-xs ${inputSources.taxes === 'zillow' ? 'text-warning' : 'text-success'}`}>
                                Source: {inputSources.taxes}
                              </span>
                            </div>
                            <Button
                              variant="flat"
                              className="w-full justify-between px-4 py-3 h-auto"
                              onPress={() => setIsDrawerOpen(true)}
                            >
                              <span>${propertyDetails.taxes.toLocaleString()}</span>
                              <span className="text-default-400">Edit</span>
                            </Button>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2">
                                <label className="text-sm font-medium">Monthly HOA Fees</label>
                                <Tooltip content="Monthly homeowner association fees, if applicable">
                                  <Info className="w-4 h-4 text-default-400 cursor-help" />
                                </Tooltip>
                              </div>
                              <span className={`text-xs ${inputSources.hoaFees === 'zillow' ? 'text-success' : 'text-warning'}`}>
                                Source: {inputSources.hoaFees}
                              </span>
                            </div>
                            <Button
                              variant="flat"
                              className="w-full justify-between px-4 py-3 h-auto"
                              onPress={() => setIsDrawerOpen(true)}
                            >
                              <span>${propertyDetails.hoaFees.toLocaleString()}</span>
                              <span className="text-default-400">Edit</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {currentStep === 3 ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-semibold mb-2">Commission & Fees</h3>
                          <p className="text-default-500">Enter commission rates and standard fees.</p>
                        </div>
                        <div className="bg-content1 p-8 rounded-xl space-y-6">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="text-sm font-medium">Buyer's Agent Commission</label>
                              <span className="text-xs text-default-400">Default: 3.00%</span>
                            </div>
                            <NumericInput
                              value={transactionDetails.buyerAgentCommission}
                              onChange={(value) => handleInputChange('buyerAgentCommission', value)}
                              placeholder="Enter buyer's agent commission"
                              endContent={<span className="text-default-400">%</span>}
                              startContent={null}
                              isPercentage
                            />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="text-sm font-medium">Seller's Agent Commission</label>
                              <span className="text-xs text-default-400">Default: 3.00%</span>
                            </div>
                            <NumericInput
                              value={transactionDetails.sellerAgentCommission}
                              onChange={(value) => handleInputChange('sellerAgentCommission', value)}
                              placeholder="Enter seller's agent commission"
                              endContent={<span className="text-default-400">%</span>}
                              startContent={null}
                              isPercentage
                            />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="text-sm font-medium">Escrow Fee</label>
                              <span className="text-xs text-default-400">Default: $595</span>
                            </div>
                            <NumericInput
                              value={transactionDetails.escrowFee}
                              onChange={(value) => handleInputChange('escrowFee', value)}
                              placeholder="Enter escrow fee"
                              startContent={<DollarSign className="text-default-400" size={16} />}
                            />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="text-sm font-medium">Title Fee</label>
                              <span className="text-xs text-default-400">Default: $175</span>
                            </div>
                            <NumericInput
                              value={transactionDetails.titleFee}
                              onChange={(value) => handleInputChange('titleFee', value)}
                              placeholder="Enter title fee"
                              startContent={<DollarSign className="text-default-400" size={16} />}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {currentStep === 4 ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-semibold mb-2">Additional Costs</h3>
                          <p className="text-default-500">Enter any credits, repairs, or custom costs.</p>
                        </div>
                        <div className="bg-content1 p-8 rounded-xl space-y-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">Seller Credits</label>
                            <NumericInput
                              value={transactionDetails.sellerCredits}
                              onChange={(value) => handleInputChange('sellerCredits', value)}
                              placeholder="Enter seller credits"
                              startContent={<DollarSign className="text-default-400" size={16} />}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Repair Costs</label>
                            <NumericInput
                              value={transactionDetails.repairCosts}
                              onChange={(value) => handleInputChange('repairCosts', value)}
                              placeholder="Enter repair costs"
                              startContent={<DollarSign className="text-default-400" size={16} />}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Custom Costs</label>
                            <NumericInput
                              value={transactionDetails.customCosts}
                              onChange={(value) => handleInputChange('customCosts', value)}
                              placeholder="Enter custom costs"
                              startContent={<DollarSign className="text-default-400" size={16} />}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {currentStep === 5 ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-semibold mb-2">Review & Calculate</h3>
                          <p className="text-default-500">Review all inputs and see preliminary calculation.</p>
                        </div>
                        <div className="bg-content1 p-8 rounded-xl space-y-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-4">Property Details</h4>
                              <div className="space-y-2">
                                <p><span className="text-default-500">Address:</span> {propertyDetails.address}</p>
                                <p><span className="text-default-500">Sale Price:</span> ${transactionDetails.salePrice.toLocaleString()}</p>
                                <p><span className="text-default-500">Mortgage Balance:</span> ${transactionDetails.mortgageBalance.toLocaleString()}</p>
                                <p><span className="text-default-500">Annual Taxes:</span> ${propertyDetails.taxes.toLocaleString()}</p>
                                <p><span className="text-default-500">Monthly HOA:</span> ${propertyDetails.hoaFees.toLocaleString()}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-4">Commission & Fees</h4>
                              <div className="space-y-2">
                                <p><span className="text-default-500">Buyer's Agent:</span> {transactionDetails.buyerAgentCommission}%</p>
                                <p><span className="text-default-500">Seller's Agent:</span> {transactionDetails.sellerAgentCommission}%</p>
                                <p><span className="text-default-500">Escrow Fee:</span> ${transactionDetails.escrowFee.toLocaleString()}</p>
                                <p><span className="text-default-500">Title Fee:</span> ${transactionDetails.titleFee.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-8">
                            <h4 className="font-semibold mb-4">Additional Costs</h4>
                            <div className="space-y-2">
                              <p><span className="text-default-500">Seller Credits:</span> ${transactionDetails.sellerCredits.toLocaleString()}</p>
                              <p><span className="text-default-500">Repair Costs:</span> ${transactionDetails.repairCosts.toLocaleString()}</p>
                              <p><span className="text-default-500">Custom Costs:</span> ${transactionDetails.customCosts.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="mt-8 pt-8 border-t">
                            <h4 className="font-semibold text-xl mb-2">Estimated Net Proceeds</h4>
                            <p className="text-3xl font-bold text-success">${calculateNetProceeds().toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </motion.div>
                </div>

                {/* Navigation Buttons - Fixed at bottom */}
                <div className="flex justify-between p-6 border-t border-divider bg-background">
                  <Button
                    variant="flat"
                    onPress={handleBack}
                    size="lg"
                    className="min-w-[120px]"
                  >
                    {currentStep === 1 ? 'Cancel' : 'Back'}
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleNext}
                    size="lg"
                    className="min-w-[120px]"
                    isDisabled={currentStep === 1 && !selectedProperty?.address}
                  >
                    {currentStep === steps.length ? 'Confirm' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
} 