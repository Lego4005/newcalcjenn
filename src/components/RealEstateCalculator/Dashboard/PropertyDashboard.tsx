import { useState, useEffect, useCallback } from 'react';
import { Share2, Download, Bell } from 'lucide-react';
import { 
  Card,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from "@heroui/react";
import type { Property, TransactionDetails } from '@/types/property';
import SellerClosingCalculator from '../SellerClosingCosts/SellerClosingCalculator';
import PropertyWizard from '../PropertyWizard/PropertyWizard';
import LoadingSpinner from './LoadingSpinner';
import { getProperty, getTransaction, saveTransaction } from '@/lib/storage';
import { usePropertyUpdates } from '@/hooks/usePropertyUpdates';

export default function PropertyDashboard() {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isPropertyConfirmed, setIsPropertyConfirmed] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<TransactionDetails | null>(null);
  const [updateNotification, setUpdateNotification] = useState<string | null>(null);

  // Memoize the update handler
  const handlePropertyUpdate = useCallback((update: { type: string; property: Property }) => {
    if (update.type === 'UPDATE' && update.property.id === property?.id) {
      setProperty(update.property);
      setUpdateNotification('Property details have been updated');
      // Auto-dismiss notification after 5 seconds
      setTimeout(() => setUpdateNotification(null), 5000);
    }
  }, [property?.id]);

  // Subscribe to real-time updates for the current property
  const { error: updateError } = usePropertyUpdates({
    propertyIds: property?.id ? [property.id] : undefined,
    onUpdate: handlePropertyUpdate
  });

  const handleDemoMode = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
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
        images: ['/demo-property.jpg'],
        source: {
          name: 'Demo Data',
          fetchDate: new Date().toISOString(),
        },
      };

      setProperty(demoProperty);
      
      const demoTransaction: TransactionDetails = {
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

      saveTransaction(demoProperty.id, demoTransaction);
      
      setProperty(prev => {
        if (!prev) return null;
        return {
          ...prev,
          transactionDetails: demoTransaction
        };
      });

      setIsDemoMode(true);
      setIsPropertyConfirmed(true);
      setShowDemoModal(false);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleTransactionUpdate = useCallback((details: TransactionDetails | null) => {
    if (details === null) {
      setShowWizard(true);
    } else if (details.salePrice === 450000) {
      handleDemoMode();
    } else {
      setPendingTransaction(details);
    }
  }, [handleDemoMode]);

  // Handle transaction updates
  useEffect(() => {
    if (pendingTransaction && property?.id) {
      saveTransaction(property.id, pendingTransaction);
      setProperty(prev => {
        if (!prev) return null;
        return {
          ...prev,
          transactionDetails: pendingTransaction
        };
      });
      setPendingTransaction(null);
    }
  }, [pendingTransaction, property?.id]);

  // Load property from URL parameter
  useEffect(() => {
    const loadPropertyAndTransaction = async () => {
      const params = new URLSearchParams(window.location.search);
      const propertyId = params.get('propertyId');
      
      if (propertyId) {
        try {
          const savedProperty = await getProperty(propertyId);
          if (savedProperty) {
            setProperty(savedProperty);
            setIsPropertyConfirmed(true);
            
            const transaction = await getTransaction(propertyId);
            if (transaction) {
              setProperty(prev => {
                if (!prev) return null;
                return {
                  ...prev,
                  transactionDetails: transaction
                };
              });
            }
          }
        } catch (error) {
          console.error('Error loading property:', error);
          setFetchError('Failed to load property details');
        }
      }
    };

    loadPropertyAndTransaction();
  }, []);

  // Update URL when property changes
  useEffect(() => {
    if (property?.id && isPropertyConfirmed) {
      const url = new URL(window.location.href);
      url.searchParams.set('propertyId', property.id);
      window.history.replaceState({}, '', url.toString());
    }
  }, [property?.id, isPropertyConfirmed]);

  const exitDemoMode = () => {
    setProperty(null);
    setIsDemoMode(false);
    setIsPropertyConfirmed(false);
    setPendingTransaction(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('propertyId');
    window.history.replaceState({}, '', url.toString());
  };

  const handleShare = () => {
    console.log('Share clicked');
  };

  const handleDownload = () => {
    console.log('Download clicked');
  };

  if (showWizard) {
    return (
      <PropertyWizard 
        property={property || undefined}
        onConfirm={(selectedProperty) => {
          if (selectedProperty) {
            setProperty(selectedProperty);
            setShowWizard(false);
            setIsPropertyConfirmed(true);
          }
        }}
        onCancel={() => {
          setShowWizard(false);
        }}
      />
    );
  }

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardBody className="flex flex-col gap-6 p-6">
        {fetchError && (
          <Alert 
            color="danger" 
            className="mb-4"
            onClose={() => setFetchError(null)}
          >
            {fetchError}
          </Alert>
        )}

        {updateError && (
          <Alert 
            color="danger" 
            className="mb-4"
          >
            Failed to subscribe to property updates: {updateError.message}
          </Alert>
        )}

        {updateNotification && (
          <Alert 
            color="success" 
            className="mb-4"
            startContent={<Bell className="w-4 h-4" />}
            onClose={() => setUpdateNotification(null)}
          >
            {updateNotification}
          </Alert>
        )}

        <SellerClosingCalculator
          property={property}
          transactionDetails={property?.transactionDetails || pendingTransaction}
          onTransactionUpdate={handleTransactionUpdate}
          onSearch={() => setShowWizard(true)}
        />

        <Modal
          isOpen={showDemoModal}
          onClose={() => setShowDemoModal(false)}
          placement="center"
        >
          <ModalContent>
            <ModalHeader>Try Demo Mode</ModalHeader>
            <ModalBody>
              <p>Would you like to try the calculator with demo property data?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => setShowDemoModal(false)}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleDemoMode}>
                Try Demo
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {property && isPropertyConfirmed && (
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="flat"
              color="primary"
              startContent={<Share2 className="w-4 h-4" />}
              onPress={handleShare}
            >
              Share
            </Button>
            <Button
              variant="flat"
              color="primary"
              startContent={<Download className="w-4 h-4" />}
              onPress={handleDownload}
            >
              Download PDF
            </Button>
            {isDemoMode && (
              <Button color="danger" variant="light" onPress={exitDemoMode}>
                Exit Demo Mode
              </Button>
            )}
          </div>
        )}
        {isLoading && <LoadingSpinner />}
      </CardBody>
    </Card>
  );
}