# Salsabilla Edlanda Putri — Portfolio

A static professional portfolio for Salsabilla Edlanda Putri, a Front-End Developer focused on Angular, TypeScript, and REST API-driven web applications.

## Technology

- Astro 7 with static generation
- Strict TypeScript configuration
- Astro Content Collections for six typed project case studies
- Custom-property-based CSS without a UI framework
- Minimal client-side JavaScript for the mobile menu, copy-email feedback, section reveals, and a restrained depth effect
- Playwright browser checks for responsive behavior and critical interactions

The site does not require a database, authentication, API keys, a CMS, paid services, or a server adapter.

## Local development

Use Node.js 24 LTS. The minimum supported version declared by the project is Node.js `22.12.0`.

```bash
npm ci
npm run dev
```

Astro will print the local URL, usually `http://localhost:4321`.

Available commands:

```bash
npm run dev          # start the development server
npm run check        # run Astro, TypeScript, and content diagnostics
npm run build        # create the production build in dist/
npm run preview      # serve the production build locally
npm test             # run checks, build, and route/link/asset validation
npm run test:browser # audit responsive layouts, routes, interactions, console, reduced motion, and no-JS behavior
```

## Project structure

- `src/data/profile.ts` — identity, contact details, profile links, photo, and CV path.
- `src/data/experience.ts` — professional experience, education, credentials, organizations, supporting documents, and skills.
- `src/content/projects/` — six Markdown case studies validated by a typed content schema.
- `src/components/` — shared navigation, footer, contact, and project-preview components.
- `src/layouts/BaseLayout.astro` — shared document shell, metadata, and structured data.
- `src/styles/global.css` — global design tokens, responsive layout, accessibility states, and motion.
- `public/images/` — project covers, social image, and public visual assets.
- `public/documents/` — the reviewed public CV PDF, once available.
- `scripts/` — built-output validation and Playwright browser audit.

Optional empty fields are not rendered. Update the relevant data file or project frontmatter; components do not need to be edited for routine content changes.

## Updating content

### Add the public CV

1. Confirm that the final PDF is accurate and approved for publication.
2. Save it as, for example, `public/documents/salsabilla-edlanda-putri-cv.pdf`.
3. Set `cvPath` in `src/data/profile.ts` to `/documents/salsabilla-edlanda-putri-cv.pdf`.
4. Run `npm test`. The download button will appear automatically.

The source DOCX must not be committed as the public download.

### Add a profile photo or project screenshot

Place approved web assets in `public/images/`, then set `photo` in `profile.ts` or `cover` in the appropriate project frontmatter. Prefer lowercase, hyphenated filenames, explicit dimensions, and efficient web formats.

Until approved screenshots are available, the site uses intentionally abstract SVG project covers. They are not presented as production screenshots.

### Add project and credential links

Only publish verified URLs. Project frontmatter accepts optional `demoUrl` and `sourceUrl` fields, and each certification entry accepts an optional `url`. No button is rendered while a field is empty.

The three supporting-document URLs currently shown on the site were extracted from the source CV and verified as publicly reachable. They are kept as document-level links rather than being mapped to individual credentials without evidence.

## Production URL and SEO

Without `SITE_URL`, the build remains functional but emits `noindex,nofollow`, omits canonical URLs, and does not generate a sitemap. This prevents an unconfigured preview from being indexed.

Once the final production domain is known, set this environment variable in Vercel:

```text
SITE_URL=https://your-verified-production-domain.tld
```

A production build with `SITE_URL` generates canonical URLs, `sitemap-index.xml`, and indexable `robots.txt` rules. Do not use a temporary preview URL or an unverified domain as the value.

## Source and privacy policy

The content was checked against the supplied `CV_Salsabilla_Edlanda_Putri.docx` and `Project_Portfolio_Details_Salsabilla_Edlanda_Putri.pdf`, including the DOCX's original hyperlink relationships. Those raw source documents remain outside the repository and must not be committed.

Unknown dates, unverified project URLs, private client details, and unsupported performance claims are deliberately omitted. The phone and WhatsApp number found in the source CV are also withheld until the owner explicitly confirms publication.

See [CONTENT_TODO.md](./CONTENT_TODO.md) for the remaining content decisions and [DEPLOYMENT.md](./DEPLOYMENT.md) for the owner-managed Vercel handoff.
