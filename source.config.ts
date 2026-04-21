import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

const docsConfig = {
  docs: { schema: pageSchema, postprocess: { includeProcessedMarkdown: true } },
  meta: { schema: metaSchema },
};

export const docs = defineDocs({ dir: 'content/docs', ...docsConfig });
export const tec = defineDocs({ dir: 'content/tec', ...docsConfig });
export const jpcs = defineDocs({ dir: 'content/jpcs', ...docsConfig });
export const acm = defineDocs({ dir: 'content/acm', ...docsConfig });
export const innov = defineDocs({ dir: 'content/innov', ...docsConfig });
export const prism = defineDocs({ dir: 'content/prism', ...docsConfig });
export const cpeo = defineDocs({ dir: 'content/cpeo', ...docsConfig });
export const sage = defineDocs({ dir: 'content/sage', ...docsConfig });
export const tbtv = defineDocs({ dir: 'content/tbtv', ...docsConfig });
export const aits = defineDocs({ dir: 'content/aits', ...docsConfig });
export const asti = defineDocs({ dir: 'content/asti', ...docsConfig });
export const ac = defineDocs({ dir: 'content/ac', ...docsConfig });
export const ecess = defineDocs({ dir: 'content/ecess', ...docsConfig });
export const mechs = defineDocs({ dir: 'content/mechs', ...docsConfig });
export const scc = defineDocs({ dir: 'content/scc', ...docsConfig });
export const rac = defineDocs({ dir: 'content/rac', ...docsConfig });

export default defineConfig({
  mdxOptions: {},
});