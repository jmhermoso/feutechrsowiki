import { prismSource, getOrgColor } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, sidebarOptions } from '@/lib/layout.shared';
import { DocsProvider } from '@/components/providers';

export default function Layout({ children }: LayoutProps<'/prism'>) {
  return (
    <DocsProvider api="/api/search/prism" color={getOrgColor('prism')}>
      <DocsLayout 
        tree={prismSource.getPageTree()} 
        {...baseOptions()}
        sidebar={sidebarOptions()}
      >
        {children}
      </DocsLayout>
    </DocsProvider>
  );
}