# Flowise — Project Structure

Target architecture for a Next.js 16 SaaS workflow automation platform.

## Directory Tree

```
flowise/
├── app/                                  # Next.js App Router (UI + route handlers only)
│   ├── (marketing)/                      # Public marketing pages
│   │   ├── layout.tsx
│   │   ├── page.tsx                      # Landing page
│   │   └── pricing/
│   │       └── page.tsx
│   │
│   ├── (auth)/                           # Auth pages (unauthenticated)
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── verify-email/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/                      # Protected SaaS shell
│   │   ├── layout.tsx                    # Sidebar, auth guard, subscription gate
│   │   ├── workflows/
│   │   │   ├── page.tsx                  # Workflow list
│   │   │   └── [workflowId]/
│   │   │       ├── page.tsx              # Workflow detail / settings
│   │   │       └── editor/
│   │   │           └── page.tsx          # React Flow canvas (client component)
│   │   ├── executions/
│   │   │   ├── page.tsx                  # Execution history
│   │   │   └── [executionId]/
│   │   │       └── page.tsx              # Single execution log
│   │   ├── credentials/
│   │   │   └── page.tsx                  # OAuth / API key vault
│   │   ├── settings/
│   │   │   ├── page.tsx                  # Account settings
│   │   │   └── billing/
│   │   │       └── page.tsx              # Polar subscription management
│   │   └── onboarding/
│   │       └── page.tsx
│   │
│   ├── api/                              # Route handlers
│   │   ├── trpc/[trpc]/route.ts          # tRPC HTTP adapter
│   │   ├── auth/[...all]/route.ts        # Better Auth catch-all
│   │   ├── inngest/route.ts              # Inngest serve endpoint
│   │   └── webhooks/                     # Inbound webhooks
│   │       ├── polar/route.ts            # Polar payment events
│   │       ├── stripe/route.ts           # Stripe trigger events
│   │       └── google-forms/route.ts     # Google Forms trigger events
│   │
│   ├── layout.tsx                        # Root layout (fonts, providers)
│   ├── globals.css
│   └── favicon.ico
│
├── server/                               # All server-side logic (never imported by client)
│   ├── db.ts                             # Prisma client singleton
│   ├── auth.ts                           # Better Auth server instance (Prisma adapter, plugins)
│   │
│   ├── trpc/
│   │   ├── init.ts                       # tRPC instance, context factory, base procedures
│   │   └── root.ts                       # Merges all domain routers into appRouter
│   │
│   ├── domains/                          # Domain-based modules (co-located DAL, DTO, router, services)
│   │   │
│   │   ├── workflow/
│   │   │   ├── workflow.router.ts        # tRPC router: CRUD + canvas save
│   │   │   ├── workflow.dal.ts           # Prisma queries for workflows, nodes, edges
│   │   │   ├── workflow.dto.ts           # Zod schemas: CreateWorkflow, UpdateCanvas, etc.
│   │   │   ├── workflow-engine.ts        # Graph resolver — topological execution of nodes
│   │   │   └── node-executor.ts          # Dispatch to correct node handler by type
│   │   │
│   │   ├── execution/
│   │   │   ├── execution.router.ts       # tRPC router: list, get, cancel
│   │   │   ├── execution.dal.ts
│   │   │   └── execution.dto.ts
│   │   │
│   │   ├── credential/
│   │   │   ├── credential.router.ts      # tRPC router: CRUD for stored secrets
│   │   │   ├── credential.dal.ts
│   │   │   ├── credential.dto.ts
│   │   │   └── credential-vault.ts       # Encrypt / decrypt stored credentials
│   │   │
│   │   ├── user/
│   │   │   ├── user.router.ts            # tRPC router: profile, preferences
│   │   │   ├── user.dal.ts
│   │   │   └── user.dto.ts
│   │   │
│   │   ├── billing/
│   │   │   ├── billing.router.ts         # tRPC router: plans, checkout, portal
│   │   │   ├── billing.dal.ts
│   │   │   ├── billing.dto.ts
│   │   │   ├── polar.client.ts           # Polar SDK client instance
│   │   │   ├── subscription.service.ts   # Sync subscriptions, check entitlements
│   │   │   └── paywall.guard.ts          # Plan limit checks (used by other domains)
│   │   │
│   │   ├── ai/                           # AI provider adapters (no router — internal only)
│   │   │   ├── openai.adapter.ts
│   │   │   ├── claude.adapter.ts
│   │   │   └── gemini.adapter.ts
│   │   │
│   │   ├── messaging/                    # Messaging adapters (no router — internal only)
│   │   │   ├── discord.adapter.ts
│   │   │   └── slack.adapter.ts
│   │   │
│   │   └── triggers/                     # Trigger handlers (no router — called by engine + webhooks)
│   │       ├── webhook.trigger.ts
│   │       ├── google-form.trigger.ts
│   │       ├── stripe.trigger.ts
│   │       └── manual.trigger.ts
│   │
│   └── inngest/                          # Background jobs
│       ├── client.ts                     # Inngest client instance
│       └── functions/
│           ├── execute-workflow.fn.ts    # Main workflow execution function
│           ├── retry-failed-step.fn.ts
│           └── usage-metering.fn.ts      # Track usage for billing limits
│
├── lib/                                  # Shared code (importable by both client & server)
│   ├── trpc/
│   │   ├── client.ts                     # tRPC React Query client (createTRPCClient)
│   │   ├── server.ts                     # tRPC server-side caller (for RSC)
│   │   └── provider.tsx                  # TRPCProvider wrapping QueryClientProvider
│   │
│   ├── auth-client.ts                    # Better Auth client (createAuthClient) — useSession, signIn, signOut
│   ├── utils.ts                          # cn() and general helpers
│   ├── constants.ts                      # App-wide constants, plan tiers, node types enum
│   └── validators.ts                     # Shared Zod schemas used by both client & server
│
├── components/                           # React components
│   ├── ui/                               # shadcn/ui primitives (base-nova / @base-ui/react)
│   │
│   ├── workflow/                         # Workflow builder feature
│   │   ├── canvas.tsx                    # React Flow wrapper + provider
│   │   ├── toolbar.tsx                   # Top bar: save, run, zoom controls
│   │   ├── node-palette.tsx              # Draggable node type sidebar
│   │   ├── node-config-panel.tsx         # Right-hand config sheet for selected node
│   │   ├── minimap.tsx
│   │   ├── nodes/                        # Custom React Flow node components
│   │   │   ├── trigger-node.tsx
│   │   │   ├── ai-node.tsx
│   │   │   ├── messaging-node.tsx
│   │   │   ├── http-node.tsx
│   │   │   ├── condition-node.tsx
│   │   │   └── base-node.tsx             # Shared node chrome (handles, status indicator)
│   │   └── edges/
│   │       └── smart-edge.tsx            # Custom animated edge
│   │
│   ├── billing/
│   │   ├── plan-card.tsx
│   │   ├── usage-meter.tsx
│   │   └── paywall-dialog.tsx
│   │
│   ├── auth/
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   └── user-menu.tsx
│   │
│   ├── executions/
│   │   ├── execution-table.tsx
│   │   └── step-log-viewer.tsx
│   │
│   ├── credentials/
│   │   └── credential-form.tsx
│   │
│   └── layout/
│       ├── sidebar.tsx
│       ├── header.tsx
│       └── theme-toggle.tsx
│
├── hooks/                                # Custom React hooks
│   ├── use-workflow.ts                   # React Flow state + tRPC mutations
│   ├── use-auto-save.ts                  # Debounced save for canvas changes
│   ├── use-execution-status.ts           # Poll / subscribe to execution progress
│   └── use-subscription.ts              # Current plan, limits, paywall checks
│
├── types/                                # Shared TypeScript types (no runtime code)
│   ├── workflow.ts                       # Workflow, Node, Edge type unions
│   ├── node-registry.ts                  # Discriminated union of all node configs
│   └── billing.ts                        # Plan tiers, feature flags
│
├── prisma/
│   ├── schema.prisma                     # Database schema
│   └── migrations/
│
├── public/
│
├── sentry.client.config.ts
├── sentry.server.config.ts
├── sentry.edge.config.ts
├── instrumentation.ts                    # Next.js instrumentation (Sentry init)
│
├── biome.json
├── components.json                       # shadcn config
├── next.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── .env.local                            # Local secrets (git-ignored)
├── .env.example                          # Checked-in template
├── .gitignore
├── AGENTS.md
└── PROJECT_STRUCTURE.md
```

