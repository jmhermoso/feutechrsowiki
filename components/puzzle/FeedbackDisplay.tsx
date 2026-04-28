'use client';

import React from 'react';

interface ValidationResult {
  isValid: boolean;
  message: string;
}

interface FeedbackDisplayProps {
  validationResult: ValidationResult | null;
}

export function FeedbackDisplay({ validationResult }: FeedbackDisplayProps) {
  if (!validationResult) return null;

  return (
    <div
      className={`p-4 rounded-lg font-medium text-center transition-all ${
        validationResult.isValid
          ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700 animate-pulse'
          : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
      }`}
    >
      {validationResult.message}
    </div>
  );
}