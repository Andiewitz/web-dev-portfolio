# AGENTS.md

## Project

- Stack: React 19 + TypeScript, Vite 7, Tailwind CSS 4, Express server (production), pnpm.
- Commands: `pnpm install`, `pnpm dev` (Vite, --host), `pnpm build`, `pnpm preview`, `pnpm check` (tsc), `pnpm test`.
- Structure: `client/` (Vite React app: `client/src/pages`, `client/src/components`, `client/src/index.css`), `server/` (Express), `scripts/`.
- Package manager: pnpm (see `packageManager` in package.json). Prefer pnpm over npm/bun for installs.

## Design system (source of truth)

All visual decisions defer to the portfolio design system:

- `DESIGN.md` — canonical markdown version.
- `docs/Portfolio design system.pdf` — original visual reference (9 boards).

Follow it for color, type scale, spacing, radius, controls and content blocks. Do not introduce colors, type sizes, spacing values, radii or component patterns outside the system. When a value is ambiguous, re-read the relevant section of `DESIGN.md` (and the PDF) before deciding.

## Conventions

- Preserve the concentric-corner math: `inner = outer − padding` (4px floor).
- Spacing only from the 4px scale on an 8px grid.
- No font weight under 400; subtitles/secondary text start at 500.
- Ember is a pinprick: used once per screen (focus, hover, one mark).
- Keep the dev server running for previews; do not stop it unless asked.