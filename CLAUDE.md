# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `pnpm dev`
- **Build**: `pnpm build`
- **Lint/check**: `pnpm check` (runs Biome via Ultracite)
- **Format/fix**: `pnpm fix` (runs Biome autofix via Ultracite)
- **Database**:
  - `pnpm db:generate` — regenerate Prisma client after schema changes
  - `pnpm db:migrate` — create and apply a migration (dev only)
  - `pnpm db:push` — push schema changes without a migration file
  - `pnpm db:studio` — open Prisma Studio
- **Add a shadcn component**: `pnpm dlx shadcn@latest add <component-name>`

No test framework is configured. Consult the user before adding one.

## Architecture Overview

This is a Next.js 16 SaaS workflow automation platform. Full architecture is documented in `PROJECT_STRUCTURE.md` and `AGENTS.md`.

### Key stack decisions

| Concern | Tool |
|---|---|
| Routing/UI | Next.js 16 App Router, React 19 |
| Styling | Tailwind CSS v4 + CSS custom properties (oklch) |
| Components | shadcn/ui with `base-nova` style, built on `@base-ui/react` (not Radix UI) |
| Linting/Formatting | Biome v2 via Ultracite preset |
| API layer | tRPC (HTTP + React Query) |
| Auth | Better Auth (Prisma adapter) |
| Database | Prisma → Neon Postgres. Prisma client output is `app/generated/prisma` |
| Background jobs | Inngest |
| Payments | Polar |

### Boundaries that must never be crossed

- **Server boundary**: nothing in `server/` is imported from client components. `lib/trpc/client.ts` and `lib/auth-client.ts` are the only client→server bridges.
- **DAL boundary**: only `*.dal.ts` files import from `@prisma/client` or `server/db.ts`. Routers and services call DAL functions.
- **DTO boundary**: all tRPC procedures declare `.input()` with a Zod DTO schema. Raw unvalidated data never reaches DAL or services.

### `server/domains/` — vertical slices

Each domain co-locates its router, DAL, DTOs, and services. File suffixes define roles:

| Suffix | Role |
|---|---|
| `.router.ts` | tRPC procedures (validate via DTOs, call DAL/services) |
| `.dal.ts` | Pure Prisma queries — only place Prisma is called |
| `.dto.ts` | Zod schemas for tRPC `.input()`/`.output()` |
| `.service.ts` | Business logic (orchestrates DAL + side-effects) |
| `.adapter.ts` | Third-party SDK wrappers |
| `.trigger.ts` | Inbound event handlers → workflow executions |
| `.guard.ts` | Plan limits and permission checks |

### App Router route groups

- `(marketing)` — public, no auth
- `(auth)` — unauthenticated-only pages (redirect if logged in)
- `(dashboard)` — protected, includes sidebar + subscription gate

Pages are thin: fetch via tRPC server caller (RSC) or React Query (client components). No business logic or direct Prisma calls in `app/`.

### tRPC wiring

- `lib/trpc/client.ts` — React Query hooks (`trpc.<router>.<procedure>.useQuery(...)`)
- `lib/trpc/server.ts` — server-side caller for RSC (`await trpc.<router>.<procedure>()`)
- `lib/trpc/provider.tsx` — `TRPCProvider` + `QueryClientProvider` wrapper
- `app/api/trpc/[trpc]/route.ts` — HTTP adapter

### Component conventions

- Use function declarations for components (not arrow functions assigned to `const`)
- Export named components (not default) from `components/ui/`
- Use `cn()` from `lib/utils.ts` for all className merging
- Icons from `lucide-react`

### Code style

- Path alias `@/*` maps to the project root — always use it, never relative cross-directory imports
- 2-space indent, TypeScript strict mode
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`) — no need to manually `useMemo`/`useCallback` for performance
- `use ref` as a prop (React 19) instead of `React.forwardRef`
