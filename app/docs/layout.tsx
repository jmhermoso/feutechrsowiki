import { Analytics } from '@vercel/analytics/next';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { DocsProvider } from '@/components/providers';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsProvider api="/api/search/docs">
      <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
        {children}
        <Analytics />
      </DocsLayout>
    </DocsProvider>
  );
}