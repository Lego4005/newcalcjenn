"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Tab,
  Tabs,
  Button,
  Spinner,
} from "@heroui/react";
import {
  Share2,
  Download,
  Home,
  Calculator,
  History,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import SellerClosingCalculator from "../SellerClosingCosts/SellerClosingCalculator";
import PropertyHistory from "./PropertyHistory";
import { MapboxMap } from "@/components/Map";
import { useTheme } from 'next-themes';
import { searchPropertyByAddress } from "@/lib/rapidapi/zillow56";
import PropertyDetailsPanel from './PropertyDetailsPanel';
import BuyerClosingCalculator from '../BuyerClosingCosts/BuyerClosingCalculator';
import AddressSearchBar from './AddressSearchBar';
import RentalAnalysisCalculator from '../RentalAnalysis/RentalAnalysisCalculator';

export type Property = unknown;

const tabVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 20 : -20,
    opacity: 0,
  }),
};

export default function PropertyDashboard() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialAddress = searchParams.get("address");
  const [selectedTab, setSelectedTab] = useState("buyer_costs");
  const [property, setProperty] = useState<Property | null>(null);
  const [slideDirection, setSlideDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const { theme } = useTheme();

  const fetchProperty = useCallback(async (address: string) => {
    setIsLoading(true);
    setMapError(null);
    setProperty(null);
    console.log(`Fetching property for address: ${address}`);
    try {
      const data = await searchPropertyByAddress(address);
      if (data.error) {
        throw new Error(data.error);
      }
      setProperty(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Failed to fetch property:", message);
      setMapError(`Failed to load property data: ${message}`);
      setProperty(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialAddress) {
      fetchProperty(initialAddress);
    }
  }, [initialAddress, fetchProperty]);

  useEffect(() => {
    if (tabParam && ["seller_costs", "buyer_costs", "rental_analysis", "property", "history"].includes(tabParam)) {
      setSelectedTab(tabParam);
    } else if (!tabParam && !initialAddress) {
      setSelectedTab("buyer_costs");
    }
  }, [tabParam, initialAddress]);

  const handleTabChange = (key: string) => {
    setSlideDirection(key > selectedTab ? 1 : -1);
    setSelectedTab(key);
  };

  const handleShare = () => {
    console.log("Share clicked");
  };

  const handleDownload = () => {
    console.log("Download clicked");
  };

  const handleSearchSubmit = (address: string) => {
    fetchProperty(address);
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
    <div className="space-y-6 w-full">
      <motion.div
        className="w-full flex justify-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
         <AddressSearchBar onSearch={handleSearchSubmit} isLoading={isLoading} />
      </motion.div>

      <motion.div
        className="h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden relative shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MapboxMap 
          isDarkMode={theme === 'dark'}
          propertyData={property}
        />
        <AnimatePresence>
          {isLoading && !property && <LoadingSpinner />}
        </AnimatePresence>
        {mapError && (
           <div className="absolute top-2 left-2 bg-danger/80 text-danger-foreground p-2 rounded shadow-md text-sm z-10">
             {mapError}
           </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full">
        <motion.div
          className="xl:col-span-4 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <PropertyDetailsPanel property={property} isLoading={isLoading && !property} />
          
            {!isLoading && !property && mapError && (
              <Card className="w-full h-[100px] flex items-center justify-center">
                <CardBody className="text-center text-danger">
                  <p>Could not load property data.</p>
                  <p className="text-sm">{mapError}</p>
                </CardBody>
              </Card>
            )}
        </motion.div>

        <motion.div
          className="xl:col-span-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="w-full">
             <CardHeader className="flex flex-col gap-2">
               <div className="flex justify-between items-center w-full">
                 <h2 className="text-2xl font-bold">Property Analysis</h2>
                 <div className="flex gap-2">
                   <Button
                     isIconOnly
                     variant="flat"
                     aria-label="Share"
                     onPress={handleShare}
                     isDisabled={!property}
                   >
                     <Share2 className="w-4 h-4" />
                   </Button>
                   <Button
                     isIconOnly
                     variant="flat"
                     aria-label="Download"
                     onPress={handleDownload}
                     isDisabled={!property}
                   >
                     <Download className="w-4 h-4" />
                   </Button>
                 </div>
               </div>

               <Tabs
                 selectedKey={selectedTab}
                 onSelectionChange={(key) => handleTabChange(key.toString())}
                 aria-label="Property Analysis Options"
                 color="primary"
                 variant="underlined"
                 isDisabled={!property}
                 classNames={{
                   tabList: "gap-6",
                   cursor: "w-full",
                 }}
               >
                 <Tab
                   key="seller_costs"
                   title={
                     <div className="flex items-center gap-2">
                       <Calculator className="w-4 h-4" />
                       <span>Seller Costs</span>
                     </div>
                   }
                 />
                 <Tab
                   key="buyer_costs"
                   title={
                     <div className="flex items-center gap-2">
                       <Calculator className="w-4 h-4" />
                       <span>Buyer Costs</span>
                     </div>
                   }
                 />
                 <Tab
                   key="rental_analysis"
                   title={
                     <div className="flex items-center gap-2">
                       <Home className="w-4 h-4" />
                       <span>Rental Analysis</span>
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
               {!property && !isLoading && (
                 <div className="text-center py-16 text-default-500">
                   {mapError ? mapError : "Search for a property using the bar above to view analysis tools."}
                 </div>
               )}
               {isLoading && !property && (
                 <div className="text-center py-16">
                   <Spinner label="Loading Analysis Tools..." />
                 </div>
               )}
               {property && (
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
                       opacity: { duration: 0.2 },
                     }}
                   >
                     {selectedTab === "seller_costs" && <SellerClosingCalculator />}
                     {selectedTab === "buyer_costs" && <BuyerClosingCalculator />}
                     {selectedTab === "rental_analysis" && <RentalAnalysisCalculator />}
                     {selectedTab === "property" && <div>Property Details Content Placeholder</div>}
                     {selectedTab === "history" && <PropertyHistory property={property} />}
                   </motion.div>
                 </AnimatePresence>
               )}
             </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
