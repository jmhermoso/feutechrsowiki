import { Analytics } from '@vercel/analytics/next';
import { innovSource, getOrgColor } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, sidebarOptions } from '@/lib/layout.shared';
import { DocsProvider } from '@/components/providers';

export default function Layout({ children }: LayoutProps<'/innov'>) {
  return (
    <DocsProvider api="/api/search/innov" color={getOrgColor('innov')}>
      <DocsLayout 
        tree={innovSource.getPageTree()} 
        {...baseOptions()}
        sidebar={sidebarOptions()}
      >
        {children}
        <Analytics />
      </DocsLayout>
    </DocsProvider>
  );
}