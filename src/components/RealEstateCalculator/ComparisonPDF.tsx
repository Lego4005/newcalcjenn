import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { SavedCalculation, ComparisonMetric } from './PropertyComparison';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    border: '1pt solid #e5e7eb',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '1pt solid #e5e7eb',
  },
  metricLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  maxDiff: {
    fontSize: 12,
    color: '#6b7280',
  },
  propertyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  propertyValue: {
    flex: 1,
    minWidth: '30%',
  },
  propertyName: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

interface ComparisonPDFProps {
  readonly metrics: ComparisonMetric[]
  readonly calculations: SavedCalculation[]
}

const formatValue = (value: number | string, isPercentage: boolean = false) => {
  if (typeof value === 'number') {
    return isPercentage
      ? `${(value * 100).toFixed(2)}%`
      : `$${value.toLocaleString()}`;
  }
  return value;
};

export function ComparisonPDF({ metrics, calculations }: ComparisonPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Property Comparison</Text>
        
        {metrics.map((metric) => {
          const values = Object.entries(metric.values);
          const firstValue = values[0]?.[1] as number;
          const maxDiff = values.reduce(
            (max, [, val]) => Math.max(max, Math.abs(typeof val === 'number' ? val : 0) - firstValue),
            0
          );

          return (
            <View key={metric.label} style={styles.section}>
              <View style={styles.metricHeader}>
                <Text style={styles.metricLabel}>{metric.label}</Text>
                {maxDiff > 0 && (
                  <Text style={styles.maxDiff}>
                    Max Difference: {formatValue(maxDiff, metric.isPercentage)}
                  </Text>
                )}
              </View>

              <View style={styles.propertyGrid}>
                {Object.entries(metric.values).map(([id, value]) => (
                  <View key={id} style={styles.propertyValue}>
                    <Text style={styles.propertyName}>
                      {calculations.find((calc) => calc.id === id)?.name}
                    </Text>
                    <Text style={styles.value}>
                      {formatValue(value, metric.isPercentage)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );
}