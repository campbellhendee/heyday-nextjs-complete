# Heyday Flower Co — Next.js

Modern marketing site built with Next.js 14 (App Router) and TypeScript.

## 🚀 Stack

- Next.js 14.2 (App Router)
- React 18 / TypeScript 5.6
- CSS modules via global design system in `styles/global.css`

## 🛠️ Local Development

```bash
npm install
npm run dev
```

### Useful scripts

- `npm run build` – production build (runs lint + type checks)
- `npm run start` – start production server locally
- `npm run lint` – ESLint checks
- `npm run curation:*` – internal scripts for regenerating galleries and assets

## 🔑 Environment Variables

Copy `.env.example` to `.env.local` and adjust as needed:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

This value powers metadata links (canonical URL, OG images). For local development you can set it to `http://localhost:3000`.

## ☁️ Deploying to Vercel

The project is configured for Vercel via `vercel.json`. To deploy:

1. **Create the project**
	- Import the repository at <https://vercel.com/new>
	- When prompted, set the framework to **Next.js** (auto-detected).
2. **Configure environment variables**
	- Add `NEXT_PUBLIC_SITE_URL` with your production domain (e.g. `https://heydayflowers.com`).
3. **Install & build commands**
	- Install command: `npm install`
	- Build command: `npm run build`
	- Output directory: `.next`
	(These values are pre-defined in `vercel.json`, so the defaults will be applied automatically.)
4. **Deploy**
	- Click **Deploy**. Vercel will build the project and provision a preview domain.
	- After verifying, promote the deployment or configure a custom domain in the Vercel dashboard.

### CLI deployment (optional)

```bash
npm install -g vercel
vercel login
vercel --prod
```

## ✅ Production Checklist

- [x] `npm run lint`
- [x] `npm run build`
- [x] Smoke test (`start /b npm run start` → `curl http://localhost:4000/` → `taskkill /F /IM node.exe`)
- [ ] Configure production analytics / monitoring (optional)

## 🔒 Security

Run `npm audit` periodically and apply recommended fixes (`npm audit fix --force`) if the updates align with your risk tolerance.

