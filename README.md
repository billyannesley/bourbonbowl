# Bourbon Bowl

The clubhouse archive for the annual Bourbon Bowl golf outing.

## Stack

- Next.js App Router
- React
- TypeScript
- Plain responsive CSS
- Vercel deployment

## Local development

```bash
npm install
npm run dev
```

Tournament rosters and match history currently live in `app/page.tsx`. Results are intentionally marked as pending until the original scorecards are verified.

## Deployment

Import the GitHub repository into Vercel with the **Next.js** framework preset and the repository root as the root directory. Vercel will use `npm run build`; no environment variables are currently required.
