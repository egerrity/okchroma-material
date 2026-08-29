# Derivation audit — every site where MUI invents a color

Round 2, step 1 (owner review). Extracted from the installed `@mui/material` v9
component sources on 2026-08-29: every call to `alpha()` / `darken()` / `lighten()` /
`getContrastText()` in component code. 84 sites, 25 components.

Why this list exists: the engine's contrast guarantee does not survive derivation.
`alpha(main, 0.04)` produces a value okchroma never solved, even when `main` holds an
engine token. The standing rule is **okchroma literal** — every site below either dies
(dead branch), is answered by a map row, or gets an explicit override to a named
engine token. Nothing derives.

**Key mechanical fact.** Under `cssVariables`, `theme.alpha()` is NOT dead — it
composes channel vars at runtime (`rgba(var(--palette-primary-mainChannel) / 0.04)`).
The derivation happens in CSS, fed by our mapped values. Only the
`theme.vars ? componentToken : derivation` pattern is dead. Each cluster below is
marked **DEAD** (answered by a palette row, no override needed) or **LIVE** (needs an
explicit override or a no-op'd multiplier).

The multiplier law: `action.hoverOpacity / selectedOpacity / focusOpacity /
activatedOpacity` and `opacity.inputUnderline / switchTrack / switchTrackDisabled` are
all set to **0**. A LIVE site we miss then renders *no feedback*, never an invented
color — caught by the interaction pass, invisible to the sentinel. That asymmetry is
deliberate.

---

## Cluster A — DEAD: vars-guarded component tokens (12 sites)

The derivation is the no-cssVariables fallback; under `cssVariables` these read a
`palette.<Component>.*` token, which is a map row. Verified guard on every site.

| site | reads under vars | map row answer |
|---|---|---|
| Alert.js:105 (filled bg+text) | `Alert.{c}FilledBg/Color` | `{F}/stamp/fill` + `{F}/stamp/on` — filled banner is a sanctioned stamp use |
| AppBar.js:121,124 | `text.primary` | trio row |
| LinearProgress.js:117 (track) | `LinearProgress.{c}Bg` | `{F}/wash-85` |
| Slider.js:235–241 (inverted track) | `Slider.{c}Track` | `{F}/wash-80` |
| Switch.js:191 (disabled thumb) | `Switch.{c}DisabledColor` | GAP — disabled law (opacity, not color) |
| Skeleton.js:100 | `Skeleton.bg` | `neutral/wash-92` |
| SnackbarContent.js:43 | `SnackbarContent.color/bg` | inverted surface: `neutral/ink-30` ground, `neutral/paper-100` text |
| Tooltip.js:124,199 | `Tooltip.bg` | `neutral/ink-30` (solid — rule 5 bars the 0.92 alpha) |
| TableCell.js:54 | `TableCell.border` | `neutral/wash-89` (the divider law) |

`getContrastText` is fully accounted for here: all 4 call sites are in this cluster.

## Cluster B — LIVE: state tint grounds (≈38 sites)

`alpha(<family main | text.primary | action.active | action.selected>, action.*Opacity)`.
Sites: Autocomplete 391/393/401 · Button 176/178/193/194 · Checkbox 75/85 ·
Chip 205/229/233/306/310 · IconButton 66/123 · ListItemButton 83/86/91/94 ·
MenuItem 86/89/94/97 · PaginationItem 138/146/243/245/253 · Radio 76/87 ·
Switch 170/185 · TableRow 54/56 · ToggleButton 66/78/80/83/95/97/100.

**The wash law** (one rule, applied to every site; `{F}` = the component's color
family, `neutral` where the stock input was `text.primary`/`action.*`):

| state | ground |
|---|---|
| hover | `{F}/wash-92` |
| selected | `{F}/wash-89` |
| selected + hover | `{F}/wash-85` |
| pressed / activated | `{F}/wash-85` |
| focus ground | **dies** — focus is the ring (2px `neutral/mark-74`, 1px offset), never a wash |

This is the wash band's documented job ("subtle interactive states") applied
mechanically. Overrides land per component; the zeroed multipliers are the backstop.

**B1 — RESOLVED (owner, 2026-08-29):** confirmed. Opaque wash stops are the interim;
the alpha-rows engine item is the eventual replacement. No local mixes ever.

## Cluster C — LIVE: half-tone borders (10 sites)

`alpha(main, 0.5/0.7)` and `alpha(common.onBackground, 0.23)`.
Sites: Button 170 (outlined border) · ButtonGroup 141/154/167 · Chip 304/314 ·
PaginationItem 189/242 · OutlinedInput 60/131.

**The border law:**

- Colored outlined variants (Button, Chip, Pagination, ButtonGroup by family):
  `{F}/mark-74` — the 3:1-guaranteed UI stop, solid.
- Neutral enclosure/separator borders (default Pagination outline, ButtonGroup
  separators): `neutral/wash-80` — quiet decorative border.
- Input borders (OutlinedInput enabled): `neutral/mark-74`.
  **C1 — RESOLVED (owner, 2026-08-29): input borders are mark-74.**
- Chip.js:314 (`alpha(main, 0.7)` as outlined-chip icon/avatar color): `{F}/ink-42` —
  chip doctrine, ink register on wash ground.

## Cluster D — LIVE: link underlines (4 sites)

`alpha(color, 0.4)` — Link 109/117/125/133.
**D1 — RESOLVED (owner, 2026-08-29): links ride the engine's own emitted link
color, which is generated separately from the main color.** So: MuiLink's color is
the system trio (`link/link` → `link/link-hover` → `link/link-pressed`; the inverse
trio on inverted surfaces), never `palette.primary` and never the text stops.
Underline is `textDecorationColor: currentColor` — solid, inheriting the emitted
link color, no 40% mix.

## Cluster E — LIVE: Slider halo (3 sites)

`alpha(main, 0.16)` 8px/14px box-shadow halos on hover/focus/active — Slider
333/340/347. **Dies under the focus law**: one ring, 2px `neutral/mark-74`, 1px
offset; no hover halo (same doctrine that kills the ripple). Thumb hover feedback, if
any, comes from the wash law.

## Cluster F — LIVE: Switch track (6 sites)

Switch 149/152/199/202/205/229 — track fills from `alpha(onBackground | main, various)`.

| part | token |
|---|---|
| unchecked track | `neutral/wash-80` |
| checked track | `{F}/mark-74` (3:1 UI element against the papers) |
| unchecked thumb | `neutral/paper-100` (map row `Switch.defaultColor`) |
| checked thumb | `{F}/main` (= `ink-42`) |
| disabled (152/202/205) | the disabled law: colors stay, component opacity |

**F1 — RESOLVED (owner, 2026-08-29): selection controls never accept stamp.** The
stamp carries no contrast guarantee against the page — its guarantee lives in its
paired `on`/`edge`, i.e. it needs its text on top; a stamp-filled checkbox or switch
could legitimately solve to bright yellow or light pink. So checked fills ride
`main` (`ink-42`) with the check glyph in `contrastText` (`paper-100`) — the pairing
warranted by ratio symmetry. Applies to Checkbox, Radio, and Switch alike.

## Cluster G — LIVE: Chip disabled + delete icon (3 sites)

Chip 117/122 (`alpha(text.primary, 0.26/0.4)` disabled colors): **die under the
disabled law** — colors stay enabled, opacity at component level.
Chip 178 (`alpha(contrastText, 0.7)` filled-chip delete icon): chips are NOT
stamp-accepting (owner list: badge-with-text, avatar variant, contained button,
filled banners, data viz) — a filled chip is `{F}/wash-92` ground with `{F}/ink-30`
label, so the delete icon is `{F}/ink-42`, hover `{F}/ink-30`. Solid, no 0.7.

## Cluster H — LIVE: input underlines (2 sites)

FilledInput 117, Input 58 — `alpha(common.onBackground, opacity.inputUnderline)`.
Rest underline `neutral/mark-74` (input borders are mark-74, per C1); hover unchanged
(the wash law covers the field ground instead); focus = the ring law, with MUI's 2px
`primary.main` underline animation removed.
**H1 — RESOLVED (owner, 2026-08-29): implement as above and flag for visual
review** — the focused-input treatment is on the render-review checklist, not
re-litigated in the map.

**Addendum (found during transcription):** `opacity.inputPlaceholder` (stock 0.42) is
a third live multiplier, missed by the alpha/darken grep because InputBase applies it
as a bare `opacity` on the placeholder text. Same shape as the disabled value: a
multiplier over an honest ink. Treatment: multiplier pinned to 1, placeholder color
pinned to `text.secondary` (`lead-53`) by the InputBase override.

---

## Residue — the counted opacity gap list

What survives every cluster with no answer reachable from the registry install.
Classified by exactly what is missing — the classes matter because they cost
differently to close:

**Packaging holes** — emitted by the engine's token layer (`tokens/semantic.css`,
per-mode where the law requires), but the published npm `files` array carries
`dist-lib` only, so they don't ride the registry install:

1. **Surface planes** — `system/surface/{dim,low,mid,high}` (gap #1; the map
   references them by name, the interpreter carries the law until packaged).
2. **Shadow alphas** — `--shadow-04/-08/-12` (light 4/8/12%, dark 32/48/64%; the
   `shadows` scale keeps template values this round and is logged — shadows are not
   palette slots, the sentinel can't ride them).

**Emitter holes** — specified in the engine's `SYSTEM` table, no emitter anywhere:

3. **Scrim/Backdrop** — `system/alpha/abs-black-060` → GAP row, renders sentinel
   behind modals.
4. **Absolute poles** — `common.black`/`common.white` → GAP rows
   (`system/abs-black|white`).
5. **The pole register (inherit-white)** — the whole column, dropped this round
   (owner, 2026-08-29): every row is one GAP, inverted-ground consumers render the
   sentinel, and the register is a single engine work item.
6. **State-tint alphas** — cluster B's eventual translucent replacement
   (`system/alpha/006/008/016` reach the API as bare numbers only).

**Value gaps** — specified nowhere:

7. **Disabled opacity value** — ships as a named project constant (MUI's 0.38),
   logged. Not in the engine at all.

Items 1–2 are a one-line `files`-array fix; 3–6 are emitter work; item 7 and the
resolved B1/C1/D1/F1/H1 rulings above were the genuine design questions.