## Domain Architecture

The server is organized by **domain** (vertical slices), not by layer. Each domain co-locates its router, DAL, DTOs, and services in a single folder. This means working on a feature touches one directory, not four.

### `app/` — Routing & UI rendering only
Pages are thin: fetch data via tRPC (server caller in RSC, React Query client in client components), render components. **No business logic or direct Prisma calls in `app/`.**

Route groups control layout and auth boundaries:
- `(marketing)` — no auth required, public layout
- `(auth)` — unauthenticated-only (redirect if logged in)
- `(dashboard)` — protected, layout includes sidebar + subscription gate

### `server/trpc/` — Infrastructure only
`init.ts` creates the tRPC instance, context factory (injects session + db), and reusable base procedures:
- `publicProcedure` — no auth required
- `protectedProcedure` — requires valid session (via Better Auth)
- `subscribedProcedure` — requires active subscription (extends protected)

`root.ts` imports and merges the routers from each domain — it contains no business logic.

### `server/domains/` — Feature modules
Each domain folder contains all server-side code for that feature:

**Domains with tRPC routers** (exposed to the client):
- `workflow/` — CRUD, canvas save, workflow-engine, node-executor
- `execution/` — list, get, cancel execution runs
- `credential/` — CRUD for stored secrets + credential-vault encryption
- `user/` — profile, preferences
- `billing/` — plans, checkout, portal, Polar client, paywall guard

