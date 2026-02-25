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


# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `pnpm dlx ultracite fix`
- **Check for issues**: `pnpm dlx ultracite check`
- **Diagnose setup**: `pnpm dlx ultracite doctor`

Biome (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**
- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**
- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**
- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `pnpm dlx ultracite fix` before committing to ensure compliance.
