import { Analytics } from '@vercel/analytics/next';
import { jpcsSource, getOrgColor } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, sidebarOptions } from '@/lib/layout.shared';
import { DocsProvider } from '@/components/providers';

export default function Layout({ children }: LayoutProps<'/jpcs'>) {
  return (
    <DocsProvider api="/api/search/jpcs" color={getOrgColor('jpcs')}>
      <DocsLayout 
        tree={jpcsSource.getPageTree()} 
        {...baseOptions()}
        sidebar={sidebarOptions()}
      >
        {children}
        <Analytics />
      </DocsLayout>
    </DocsProvider>
  );
}