**Internal domains** (no router — called by other domains):
- `ai/` — provider adapters (OpenAI, Claude, Gemini) called by the workflow engine's node-executor
- `messaging/` — adapter pattern for Discord, Slack
- `triggers/` — webhook, Google Form, Stripe, manual trigger handlers

Within each domain, the file suffixes define the role:

| Suffix | Role | Rules |
|---|---|---|
| `.router.ts` | tRPC procedures | Validates with DTOs, calls DAL/services, returns typed output |
| `.dal.ts` | Data Access Layer | Pure Prisma queries. No business logic, no side-effects. Only place Prisma is called. |
| `.dto.ts` | Data Transfer Objects | Zod schemas for `.input()` / `.output()`. Shared type inference via `z.infer<>`. |
| `.service.ts` | Business logic | Orchestrates DAL calls + side-effects. Never imports Prisma directly. |
| `.adapter.ts` | External integrations | Wraps third-party SDKs (OpenAI, Discord, Polar, etc.) |
| `.trigger.ts` | Trigger handlers | Process inbound events into workflow executions |
| `.guard.ts` | Authorization/limits | Check permissions, plan limits, feature flags |

### `server/auth.ts` — Better Auth (server instance)
Configures Better Auth with the Prisma adapter, plugins, and session handling. This is the server-side instance — never imported from client code.

### `lib/auth-client.ts` — Better Auth (client instance)
Creates the Better Auth client via `createAuthClient()`. Provides `useSession()`, `signIn()`, `signOut()` hooks. Communicates with `server/auth.ts` via HTTP through `app/api/auth/[...all]/route.ts`. Same boundary pattern as tRPC.

### `server/inngest/` — Background jobs
Long-running workflow executions are dispatched to Inngest. The `execute-workflow.fn.ts` function walks the node graph, executing each step as an Inngest step (giving per-step retries and observability).

### `lib/trpc/` — Client wiring
- `client.ts` — creates the tRPC React Query hooks (`trpc.workflow.list.useQuery(...)`)
- `server.ts` — creates a server-side caller for use in RSC (`await trpc.workflow.list()`)
- `provider.tsx` — wraps the app in `TRPCProvider` + `QueryClientProvider`

