# A Little Universe for Tâm

A dreamy, interactive surprise website — a tiny pink-purple galaxy made for Tâm to explore.

Built with **Vite + React + TypeScript**. No backend, no accounts, no paid assets.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The static site is output to `dist/`.

## Publish a shareable URL

Any static host works. Easy options:

### Vercel

```bash
npx vercel
```

### Netlify

```bash
npx netlify deploy --prod --dir=dist
```

(Build first with `npm run build`, or set the build command to `npm run build` and publish directory to `dist` in the Netlify UI.)

### GitHub Pages

1. Push this repo to GitHub.
2. In `vite.config.ts`, set `base: '/REPO_NAME/'` if deploying to a project page.
3. Deploy the `dist` folder with [GitHub Pages](https://pages.github.com/) or the `peaceiris/actions-gh-pages` action.

## Customize

| What | Where |
| --- | --- |
| Star messages, chaos lines, intro/finale copy | `src/data/content.ts` |
| Colors & fonts | `src/index.css` (`:root` variables) |
| Star positions / sizes | `src/data/content.ts` → `STARS[].position` |
| Intro / galaxy / ending UI | `src/components/` |

## Notes

- Intro completion is remembered in `localStorage` (key `tam-universe-intro-done`). Clear site data to see the intro again.
- Respects `prefers-reduced-motion`.
- No audio autoplay; fonts are bundled locally so the main experience needs no external network requests.
