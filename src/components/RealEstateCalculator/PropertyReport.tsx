import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import type { Property } from '@/types/property';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { calculateCapRate, calculateROI, calculateCashOnCash, calculateDSCR } from '@/utils/calculator';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: '1pt solid #e5e7eb',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    border: '1pt solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#374151',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  kpiCard: {
    flex: 1,
    minWidth: '30%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9fafb',
  },
  kpiTitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  kpiTrend: {
    fontSize: 12,
    color: '#059669',
  },
  kpiTrendNegative: {
    fontSize: 12,
    color: '#dc2626',
  },
  propertyDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  detailItem: {
    flex: 1,
    minWidth: '45%',
  },
  detailLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    color: '#111827',
  },
  chart: {
    marginVertical: 10,
    height: 200,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    paddingTop: 10,
    borderTop: '1pt solid #e5e7eb',
    fontSize: 10,
    color: '#6b7280',
  },
});

const CHART_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'
];

interface PropertyReportProps {
  readonly property: Property;
  readonly historicalMetrics?: {
    timestamp: string;
    value: number;
  }[];
}

const TrendingUpIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24">
    <Path
      d="M23 6l-9.5 9.5-5-5L1 18"
      stroke="#059669"
      strokeWidth={2}
      fill="none"
    />
  </Svg>
);

const TrendingDownIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24">
    <Path
      d="M23 18l-9.5-9.5-5 5L1 6"
      stroke="#dc2626"
      strokeWidth={2}
      fill="none"
    />
  </Svg>
);

