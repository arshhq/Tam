# A Little Universe for Tâm — Instructions

Project path: `/Users/arshraj/Downloads/tam-little-universe`

## Run locally

```bash
cd "/Users/arshraj/Downloads/tam-little-universe"
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

Static output goes to the `dist/` folder.

## Publish a shareable URL

### Vercel

```bash
npm run build
npx vercel
```

### Netlify

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

Or in the Netlify UI: build command `npm run build`, publish directory `dist`.

### GitHub Pages

1. Push this repo to GitHub.
2. If deploying to a project page, set `base: '/REPO_NAME/'` in `vite.config.ts`.
3. Deploy the `dist` folder with GitHub Pages.

## Customize

| What | File |
| --- | --- |
| Star messages, chaos lines, intro/finale copy | `src/data/content.ts` |
| Colors & fonts | `src/index.css` (`:root` variables) |
| Star positions / sizes | `src/data/content.ts` → `STARS[].position` |
| Intro / galaxy / ending UI | `src/components/` |

## Notes

- Intro completion is stored in `localStorage` under `tam-universe-intro-done`. Clear site data to see the intro again.
- Respects `prefers-reduced-motion`.
- Fonts are bundled locally — no external network needed for the main experience.
- No backend, accounts, or paid assets.
