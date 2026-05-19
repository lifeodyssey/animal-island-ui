# CLAUDE.md - Animal Island UI Tailwind

## Goal

Maintain and evolve `animal-island-ui-tailwind`, a Tailwind CSS v4 + Radix UI
component library with the Animal Island visual language. This is an
independently maintained project, originally forked from
`guokaigdg/animal-island-ui` (MIT) and now published under its own npm
package name.

The original Less implementation served as the reference source during the
initial migration. The migrated implementation is now the `main` branch
content and the single source of truth.

## Repository

- Package: `animal-island-ui-tailwind` on npm
- Repo: `lifeodyssey/animal-island-ui` on GitHub
- Origin: forked from `guokaigdg/animal-island-ui` (MIT), now independent

## Stack

- React 19 + TypeScript
- Tailwind CSS v4
- Radix UI primitives for headless interactive behavior
- Storybook 10 with Storybook/Vitest tests
- Playwright behavior tests and visual regression screenshots
- Vite library mode

## Component Inventory

The library exposes 19 components:

1. Button
2. Input
3. Switch
4. Checkbox
5. Select
6. Tabs
7. Card
8. Modal
9. Collapse
10. Divider
11. Icon
12. Typewriter
13. Phone
14. Footer
15. Time
16. Cursor
17. CodeBlock
18. Loading
19. Table

## Implementation Rules

- Runtime CSS belongs in `src/styles/tokens.css`.
- Use stable `animal-*` class names for component styling and testing hooks.
- Use `--animal-*` CSS custom properties for design tokens.
- Keep component class composition static enough for Tailwind v4 scanning.
- Prefer the local `cn` helper for class merging.
- Use Radix UI for Switch, Checkbox, Select, Tabs, Collapse, and Modal behavior.
- Preserve the original visual details: warm brown text, cream surfaces, teal
  accents, pill inputs, 3D button shadows, organic card/modal shapes, and the
  original asset set.
- Do not reintroduce Less modules.

## Publishing Shape

Keep the single-package distribution model:

- npm package name: `animal-island-ui-tailwind`
- `main`: `dist/cjs/index.cjs`
- `module`: `dist/es/index.js`
- `types`: `dist/types/index.d.ts`
- `exports["."]`: `types`, `import`, and `require`
- `exports["./style"]`: `dist/index.css`
- `exports["./dist/index.css"]`: `dist/index.css`
- Assets emitted to `dist/files`
- npm `files`: `dist`, `README.md`, `AI_USAGE.md`, `DESIGN_PROMPT.md`, `skill`

Vite should continue to build ESM and CJS outputs. Only React, React DOM, and
`react/jsx-runtime` are externalized. Radix UI, `classnames`, and
`tailwind-merge` stay as runtime dependencies to preserve the original
"install and use" consumer experience.

## Test And Release Checks

Use these checks before merging packaging, component, or visual parity changes:

```bash
npm run build
npm pack --dry-run
npm test
npm run build:demo
npm run build:storybook
npx tsc --noEmit
```

For consumer entry smoke tests, verify:

```ts
import { Button } from 'animal-island-ui-tailwind';
import 'animal-island-ui-tailwind/style';
```

and CJS:

```js
const { Button } = require('animal-island-ui-tailwind');
```

When CJS is checked directly in Node, stub browser asset extensions because this
UI package imports CSS, images, SVGs, and fonts.

## Storybook And Visual Parity

- Storybook parity stories live in `stories/`.
- Playwright behavior tests live in `tests/playwright-*.spec.ts`.
- Playwright screenshot tests live in `tests/visual-*.spec.ts`.
- Prefer scoped component-region screenshots over full-page screenshots.
- For stories with interactive `play` functions, add dedicated no-play stories
  for Playwright when needed to avoid test races.
- Visual baselines must match upstream behavior — do not "fix" upstream visual
  quirks without explicit approval. Document deviations as known differences.

## Skills Reference

When working on this project, use these installed skills for best-practice
guidance:

- `/tailwind-design-system` — Tailwind CSS v4 `@theme`, design tokens, utility
  patterns, responsive design system conventions.
- `/radix-ui-design-system` — Radix UI primitives, headless component patterns,
  accessibility, compound components, theming strategies.
- `/storybook-story-writing` — CSF3 story format, play functions, interaction
  testing, story organization.

## Upstream Sync Workflow

When porting new components from `guokaigdg/animal-island-ui`:

1. Run `npm run codex:upstream-check` to detect new upstream commits.
2. Create branch `codex/upstream-sync-<hash>`.
3. Write tests first (Storybook parity story + Playwright behavior + visual).
   Tests should FAIL at this stage.
4. Implement the component using Tailwind CSS v4 + Radix UI, matching upstream
   visual and behavioral output.
5. Verify: `npm run build && npm test && npm run build:demo && npx tsc --noEmit`.
6. Create draft PR with upstream commit range in the description.
