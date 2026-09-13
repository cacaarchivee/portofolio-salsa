import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const productionSite = process.env.SITE_URL?.trim() || undefined;

export default defineConfig({
  ...(productionSite ? { site: productionSite } : {}),
  output: 'static',
  trailingSlash: 'always',
  integrations: productionSite ? [sitemap()] : [],
  build: {
    format: 'directory',
  },
});
