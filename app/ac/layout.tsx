import { Analytics } from '@vercel/analytics/next';
import { acSource, getOrgColor } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, sidebarOptions } from '@/lib/layout.shared';
import { DocsProvider } from '@/components/providers';

export default function Layout({ children }: LayoutProps<'/ac'>) {
  return (
    <DocsProvider api="/api/search/ac" color={getOrgColor('ac')}>
      <DocsLayout 
        tree={acSource.getPageTree()} 
        {...baseOptions()}
        sidebar={sidebarOptions()}
      >
        {children}
        <Analytics />
      </DocsLayout>
    </DocsProvider>
  );
}