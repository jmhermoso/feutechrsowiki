import { Analytics } from '@vercel/analytics/next';
import { ecessSource, getOrgColor } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, sidebarOptions } from '@/lib/layout.shared';
import { DocsProvider } from '@/components/providers';

export default function Layout({ children }: LayoutProps<'/ecess'>) {
  return (
    <DocsProvider api="/api/search/ecess" color={getOrgColor('ecess')}>
      <DocsLayout 
        tree={ecessSource.getPageTree()} 
        {...baseOptions()}
        sidebar={sidebarOptions()}
      >
        {children}
        <Analytics />
      </DocsLayout>
    </DocsProvider>
  );
}