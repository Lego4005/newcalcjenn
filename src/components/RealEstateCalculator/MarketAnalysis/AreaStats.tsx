'use client'

import { useMemo } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  Chip
} from "@heroui/react"
import { 
  School, 
  ShoppingBag, 
  Train, 
  TreePine,
  Building2,
  Users,
  Briefcase,
  GraduationCap
} from "lucide-react"
import type { Property } from '@/types/property'

interface AreaStatsProps {
  readonly property: Property
}

interface Score {
  name: string
  value: number
  description: string
}

interface Amenity {
  name: string
  distance: number
  rating?: number
  type: string
  icon: React.ReactNode
}

export function AreaStats({ property }: AreaStatsProps) {
  // Generate scores based on property location
  const scores = useMemo<Score[]>(() => {
    // In a real app, these would be fetched from an API based on property.address
    const baseScore = property.propertyType === 'Single Family' ? 85 : 75
    
    return [
      {
        name: 'Walk Score',
        value: baseScore,
        description: 'Most errands can be accomplished on foot'
      },
      {
        name: 'Transit Score',
        value: Math.max(baseScore - 10, 0),
        description: 'Transit is convenient for most trips'
      },
      {
        name: 'Bike Score',
        value: Math.max(baseScore - 15, 0),
        description: 'Biking is convenient for most trips'
      }
    ]
  }, [property.propertyType])

  // Generate nearby amenities based on property location
  const amenities = useMemo<Amenity[]>(() => {
    // In a real app, these would be fetched from an API based on property.address
    return [
      {
        name: `${property.propertyType === 'Single Family' ? 'Lincoln' : 'Washington'} Elementary`,
        distance: 0.5,
        rating: 8,
        type: "school",
        icon: <School className="w-4 h-4" />
      },
      {
        name: `${property.propertyType === 'Single Family' ? 'Central' : 'Downtown'} Mall`,
        distance: 1.2,
        type: "shopping",
        icon: <ShoppingBag className="w-4 h-4" />
      },
      {
        name: `${property.propertyType === 'Single Family' ? 'Metro' : 'Light Rail'} Station`,
        distance: 0.8,
        type: "transit",
        icon: <Train className="w-4 h-4" />
      },
      {
        name: `${property.propertyType === 'Single Family' ? 'City' : 'Community'} Park`,
        distance: 0.3,
        type: "recreation",
        icon: <TreePine className="w-4 h-4" />
      }
    ]
  }, [property.propertyType])

  // Generate demographics based on property value
  const demographics = useMemo(() => {
    // In a real app, these would be fetched from an API based on property.address
    const baseValue = property.price || 450000
    const multiplier = baseValue / 450000

    return {
      population: {
        total: Math.round(45000 * multiplier),
        growth: 2.5 + (multiplier - 1) * 2,
        medianAge: 35
      },
      housing: {
        ownerOccupied: Math.min(65 + (multiplier - 1) * 10, 95),
        medianValue: baseValue,
        medianRent: Math.round(2200 * multiplier)
      },
      income: {
        median: Math.round(85000 * multiplier),
        growth: 3.1 + (multiplier - 1) * 1.5
      },
      education: {
        highSchool: 95,
        bachelors: Math.min(45 + (multiplier - 1) * 15, 80),
        graduate: Math.min(20 + (multiplier - 1) * 10, 40)
      }
    }
  }, [property.price])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="space-y-4 py-4">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Area Scores</h3>
          <p className="text-small text-default-500">
            Walkability and transportation scores
          </p>
        </CardHeader>
        <CardBody className="space-y-6">
          {scores.map((score) => (
            <div key={score.name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm">{score.name}</span>
                <span className="text-sm font-semibold">{score.value}/100</span>
              </div>
              <Progress
                aria-label={score.name}
                value={score.value}
                className="h-2"
              />
              <p className="text-xs text-default-500 mt-1">{score.description}</p>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Nearby Amenities</h3>
          <p className="text-small text-default-500">
            Points of interest within walking distance
          </p>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {amenities.map((amenity, index) => (
              <div key={`amenity-${amenity.name}-${index}`} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-default-100 rounded-lg">
                    {amenity.icon}
                  </div>
                  <div>
                    <p className="font-medium">{amenity.name}</p>
                    <p className="text-small text-default-500">
                      {amenity.distance} miles away
                    </p>
                  </div>
                </div>
                {amenity.rating && (
                  <Chip color="primary" variant="flat">
                    {amenity.rating}/10
                  </Chip>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Demographics</h3>
          <p className="text-small text-default-500">
            Neighborhood statistics
          </p>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-default-100 rounded-lg">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-default-500">Population</p>
                  <p className="font-semibold">{demographics.population.total.toLocaleString()}</p>
                  <Chip size="sm" color="success">+{demographics.population.growth.toFixed(1)}%</Chip>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-default-100 rounded-lg">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-default-500">Home Ownership</p>
                  <p className="font-semibold">{Math.round(demographics.housing.ownerOccupied)}%</p>
                  <p className="text-xs text-default-500">
                    Median Value: {formatCurrency(demographics.housing.medianValue)}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-default-100 rounded-lg">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-default-500">Median Income</p>
                  <p className="font-semibold">{formatCurrency(demographics.income.median)}</p>
                  <Chip size="sm" color="success">+{demographics.income.growth.toFixed(1)}%</Chip>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-default-100 rounded-lg">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-default-500">Education</p>
                  <p className="font-semibold">{Math.round(demographics.education.bachelors)}%</p>
                  <p className="text-xs text-default-500">
                    Have Bachelor&apos;s or higher
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}