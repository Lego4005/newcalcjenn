"use client";

import { SetupWizard } from "@/components/RealEstateCalculator/SetupWizard";

export default function SetupPage() {
  return (
    <div className="w-full min-h-screen p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Calculator Setup</h1>
      <SetupWizard />
    </div>
  );
}
