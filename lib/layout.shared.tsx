// lib/layout.shared.tsx
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { SidebarProps } from 'fumadocs-ui/layouts/docs/slots/sidebar';
import { appName } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
  };
}

export function sidebarOptions(): SidebarProps {
  return {
    className: 'backdrop-blur-md bg-background/60 border-r border-border/50',
  };
}