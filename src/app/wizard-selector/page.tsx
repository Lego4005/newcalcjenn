"use client";

import { Card, CardBody, CardFooter, Button } from "@heroui/react";
import { Settings, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WizardSelectorPage() {
  return (
    <div className="w-full min-h-screen p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Select Wizard</h1>

      <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
        {/* Setup Wizard Option */}
        <Card className="flex-1 border-2 border-transparent hover:border-primary transition-all">
          <CardBody className="gap-4 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Settings className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Setup Wizard</h2>
              <p className="text-default-500 mt-2">
                Configure your calculator settings, API keys, and default values
                for your real estate calculations.
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                  1
                </span>
                <span>API Integration Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                  2
                </span>
                <span>Broker Information</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                  3
                </span>
                <span>Default Calculation Values</span>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Link href="/setup" className="w-full">
              <Button
                color="primary"
                variant="ghost"
                className="w-full"
                endContent={<ArrowRight className="w-4 h-4" />}
              >
                Start Setup Wizard
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Seller Closing Calculator Option */}
        <Card className="flex-1 border-2 border-transparent hover:border-primary transition-all">
          <CardBody className="gap-4 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Home className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Seller's Closing Costs</h2>
              <p className="text-default-500 mt-2">
                Calculate all closing costs for property sellers with a
                step-by-step guided process.
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                  1
                </span>
                <span>Property Details</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                  2
                </span>
                <span>Mortgage Information</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                  3
                </span>
                <span>Commission Structure</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                  4
                </span>
                <span>Additional Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                  5
                </span>
                <span>Calculate Results</span>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Link href="/?tab=calculator" className="w-full">
              <Button
                color="primary"
                variant="ghost"
                className="w-full"
                endContent={<ArrowRight className="w-4 h-4" />}
              >
                Start Closing Costs Wizard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
