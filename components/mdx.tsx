// components/mdx.tsx
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { OfficerCarousel } from "@/components/officer-carousel";

// 1. Remove 'async'
// 2. Change 'Promise<MDXComponents>' to just 'MDXComponents'
export function getMDXComponents(
  base: MDXComponents,
  orgId?: string
): MDXComponents {
  return {
    ...defaultMdxComponents,
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