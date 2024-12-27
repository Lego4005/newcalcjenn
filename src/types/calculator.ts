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

export interface CalculatorFormData {
  salePrice: number;
  mortgageBalance: number;
  annualTaxes: number;
  hoaFees: number;
  buyerAgentCommission: number;
  sellerAgentCommission: number;
  settlementFee: number;
  titleSearch: number;
  municipalLienSearch: number;
  titleInsurance: number;
  docStamps: number;
  sellerCredits: number;
  repairCosts: number;
  customCosts: number;
  closingDate: string;
} 