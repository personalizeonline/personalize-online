Personalize‑Online — Production App

This repository now contains only the production Next.js app at the repository root.

What’s included
- Componentized pages for Home, Play, Thanks, Terms, Privacy.
- Rotating “quoted word” hero, Create form → demo player.
- Client‑side gating for downloads (unlocks after purchase).
- SEO basics: canonical/OG URL, sitemap/robots.

Run locally
- Prereqs: Node 18+ and npm
- Commands:
  - `npm install`
  - `npm run dev` → open http://localhost:3000 (or set `PORT=3100 npm run dev`)

Configure
- Edit `public/config.json`:
  - `siteUrl`: your base URL (for SEO)
  - `supportEmail`: support contact
  - `checkout.subscription` and `checkout.onetime`: hosted checkout URLs
- Audio map: set demo audio URLs in `public/assets/demo-audio-map.json`.

Build & start
- `npm run build && npm start` (port 3000 by default; use `PORT=3100 npm start` to change)

Deploy
- Vercel (recommended): import the repo and deploy (framework auto-detected).
- Any Node host: build in CI, then run `next start`.

Troubleshooting
- Internal Server Error on port 3000: another process may be using the port.
  - Quick fix: run with a different port: `PORT=3100 npm start`.
  - Or free the port:
    - macOS/Linux: `lsof -i :3000` then `kill -9 <PID>`
    - Windows (PowerShell): `Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force`

Notes
- Static prototypes and no‑code playbooks were removed to keep only production code.
