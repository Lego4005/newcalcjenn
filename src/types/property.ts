export type MetricValue = {
  current: number;
  previous?: number;
  change?: number;
  history?: Array<{ value: number; timestamp?: string }>;
};

export type PropertyMetrics = {
  propertyValue?: MetricValue;
  monthlyIncome?: MetricValue;
  capRate?: MetricValue;
  roi?: MetricValue;
  cashOnCash?: MetricValue;
  debtServiceCoverage?: MetricValue;
};

export type PropertyFormData = {
  purchasePrice: number;
  monthlyIncome: number;
  downPayment?: number;
  interestRate?: number;
  loanTerm?: number;
  propertyTax?: number;
  insurance?: number;
  maintenanceReserve?: number;
  vacancyReserve?: number;
  managementFee?: number;
};

export type TransactionDetails = {
  salePrice: number;
  mortgageBalance?: number;
  monthlyPayment?: number;
  annualTaxes?: number;
  propertyTax?: number;
  insurance?: number;
  hoaFees?: number;
  hoaEstoppelFee?: number;
  buyerAgentCommission?: number;
  sellerAgentCommission?: number;
  closingDate?: string;
  hasHOA?: boolean;
  settlementFee?: number;
  titleSearch?: number;
  municipalLienSearch?: number;
  docStamps?: number;
  titleInsurance?: number;
  hasPriorTitlePolicy?: boolean;
  priorTitleAmount?: number;
  escrowFee?: number;
  titleFee?: number;
  sellerCredits?: number;
  repairCosts?: number;
  customCosts?: number;
  costResponsibility?: {
    [key: string]: 'seller' | 'buyer';
  };
};

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
  source?: {
    name: string;
    fetchDate: string;
  };
  transactionDetails?: TransactionDetails;
  metrics?: PropertyMetrics;
  formData?: PropertyFormData;
};