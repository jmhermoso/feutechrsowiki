// components/mdx.tsx
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { OfficerCarousel } from "@/components/officer-carousel";

export async function getMDXComponents(
  base: MDXComponents,
  orgId?: string
): Promise<MDXComponents> {
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