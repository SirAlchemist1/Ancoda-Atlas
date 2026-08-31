'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingUIProps {
  /** Primary status line shown under the spinner. */
  message?: string;
  /** Secondary reassurance line — helps readers know the wait is normal. */
  hint?: string;
  /** Visual context: dashboard terminal, flood desk, map canvas, or boot splash. */
  variant?: 'dashboard' | 'flood' | 'map' | 'boot' | 'inline';
  className?: string;
}

const DEFAULT_HINTS: Record<NonNullable<LoadingUIProps['variant']>, string> = {
  dashboard: 'Pulling live hazard feeds — this usually takes a few seconds.',
  flood: 'Fetching the latest figures — hang on a moment.',
  map: 'Loading map layers and live telemetry…',
  boot: 'Starting hazard sweep and live feeds…',
  inline: 'Loading…',
};

export default function LoadingUI({
  message = 'Loading…',
  hint,
  variant = 'dashboard',
  className,
}: LoadingUIProps) {
  const resolvedHint = hint ?? (variant === 'inline' ? undefined : DEFAULT_HINTS[variant]);

  return (
    <div
      className={cn('atlas-loading', `atlas-loading--${variant}`, className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="atlas-loading-spinner" aria-hidden="true">
        <span className="atlas-loading-ring" />
        <span className="atlas-loading-core" />
      </div>
      <p className="atlas-loading-message">{message}</p>
      {resolvedHint && <p className="atlas-loading-hint">{resolvedHint}</p>}
      <span className="sr-only">{message}</span>
    </div>
  );
}
