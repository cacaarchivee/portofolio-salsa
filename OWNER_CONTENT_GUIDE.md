# Website Owner Content Guide

This guide explains how to update the portfolio without redesigning the site. It also shows which update paths are already connected to the interface and which ones still require development work.

## Status legend

- **READY** — already connected to the website. Update the content and it will render automatically.
- **WAITING FOR CONTENT** — the website supports it, but an approved file, URL, date, or other value is still missing.
- **CODE CHANGE REQUIRED** — a field or idea exists, but there is no complete interface for it yet.

## What can be updated now

| Content | Status | Update location | What happens |
| --- | --- | --- | --- |
| Name, role, location, email, phone, GitHub, and WhatsApp | **READY** | `src/data/profile.ts` | The relevant sections update automatically. |
| LinkedIn | **WAITING FOR CONTENT** | `src/data/profile.ts` | The link appears automatically after a verified URL is added. |
| Profile photo | **CODE CHANGE REQUIRED** | `src/data/profile.ts` contains a reserved `photo` field | The current layout has no profile-photo element, so setting the field alone will not display it. |
| Logo | **READY** | `public/logo.svg` | Replacing the file updates the header and footer logo. |
| Browser icon | **READY** | `public/favicon.svg` | Replacing the file updates the favicon after a refresh or browser-cache clear. |
| Experience, education, organizations, skills | **READY** | `src/data/experience.ts` | Items render from the exported arrays. |
| Missing employment or organization dates | **WAITING FOR CONTENT** | `src/data/experience.ts` | Add only verified dates. |
| Certifications | **READY** | `src/data/experience.ts` | New items render automatically; verified URLs make them clickable. |
| Individual certificate URLs | **WAITING FOR CONTENT** | `src/data/experience.ts` | Several records do not yet have direct URLs. |
| Supporting documents | **READY** | `src/data/experience.ts` | New verified links render automatically. |
| Existing project text | **READY** | `src/content/projects/*.md` | Frontmatter controls the summary; Markdown controls the case-study body. |
| New projects | **READY** | Create another file in `src/content/projects/` | Astro creates the project detail route automatically. |
| Project covers/screenshots | **READY** | `public/images/` and the project's `cover` field | Replacing a referenced image or changing its path updates the project image. |
| Real project screenshots | **WAITING FOR CONTENT** | `public/images/` | The current covers are abstract placeholders until approved screenshots are supplied. |
| Demo and source-code buttons | **READY** | Project `demoUrl` and `sourceUrl` fields | Each button appears only when its URL is present. |
| Public CV download | **WAITING FOR CONTENT** | `public/documents/` and `src/data/profile.ts` | The button appears automatically after the approved PDF and `cvPath` are added. |
| New section such as awards, testimonials, or articles | **CODE CHANGE REQUIRED** | New data and page/component work | Adding an unrelated field alone will not create a visible section. |
| Production domain and search indexing | **WAITING FOR CONTENT** | Vercel environment variable `SITE_URL` | Canonical URLs, sitemap, and indexing activate after the final domain is configured. |

## Run the site before editing

Use Node.js 24 LTS. From the repository folder, run:

```bash
npm ci
npm run dev
```

Open the URL printed by Astro, normally `http://localhost:4321`. Keep the development server running while editing; saved changes should appear automatically.

If VS Code reports `File 'astro/tsconfigs/strictest' not found`, run `npm ci` first and then reload the TypeScript server or reopen VS Code. That configuration is provided by the installed Astro package.

## Replace a project image

This is already supported.

The simplest option is to overwrite an existing cover with a new approved image using exactly the same filename. For example:

```text
public/images/project-smart-table.svg
```

No project content change is needed when the filename stays the same.

To use a new filename:

1. Put the image in `public/images/`.
2. Open the relevant file in `src/content/projects/`.
3. Change its `cover` value, for example:

```yaml
cover: '/images/smart-table-dashboard.webp'
```

Use these image guidelines:

- Prefer WebP or AVIF for screenshots, SVG for original vector artwork, and PNG only when transparency or lossless detail is necessary.
- Use a consistent 3:2 landscape ratio; `1600 × 1067` pixels is a practical source size.
- Use lowercase, hyphenated filenames such as `smart-table-dashboard.webp`.
- Start public paths with `/images/` and match filename capitalization exactly. Production hosting is case-sensitive.
- Remove personal, medical, client, access-token, or other confidential data before publishing a screenshot.
- Compress large images before committing them.

The current project images are abstract covers, not claims of production screenshots. They can be replaced one at a time as approved material becomes available.

## Add a new project

This is already supported.

Create a lowercase, hyphenated Markdown file such as:

```text
src/content/projects/new-project.md
```

Use this template:

```md
---
title: 'Full Project Title'
shortTitle: 'Short Title'
description: 'A concise, factual explanation of the project and its outcome.'
category: 'Academic project'
company: 'Organization Name'
role: 'Front-End Developer'
timeframe: '2026'
stack:
  - Angular
  - TypeScript
  - REST API
cover: '/images/new-project.webp'
featured: true
order: 7
demoUrl: 'https://verified-demo.example.com'
sourceUrl: 'https://github.com/verified/repository'
---

## Overview

Explain the context and goal.

## Responsibilities

- Describe verified responsibilities.
- Keep confidential implementation details private.

## Result

Describe the result without unsupported metrics or claims.
```

