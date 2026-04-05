# Reverie Web — Journal de reves IA

## Architecture

- **Stack** : Next.js 16 + React 19 + Tailwind 4 + TypeScript
- **Backend** : Supabase (PostgreSQL + Auth + Storage)
- **API IA** : Next.js API Routes (process-dream, interpret-dream, generate-image)
- **Deploy** : Vercel (free tier)
- **Port dev** : 3000

## Developpement

```bash
npm run dev      # Next.js dev server
npm run build    # Production build
```

## Variables d'environnement (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
ANTHROPIC_API_KEY=sk-ant-xxx
DEEPGRAM_API_KEY=xxx
FAL_KEY=xxx
```

## Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing marketing (SSG)
│   ├── login/page.tsx              # Auth
│   ├── auth/callback/route.ts      # OAuth callback
│   ├── app/                        # Zone authentifiee
│   │   ├── page.tsx                # Dashboard
│   │   ├── dream/new/page.tsx      # Capture reve
│   │   ├── dream/[id]/page.tsx     # Detail reve
│   │   ├── journal/page.tsx        # Calendrier
│   │   └── profile/page.tsx        # Profil
│   ├── blog/                       # SEO (SSG)
│   └── api/                        # API Routes IA
├── components/
├── hooks/
├── lib/
│   ├── supabase-browser.ts
│   ├── supabase-server.ts
│   ├── prompts/                    # Prompts IA
│   └── constants.ts
├── types/
└── data/
```

## Design System

- Dark glass morphism, accent indigo (#6366f1)
- Fonts: Nunito (titres), Poppins (corps)
- Daltonisme: toujours icone+couleur

## Next.js 16 specifique

- `proxy.ts` au lieu de `middleware.ts`
- Tous les params/cookies/headers sont async (await)
- GET routes non cachees par defaut
