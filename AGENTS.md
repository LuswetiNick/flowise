# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Build & Development Commands

- **Dev server**: `pnpm dev` (runs Next.js dev server on http://localhost:3000)
- **Build**: `pnpm build`
- **Start production**: `pnpm start`
- **Lint**: `pnpm lint` (runs `biome check` — this project uses Biome, NOT ESLint)
- **Format**: `pnpm format` (runs `biome format --write`)
- **Add UI component**: `pnpm dlx shadcn@latest add <component-name>`

There is no test framework configured yet. If tests need to be added, consult the user for their preferred framework.

## Architecture

- **Framework**: Next.js 16 with App Router, React 19, and the React Compiler enabled (`reactCompiler: true` in `next.config.ts`)
- **Package manager**: pnpm
- **Language**: TypeScript in strict mode
- **Styling**: Tailwind CSS v4 with PostCSS, using oklch color space for the design tokens defined as CSS variables in `app/globals.css`
- **Linting/Formatting**: Biome v2 (configured in `biome.json`). Indent style is 2-space. Import organization is enabled via Biome assist.
- **Path alias**: `@/*` maps to the project root (e.g. `@/components/ui/button`, `@/lib/utils`)

## UI Component System

UI components live in `components/ui/` and are from **shadcn/ui** using the `base-nova` style (configured in `components.json`). Key details:

- Components are built on **@base-ui/react** primitives (not Radix UI). When adding or modifying components, import from `@base-ui/react/*`.
- Variants use **class-variance-authority (CVA)**. See `components/ui/button.tsx` for the pattern.
- The `cn()` helper in `lib/utils.ts` (clsx + tailwind-merge) is used for all className merging.
- Components use `data-slot` attributes for parent-child composition patterns (e.g. `data-slot="card-header"`).
- Icons come from **lucide-react**.

## Theming & Dark Mode

- Dark mode is toggled by adding the `dark` class to a parent element (configured via `@custom-variant dark (&:is(.dark *))` in `globals.css`).
- Both light and dark color tokens are defined in `app/globals.css` using CSS custom properties with oklch values.
- Fonts are IBM Plex Sans (sans), IBM Plex Mono (mono), and IBM Plex Serif (serif), loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables `--font-ibm-plex-sans`, `--font-ibm-plex-mono`, `--font-ibm-plex-serif`.

## Code Style

- Biome enforces recommended lint rules with Next.js and React domains enabled, plus `noUnknownAtRules` disabled (needed for Tailwind `@` directives).
- Use function declarations for components (not arrow functions assigned to const), matching the existing shadcn pattern.
- Export named components (not default) from `components/ui/` files.
