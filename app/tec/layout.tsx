import { Analytics } from '@vercel/analytics/next';
import { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { DocsProvider } from '@/components/providers';
import { baseOptions, sidebarOptions } from '@/lib/layout.shared';
import { tecSource } from '@/lib/source';
import { getOrgColorFromDb } from '@/lib/source';

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const color = await getOrgColorFromDb('tec');

  return (
    <DocsProvider api="/api/search/tec" color={color}>
      <DocsLayout
        tree={tecSource.getPageTree()}
        {...baseOptions()}
        sidebar={sidebarOptions()}
      >
        {children}
        <Analytics />
      </DocsLayout>
    </DocsProvider>
  );
}