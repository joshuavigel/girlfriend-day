# happy national girlfriend day 💜

A little mobile site: a sealed envelope that takes **three taps** to open, then the letter,
your photos, purple flowers and matcha drinks all burst out.

## Write your message

Open `src/App.jsx` and fill in the two constants at the top:

```js
const LETTER_TEXT = `write whatever you want here
line breaks are kept exactly as you type them`

const SIGNATURE = 'love, josh'
```

Leave `LETTER_TEXT` as an empty string and the letter stays blank with ruled lines.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed URL. To see it properly, use your browser's device toolbar and
pick an iPhone — it's built for a phone screen.

## Publish to GitHub Pages

`vite.config.js` uses `base: './'`, so it works at any repo path without extra config.

**Option A — GitHub Actions (recommended).** `.github/workflows/deploy.yml` is already here.

```bash
git init && git add -A && git commit -m "girlfriend day site"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
Every push to `main` redeploys. Site lands at `https://<you>.github.io/<repo>/`.

**Option B — one-off from your machine.**

```bash
npm run deploy
```

That builds and pushes `dist/` to a `gh-pages` branch. Then set
**Settings → Pages → Source: Deploy from a branch → `gh-pages` / root**.

## Swapping photos

Drop `.jpg` files into `src/assets/photos/`. They're picked up automatically and sorted by
filename. There are 7 landing spots in `src/components/PhotoBurst.jsx` (`spots`) — add more
entries there if you add more than 7 photos.
