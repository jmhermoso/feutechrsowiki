import { aitsSource, getOrgColor } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, sidebarOptions } from '@/lib/layout.shared';
import { DocsProvider } from '@/components/providers';

export default function Layout({ children }: LayoutProps<'/aits'>) {
  return (
    <DocsProvider api="/api/search/aits" color={getOrgColor('aits')}>
      <DocsLayout 
        tree={aitsSource.getPageTree()} 
        {...baseOptions()}
        sidebar={sidebarOptions()}
      >
        {children}
      </DocsLayout>
    </DocsProvider>
  );
}