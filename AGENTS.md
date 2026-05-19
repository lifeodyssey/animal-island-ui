# AGENTS.md

This repository is `animal-island-ui-tailwind`, an independently maintained
React component library with the Animal Island visual language, built on
Tailwind CSS v4 + Radix UI.

## Current project state

- `main` is the active development branch.
- The package is published to npm as `animal-island-ui-tailwind`.
- The library exposes 19 components (Button, Input, Switch, Checkbox, Select,
  Tabs, Card, Modal, Collapse, Divider, Icon, Typewriter, Phone, Footer, Time,
  Cursor, CodeBlock, Loading, Table).
- Runtime styling lives in `src/styles/tokens.css` and uses stable
  `animal-*` classes plus `--animal-*` CSS custom properties.
- Interactive primitives are backed by Radix UI where appropriate.
- Visual and behavioral parity is covered by Storybook/Vitest and Playwright.

## Origin

Originally forked from `guokaigdg/animal-island-ui` (MIT). The original Less
implementation was used as the migration reference. This project is now
independently maintained and published under its own package name.

## Development defaults

- Preserve the single-package distribution shape:
  - `main`: `dist/cjs/index.cjs`
  - `module`: `dist/es/index.js`
  - `types`: `dist/types/index.d.ts`
  - style entry: `animal-island-ui-tailwind/style`
  - assets emitted under `dist/files`
- Do not reintroduce Less modules or `variables.less`.
- Do not split the package into per-component subpaths unless explicitly asked.
- Keep React and React DOM as peer dependencies.
- Keep Radix UI, `classnames`, and `tailwind-merge` as runtime dependencies.
- Keep generated build outputs out of git.

## Verification

Run the relevant checks before claiming a packaging or migration change is done:

```bash
npm run build
npm pack --dry-run
npm test
npm run build:storybook
npx tsc --noEmit
```

For focused UI parity changes, also run the matching Playwright specs under
`tests/playwright-*.spec.ts` and `tests/visual-*.spec.ts`.