### `components/workflow/` — Canvas feature
The React Flow canvas is a client component tree. Key architecture:
- `canvas.tsx` wraps `<ReactFlow>` with a `ReactFlowProvider`
- Custom nodes in `nodes/` each render a `base-node.tsx` wrapper for consistent handles and styling
- `node-config-panel.tsx` renders a dynamic form based on selected node type
- `node-palette.tsx` is a draggable sidebar of available node types
- Canvas state syncs to the server via `use-auto-save.ts` hook calling tRPC mutations

### `types/node-registry.ts` — Node type system
All node types are defined as a discriminated union so config panels, execution, and serialization are fully type-safe:

```ts
type TriggerNodeConfig =
  | { type: "webhook"; path: string }
  | { type: "google-form"; formId: string }
  | { type: "stripe"; eventType: string }
  | { type: "manual" };

type AINodeConfig =
  | { type: "openai"; model: string; prompt: string }
  | { type: "claude"; model: string; prompt: string }
  | { type: "gemini"; model: string; prompt: string };

type NodeConfig = TriggerNodeConfig | AINodeConfig | MessagingNodeConfig | HTTPNodeConfig | ConditionNodeConfig;
```

### Example: Full request flow through the workflow domain

```ts
// server/domains/workflow/workflow.dto.ts
export const CreateWorkflowInput = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
});

// server/domains/workflow/workflow.dal.ts
export async function createWorkflow(userId: string, data: CreateWorkflowInput) {
  return db.workflow.create({ data: { ...data, userId } });
}

// server/domains/workflow/workflow.router.ts
export const workflowRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateWorkflowInput)
    .mutation(({ ctx, input }) => {
      return createWorkflow(ctx.session.userId, input);
    }),
});
```

## Data Flow

```
User action (canvas drag, form submit)
  → React component
    → tRPC mutation (client.ts or server.ts)
      → tRPC router procedure
        → DTO input validation (Zod)
          → Service (business logic) and/or DAL (data access)
            → Prisma → Neon Postgres
          → [optional] Inngest.send() for async execution
        → DTO output validation
      → typed response
    → React Query cache update
  → UI re-renders
```

## Environment Variables (`.env.local`)

```bash
# Database
DATABASE_URL="postgresql://..."

# Better Auth
BETTER_AUTH_SECRET="..."
BETTER_AUTH_URL="http://localhost:3000"

# AI Providers
OPENAI_API_KEY="..."
ANTHROPIC_API_KEY="..."
GOOGLE_AI_API_KEY="..."

# Messaging
DISCORD_BOT_TOKEN="..."
SLACK_BOT_TOKEN="..."

# Payments
POLAR_ACCESS_TOKEN="..."
POLAR_WEBHOOK_SECRET="..."

# Background Jobs
INNGEST_EVENT_KEY="..."
INNGEST_SIGNING_KEY="..."

# Error Tracking
SENTRY_DSN="..."
NEXT_PUBLIC_SENTRY_DSN="..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ENCRYPTION_KEY="..."
```

## Conventions

- **File naming**: kebab-case for all files. DAL files end in `.dal.ts`, DTOs in `.dto.ts`, routers in `.router.ts`, Inngest functions in `.fn.ts`, service adapters in `.adapter.ts`, triggers in `.trigger.ts`.
- **Imports**: always use the `@/` path alias. Never use relative paths that cross top-level directories (e.g., don't `../../server` from `components/`).
- **Server boundary**: nothing in `server/` is ever imported from client components. `lib/trpc/client.ts` and `lib/auth-client.ts` are the only bridges from client to server.
- **DAL boundary**: only `.dal.ts` files import from `@prisma/client` or `server/db.ts`. Services and routers call DAL functions.
- **DTO boundary**: all tRPC procedures must declare `.input()` with a DTO schema. Raw unvalidated data never reaches DAL or services.
- **Domain boundary**: domains may import from other domains (e.g. workflow imports from ai/, billing), but avoid circular dependencies. If two domains need each other, extract shared logic to a service or to `lib/`.
- **Component structure**: feature components live in `components/<feature>/`. Only `components/ui/` contains generic primitives.
