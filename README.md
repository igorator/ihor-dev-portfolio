# Portfolio

![Preview](https://raw.githubusercontent.com/igorator/ihor-dev-portfolio/main/app/opengraph-image.png)

Personal portfolio built with Next.js 16, React 19, and TypeScript.  
Features a WebGL animated background, glass UI system, bilingual content, and a fully filterable projects showcase.

**Live:** [ihor-dev.site](https://www.ihor-dev.site)  
**Assets repository:** [GitHub](https://github.com/igorator/portfolio-assets)

---

## Stack

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6%20strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![CSS Modules](https://img.shields.io/badge/CSS%20Modules-styling-264DE4)](https://github.com/css-modules/css-modules)
[![CSS Custom Properties](https://img.shields.io/badge/CSS-variables-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
[![motion/react](https://img.shields.io/badge/motion%2Freact-v14-0055FF?logo=framer&logoColor=white)](https://motion.dev/)
[![OGL](https://img.shields.io/badge/WebGL-OGL-000000)](https://github.com/oframe/ogl)
[![next-intl](https://img.shields.io/badge/i18n-next--intl%20v4-1A1A1A)](https://next-intl.dev/)
[![Radix UI](https://img.shields.io/badge/UI-Radix%20Primitives-000000)](https://www.radix-ui.com/)
[![Vercel Analytics](https://img.shields.io/badge/Vercel-Analytics-black?logo=vercel)](https://vercel.com/analytics)
[![Speed Insights](https://img.shields.io/badge/Speed-Insights-black?logo=vercel)](https://vercel.com/docs/speed-insights)
[![Vitest](https://img.shields.io/badge/Vitest-unit%20tests-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-e2e-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-linting-4B32C3?logo=eslint)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-formatting-F7B93E?logo=prettier)](https://prettier.io/)
[![Husky](https://img.shields.io/badge/Husky-git%20hooks-1F1E1E)](https://typicode.github.io/husky/)
[![lint-staged](https://img.shields.io/badge/lint--staged-automation-2E8B57)](https://github.com/lint-staged/lint-staged)

---

## Features

- WebGL animated background built with OGL shaders reacting to cursor movement and theme changes
- Glass UI system with SVG displacement filters and reusable `glass-card` utility
- Light / dark / system theme with cookie persistence and SSR-safe hydration
- Full internationalization (English + Ukrainian) with locale-based routing and `hreflang` alternates
- Advanced projects system: filtering by tech stack, sorting, and view modes
- Media lightbox with keyboard navigation, video support, and portal rendering
- Scroll-driven employment timeline with project linking
- Cache Components (`'use cache'`) with Partial Prerendering
- SEO optimization with OpenGraph, Twitter Cards, JSON-LD schema
- Mobile-first UI with bottom navigation and adaptive layouts

---

## Pages

| Route              | Description                            |
| ------------------ | -------------------------------------- |
| `/`                | Home — intro, skills, highlights       |
| `/projects`        | Projects list with filtering and views |
| `/projects/[slug]` | Project detail — gallery and metadata  |
| `/employment`      | Work experience timeline               |

---

## Getting Started

Requires Node.js 24.

```bash
# Install dependencies
npm install

# Run development server (clears .next and reinstalls dependencies first)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Stop a running dev server before starting another one — `npm run dev` reinstalls `node_modules`.

## Scripts

| Script                 | Description                                   |
| ---------------------- | --------------------------------------------- |
| `npm run lint`         | ESLint                                        |
| `npm run format`       | Prettier (write)                              |
| `npm run format:check` | Prettier (check only)                         |
| `npm test`             | Unit tests (Vitest)                           |
| `npm run test:watch`   | Unit tests in watch mode                      |
| `npm run test:e2e`     | E2E tests (Playwright), needs `npm run build` |

Before the first E2E run install the browser: `npx playwright install chromium`.

CI (GitHub Actions) runs typecheck, lint, format check and unit tests on every push and PR, then builds the site and runs E2E tests.

---

## Project Structure

Feature-Sliced Design layers, each importing only from layers below it:

```
app/        # routes, metadata, sitemap, robots
views/      # page-level sections
widgets/    # navbar, menus, theme and language switchers
entities/   # project, technology, employment — data, types, api
shared/     # ui kit, config, hooks, lib
messages/   # UI translations (en.json, uk.json)
e2e/        # Playwright tests
```

### Content

Each entity in `entities/*` keeps locale-independent data and translations apart:

```
entities/project/
  data/projects.ts        # base data keyed by slug
  data/i18n/en.ts, uk.ts  # translations
  api/index.ts            # public API: getProjects, getProjectBySlug, ...
```

Adding a project means one entry in `data/projects.ts` and one in each `data/i18n/*.ts`.
Everything is type-checked: a missing translation, an unknown technology id or a project slug
that doesn't exist fails `tsc`. The same applies to UI messages — `uk.json` must contain every key from `en.json`.

Project images and videos are served from the [assets repository](https://github.com/igorator/portfolio-assets) via jsDelivr
(`Projects/<slug>/cover.*`, `screen-N.*`, `video.mp4`).

### Configuration

| File                        | Purpose                                                                                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `shared/config/site.ts`     | Site name, SEO texts, socials. The URL comes from Vercel (`VERCEL_PROJECT_PRODUCTION_URL`)                                                                                           |
| `shared/config/projects.ts` | `commercialOnly` — show only commercial projects, hide the filter switch and personal count. Read from Vercel Global Config (key `projects`), falls back to the defaults in the file |

Values in Vercel → Storage → Global Config `ihor-dev-portfolio` can be edited without a redeploy; changes show up within a few minutes.
Locally the fallback values are used unless `GLOBAL_CONFIG` is pulled with `vercel env pull`.
