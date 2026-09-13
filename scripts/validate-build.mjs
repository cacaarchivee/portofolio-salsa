import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const expectedPages = [
  'index.html',
  'projects/index.html',
  'projects/higher-education-website/index.html',
  'projects/smart-table-medical-document-validation/index.html',
  'projects/guitar-marketplace/index.html',
  'projects/sentiment-analysis-system/index.html',
  'projects/company-profile-website/index.html',
  'projects/mobile-application-development/index.html',
  '404.html',
  'robots.txt',
];

const errors = [];

for (const page of expectedPages) {
  try {
    await access(path.join(dist, page));
  } catch {
    errors.push(`Missing build output: ${page}`);
  }
}

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const resolved = path.join(directory, entry.name);
      return entry.isDirectory() ? findHtmlFiles(resolved) : resolved.endsWith('.html') ? [resolved] : [];
    }),
  );
  return files.flat();
}

const bannedPublicText = [
  /href=["']#["']/i,
  /example\.com/i,
  /coming soon/i,
  /isi di sini/i,
  /mon yyyy/i,
  /date not listed/i,
];

const htmlFiles = await findHtmlFiles(dist);

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relativeFile = path.relative(dist, file);
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
  if (h1Count !== 1) errors.push(`${relativeFile} contains ${h1Count} H1 elements (expected 1).`);

  for (const pattern of bannedPublicText) {
    if (pattern.test(html)) errors.push(`${relativeFile} contains banned public text matching ${pattern}.`);
  }

  const internalLinks = [...html.matchAll(/href=["'](\/[^"']*)["']/g)].map((match) => match[1]);
  for (const href of internalLinks) {
    const cleanHref = href.split('#')[0].split('?')[0];
    if (!cleanHref) continue;
    const decodedHref = decodeURIComponent(cleanHref);
    const extension = path.posix.extname(decodedHref);
    const outputPath = extension
      ? path.join(dist, decodedHref)
      : decodedHref === '/'
        ? path.join(dist, 'index.html')
        : path.join(dist, decodedHref, 'index.html');
    try {
      await access(outputPath);
    } catch {
      errors.push(`${relativeFile} links to missing internal target: ${href}`);
    }
  }

  const localImages = [...html.matchAll(/src=["'](\/images\/[^"']+)["']/g)].map((match) => match[1]);
  for (const src of localImages) {
    try {
      await access(path.join(dist, src));
    } catch {
      errors.push(`${relativeFile} references missing image: ${src}`);
    }
  }
}

if (errors.length) {
  console.error(`Build validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML files, ${expectedPages.length} expected outputs, internal links, and local images.`);
