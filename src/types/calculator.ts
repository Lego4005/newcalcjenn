export interface CalculatorDefaults {
  defaultBuyerAgentCommission: number;
  defaultSellerAgentCommission: number;
  defaultSettlementFee: number;
  defaultTitleSearch: number;
  defaultMunicipalLienSearch: number;
  defaultDocStampRate: number;
  titleInsuranceBaseRate: number;
  titleInsuranceExcessRate: number;
}

export interface PropertyDetails {
  salePrice: number;
  purchaseDate: string;
}

export interface MortgageInfo {
  loanBalance: number;
  hasHOA: boolean;
}

export interface CommissionStructure {
  listingAgentRate: number;
  buyerAgentRate: number;
}

export interface CostResponsibility {
  settlementFee: 'seller' | 'buyer';
  titleSearch: 'seller' | 'buyer';
  municipalLienSearch: 'seller' | 'buyer';
  titleInsurance: 'seller' | 'buyer';
  docStamps: 'seller' | 'buyer';
}

export interface AdditionalFees {
  hasPriorTitlePolicy: boolean;
  priorTitleAmount: number;
  taxProrations: number;
  hoaDues: number;
  hoaEstoppelFee: number;
  settlementFee: number;
  titleSearch: number;
  municipalLienSearch: number;
  docStamps: number;
  titleInsurance: number;
  costResponsibility: CostResponsibility;
}

export interface CalculatorFormData {
  propertyDetails: PropertyDetails;
  mortgageInfo: MortgageInfo;
  commissionStructure: CommissionStructure;
  additionalFees: AdditionalFees;
}