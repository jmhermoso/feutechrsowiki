import { sccSource, getOrgColor } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, sidebarOptions } from '@/lib/layout.shared';
import { DocsProvider } from '@/components/providers';

export default function Layout({ children }: LayoutProps<'/scc'>) {
  return (
    <DocsProvider api="/api/search/scc" color={getOrgColor('scc')}>
      <DocsLayout 
        tree={sccSource.getPageTree()} 
        {...baseOptions()}
        sidebar={sidebarOptions()}
      >
        {children}
      </DocsLayout>
    </DocsProvider>
  );
}