Project rules:

- `category` must be exactly `Professional work`, `Academic project`, or `Academic project / thesis`.
- `stack` must contain at least one technology.
- `order` must be a positive whole number. Keep it unique so the ordering is predictable.
- `featured: true` includes the project on the homepage; all projects remain available in the project archive.
- Remove `company`, `timeframe`, `demoUrl`, or `sourceUrl` when no verified value is available.
- The filename becomes the URL slug: `new-project.md` becomes `/projects/new-project/`.

## Edit an existing project

Each file in `src/content/projects/` has two parts:

- The section between `---` markers controls the title, summary, metadata, cover, links, and ordering.
- The Markdown below it controls the longer case-study sections.

Do not add a new project category without also updating the category list in `src/content.config.ts`; otherwise the content check will fail.

## Update identity and contact details

This is already supported in `src/data/profile.ts`.

```ts
export const profile = {
  name: 'Salsabilla Edlanda Putri',
  role: 'Front-End Developer',
  location: 'Verified location',
  email: 'verified@example.com',
  phone: '+62 ...',
  links: {
    github: 'https://github.com/verified-account',
    linkedin: 'https://www.linkedin.com/in/verified-account',
    whatsapp: 'https://wa.me/verified-number',
  },
};
```

Use complete `https://` URLs. For WhatsApp, use the international number without `+`, spaces, parentheses, or hyphens after `wa.me/`.

The `photo` field is reserved for future use but is not rendered by the current design. Displaying a portrait requires a deliberate layout and component update.

## Update experience, education, organizations, and skills

These are already supported in `src/data/experience.ts`. Add or edit an object inside the appropriate exported array and follow the existing object shape.

Keep entries evidence-based:

- Do not invent missing dates, titles, employers, or achievements.
- Use present tense only for current responsibilities.
- Avoid percentages or business-impact claims without a source.
- Do not expose private company, customer, patient, or system information.

## Add a certification or document link

Certification entries already support an optional URL:

```ts
{
  title: 'Certificate Name',
  issuer: 'Issuing Organization',
  issued: '2026',
  summary: 'A short, factual description of the verified skills or learning outcome.',
  url: 'https://verified-certificate.example.com',
}
```

If `url` is omitted, the credential remains visible as text but is not clickable.

Use the existing `supportingDocuments` array for a verified collection or document-level link. A shared folder should not be presented as an individual certificate unless it directly proves that credential.

## Publish the CV download

The interface is ready, but the final approved PDF is still required.

1. Review the CV for accuracy and confirm that all included details may be public.
2. Export it as PDF. Do not publish the editable DOCX source.
3. Save it at:

   ```text
   public/documents/salsabilla-edlanda-putri-cv.pdf
   ```

4. Set this value in `src/data/profile.ts`:

   ```ts
   cvPath: '/documents/salsabilla-edlanda-putri-cv.pdf',
   ```

5. Run `npm test`. The CV button will appear automatically.

The repository is configured to accept that exact reviewed PDF filename while continuing to ignore other files in `public/documents/`.

## Replace the logo or browser icon

Both are already connected.

- Replace `public/logo.svg` to update the website logo.
- Replace `public/favicon.svg` to update the browser icon.

Keep the filenames unchanged for a no-code replacement. Preserve a compact SVG `viewBox`, check the result on both dark and lime backgrounds, and reload without browser cache when testing the favicon.

## Update the social sharing image

The sharing preview uses `public/images/og-cover.png`. Replace it with a `1200 × 630` PNG and keep the filename unchanged. The adjacent SVG is the editable source currently used to create that PNG; update both when changing the artwork so they do not drift apart.

## Verify every update

Run the complete project check before publishing:

```bash
npm test
```

For a substantial visual or responsive change, also run:

```bash
npm run test:browser
```

Then manually check:

- `/` at desktop and mobile widths
- `/projects/`
- every changed project detail page
- all email, phone, WhatsApp, GitHub, LinkedIn, demo, source, document, and CV links
- image crops, spelling, and whether any sensitive data is visible

## Publish through GitHub

For a normal local update:

```bash
git switch -c content/update-project-images
git add .
git commit -m "content: update portfolio assets"
git push -u origin content/update-project-images
```

Open a pull request on GitHub, review the preview, and merge it after the checks pass. If Vercel is connected to this repository, merging into the configured production branch triggers a new deployment.

For small text-only changes, GitHub's web editor is also acceptable. Always preview the resulting deployment before treating it as final.

## Common problems

- **An optional button is missing:** its URL or path is probably still an empty string.
- **An image works locally but not after deployment:** check exact capitalization and confirm the file is inside `public/`.
- **A new project fails validation:** check the accepted category, URL format, required stack, and positive `order` value.
- **The CV button does not appear:** confirm both the PDF path and `cvPath`, then restart the development server if needed.
- **The old favicon remains visible:** clear the browser cache or test in a private window.
- **A new data field is not visible:** fields do not create interface elements by themselves; a component may need to be updated.

For unresolved source information, see [CONTENT_TODO.md](./CONTENT_TODO.md). For production setup, see [DEPLOYMENT.md](./DEPLOYMENT.md).
