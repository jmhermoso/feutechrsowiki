import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { OfficerCarousel } from "@/components/officer-carousel";
import { Mermaid } from '@/components/mdx/mermaid';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { Puzzle, Piece, Tile, Graph } from '@/components/puzzle';

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
    Steps,
    Step,
    Files,
    File,
    Folder,
    Puzzle,
    Piece,
    Tile,
    Graph,
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