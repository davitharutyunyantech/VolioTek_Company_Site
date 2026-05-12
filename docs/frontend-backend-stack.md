# Frontend and Backend Tooling Stack

## Purpose

This file describes the tooling stack used in the project for building the frontend and backend parts. It includes only technologies related to frontend/backend website and API development.

AI integrations, analytics, CMS platforms, email providers, Vercel, Playwright, Sentry, and other tools that are not part of the actual frontend/backend stack are not included.

## Shared Project Base

- Runtime: Node.js `25.6.1`
- Package manager: npm `11.10.1`
- Language: TypeScript `5.9.3`
- Module format: ESM through `"type": "module"`
- Repository model: npm workspaces
- Main workspaces: `frontend`, `backend`, `services/*`, `packages/*`, `tools/*`

## Frontend Stack

- Framework: Next.js `16.2.6`
- Routing model: Next.js App Router
- UI runtime: React `19.2.4`
- DOM runtime: React DOM `19.2.4`
- Language: TypeScript `5.9.3`
- Styling: Tailwind CSS `4.2.1`
- PostCSS integration: `@tailwindcss/postcss` `4.2.1`
- Auth/session: NextAuth `4.24.13`
- Forms: React Hook Form `7.71.2`
- Validation: Zod `4.3.6`
- Fonts: Next.js font loading, Inter and Roboto Mono
- Icons: `lucide-react` `0.544.0`
- UI approach: custom React components, Tailwind classes, shared CSS variables, theme tokens, and brand assets

Tailwind CSS is the approved styling stack for this website. This file is the project-specific architectural decision that authorizes Tailwind under the general coding standards.

## Frontend Commands

- Development: `next dev`
- Production build: `next build`
- Production start: `next start`
- Linting: `eslint`
- Tests: `tsx --test`
- Visual QA: manual browser testing across desktop and mobile viewports

## Backend Stack

The backend stack is required because the website includes an admin area for managing website content and other site-owned data. Public pages may remain static or server-rendered where possible, but protected content-management workflows require authenticated API and database support.

- Runtime: Node.js
- Language: TypeScript `5.9.3`
- API framework: Fastify `5.8.2`
- Development runner: `tsx`
- Production build: TypeScript compiler `tsc`
- Environment variables: `dotenv`
- Database ORM: Prisma `7.5.0`
- Database client: Prisma Client `7.5.0`
- PostgreSQL adapter: `@prisma/adapter-pg` `7.5.0`
- PostgreSQL driver: `pg` `8.18.0`
- Database: PostgreSQL
- Local database image: `postgres:17-alpine`
- Local database orchestration: Docker Compose

## Backend Fastify Plugins

Plugins used in the backend/services stack:

- `@fastify/cors`
- `@fastify/jwt`
- `@fastify/multipart`
- `@fastify/rate-limit`
- `fastify-plugin`

Use only the plugins required by the business website backend. For example, if there is no file upload, `@fastify/multipart` is not required.

## Backend Commands

- Development: `tsx watch src/index.ts`
- Production build: `tsc --project tsconfig.json`
- Production start: `node dist/index.js`
- Tests: `tsx --test`
- Prisma generate: through the project Prisma CLI scripts
- Prisma migrations: through the project Prisma CLI scripts

## Admin Area Scope

The admin area is used for protected website-management workflows, starting with content updates. It should use the project backend, authentication, validation, and database layer rather than an external CMS by default.

Initial admin scope:

- authenticate admin users
- create, edit, publish, unpublish, and archive website content
- validate content before publishing
- expose published content to the public website through a stable API or server-side data access path
- record safe audit metadata for admin content changes

## Shared Internal Packages

The existing project uses internal packages for shared backend/service logic:

- `@vaultfill/service-kit`
- `@vaultfill/shared-schemas`
- `@vaultfill/prisma-cli`

For a company website, these packages are optional. Use them only if the new site shares contracts, validation schemas, auth helpers, or database tooling with the main product.

## Suggested Website Project Structure

Use the same general structure as the existing project:

```text
frontend/
  src/
  public/
  package.json

backend/
  src/
  package.json

packages/
  shared-schemas/
```

If the business website is simple, it can be reduced to:

```text
frontend/
backend/
```

## Build, Test, and Quality Tools

- Type checking: TypeScript
- Frontend linting: ESLint `9.39.3`
- Next.js lint config: `eslint-config-next` `16.2.6`
- Frontend build gate: `next build`
- Backend build gate: `tsc`
- Test runner: Node test runner and `tsx --test`
- Local database: Docker Compose with PostgreSQL

## Out of Scope

These tools are not part of the required frontend/backend stack for this website:

- AI integrations
- Vercel-specific tooling
- Framer Motion / Motion
- Playwright
- Prettier
- Sentry
- Plausible, Fathom, or other analytics platforms
- Resend, Postmark, SendGrid, or other email providers
- CMS platforms
- Extra UI kits not already used by the project

Animations should be implemented with CSS/Tailwind transitions and small React state changes only. Do not add Framer Motion, Motion, or another animation dependency unless a separate project decision approves it.
