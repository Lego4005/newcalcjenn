"use client";

import { useState } from "react";
import { Button, Link } from "@heroui/react"; // Assuming Button and Link are available here

// Import the components we want to cycle through
import PropertyDashboard from "../../components/RealEstateCalculator/Dashboard/PropertyDashboard";
import { PropertyCalculator } from "../../components/RealEstateCalculator/PropertyCalculator";
import { SetupWizard } from "../../components/RealEstateCalculator/SetupWizard";
import { CommandMenu } from "../../components/RealEstateCalculator/CommandMenu";
import CalculationResults from "../../components/RealEstateCalculator/SellerClosingCosts/CalculationResults";
import { InviteMember } from "../../components/RealEstateCalculator/InviteMember";
import PropertyHistory from "../../components/RealEstateCalculator/Dashboard/PropertyHistory";
import AdditionalFeesForm from "../../components/RealEstateCalculator/SellerClosingCosts/steps/AdditionalFeesForm";
// Add missing Seller Closing Costs components
import SellerClosingCalculator from "../../components/RealEstateCalculator/SellerClosingCosts/SellerClosingCalculator";
import PropertyDetailsForm from "../../components/RealEstateCalculator/SellerClosingCosts/steps/PropertyDetailsForm";
import CommissionForm from "../../components/RealEstateCalculator/SellerClosingCosts/steps/CommissionForm";
import MortgageInfoForm from "../../components/RealEstateCalculator/SellerClosingCosts/steps/MortgageInfoForm";

// Import the main form data type
import type { CalculatorFormData } from "../../components/RealEstateCalculator/SellerClosingCosts/SellerClosingCalculator";

// Define the list of components and their names
const componentsToView = [
  { name: "PropertyDashboard", component: PropertyDashboard },
  { name: "PropertyCalculator", component: PropertyCalculator },
  { name: "SetupWizard", component: SetupWizard },
  { name: "CommandMenu", component: CommandMenu },
  { name: "CalculationResults", component: CalculationResults, requiresProp: "formData" }, // Mark prop needed
  { name: "InviteMember", component: InviteMember },
  { name: "PropertyHistory", component: PropertyHistory, requiresProp: "property" }, // Mark that this needs a prop
  { name: "SellerClosingCalculator", component: SellerClosingCalculator }, // Added
  { name: "PropertyDetailsForm", component: PropertyDetailsForm, requiresProp: "formData" }, // Added, mark prop needed
  { name: "CommissionForm", component: CommissionForm, requiresProp: "formData" }, // Added, mark prop needed
  { name: "MortgageInfoForm", component: MortgageInfoForm, requiresProp: "formData" }, // Added, mark prop needed
  { name: "AdditionalFeesForm", component: AdditionalFeesForm, requiresProp: "formData" }, // Mark prop needed
];

// Define mock property data type (consider moving to a shared types file later)
type MockProperty = {
  id: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  lotSize: number;
  propertyType: string;
  status: "Active" | "Pending" | "Sold";
  images: string[];
};

// Define type for component props in the viewer
type ViewerComponentProps = {
  property?: MockProperty;
  formData?: CalculatorFormData | null;
  data?: Partial<CalculatorFormData[keyof CalculatorFormData]> | null;
  onUpdate?: (data: Partial<CalculatorFormData[keyof CalculatorFormData]>) => void;
};

// Mock data for components that need it
const mockPropertyData: MockProperty = {
  id: "mock-123",
  address: "456 Mock Lane, Testville, USA",
  price: 550000,
  beds: 4,
  baths: 3,
  sqft: 2500,
  yearBuilt: 2015,
  lotSize: 6000,
  propertyType: "Mock Home",
  status: "Active",
  images: [],
};

// Mock form data (consider expanding based on CalculatorFormData type)
const mockFormData: CalculatorFormData = {
  propertyDetails: { salePrice: 600000 },
  commissionStructure: { listingAgentRate: 2.5, buyerAgentRate: 2.5 },
  mortgageInfo: { loanBalance: 250000 },
  additionalFees: { taxProrations: 1200, hasPriorTitlePolicy: true, hoaDues: 150 },
};

// Placeholder update function with stricter type
const mockOnUpdate = (data: Partial<CalculatorFormData[keyof CalculatorFormData]>) => {
  console.log("Viewer: onUpdate called with", data);
};

export default function ComponentViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? componentsToView.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === componentsToView.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentComponentConfig = componentsToView[currentIndex];
  const CurrentComponent = currentComponentConfig.component;
  const currentComponentName = currentComponentConfig.name;

  // Prepare props based on the component's needs
  const componentProps: ViewerComponentProps = {}; // Use the specific type
  if (currentComponentConfig.requiresProp === "property") {
    componentProps.property = mockPropertyData;
  }
  // Pass mock form data and update function to relevant components
  if (currentComponentConfig.requiresProp === "formData") {
    // Pass specific slices of formData if needed, or the whole thing
    // For simplicity now, passing potentially relevant data/functions
    // Adjust based on each component's actual needs
    if (currentComponentName === "CalculationResults") {
      componentProps.formData = mockFormData;
    } else if (currentComponentName.endsWith("Form")) {
      // Pass the relevant slice of data and the update function to forms
      if (currentComponentName === "PropertyDetailsForm") componentProps.data = mockFormData.propertyDetails;
      if (currentComponentName === "CommissionForm") componentProps.data = mockFormData.commissionStructure;
      if (currentComponentName === "MortgageInfoForm") componentProps.data = mockFormData.mortgageInfo;
      if (currentComponentName === "AdditionalFeesForm") componentProps.data = mockFormData.additionalFees;
      componentProps.onUpdate = mockOnUpdate; // Pass placeholder function
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Component Viewer</h1>
      
      {/* Links to demo pages */}
      <div className="mb-4 flex flex-wrap gap-4"> {/* Use flex-wrap for better spacing */}
        <Link href="/component-viewer/use-isomorphic-layout-effect" color="primary">
          useIsomorphicLayoutEffect Demo
        </Link>
        <Link href="/component-viewer/bounce-cards" color="secondary"> {/* Added link */}
          Bounce Cards Demo
        </Link>
        <Link href="/component-viewer/navbar-menu" color="success"> {/* Added link */}
          Navbar Menu Demo
        </Link>
        <Link href="/component-viewer/animated-net-sheet" color="warning"> {/* Added link */}
          Animated Net Sheet Demo
        </Link>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Button variant="flat" onClick={handlePrevious}>Previous</Button>
        <span className="text-sm text-gray-500">({currentIndex + 1} / {componentsToView.length})</span>
        <Button variant="flat" onClick={handleNext}>Next</Button>
      </div>
      
      <div className="border p-4 rounded mb-8">
        <h2 className="text-xl font-semibold mb-2">{currentComponentName}</h2>
        {/* Spread the prepared props onto the component */}
        <CurrentComponent {...componentProps} />
      </div>

      {/* Note: Some components might require specific props or context to render correctly. 
          This viewer provides a basic rendering environment. */}
      
    </div>
  );
} 