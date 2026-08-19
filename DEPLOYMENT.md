# Deployment Guide

This project is a Vite + React + TypeScript portfolio. The production build is written to `dist`.

## Local verification

```bash
pnpm install
pnpm build
pnpm preview
```

Open the local preview URL printed by Vite. The build should complete without TypeScript or bundling errors before deployment.

## GitHub Pages

The repository is a project site, so its default URL is expected to be:

```text
https://humbledanteh1.github.io/portfolio-/
```

The repository already includes `.github/workflows/deploy-pages.yml`. That workflow builds with `VITE_BASE=/portfolio-/` and deploys the `dist` directory through GitHub Pages.

1. Commit and push the changes to the `main` branch.
2. On GitHub, open **Settings → Pages** for `Humbledanteh1/portfolio-`.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Open the **Actions** tab and wait for **Deploy to GitHub Pages** to finish.
5. Open the URL shown in the `github-pages` environment, or visit `https://humbledanteh1.github.io/portfolio-/`.

If you later use a custom domain or a user site repository named `Humbledanteh1.github.io`, change the Pages build base to `/` and update the canonical URL and social metadata in `index.html` to the final public domain.

## Vercel

Vercel can deploy this Vite project directly from GitHub.

1. Sign in to [Vercel](https://vercel.com/) and choose **Add New → Project**.
2. Import the `Humbledanteh1/portfolio-` repository.
3. Keep the project root as `/`.
4. Use these settings if Vercel does not detect them automatically:

   | Setting | Value |
   | --- | --- |
   | Framework preset | Vite |
   | Install command | `pnpm install --frozen-lockfile` |
   | Build command | `pnpm build` |
   | Output directory | `dist` |

5. Click **Deploy**. Future pushes to the connected production branch will trigger new deployments, and other branches can receive preview deployments.

The included `vercel.json` provides an SPA fallback for future client-side routes. For this one-page portfolio, the current anchor navigation works without additional routing.

### Vercel CLI alternative

```bash
pnpm install
pnpm build
pnpm dlx vercel
```

Follow the prompts to link the project and deploy it. Use `pnpm dlx vercel --prod` when you are ready to promote a deployment to production.

## SEO follow-up after deployment

Replace the placeholder deployment assumptions in `index.html` with the final public URL when it is known. In particular, add a canonical link for the chosen domain, ensure the Open Graph image is reachable from that domain, and submit the live URL to Google Search Console or another webmaster tool. The current page already includes a descriptive title, meta description, robots directive, Open Graph tags, Twitter card tags, JSON-LD profile data, and a crawlable `public/robots.txt` file.
