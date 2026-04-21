import { innovSource } from '@/lib/source';
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

export default async function Page(props: PageProps<'/innov/[[...slug]]'>) {
  const params = await props.params;
  const page = innovSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const mdxComponents = await getMDXComponents({
    a: createRelativeLink(innovSource, page),
  }, 'innov');

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
  return innovSource.generateParams();
}

export async function generateMetadata(props: PageProps<'/innov/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = innovSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}