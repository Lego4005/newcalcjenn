import React, { memo } from 'react'
import { Button, Card, CardBody, CardHeader } from '@heroui/react'
import { Trash2 } from 'lucide-react'
import NumericInput from '../common/NumericInput'
import type { Property } from './BulkCalculator'

interface PropertyCardProps {
  property: Property
  onRemove: (id: string) => void
  onUpdate: (id: string, field: keyof Property['formData'], value: number) => void
  showRemove: boolean
}

function PropertyCardComponent({
  property,
  onRemove,
  onUpdate,
  showRemove
}: PropertyCardProps) {
  const inputClassNames = {
    label: "text-default-500",
    input: "text-foreground",
    inputWrapper: [
      "bg-content2/50",
      "hover:bg-content2",
      "data-[focused=true]:bg-content2",
      "!cursor-text",
      "border",
      "border-content3",
    ].join(" ")
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{property.address}</h3>
        {showRemove && (
          <Button
            variant="light"
            color="danger"
            isIconOnly
            size="sm"
            onPress={() => onRemove(property.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>
      <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <NumericInput
            label="Purchase Price"
            placeholder="Enter amount"
            value={property.formData.purchasePrice}
            onChange={(value) => onUpdate(property.id, 'purchasePrice', parseFloat(value) || 0)}
            classNames={inputClassNames}
            startContent={<span className="text-default-400">$</span>}
          />

          <NumericInput
            label="Down Payment"
            placeholder="Enter amount"
            value={property.formData.downPayment}
            onChange={(value) => onUpdate(property.id, 'downPayment', parseFloat(value) || 0)}
            classNames={inputClassNames}
            startContent={<span className="text-default-400">$</span>}
          />

          <NumericInput
            label="Interest Rate"
            placeholder="Enter percentage"
            value={property.formData.interestRate}
            onChange={(value) => onUpdate(property.id, 'interestRate', parseFloat(value) || 0)}
            isPercentage
            classNames={inputClassNames}
          />
        </div>

        <div className="space-y-4">
          <NumericInput
            label="Property Tax (Annual)"
            placeholder="Enter amount"
            value={property.formData.propertyTax}
            onChange={(value) => onUpdate(property.id, 'propertyTax', parseFloat(value) || 0)}
            classNames={inputClassNames}
            startContent={<span className="text-default-400">$</span>}
          />

          <NumericInput
            label="Insurance (Annual)"
            placeholder="Enter amount"
            value={property.formData.insurance}
            onChange={(value) => onUpdate(property.id, 'insurance', parseFloat(value) || 0)}
            classNames={inputClassNames}
            startContent={<span className="text-default-400">$</span>}
          />

          <NumericInput
            label="Settlement Fee"
            placeholder="Enter amount"
            value={property.formData.settlementFee}
            onChange={(value) => onUpdate(property.id, 'settlementFee', parseFloat(value) || 0)}
            classNames={inputClassNames}
            startContent={<span className="text-default-400">$</span>}
          />
        </div>
      </CardBody>
    </Card>
  )
}

export const PropertyCard = memo(PropertyCardComponent);