'use client'

import { useState } from "react"
import {
  Card,
  CardBody,
  Button,
  Input,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Divider,
  Image,
} from "@heroui/react"
import { Icon } from "@iconify/react"
import { Building2, User, Settings, Key } from "lucide-react"

interface SetupConfig {
  mlsApiKey: string
  brokerName: string
  brokerLicense: string
  companyName: string
  companyLogo: string
  defaultCommissionRate: string
  defaultTaxRate: string
  zillowApiKey: string
}

export function SetupWizard() {
  const [step, setStep] = useState(0)
  const [config, setConfig] = useState<SetupConfig>({
    mlsApiKey: "",
    brokerName: "",
    brokerLicense: "",
    companyName: "",
    companyLogo: "",
    defaultCommissionRate: "6",
    defaultTaxRate: "1.2",
    zillowApiKey: "",
  })

  const handleConfigChange = (key: keyof SetupConfig) => (value: string) => {
    setConfig(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const steps = [
    {
      title: "API Setup",
      icon: <Key className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">API Configuration</h3>
          <p className="text-default-600">
            Enter your API keys to connect with MLS and property data services.
          </p>
          <Input
            label="MLS API Key"
            placeholder="Enter your MLS API key"
            value={config.mlsApiKey}
            onValueChange={handleConfigChange("mlsApiKey")}
            variant="bordered"
            type="password"
            startContent={<Icon icon="mdi:api-off" className="text-default-400" />}
          />
          <Input
            label="Zillow API Key"
            placeholder="Enter your Zillow API key"
            value={config.zillowApiKey}
            onValueChange={handleConfigChange("zillowApiKey")}
            variant="bordered"
            type="password"
            startContent={<Icon icon="mdi:home-search" className="text-default-400" />}
          />
          <div className="flex justify-end gap-2">
            <Button
              color="primary"
              onPress={() => setStep(1)}
              isDisabled={!config.mlsApiKey || !config.zillowApiKey}
            >
              Next
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Broker Info",
      icon: <User className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Broker Information</h3>
          <p className="text-default-600">
            Enter your broker and company details for documentation.
          </p>
          <Input
            label="Broker Name"
            placeholder="Enter broker's full name"
            value={config.brokerName}
            onValueChange={handleConfigChange("brokerName")}
            variant="bordered"
            startContent={<User className="w-4 h-4 text-default-400" />}
          />
          <Input
            label="Broker License"
            placeholder="Enter broker's license number"
            value={config.brokerLicense}
            onValueChange={handleConfigChange("brokerLicense")}
            variant="bordered"
            startContent={<Icon icon="mdi:license" className="text-default-400" />}
          />
          <Input
            label="Company Name"
            placeholder="Enter company name"
            value={config.companyName}
            onValueChange={handleConfigChange("companyName")}
            variant="bordered"
            startContent={<Building2 className="w-4 h-4 text-default-400" />}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="flat"
              onPress={() => setStep(0)}
            >
              Back
            </Button>
            <Button
              color="primary"
              onPress={() => setStep(2)}
              isDisabled={!config.brokerName || !config.brokerLicense || !config.companyName}
            >
              Next
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Defaults",
      icon: <Settings className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Default Settings</h3>
          <p className="text-default-600">
            Configure default rates and calculation parameters.
          </p>
          <Input
            type="number"
            label="Default Commission Rate (%)"
            placeholder="Enter default commission rate"
            value={config.defaultCommissionRate}
            onValueChange={handleConfigChange("defaultCommissionRate")}
            variant="bordered"
            startContent={<Icon icon="mdi:percent" className="text-default-400" />}
          />
          <Input
            type="number"
            label="Default Property Tax Rate (%)"
            placeholder="Enter default tax rate"
            value={config.defaultTaxRate}
            onValueChange={handleConfigChange("defaultTaxRate")}
            variant="bordered"
            startContent={<Icon icon="mdi:percent" className="text-default-400" />}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="flat"
              onPress={() => setStep(1)}
            >
              Back
            </Button>
            <Button
              color="primary"
              onPress={() => {
                // Save configuration and proceed to main calculator
                console.log("Configuration saved:", config)
              }}
            >
              Complete Setup
            </Button>
          </div>
        </div>
      ),
    },
  ]

  return (
    <Card className="max-w-xl mx-auto">
      <CardBody className="gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Calculator Setup</h2>
          <div className="text-default-500 text-sm">
            Step {step + 1} of {steps.length}
          </div>
        </div>

        <Tabs 
          selectedKey={step.toString()}
          onSelectionChange={(key) => setStep(parseInt(key.toString()))}
          classNames={{
            tabList: "gap-4",
            cursor: "w-full",
            tab: "max-w-fit px-4 h-10",
          }}
        >
          {steps.map((s, i) => (
            <Tab
              key={i}
              title={
                <div className="flex items-center gap-2">
                  {s.icon}
                  <span>{s.title}</span>
                </div>
              }
              isDisabled={i > step}
            >
              {s.content}
            </Tab>
          ))}
        </Tabs>
      </CardBody>
    </Card>
  )
} 