const DonutChartSVG = ({ data }: { data: Array<{ name: string; value: number }> }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  const radius = 50;
  const center = { x: 100, y: 100 };

  return (
    <Svg width={200} height={200} viewBox="0 0 200 200">
      {data.map((item, index) => {
        const percentage = item.value / total;
        const angle = percentage * 360;
        const startAngle = currentAngle;
        currentAngle += angle;
        
        const startRad = (startAngle - 90) * Math.PI / 180;
        const endRad = (startAngle + angle - 90) * Math.PI / 180;
        
        const x1 = center.x + radius * Math.cos(startRad);
        const y1 = center.y + radius * Math.sin(startRad);
        const x2 = center.x + radius * Math.cos(endRad);
        const y2 = center.y + radius * Math.sin(endRad);
        
        const largeArc = angle > 180 ? 1 : 0;
        
        const pathData = [
          `M ${center.x} ${center.y}`,
          `L ${x1} ${y1}`,
          `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
          'Z'
        ].join(' ');

        return (
          <Path
            key={item.name}
            d={pathData}
            fill={CHART_COLORS[index % CHART_COLORS.length]}
          />
        );
      })}
      {/* Inner circle for donut effect */}
      <Path
        d={`M ${center.x} ${center.y} m -30,0 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0`}
        fill="white"
      />
    </Svg>
  );
};

const SparklineSVG = ({ data }: { data: Array<{ timestamp: string; value: number }> }) => {
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 180 + 10;
    const y = 190 - ((d.value - min) / range) * 180;
    return `${x},${y}`;
  }).join(' ');

  return (
    <Svg width={200} height={200} viewBox="0 0 200 200">
      <Path
        d={`M ${points}`}
        stroke="#3b82f6"
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
};

export function PropertyReport({ property, historicalMetrics }: PropertyReportProps) {
  const kpis = [
    {
      title: 'Price per Sqft',
      value: formatCurrency(property.price / property.sqft),
      change: 5.2,
      trend: 'up' as const,
      timeframe: 'vs last month',
    },
    {
      title: 'Market Value',
      value: formatCurrency(property.price),
      change: 3.1,
      trend: 'up' as const,
      timeframe: 'vs last quarter',
    },
    {
      title: 'Days on Market',
      value: '15',
      change: 25,
      trend: 'down' as const,
      timeframe: 'vs avg',
    },
  ];

  const costBreakdown = [
    { name: 'Principal & Interest', value: property.transactionDetails?.monthlyPayment ?? 0 },
    { name: 'Property Tax', value: property.transactionDetails?.propertyTax ?? property.transactionDetails?.annualTaxes ?? 0 },
    { name: 'Insurance', value: property.transactionDetails?.insurance ?? property.transactionDetails?.titleInsurance ?? 0 },
    { name: 'HOA', value: property.transactionDetails?.hoaFees ?? 0 },
    { name: 'Other Fees', value: property.transactionDetails?.settlementFee ?? 0 },
  ].filter(item => item.value > 0);

  const propertyMetrics = {
    propertyValue: property.metrics?.propertyValue?.current ?? property.price,
    monthlyIncome: property.metrics?.monthlyIncome?.current ?? (property.formData?.monthlyIncome ?? 0),
    capRate: property.metrics?.capRate?.current ?? calculateCapRate(property),
    roi: property.metrics?.roi?.current ?? calculateROI(property),
    cashOnCash: property.metrics?.cashOnCash?.current ?? calculateCashOnCash(property),
    debtServiceCoverage: property.metrics?.debtServiceCoverage?.current ?? calculateDSCR(property)
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Property Report</Text>
          <Text style={styles.subtitle}>{property.address}</Text>
        </View>

        {/* KPIs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.grid}>
            {kpis.map((kpi) => (
              <View key={kpi.title} style={styles.kpiCard}>
                <Text style={styles.kpiTitle}>{kpi.title}</Text>
                <Text style={styles.kpiValue}>{kpi.value}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  {kpi.trend === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                  <Text style={kpi.trend === 'up' ? styles.kpiTrend : styles.kpiTrendNegative}>
                    {kpi.change}% {kpi.timeframe}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Property Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Details</Text>
          <View style={styles.propertyDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Property Type</Text>
              <Text style={styles.detailValue}>{property.propertyType}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Year Built</Text>
              <Text style={styles.detailValue}>{property.yearBuilt}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Square Footage</Text>
              <Text style={styles.detailValue}>{formatNumber(property.sqft)} sqft</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Lot Size</Text>
              <Text style={styles.detailValue}>{formatNumber(property.lotSize)} sqft</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Bedrooms</Text>
              <Text style={styles.detailValue}>{property.beds}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Bathrooms</Text>
              <Text style={styles.detailValue}>{property.baths}</Text>
            </View>
          </View>
        </View>

        {/* Transaction Details */}
        {property.transactionDetails && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Transaction Details</Text>
            <View style={styles.propertyDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Sale Price</Text>
                <Text style={styles.detailValue}>
                  {formatCurrency(property.transactionDetails.salePrice)}
                </Text>
              </View>
              {property.transactionDetails.mortgageBalance && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Mortgage Balance</Text>
                  <Text style={styles.detailValue}>
                    {formatCurrency(property.transactionDetails.mortgageBalance)}
                  </Text>
                </View>
              )}
              {property.transactionDetails.annualTaxes && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Annual Taxes</Text>
                  <Text style={styles.detailValue}>
                    {formatCurrency(property.transactionDetails.annualTaxes)}
                  </Text>
                </View>
              )}
              {property.transactionDetails.hasHOA && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>HOA Fees</Text>
                  <Text style={styles.detailValue}>
                    {formatCurrency(property.transactionDetails.hoaFees ?? 0)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Financial Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Metrics</Text>
          <View style={styles.propertyDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Property Value</Text>
              <Text style={styles.detailValue}>
                {formatCurrency(propertyMetrics.propertyValue)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Monthly Income</Text>
              <Text style={styles.detailValue}>
                {formatCurrency(propertyMetrics.monthlyIncome)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Cap Rate</Text>
              <Text style={styles.detailValue}>
                {propertyMetrics.capRate.toFixed(2)}%
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>ROI</Text>
              <Text style={styles.detailValue}>
                {propertyMetrics.roi.toFixed(2)}%
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Cash on Cash Return</Text>
              <Text style={styles.detailValue}>
                {propertyMetrics.cashOnCash.toFixed(2)}%
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Debt Service Coverage</Text>
              <Text style={styles.detailValue}>{propertyMetrics.debtServiceCoverage}</Text>
            </View>
          </View>
        </View>

        {/* Cost Breakdown Chart */}
        {costBreakdown.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cost Breakdown</Text>
            <View style={styles.chart}>
              <DonutChartSVG data={costBreakdown} />
            </View>
          </View>
        )}

        {/* Historical Trends */}
        {historicalMetrics && historicalMetrics.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Historical Value Trend</Text>
            <View style={styles.chart}>
              <SparklineSVG data={historicalMetrics} />
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>Generated on {new Date().toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  );
}