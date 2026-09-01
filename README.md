# okchroma-material

The Material-track PoC: a design-owned system on [Material UI](https://mui.com)
scaffolding, colored entirely by the [okchroma](https://github.com/egerrity/okchroma)
engine. One brand hex in, a complete WCAG-conformant light and dark system out —
mapped onto Material's semantics slot by slot, with every unanswerable slot declared
rather than invented.

Live: https://egerrity.github.io/okchroma-material/ ·
the Base-track PoC is at https://egerrity.github.io/okchroma-base/

## The chain

1. `src/seed.ts` — the only module that calls the okchroma resolver
   (`resolveTheme` + the neutral, signal, and link scales; WCAG lane).
2. `src/theme/map.ts` — **pure data**: every MUI palette slot names one engine
   token leaf path, or declares `GAP(reason)`. No logic, no conditionals, no
   engine import, and no per-mode shape — reversals live in the engine.
3. `src/theme/interpret.ts` — transcribes the map into MUI `colorSchemes` by
   resolving each path against the `themeToFigma()` emit. An unresolvable path
   throws; a `GAP` renders the magenta sentinel and self-reports at `#/gaps`.
4. `src/shared-theme/AppTheme.tsx` — `createTheme` with `cssVariables`,
   `colorSchemes`, and component overrides composed slot-wise by
   `src/theme/mergeComponents.ts` so the laws survive the area files.

All three MUI integration points are public API: `createTheme`, `styleOverrides`,
and module augmentation on `PaletteColor`. No fork, no patched internals.

## The demo

- `#/` — the banking dashboard (the product surface).
- `#/docs/how-it-works` — the engineering explainer: data flow, integration
  points, and what CI proves.
- `#/docs` — the component docs, rendered under the same theme as the app.
- `#/gaps` — every remaining sentinel row, derived from the map. Magenta on a
  *declared* gap row is the expected render, not a bug.

## Scripts

- `npm run dev` — the demo.
- `npm run check:map` — totality against a stock `createTheme()` walk,
  resolvability of every leaf path, no color literals, no template ramps, no
  MUI derivation helpers, swept over nine seeds including adversarial ones.
- `npm run check:wiring` — the pairings the mapping creates, measured against
  the engine's bars (4.5:1 text, 3.0:1 non-text).
- `npm run build` — `tsc -b && vite build`.

Both checks gate the Pages deploy (`.github/workflows/pages.yml`).

## Rounds

The construction record is in `docs/`: `round-1-failures.md` (what the first
attempt got wrong and the rulings that survived), `gap-report.md` (every gap
against the engine, with its status), `derivation-audit.md`,
`engine-worklist.md`, and `customizing-mui.md`.
