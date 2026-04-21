import { tbtvSource } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';

export default async function Page(props: PageProps<'/tbtv/[[...slug]]'>) {
  const params = await props.params;
  const page = tbtvSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const mdxComponents = await getMDXComponents({
    a: createRelativeLink(tbtvSource, page),
  }, 'tbtv');

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={mdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return tbtvSource.generateParams();
}

export async function generateMetadata(props: PageProps<'/tbtv/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = tbtvSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}