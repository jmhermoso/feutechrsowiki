import { Analytics } from '@vercel/analytics/next';
import { cpeoSource, getOrgColor } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, sidebarOptions } from '@/lib/layout.shared';
import { DocsProvider } from '@/components/providers';

export default function Layout({ children }: LayoutProps<'/cpeo'>) {
  return (
    <DocsProvider api="/api/search/cpeo" color={getOrgColor('cpeo')}>
      <DocsLayout 
        tree={cpeoSource.getPageTree()} 
        {...baseOptions()}
        sidebar={sidebarOptions()}
      >
        {children}
        <Analytics />
      </DocsLayout>
    </DocsProvider>
  );
}