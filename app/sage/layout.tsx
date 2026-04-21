import { sageSource, getOrgColor } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, sidebarOptions } from '@/lib/layout.shared';
import { DocsProvider } from '@/components/providers';

export default function Layout({ children }: LayoutProps<'/sage'>) {
  return (
    <DocsProvider api="/api/search/sage" color={getOrgColor('sage')}>
      <DocsLayout 
        tree={sageSource.getPageTree()} 
        {...baseOptions()}
        sidebar={sidebarOptions()}
      >
        {children}
      </DocsLayout>
    </DocsProvider>
  );
}