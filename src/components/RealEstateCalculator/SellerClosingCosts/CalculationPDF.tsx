/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { CalculatorFormData } from '@/types/calculator';

interface CalculationPDFProps {
  readonly formData: CalculatorFormData;
  readonly costs: Array<{
    readonly label: string;
    readonly amount: number;
    readonly type: string;
    readonly source: string;
    readonly tooltip?: string;
    readonly formula?: string;
  }>;
  readonly totalClosingCosts: number;
  readonly netProceeds: number;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Brand colors
const colors = {
  primary: '#0066CC',
  secondary: '#4A5568',
  accent: '#2C5282',
  gray: {
    light: '#F7FAFC',
    medium: '#E2E8F0',
    dark: '#4A5568'
  }
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 12,
    color: colors.secondary,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: colors.primary,
    paddingBottom: 20,
  },
  logoContainer: {
    width: 200,
  },
  logo: {
    width: 150,
    height: 50,
    objectFit: 'contain',
  },
  companyInfo: {
    textAlign: 'right',
    fontSize: 10,
    color: colors.gray.dark,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.accent,
    backgroundColor: colors.gray.light,
    padding: 8,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  costItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.medium,
    borderBottomStyle: 'solid',
  },
  costLabel: {
    flex: 1,
  },
  costAmount: {
    width: 120,
    textAlign: 'right',
  },
  formula: {
    fontSize: 10,
    color: colors.gray.dark,
    marginLeft: 20,
    marginTop: 2,
    fontStyle: 'italic',
  },
  summary: {
    marginTop: 30,
    padding: 15,
    backgroundColor: colors.gray.light,
    borderRadius: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryHighlight: {
    backgroundColor: colors.primary,
    color: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: colors.gray.dark,
    borderTop: 1,
    borderTopColor: colors.gray.medium,
    paddingTop: 20,
  },
});

export function CalculationPDF({ formData, costs, totalClosingCosts, netProceeds }: CalculationPDFProps) {
  const logoUrl = '/roca-logo.png';
  
  const renderLogo = () => {
    return (
      <Image 
        src={logoUrl} 
        style={styles.logo} 
      />
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Logo and Company Info */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            {renderLogo()}
          </View>
          <View style={styles.companyInfo}>
            <Text>Roca Title</Text>
            <Text>123 Business Ave</Text>
            <Text>Miami, FL 33101</Text>
            <Text>Tel: (305) 555-0123</Text>
            <Text>www.rocatitle.com</Text>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Closing Cost Estimate</Text>
          <Text style={styles.subtitle}>
            Property Sale Price: {formatCurrency(formData.propertyDetails.salePrice)}
          </Text>
        </View>

        {/* Costs Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Cost Breakdown</Text>
          {costs.map((item) => (
            <View key={`cost-${item.label}`}>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>{item.label}</Text>
                <Text style={styles.costAmount}>{formatCurrency(item.amount)}</Text>
              </View>
              {item.formula && (
                <Text style={styles.formula}>{item.formula}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>Transaction Summary</Text>
          <View style={styles.summaryRow}>
            <Text>Sale Price:</Text>
            <Text>{formatCurrency(formData.propertyDetails.salePrice)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Total Closing Costs:</Text>
            <Text>{formatCurrency(totalClosingCosts)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Mortgage Balance:</Text>
            <Text>{formatCurrency(formData.mortgageInfo.loanBalance)}</Text>
          </View>
          <View style={styles.summaryHighlight}>
            <Text>Estimated Net Proceeds:</Text>
            <Text>{formatCurrency(netProceeds)}</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString()} by Roca Title
          {'\n'}This estimate is based on current market rates and is subject to change.
          {'\n\n'}For questions about this estimate, please contact your Roca Title representative at (305) 555-0123.
        </Text>
      </Page>
    </Document>
  );
}