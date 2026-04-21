// app/layout.tsx
import './global.css';
import { Inter, Geist } from 'next/font/google';
import { cn } from "@/lib/utils";
import { RootProvider } from 'fumadocs-ui/provider/next';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const inter = Inter({ subsets: ['latin'] });

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" className={cn(inter.className, "font-sans", geist.variable)} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}