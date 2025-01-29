'use client'

import { Input, Slider } from "@heroui/react"
import { useState } from "react"

export function MortgageCalculator() {
  const [housingPrice, setHousingPrice] = useState(5000000)
  const [downPayment, setDownPayment] = useState(1000000)
  const [mortgageTerm, setMortgageTerm] = useState(30)
  const interestRate = 8.4

  const loanAmount = housingPrice - downPayment
  const monthlyInterestRate = interestRate / 100 / 12
  const numberOfPayments = mortgageTerm * 12

  const monthlyPayment =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)

  const totalInterest = monthlyPayment * numberOfPayments - loanAmount

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="block text-sm mb-2">Housing price, $</label>
        <Slider 
          size="sm"
          step={100000}
          minValue={1000000}
          maxValue={10000000}
          value={housingPrice}
          onChange={(value) => setHousingPrice(Number(value))}
          className="max-w-md"
        />
        <Input
          type="number"
          value={housingPrice.toString()}
          onChange={(e) => setHousingPrice(Number(e.target.value))}
          className="mt-2"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">Down payment, $</label>
        <Slider
          size="sm"
          step={50000}
          minValue={0}
          maxValue={housingPrice}
          value={downPayment}
          onChange={(value) => setDownPayment(Number(value))}
          className="max-w-md"
        />
        <Input
          type="number"
          value={downPayment.toString()}
          onChange={(e) => setDownPayment(Number(e.target.value))}
          className="mt-2"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">Mortgage term, years</label>
        <Slider
          size="sm"
          step={1}
          minValue={5}
          maxValue={30}
          value={mortgageTerm}
          onChange={(value) => setMortgageTerm(Number(value))}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-sm text-default-500">Monthly payment, $</p>
          <p className="text-xl font-semibold">{monthlyPayment.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-default-500">Loan Amount, $</p>
          <p className="text-xl font-semibold">{loanAmount.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-default-500">Interest rate, %</p>
          <p className="text-xl font-semibold">{interestRate}</p>
        </div>
        <div>
          <p className="text-sm text-default-500">Total interest paid, $</p>
          <p className="text-xl font-semibold">{totalInterest.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
} 