# okchroma engine worklist

Consolidated from round 2 of the Material PoC, 2026-08-29. Everything the PoC needs
from the engine, in one place; sources: [gap-report.md](gap-report.md),
[derivation-audit.md](derivation-audit.md) residue, and two findings made against the
live render. Owner decision on record: everything color-visible comes from the engine.

The PoC is the test bed for every item: bump the dependency, `npm run check:map`
(totality, resolvability, 9-seed contrast sweep), then eyeball the seed roster in the
running app. Items marked ⤵ delete PoC code when they land.

## A. Packaging — minutes of work, closes two gaps

1. **Ship the token layer**: `files: ["dist-lib", "tokens"]` in package.json.
   Delivers `tokens/semantic.css` — surfaces, fg/border aliases, per-mode shadows —
   to registry consumers. ⤵ retires the PoC's shadow exception.

## B. Emitters — rows specified in the SYSTEM table with no value path

2. **`system/surface/{dim,low,mid,high}` through the JS API** (themeToFigma /
   a resolver), not only the CSS layer — object consumers (MUI, RN) need values,
   not var() aliases. ⤵ deletes `SURFACE_LAW` in src/theme/interpret.ts (gap #1).
3. **`system/alpha/abs-black-060`** — the scrim. ⤵ un-gaps Backdrop/Modal.
4. **`system/alpha/shadow-04/-08/-12` through the JS API** (values already exist in
   semantic.css). ⤵ retires the template baseShadow strings.
5. **`system/abs-black` / `system/abs-white`**. ⤵ un-gaps `common.black/white`.
6. **`system/alpha/006/008/016` as tokens** — today only the bare numbers
   (`OFFSET_ALPHAS`) reach the API.
7. **`system/alpha/ink`** — the quiet on-color (see C9, same register).

## C. Solver / design questions — the substantive work

8. **Dark CTA state law washes out high-luminance fills** (found on the render,
   2026-08-29). The dark hover/pressed law steps every fill lighter by ~+10 Y
   uniformly; a fill that RESTS high runs into the ceiling:

   | family (dark) | rest → hover → pressed |
   |---|---|
   | critical | Y18 → 23 → 29 ✓ |
   | positive | Y50 → 60 → 71 ✓ |
   | warning | **Y62 → 73 → 87** — pressed `#ffeecc`, hue identity gone |

   Light mode already handles the same fill by descending (62 → 51 → 42, stays
   yellow). Options: compress the step as rest-Y rises, or flip direction above a
   luminance threshold. Applies to any bright brand seed (gold), not just warning.
9. **Quiet-register CTA guarantee, dark**: `stamp/on` (white @ 0.8) over the derived
   brand-alt `stamp/fill` measures 4.03–4.49 on 8 of 9 sweep seeds — under AA-body,
   fine for AA-large. Either nudge the dark soft-on alpha to clear 4.5, or declare
   AA-large in the token description. The checker deliberately does not police this
   (engine-owned pairing); it should hold whichever guarantee gets declared.
10. **The pole register (inherit-white)** — the full column, one work item: the
    inverted-text trio, `stamp/fill` + `on` at the pole, hover/pressed states, and
    the edge gate. ⤵ un-gaps all 9 `poleWhite` rows; Snackbar actions and
    white-on-dark buttons come alive.
11. **Disabled opacity** — the one value specified nowhere. Either an engine row or
    a blessed constant; the PoC ships 0.38 as a named project constant meanwhile.
12. **Alpha rows for the mark-tint state washes** (pre-existing item, round-1
    record): the translucent replacement for the opaque-wash interim in audit
    cluster B. Depends on the Figma-opacity-beta timeline per the owner.

## Suggested order

A1 first (minutes, two gaps). Then C8 and C9 together — the only two items visible
as quality problems on screen today, both in the dark CTA state solver's
neighborhood. Then B2–B7 as one emitter pass. C10–C12 as scheduled design work.

## Meanwhile, in the PoC (not engine work)

- The two human passes: interactions (hover/selected/focus, both modes) and the
  seed-roster eyeball. The app is stable for both.
- Round 3 when ready: split the branded module (map + interpret + laws) into an
  installable package — the across-codebases proof.
