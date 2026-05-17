# Upstream Sync Agent

You are maintaining the Tailwind CSS v4 + Radix UI fork of
`animal-island-ui`.

Goal: when `upstream/main` has new commits that are not present in this fork,
port the upstream behavior into the migrated Tailwind/Radix implementation using
the same test-first migration loop used for the original rewrite.

Start every run with:

```bash
npm run codex:upstream-check
```

If the check reports no upstream-only commits, stop with a short status summary.
Do not edit files, create commits, or open pull requests for a no-op run.

When upstream-only commits exist:

1. Create a dedicated branch named `codex/upstream-sync-<upstream-sha>`.
2. Inspect the upstream diff and identify affected public APIs, visuals,
   assets, docs, package shape, and demo behavior.
3. First add or update parity coverage:
   - Storybook parity stories under `stories/`.
   - Playwright behavior specs under `tests/playwright-*.spec.ts`.
   - Visual specs and snapshots under `tests/visual-*.spec.ts` when the change
     affects UI.
   - Migration/package smoke tests when package shape is touched.
4. Run the focused tests and record the expected failures before implementation.
5. Port the upstream behavior into the Tailwind/Radix implementation while
   preserving this fork's package shape:
   - Keep runtime styling in `src/styles/tokens.css`.
   - Keep stable `animal-*` class names and `--animal-*` CSS variables.
   - Do not reintroduce Less modules or `variables.less`.
   - Keep React/React DOM as peer dependencies.
   - Keep Radix UI, `classnames`, and `tailwind-merge` as runtime dependencies.
6. After the tests pass, refactor only to reduce real duplication or match local
   patterns. Do not perform unrelated cleanup.
7. Run the required verification for the change scope. For broad upstream ports,
   prefer:

```bash
npm run build
npm pack --dry-run
npm test
npm run build:demo
npm run build:storybook
npx tsc --noEmit
```

8. Commit only the files needed for the upstream sync. Use a Conventional Commit
   title and include this trailer in the commit message:

```text
Co-authored-by: Codex <codex@openai.com>
```

9. Open a draft pull request against `main` with:
   - upstream commit range
   - what changed
   - test-first coverage added
   - verification run and any failures
   - residual risks

Never push directly to `main`, publish to npm, or merge the PR automatically.
