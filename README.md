# okchroma-material

The Material-track PoC: a design-owned system on [Material UI](https://mui.com)
scaffolding, colored entirely by the [okchroma](https://github.com/egerrity/okchroma)
engine. One brand hex in, a complete light and dark system out with every text and UI
stop solved to its WCAG requirement, mapped onto Material's palette slots one at a time,
with every unanswerable slot declared rather than invented. The engine's own
documentation: https://egerrity.github.io/okchroma/#/docs

Live: https://egerrity.github.io/okchroma-material/ ·
the Base-track PoC is at https://egerrity.github.io/okchroma-base/

## The chain

1. `src/seed.ts`: the only module that calls the okchroma resolver
   (`resolveTheme` + the neutral, signal, and link scales; WCAG lane).
2. `src/theme/map.ts`: pure data: every MUI palette slot names one engine token
   leaf path, or declares `GAP(reason)`. Rows have no per-mode shape; reversals
   live in the engine.
3. `src/theme/interpret.ts`: transcribes the map into MUI `colorSchemes` by
   resolving each path against the `themeToFigma()` emit. An unresolvable path
   throws; a `GAP` renders the magenta sentinel and self-reports at `#/gaps`.
4. `src/shared-theme/AppTheme.tsx`: `createTheme` with `cssVariables`,
   `colorSchemes`, and component overrides composed slot-wise by
   `src/theme/mergeComponents.ts` so the laws survive the area files.

All three MUI integration points are public API: `createTheme`, `styleOverrides`,
and module augmentation on `PaletteColor`. No fork, no patched internals.

## The demo

- `#/`: the dashboard (the product surface).
- `#/docs`: using okchroma with Material UI: dependencies, data flow,
  integration points, the rules, and what CI proves.
- `#/docs/button` … `#/docs/date-picker`: the component pages, rendered under
  the same theme as the app.
- `#/gaps`: every remaining sentinel row, derived from the map. Magenta on a
  *declared* gap row is the expected render, not a bug.

The global nav carries the brand-seed control (the fixed edge-case roster plus a
free hex) and the light/dark toggle on every route.

## Scripts

- `npm run dev`: the demo.
- `npm run check:map`: totality against a stock `createTheme()` walk,
  resolvability of every leaf path, no color literals, no template ramps, no
  MUI derivation helpers, swept over nine seeds including adversarial ones.
- `npm run check:wiring`: the pairings the mapping creates, against the
  guaranteed minimums (4.5:1 text, 3:1 non-text).
- `npm run docs:lint`: the documentation rules shared with the engine repo (no em
  dashes, no retired token vocabulary, no WCAG criteria cited by number alone).
- `npm run build`: `tsc -b && vite build`.

The lint and both checks gate the Pages deploy (`.github/workflows/pages.yml`).

## Rounds

The construction record is in `docs/`: `round-1-failures.md` (what the first
attempt got wrong and the rulings that survived), `gap-report.md` (every gap
against the engine, with its status), `derivation-audit.md`,
`engine-worklist.md`, and `customizing-mui.md`.
