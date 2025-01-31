'use client';

import { useState } from 'react';
import { Button } from "@heroui/react";
import { Download } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { CalculationPDF } from './CalculationPDF';
import type { CalculatorFormData } from '@/types/calculator';

interface PDFDownloadButtonProps {
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

export default function PDFDownloadButton({ formData, costs, totalClosingCosts, netProceeds }: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      
      const doc = (
        <CalculationPDF
          formData={formData}
          costs={costs}
          totalClosingCosts={totalClosingCosts}
          netProceeds={netProceeds}
        />
      );
      
      const blob = await pdf(doc).toBlob();
      const fileName = `closing-costs-${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Use file-saver for more reliable file downloads
      saveAs(blob, fileName);
      
      setStatus({
        type: 'success',
        message: 'Your closing costs estimate has been downloaded successfully.'
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      setStatus({
        type: 'error', 
        message: 'There was a problem generating your PDF. Please try again.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <Button 
        variant="flat" 
        startContent={<Download className="w-4 h-4" />}
        isLoading={isGenerating}
        onPress={handleDownload}
        className="mb-2"
      >
        {isGenerating ? 'Generating...' : 'Download PDF'}
      </Button>

      {status && (
        <div 
          className={`text-sm ${
            status.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}