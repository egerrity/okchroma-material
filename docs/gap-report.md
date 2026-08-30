# Gap report — okchroma 0.1.0 vs Material's color demands

> **Status ledger (kept current; the findings below are the round-2 record against
> 0.1.0 as published and are not rewritten):**
> - **CLOSED by okchroma 0.1.1** (A1): both packaging holes — `tokens/` ships in the
>   `files` array.
> - **CLOSED by okchroma 0.1.2** (B2–B7): every emitter hole — `themeToFigma` emits
>   the `system` group (surfaces, abs poles, scrim, shadow alphas, offset alphas,
>   quiet ink). The interpreter's `SURFACE_LAW` shim, the template `baseShadows`
>   literals, and the `common.*`/scrim GAPs are deleted; the map's `SCRIM` +
>   `BASE_SHADOW` rows ride the emit.
> - **RESOLVED in 0.1.1** (C9): the quiet-CTA observation below — the soft on-text
>   is gated per mode (dark ships the solid pole where the composite would miss AA).
> - **OPEN**: the pole register (C10), disabled opacity (C11), state-tint alpha
>   rows (C12) — see `engine-worklist.md`.

Round 2 deliverable, 2026-08-29. Produced by the construction, not by judgment: every
row in [the map](../src/theme/map.ts) either names an engine token or declares a
`GAP(reason)`, and every `GAP` renders the magenta sentinel on screen. `npm run
check:map` regenerates the palette-gap list mechanically.

**The headline: Material needed nothing okchroma hasn't designed.** Of the 23 palette
gaps + 4 non-palette gaps, all but ONE trace to engine machinery that already exists
as specification or emitted token layer — they are packaging and emitter work, not
color-system design work. The single genuine design gap is a number (the disabled
opacity), plus one deliberately deferred column (the pole register).

## By class

### Packaging holes — emitted by the engine's token layer, not shipped in the npm `files` array

| gap | engine artifact | Material demand it serves |
|---|---|---|
| surface planes | `tokens/semantic.css` `--surface-dim/low/mid/high` | `background.default/paper`, Paper elevation, every card/menu/dialog ground |
| shadow alphas | `tokens/semantic.css` `--shadow-04/-08/-12` (per-mode) | `shadows[25]`; template values ride along meanwhile |

Fix: add `tokens/` to the package `files` array. Until then the interpreter carries
the surface law in one place ([interpret.ts](../src/theme/interpret.ts) `SURFACE_LAW`),
keyed by the engine's own names, and dies the day the package ships the layer.

### Emitter holes — specified in the engine's `SYSTEM` table, no emitter

| gap | specification | Material demand |
|---|---|---|
| `common.black` / `common.white` | `system/abs-black`, `system/abs-white` | the literal poles; MUI's `common.*` slots |
| scrim | `system/alpha/abs-black-060` | Backdrop/Modal veil |
| state-tint alphas | `system/alpha/006/008/016` (numbers ship, tokens don't) | translucent state tints; cluster B rides opaque washes meanwhile |
| quiet on-color | `system/alpha/ink` | soft on-color for quiet CTAs (see observation below) |

### Deferred by ruling (owner, 2026-08-29)

- **The pole register (`inherit-white`)** — 9 rows, one engine work item. Every
  inverted-ground consumer (Snackbar action, white-on-dark buttons) renders the
  sentinel until the engine solves the column.
- **Disabled colors** (`text.disabled`, `action.disabled`, `action.disabledBackground`,
  `FilledInput.disabledBg`, 7 × `Switch.*DisabledColor`) — not colors at all under the
  disabled ruling (component-level opacity, colors stay enabled). The GAP rows are
  tripwires: any MUI read the disabled law's overrides miss renders magenta.
- **`action.focus`** — focus is the ring, never a ground; same tripwire logic.

### The one genuine design gap

- **`DISABLED_OPACITY = 0.38`** — a value specified nowhere in the engine. Ships as a
  named project constant, logged.

## Engine observation (not an adapter failure)

The quiet register's CTA pairing — `secondary stamp/on` (`white @ 0.8`) over
`secondary stamp/fill` — measures **4.03–4.49 in dark mode on 8 of 9 sweep seeds**,
under the 4.5 AA body bar (fine for large/bold text at 3:1). The checker does not
fail on it: the pairing ships paired from the engine and the engine owns its
guarantee. Reported here because the owner owns the engine: if the quiet CTA's
guarantee is meant to be AA-body, the dark soft-on alpha wants a nudge; if it is
AA-large by design, its description should say so.

## Decision (owner, 2026-08-29)

The engine takes the color-visible gaps: everything color-visible will come from the
engine (packaging line + emitters for the `system/*` rows + the pole-register
column). The PoC keeps MUI-value exceptions only for the invisible-as-color trio —
shadows, scrim, disabled opacity — each a one-line swap when the engine emits.

## What this means for the Material decision

Adopting Material costs okchroma **no new color design**. The integration bill is:

1. one packaging line (`files: ["dist-lib", "tokens"]`),
2. emitters for the already-specified `system/*` rows,
3. the pole-register column (already on the engine work list),
4. one number (disabled opacity),
5. and the alpha rows already planned for the Figma-opacity interim.

Everything else — 112 palette slots, ~90 neutralized derivation sites, both modes,
any seed — is transcription, proven by `npm run check:map` (totality, resolvability,
no literals, no primitives, no derivations, 9-seed contrast sweep).
