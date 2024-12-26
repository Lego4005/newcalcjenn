import { useState, useEffect, useCallback } from 'react';
import { Card, CardBody, CardHeader, Tab, Tabs, Button, Spinner, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Skeleton, Chip } from '@nextui-org/react';
import { Share2, Download, Home, Calculator, History, Plus, Search, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SellerClosingCalculator from '../SellerClosingCosts/SellerClosingCalculator';
import PropertyPreview from './PropertyPreview';
import PropertyKPIs from './PropertyKPIs';
import PropertyHistory from './PropertyHistory';
import AddressAutocomplete from './AddressAutocomplete';
import PropertyWizard from '../PropertyWizard/PropertyWizard';
import type { Property } from '@/types/property';
import type { AddressFeature } from '@/types/address';
import { getProperty, getTransaction, saveTransaction } from '@/lib/storage';

const tabVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 20 : -20,
    opacity: 0
  })
};

export default function PropertyDashboard() {
  const [selectedTab, setSelectedTab] = useState('calculator');
  const [property, setProperty] = useState<Property | null>(null);
  const [slideDirection, setSlideDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
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
      setShowAddressModal(true);
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
        docStamps: 31500, // $0.70 per $100 of sale price
        titleInsurance: 22875, // Based on FL title insurance rates
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

  const PropertySkeletonLoader = () => (
    <Card className="w-full">
      <CardBody className="space-y-3">
        <Skeleton className="rounded-lg">
          <div className="h-[200px] rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-8 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-4 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="rounded-lg">
              <div className="h-12 rounded-lg bg-default-300"></div>
            </Skeleton>
          ))}
        </div>
      </CardBody>
    </Card>
  );

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full">
        {/* Left Column - Property Preview */}
        {property && isPropertyConfirmed && (
          <div className="xl:col-span-4 space-y-6">
            {isDemoMode && (
              <Button
                color="danger"
                variant="flat"
                onPress={exitDemoMode}
                className="w-full mb-4"
              >
                Exit Demo Mode
              </Button>
            )}
            <PropertyPreview property={property} />
            <PropertyKPIs property={property} />
          </div>
        )}

        {/* Right Column - Calculator */}
        <div className={property && isPropertyConfirmed ? "xl:col-span-8" : "xl:col-span-12"}>
          <SellerClosingCalculator
            property={property}
            transactionDetails={property?.transactionDetails}
            onTransactionUpdate={handleTransactionUpdate}
          />
        </div>
      </div>

      {/* Property Wizard Modal */}
      <Modal
        isOpen={showAddressModal}
        onOpenChange={setShowAddressModal}
        size="5xl"
        isDismissable={false}
        hideCloseButton
      >
        <ModalContent>
          {() => (
            <PropertyWizard
              property={property || { id: '', address: '', status: 'Active' }}
              onConfirm={handlePropertyConfirm}
              onCancel={handleWizardCancel}
            />
          )}
        </ModalContent>
      </Modal>

      {/* Demo Mode Modal */}
      <Modal isOpen={showDemoModal} onOpenChange={setShowDemoModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Try Demo Mode</ModalHeader>
              <ModalBody>
                <p>Would you like to try the calculator with a sample luxury waterfront property?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>Cancel</Button>
                <Button color="primary" onPress={handleDemoMode}>Start Demo</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {isLoading && <LoadingSpinner />}
    </>
  );
} 