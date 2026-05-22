# Coastal Resilience Visualizations

Interactive before/after visualizations of flood-resilient adaptations for three Southwest Florida coastal sites: St. Armands Circle, Everglades City, and Fort Myers Beach.

Created by the **Tampa Bay Regional Planning Council (TBRPC)** in April 2026 for the **Southwest Florida Regional Planning Council (SWFRPC)**. Intended for embedding into the SWFRPC ArcGIS Online Hub site.

## Run locally

```
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. Repo → **Settings** → **Pages** → **Source: GitHub Actions**.
3. The `.github/workflows/deploy.yml` workflow runs on every push to `main`, builds the Vite app, and publishes `dist/` to Pages.
4. Your site will be live at `https://<user>.github.io/<repo-name>/`.

## Embed in ArcGIS Online Hub

In the Hub site editor, add an **Embed** card and use:

```html
<iframe
  src="https://<user>.github.io/<repo-name>/"
  width="100%"
  height="900"
  style="border: 0;"
  loading="lazy"
  title="Coastal Resilience Visualizations">
</iframe>
```

Asset paths are relative, so the iframe works from any host URL.
