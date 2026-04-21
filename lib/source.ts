// lib/source.ts
import { docs, tec, jpcs, acm, innov, prism, cpeo, sage, tbtv, aits, asti, ac, ecess, mechs, scc, rac } from 'collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { organizations } from './organizations';
import { fetchOrgByIdFromDb } from './db/organizations';

const plugins = [lucideIconsPlugin()];

export const source = loader({ baseUrl: docsRoute, source: docs.toFumadocsSource(), plugins });
export const tecSource = loader({ baseUrl: '/tec', source: tec.toFumadocsSource(), plugins });
export const jpcsSource = loader({ baseUrl: '/jpcs', source: jpcs.toFumadocsSource(), plugins });
export const acmSource = loader({ baseUrl: '/acm', source: acm.toFumadocsSource(), plugins });
export const innovSource = loader({ baseUrl: '/innov', source: innov.toFumadocsSource(), plugins });
export const prismSource = loader({ baseUrl: '/prism', source: prism.toFumadocsSource(), plugins });
export const cpeoSource = loader({ baseUrl: '/cpeo', source: cpeo.toFumadocsSource(), plugins });
export const sageSource = loader({ baseUrl: '/sage', source: sage.toFumadocsSource(), plugins });
export const tbtvSource = loader({ baseUrl: '/tbtv', source: tbtv.toFumadocsSource(), plugins });
export const aitsSource = loader({ baseUrl: '/aits', source: aits.toFumadocsSource(), plugins });
export const astiSource = loader({ baseUrl: '/asti', source: asti.toFumadocsSource(), plugins });
export const acSource = loader({ baseUrl: '/ac', source: ac.toFumadocsSource(), plugins });
export const ecessSource = loader({ baseUrl: '/ecess', source: ecess.toFumadocsSource(), plugins });
export const mechsSource = loader({ baseUrl: '/mechs', source: mechs.toFumadocsSource(), plugins });
export const sccSource = loader({ baseUrl: '/scc', source: scc.toFumadocsSource(), plugins });
export const racSource = loader({ baseUrl: '/rac', source: rac.toFumadocsSource(), plugins });

// Build-time only — used by lib/source.ts loaders and any static references
export function getOrgColor(id: string): string {
  return organizations.find((o) => o.id === id)?.color ?? '#888888';
}

// Runtime — used by org layout.tsx Server Components to get live color from Supabase
export async function getOrgColorFromDb(id: string): Promise<string> {
  const org = await fetchOrgByIdFromDb(id);
  return org?.color ?? '#888888';
}

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];
  return { segments, url: `${docsImageRoute}/${segments.join('/')}` };
}

export function getPageMarkdownUrl(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'content.md'];
  return { segments, url: `${docsContentRoute}/${segments.join('/')}` };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');
  return `# ${page.data.title} (${page.url})\n\n${processed}`;
}