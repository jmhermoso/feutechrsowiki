import { Analytics } from '@vercel/analytics/next';
import { acmSource, getOrgColor } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, sidebarOptions } from '@/lib/layout.shared';
import { DocsProvider } from '@/components/providers';

export default function Layout({ children }: LayoutProps<'/acm'>) {
  return (
    <DocsProvider api="/api/search/acm" color={getOrgColor('acm')}>
      <DocsLayout 
        tree={acmSource.getPageTree()} 
        {...baseOptions()}
        sidebar={sidebarOptions()}
      >
        {children}
        <Analytics />
      </DocsLayout>
    </DocsProvider>
  );
}