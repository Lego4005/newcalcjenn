import { useState, useEffect, useCallback } from 'react';
import { Spinner } from "@heroui/react";
import { motion } from 'framer-motion';
import SellerClosingCalculator from '../SellerClosingCosts/SellerClosingCalculator';
import PropertyWizard from '../PropertyWizard/PropertyWizard';
import type { Property } from '@/types/property';
import { getProperty, getTransaction, saveTransaction } from '@/lib/storage';

export default function PropertyDashboard() {
  const [selectedTab, setSelectedTab] = useState('calculator');
  const [property, setProperty] = useState<Property | null>(null);
  const [slideDirection, setSlideDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [address, setAddress] = useState('');
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isPropertyConfirmed, setIsPropertyConfirmed] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<any>(null);

  // Handle transaction updates
  useEffect(() => {
    if (pendingTransaction && property?.id) {
      saveTransaction(property.id, pendingTransaction);
      setProperty(prev => ({
        ...prev!,
        transactionDetails: pendingTransaction
      }));
      setPendingTransaction(null);
    }
  }, [pendingTransaction, property?.id]);

  const handleTransactionUpdate = useCallback((details: any) => {
    if (details === null) {
      // Handle search mode
      setShowWizard(true);
    } else if (details.salePrice === 450000) {
      // Handle demo mode
      handleDemoMode();
    } else {
      // Handle normal transaction updates
      setPendingTransaction(details);
    }
  }, []);

  // Load property from URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const propertyId = params.get('propertyId');
    
    if (propertyId) {
      const savedProperty = getProperty(propertyId);
      if (savedProperty) {
        setProperty(savedProperty);
        setIsPropertyConfirmed(true);
        
        // Load associated transaction data
        const transaction = getTransaction(propertyId);
        if (transaction) {
          // Update property with transaction details
          setProperty(prev => ({
            ...prev!,
            transactionDetails: transaction
          }));
        }
      }
    }
  }, []);

  // Update URL when property changes
  useEffect(() => {
    if (property?.id && isPropertyConfirmed) {
      const url = new URL(window.location.href);
      url.searchParams.set('propertyId', property.id);
      window.history.replaceState({}, '', url.toString());
    }
  }, [property?.id, isPropertyConfirmed]);

  // Demo property data
  const demoProperty: Property = {
    id: 'demo-1',
    address: '4005 Bayshore Blvd, Tampa, FL 33611',
    price: 4500000,
    beds: 5,
    baths: 4,
    sqft: 7170,
    yearBuilt: 2016,
    lotSize: 12000,
    propertyType: 'Single Family',
    status: 'Active',
    images: [
      '/demo-property.jpg', // Make sure to add a nice waterfront property image
    ],
    marketValue: 465000,
    pricePerSqft: 628,
    daysOnMarket: 15,
    source: {
      name: 'Demo Data',
      fetchDate: new Date().toISOString(),
    },
  };

  const handleDemoMode = () => {
    setIsLoading(true);
    setTimeout(() => {
      setProperty(demoProperty);
      
      // Set demo transaction details
      const demoTransaction = {
        salePrice: 4500000,
        mortgageBalance: 2500000,
        annualTaxes: 50000,
        hoaFees: 2000,
        hoaEstoppelFee: 250,
        buyerAgentCommission: 3,
        sellerAgentCommission: 3,
        closingDate: new Date().toISOString().split('T')[0],
        hasHOA: true,
        settlementFee: 595,
        titleSearch: 175,
        municipalLienSearch: 175,
        docStamps: 31500,
        titleInsurance: 22875,
        hasPriorTitlePolicy: false,
        priorTitleAmount: 0,
        costResponsibility: {
          settlementFee: 'seller',
          titleSearch: 'seller',
          municipalLienSearch: 'seller',
          titleInsurance: 'seller',
          docStamps: 'seller',
        },
      };

      // Save the transaction details
      saveTransaction(demoProperty.id, demoTransaction);
      
      // Update property with transaction details
      setProperty(prev => ({
        ...prev!,
        transactionDetails: demoTransaction
      }));

      setIsDemoMode(true);
      setIsPropertyConfirmed(true);
      setShowDemoModal(false);
      setIsLoading(false);
    }, 1500);
  };

  const exitDemoMode = () => {
    setProperty(null);
    setIsDemoMode(false);
    setIsPropertyConfirmed(false);
    // Clear any transaction details
    setPendingTransaction(null);
    // Reset URL
    const url = new URL(window.location.href);
    url.searchParams.delete('propertyId');
    window.history.replaceState({}, '', url.toString());
  };

  const handleAddressSearch = async (feature: AddressFeature) => {
    setIsLoading(true);
    setFetchError(null);
    
    try {
      // Fetch property data from our API
      const response = await fetch('/api/properties');
      if (!response.ok) {
        throw new Error('Failed to fetch property data');
      }
      
      const properties = await response.json();
      
      // For now, we'll use the first property as a mock match for the searched address
      const mockProperty: Property = {
        ...properties[0],
        id: Date.now().toString(),
        address: feature.place_name,
        source: {
          name: 'Mapbox Geocoding',
          fetchDate: new Date().toISOString(),
        },
      };

      setProperty(mockProperty);
      setIsPropertyConfirmed(false);
      setShowAddressModal(false);
    } catch (error) {
      setFetchError('Unable to fetch property data. Please try again or enter details manually.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (key: string) => {
    setSlideDirection(key > selectedTab ? 1 : -1);
    setSelectedTab(key);
  };

  const handleShare = () => {
    // Implement sharing functionality
    console.log('Share clicked');
  };

  const handleDownload = () => {
    // Implement PDF download
    console.log('Download clicked');
  };

  const handleAddProperty = () => {
    setShowAddressModal(true);
  };

  const handlePropertyConfirm = (confirmedProperty: Property) => {
    // Ensure we keep all the property details and transaction data
    setProperty({
      ...confirmedProperty,
      source: {
        name: 'User',
        fetchDate: new Date().toISOString()
      }
    });
    setIsPropertyConfirmed(true);
    // Reset the wizard state
    setShowAddressModal(false);
  };

  const handleWizardCancel = () => {
    setProperty(null);
    setIsPropertyConfirmed(false);
    setShowAddressModal(false);
  };

  const LoadingSpinner = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <Spinner size="lg" color="primary" />
      </motion.div>
    </motion.div>
  );

  const handleSearch = useCallback(() => {
    console.log('Dashboard: Search handler called');
    setShowWizard(true);
  }, []);

  if (showWizard) {
    console.log('Dashboard: Showing wizard');
    return (
      <PropertyWizard 
        property={property || undefined}
        onConfirm={(selectedProperty) => {
          console.log('Dashboard: Wizard confirmed', selectedProperty);
          if (selectedProperty) {
            setProperty(selectedProperty);
            setShowWizard(false);
            setIsPropertyConfirmed(true);
          }
        }}
        onCancel={() => {
          console.log('Dashboard: Wizard cancelled');
          setShowWizard(false);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <SellerClosingCalculator
        property={property}
        transactionDetails={property?.transactionDetails || pendingTransaction}
        onTransactionUpdate={handleTransactionUpdate}
        onSearch={handleSearch}
      />
      {isLoading && <LoadingSpinner />}
    </div>
  );
} 