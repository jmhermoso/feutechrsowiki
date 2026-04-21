// components/providers.tsx
'use client';

import { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';

interface DocsProviderProps {
  children: ReactNode;
  api: string;
  color?: string;
}

export function DocsProvider({ children, api, color }: DocsProviderProps) {
  return (
    <RootProvider search={{ options: { api } }}>
      <div className="relative min-h-screen">
        {color && (
          <div
            className="pointer-events-none fixed inset-0"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${color}15 0%, transparent 50%)`
            }}
          />
        )}
        {children}
      </div>
    </RootProvider>
  );
}