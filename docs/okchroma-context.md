# okchroma in this repo

A note for coding agents. This project consumes okchroma from npm (`okchroma`, the version in package.json). The token reference is maintained in the engine repository and is not duplicated here:

- [okchroma/docs/agents.md](https://github.com/egerrity/okchroma/blob/main/docs/agents.md): what every token name means and how to pick one.
- [The docs site](https://egerrity.github.io/okchroma/#/docs): the output contract, the guarantees per band, how the theme is generated, the API.

The rest of this file is what is specific to this repo.

## Where the engine is called

`src/seed.ts` is the only module that calls the resolver: `resolveTheme` for the brand and its derived or custom companion, `generateNeutralScale` for the neutral, `signalScalesFor` plus the theme's `signalOverrides` for the four signals, `resolveLinkTrio` for the link. WCAG is the lane throughout (`contrastProfile: 'wcag'`); this repo never reads an APCA value.

`src/theme/interpret.ts` makes one `themeToFigma()` call per seed and flattens the tree into a path to color table per mode. Every MUI palette slot in `src/theme/map.ts` names one such path, or declares `GAP(reason)`.

## How a token is addressed

Never by spelling a name in component code. Component overrides read `theme.vars.palette.*`, the addresses the map created. The map's rows are leaf paths of the emit. These are the spellings the emit carries today; `npm run check:map` resolves every row against the emit for nine seeds, so a stale path fails the build rather than mis-mapping a slot.

| row | path |
|---|---|
| a scale stop | `neutral/pen-70`, `brand/highlighter-11`, `critical/paper-3`. Family keys: `brand`, `secondary`, `neutral`, `critical`, `warning`, `positive`, `info` |
| a family-relative row | `pencil-47` in `FAMILY_ROWS` resolves as `<family>/pencil-47` for every family the map sources |
| the stamp | `brand/stamp/fill`, `brand/stamp/fill-hover`, `brand/stamp/fill-pressed`, `brand/stamp/on`, `brand/stamp/edge`. Every family carries the group, the neutral included |
| the neutral poles | `neutral/paper-0`, `neutral/pen-100` |
| the link | `link/link`, `link/link-hover`, `link/link-pressed`; `link-inverse/link` and its states for text on inverted grounds |
| the planes | `system/surface/dim`, `system/surface/low`, `system/surface/mid`, `system/surface/high`. The per-mode reversal is inside the engine; one row serves both modes |
| the mode-invariant poles | `system/abs-black`, `system/abs-white` |
| alphas | `system/alpha/abs-black-060` (the scrim), `system/alpha/away-from-bg/06`, `/08`, `/16`, `system/alpha/toward-bg/06`, `/08`, `/16`, `system/alpha/shadow-04`, `/08`, `/12`, `system/alpha/ink`, `system/alpha/transparent` |

The scale, in the order the engine emits it: paper-1, paper-3, paper-5, highlighter-8, highlighter-11, highlighter-15, highlighter-20, crayon-26, pencil-47, pen-58, pen-70. The number is 100 minus the stop's light-mode lightness target, so a bigger number is a stronger mark; paper-0 and pen-100 are the neutral's poles.

## The rules this repo enforces

They are stated once, on the integration page (`#/docs` in the running app, source `src/docs/pages/UsingWithMui.tsx`) and held by `npm run check:map` and `npm run check:wiring`: no color literals, no `alpha`, `darken`, `lighten` or `getContrastText`, `theme.vars` never `theme.palette`, no `applyStyles('dark')`, overrides composed through `mergeComponents`, and a `GAP(reason)` for any slot the engine cannot answer. The standing color rulings (stamps never for text, selection controls never take the stamp, the brand never in a chart, disabled is an opacity, focus is one ring) are encoded in `src/theme/laws.tsx` and recorded in `docs/round-1-failures.md`.
