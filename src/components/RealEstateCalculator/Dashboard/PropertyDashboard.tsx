import { useState } from 'react';
import { Card, CardBody, CardHeader, Tab, Tabs, Button, Spinner } from '@nextui-org/react';
import { Share2, Download, Home, Calculator, History, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SellerClosingCalculator from '../SellerClosingCosts/SellerClosingCalculator';
import PropertyPreview from './PropertyPreview';
import PropertyKPIs from './PropertyKPIs';
import PropertyHistory from './PropertyHistory';

export type Property = {
  id: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  lotSize: number;
  propertyType: string;
  status: 'Active' | 'Pending' | 'Sold';
  images: string[];
};

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
  const [property, setProperty] = useState<Property | null>(
    // Mock property data - replace with Supabase data
    {
      id: '1',
      address: '123 Main St, Anytown, USA',
      price: 450000,
      beds: 3,
      baths: 2,
      sqft: 2000,
      yearBuilt: 2010,
      lotSize: 5000,
      propertyType: 'Single Family',
      status: 'Active',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2075&auto=format&fit=crop',
      ],
    }
  );
  const [slideDirection, setSlideDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleAddProperty = async () => {
    setIsLoading(true);
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProperty(null);
    setIsLoading(false);
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

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full">
      {/* Left Column - Property Preview & KPIs */}
      <motion.div 
        className="xl:col-span-4 space-y-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {property ? (
          <>
            <PropertyPreview property={property} />
            <PropertyKPIs property={property} />
          </>
        ) : (
          <Card className="w-full h-[400px] flex items-center justify-center relative overflow-hidden">
            <AnimatePresence>
              {isLoading && <LoadingSpinner />}
            </AnimatePresence>
            <CardBody className="text-center">
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="bg-default-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus className="w-8 h-8 text-default-500" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">No Property Selected</h3>
                  <p className="text-default-500 mb-4">
                    Add a property to start calculating closing costs and analyzing market data.
                  </p>
                  <Button
                    color="primary"
                    startContent={<Plus className="w-4 h-4" />}
                    onPress={handleAddProperty}
                    isLoading={isLoading}
                  >
                    Add Property
                  </Button>
                </div>
              </motion.div>
            </CardBody>
          </Card>
        )}
      </motion.div>

      {/* Right Column - Calculator & Tools */}
      <motion.div 
        className="xl:col-span-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full">
          <CardHeader className="flex flex-col gap-2">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-bold">Property Analysis</h2>
              <div className="flex gap-2">
                <Button
                  variant="flat"
                  startContent={<Share2 className="w-4 h-4" />}
                  onPress={handleShare}
                >
                  Share
                </Button>
                <Button
                  variant="flat"
                  startContent={<Download className="w-4 h-4" />}
                  onPress={handleDownload}
                >
                  Export
                </Button>
              </div>
            </div>

            <Tabs
              selectedKey={selectedTab}
              onSelectionChange={(key) => handleTabChange(key.toString())}
              aria-label="Property Analysis Options"
              color="primary"
              variant="underlined"
              classNames={{
                tabList: "gap-6",
                cursor: "w-full",
              }}
            >
              <Tab
                key="calculator"
                title={
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    <span>Closing Costs</span>
                  </div>
                }
              />
              <Tab
                key="property"
                title={
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    <span>Property Details</span>
                  </div>
                }
              />
              <Tab
                key="history"
                title={
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4" />
                    <span>History</span>
                  </div>
                }
              />
            </Tabs>
          </CardHeader>

          <CardBody>
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={selectedTab}
                custom={slideDirection}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                {selectedTab === 'calculator' && property && <SellerClosingCalculator />}
                {selectedTab === 'property' && property && <div>Property Details Content</div>}
                {selectedTab === 'history' && property && <PropertyHistory property={property} />}
                {!property && (
                  <div className="text-center py-8 text-default-500">
                    Please add a property to view this section
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
} 