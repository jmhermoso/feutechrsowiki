import { Analytics } from '@vercel/analytics/next';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.home';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <HomeLayout {...baseOptions()} searchToggle={{ enabled: false }}>
      {children}
      <Analytics />
    </HomeLayout>
  );
}