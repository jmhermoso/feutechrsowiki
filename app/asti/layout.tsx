import { astiSource, getOrgColor } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, sidebarOptions } from '@/lib/layout.shared';
import { DocsProvider } from '@/components/providers';

export default function Layout({ children }: LayoutProps<'/asti'>) {
  return (
    <DocsProvider api="/api/search/asti" color={getOrgColor('asti')}>
      <DocsLayout 
        tree={astiSource.getPageTree()} 
        {...baseOptions()}
        sidebar={sidebarOptions()}
      >
        {children}
      </DocsLayout>
    </DocsProvider>
  );
}