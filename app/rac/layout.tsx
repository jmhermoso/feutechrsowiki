import { Analytics } from '@vercel/analytics/next';
import { racSource, getOrgColor } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, sidebarOptions } from '@/lib/layout.shared';
import { DocsProvider } from '@/components/providers';

export default function Layout({ children }: LayoutProps<'/rac'>) {
  return (
    <DocsProvider api="/api/search/rac" color={getOrgColor('rac')}>
      <DocsLayout 
        tree={racSource.getPageTree()} 
        {...baseOptions()}
        sidebar={sidebarOptions()}
      >
        {children}
        <Analytics />
      </DocsLayout>
    </DocsProvider>
  );
}