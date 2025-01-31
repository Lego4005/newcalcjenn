'use client';

import { useState } from 'react';
import { Button } from "@heroui/react";
import { Share2, Copy, Link, LogIn } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';
import type { CalculatorFormData } from '@/types/calculator';

interface ShareButtonProps {
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

export default function ShareButton({ formData, costs, totalClosingCosts, netProceeds }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const supabase = createClientComponentClient<Database>();

  const handleShare = async () => {
    try {
      setIsSharing(true);
      setStatus(null);

      // Check authentication status
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (authError) throw authError;
      
      if (!session) {
        setIsAuthenticated(false);
        setStatus({ type: 'error', message: 'Please sign in to share calculations' });
        return;
      }

      // Save calculation to database
      const { data: calculation, error: saveError } = await supabase
        .from('saved_calculations')
        .insert({
          name: `Calculation ${new Date().toLocaleDateString()}`,
          property_details: formData,
          mortgage_info: {
            costs,
            totalClosingCosts,
            netProceeds
          },
          commission_structure: {}, // Add if needed
          additional_fees: {}, // Add if needed
          is_public: true
        })
        .select('share_id')
        .single();

      if (saveError) throw saveError;

      // Generate shareable URL
      const shareableUrl = `${window.location.origin}/shared/${calculation.share_id}`;
      setShareUrl(shareableUrl);
      
      setStatus({
        type: 'success',
        message: 'Share link generated successfully!'
      });

    } catch {
      console.error('Error sharing calculation');
      const errorMessage = 'Failed to generate share link. Please try again.';
      
      setStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shareUrl) return;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatus({
        type: 'success',
        message: 'Link copied to clipboard!'
      });
    } catch {
      setStatus({
        type: 'error',
        message: 'Failed to copy link. Please try again.'
      });
    }
  };

  const handleSignIn = () => {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
  };

  if (isAuthenticated === false) {
    return (
      <Button
        variant="flat"
        startContent={<LogIn className="w-4 h-4" />}
        onPress={handleSignIn}
      >Sign in to Share</Button>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      {!shareUrl ? (
        <Button
          variant="flat"
          startContent={<Share2 className="w-4 h-4" />}
          isLoading={isSharing}
          onPress={handleShare}
          className="mb-2"
        >
          {isSharing ? 'Generating Share Link...' : 'Share'}
        </Button>
      ) : (
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 rounded-lg bg-content2/50 border border-content3 text-sm"
            />
            <Button
              variant="flat"
              isIconOnly
              onPress={copyToClipboard}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <Button
            variant="light"
            startContent={<Link className="w-4 h-4" />}
            onPress={() => window.open(shareUrl, '_blank')}
          >
            Open Shared Link
          </Button>
        </div>
      )}

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