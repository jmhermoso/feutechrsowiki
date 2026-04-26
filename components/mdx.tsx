import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { OfficerCarousel } from "@/components/officer-carousel";
import { Mermaid } from '@/components/mdx/mermaid';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';

// 2. Change 'Promise<MDXComponents>' to just 'MDXComponents'
export function getMDXComponents(
  base: MDXComponents,
  orgId?: string
): MDXComponents {
  return {
    ...defaultMdxComponents,
    Mermaid,
    Accordion,
    Accordions,
    Tab,
    Tabs,
    ...base,
    ...(orgId
      ? {
          OfficerCarousel: ({ department }: { department: string }) => (
            <OfficerCarousel orgId={orgId} department={department} />
          ),
        }
      : {}),
  };
}