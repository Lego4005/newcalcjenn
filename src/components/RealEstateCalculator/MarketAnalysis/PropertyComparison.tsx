'use client'

import { useMemo } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip
} from "@heroui/react"
import type { Property } from '@/types/property'

interface PropertyComparisonProps {
  readonly property: Property
}

type ChipColorType = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

export function PropertyComparison({ property }: PropertyComparisonProps) {
  const similarProperties = useMemo(() => {
    // This would be replaced with real API data
    const basePrice = property.price || 0
    const baseSqft = property.sqft || 1000

    return [
      {
        address: '123 Nearby St',
        price: basePrice * 0.95,
        sqft: baseSqft * 0.9,
        beds: property.beds,
        baths: property.baths,
        yearBuilt: (property.yearBuilt || 2000) - 2,
        distance: 0.5,
        daysOnMarket: 30,
        pricePerSqft: (basePrice * 0.95) / (baseSqft * 0.9)
      },
      {
        address: '456 Close Ave',
        price: basePrice * 1.05,
        sqft: baseSqft * 1.1,
        beds: (property.beds || 3) + 1,
        baths: (property.baths || 2) + 0.5,
        yearBuilt: (property.yearBuilt || 2000) + 1,
        distance: 0.8,
        daysOnMarket: 15,
        pricePerSqft: (basePrice * 1.05) / (baseSqft * 1.1)
      },
      {
        address: '789 Similar Ln',
        price: basePrice * 1.02,
        sqft: baseSqft * 0.95,
        beds: property.beds,
        baths: property.baths,
        yearBuilt: property.yearBuilt || 2000,
        distance: 1.2,
        daysOnMarket: 45,
        pricePerSqft: (basePrice * 1.02) / (baseSqft * 0.95)
      }
    ]
  }, [property])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const formatPricePerSqft = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price) + '/sqft'
  }

  const getPriceDiff = (price: number): { value: string; type: ChipColorType } => {
    const diff = ((price - (property.price || 0)) / (property.price || 1)) * 100
    return {
      value: Math.abs(diff).toFixed(1) + '%',
      type: diff > 0 ? 'success' : diff < 0 ? 'danger' : 'default'
    }
  }

  const getComparisonIndicator = (value: number, baseValue: number) => {
    if (value > baseValue) return '↑';
    if (value < baseValue) return '↓';
    return '=';
  };

  const renderTableRows = () => {
    const rows = []

    // Current property row
    rows.push(
      <TableRow key="current">
        <TableCell>
          <div className="flex items-center gap-2">
            {property.address}
            <Chip color="primary" size="sm">Current</Chip>
          </div>
        </TableCell>
        <TableCell>{formatPrice(property.price || 0)}</TableCell>
        <TableCell>
          {formatPricePerSqft((property.price || 0) / (property.sqft || 1))}
        </TableCell>
        <TableCell>{property.sqft?.toLocaleString() || 'N/A'}</TableCell>
        <TableCell>{property.beds || 'N/A'}</TableCell>
        <TableCell>{property.baths || 'N/A'}</TableCell>
        <TableCell>{property.yearBuilt || 'N/A'}</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
      </TableRow>
    )

    // Similar properties rows
    similarProperties.forEach((prop, index) => {
      rows.push(
        <TableRow key={`similar-${index}`}>
          <TableCell>{prop.address}</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              {formatPrice(prop.price)}
              <Chip
                color={getPriceDiff(prop.price).type}
                size="sm"
              >
                {getPriceDiff(prop.price).value}
              </Chip>
            </div>
          </TableCell>
          <TableCell>{formatPricePerSqft(prop.pricePerSqft)}</TableCell>
          <TableCell>{prop.sqft.toLocaleString()}</TableCell>
          <TableCell>{prop.beds}</TableCell>
          <TableCell>{prop.baths}</TableCell>
          <TableCell>{prop.yearBuilt}</TableCell>
          <TableCell>{prop.distance} mi</TableCell>
          <TableCell>{prop.daysOnMarket} days</TableCell>
        </TableRow>
      )
    })

    return rows
  }

  return (
    <div className="space-y-4 py-4">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Similar Properties</h3>
          <p className="text-small text-default-500">
            Comparable properties within 1.5 miles
          </p>
        </CardHeader>
        <CardBody>
          <Table aria-label="Similar properties comparison">
            <TableHeader>
              <TableColumn>ADDRESS</TableColumn>
              <TableColumn>PRICE</TableColumn>
              <TableColumn>$/SQFT</TableColumn>
              <TableColumn>SQFT</TableColumn>
              <TableColumn>BEDS</TableColumn>
              <TableColumn>BATHS</TableColumn>
              <TableColumn>YEAR</TableColumn>
              <TableColumn>DISTANCE</TableColumn>
              <TableColumn>DOM</TableColumn>
            </TableHeader>
            <TableBody>
              {renderTableRows()}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  )
}