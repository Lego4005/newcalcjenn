import type { Property } from '@/types/property';

export function calculateCapRate(property: Property): number {
  const annualIncome = (property.formData?.monthlyIncome ?? 0) * 12;
  const propertyValue = property.formData?.purchasePrice ?? property.price;
  
  if (!propertyValue) return 0;
  return Number(((annualIncome / propertyValue) * 100).toFixed(2));
}

export function calculateROI(property: Property): number {
  const annualIncome = (property.formData?.monthlyIncome ?? 0) * 12;
  const propertyValue = property.formData?.purchasePrice ?? property.price;
  const downPayment = property.formData?.downPayment ?? propertyValue;
  
  if (!downPayment) return 0;
  return Number(((annualIncome / downPayment) * 100).toFixed(2));
}

export function calculateCashOnCash(property: Property): number {
  const annualIncome = (property.formData?.monthlyIncome ?? 0) * 12;
  const downPayment = property.formData?.downPayment ?? 0;
  const annualExpenses = calculateAnnualExpenses(property);
  const annualCashFlow = annualIncome - annualExpenses;
  
  if (!downPayment) return 0;
  return Number(((annualCashFlow / downPayment) * 100).toFixed(2));
}

export function calculateDSCR(property: Property): number {
  const annualIncome = (property.formData?.monthlyIncome ?? 0) * 12;
  const annualDebtService = (property.transactionDetails?.monthlyPayment ?? 0) * 12;
  
  if (!annualDebtService) return 0;
  return Number((annualIncome / annualDebtService).toFixed(2));
}

function calculateAnnualExpenses(property: Property): number {
  const monthlyPayment = property.transactionDetails?.monthlyPayment ?? 0;
  const propertyTax = property.formData?.propertyTax ?? property.transactionDetails?.propertyTax ?? 0;
  const insurance = property.formData?.insurance ?? property.transactionDetails?.insurance ?? 0;
  const maintenance = (property.formData?.maintenanceReserve ?? 0.01) * (property.formData?.purchasePrice ?? property.price);
  const vacancy = (property.formData?.vacancyReserve ?? 0.05) * ((property.formData?.monthlyIncome ?? 0) * 12);
  const management = (property.formData?.managementFee ?? 0.1) * ((property.formData?.monthlyIncome ?? 0) * 12);
  
  return (monthlyPayment * 12) + propertyTax + insurance + maintenance + vacancy + management;
}