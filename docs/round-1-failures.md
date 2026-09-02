# Round 1: failure record and handoff

Written 2026-08-28 at the owner's direction. Round 1 is marked a failure. The
demo structure is kept; every theming value is reset to the stock MUI
template. Round 2 does not write code until a top-down mapping spec exists.

## The core failure

The mapping between okchroma and Material was built bottom-up: one component,
one slot, one workaround at a time. Each individual decision looked
defensible; the accumulation was an architecture nobody designed. The owner's
standard, stated late and clear: this has to be a top-down construction that
maps okchroma onto Material's semantics ONCE, concretely, and does not
require many individual decisions to work. Material's primitive color system
is not used at all. Only okchroma.

## The failures, specifically

1. Stamps were routed into palette.main twice. main leaks into text across
   the library (typography, labels, icons); the stamp carries no text
   guarantee against paper — its guarantee lives in its paired on and edge.
   This is the accessibility leak the component separation exists to prevent.
2. Material's primitive grammar (numeric 50..900 ranges) was introduced onto
   the palette families by the implementer, then consumed by our own code,
   then 95 vendored references were pointed at it during a sweep. MUI's
   internals read numeric slots only on grey; the family ranges served
   nothing but our own mistake.
3. An ad-hoc token pocket (okx) grew slot by slot to patch each gap as it was
   met, instead of the gaps falling out of one construction. Symptom: the
   claim that inherit-white "had no tokens," when it is the same construction
   as inherit on the pole register — a column, not a feature.
4. A component-token variable sheet was built, hit a real platform trap (MUI
   v9 styleOverrides mangles CSS custom-property keys; keys ending -label
   become emotion class labels and the declarations die silently), was
   patched with a GlobalStyles workaround, and then was superseded anyway.
5. The template's own dark-mode layer (38 applyStyles('dark') blocks)
   composed with per-lane values to double-invert (grey cards, invisible
   text). Related: theme.palette under cssVariables always serves the light
   scheme; scheme-correct reads go through theme.vars.
6. Kit-code divergences the owner had to catch one by one: outlined border
   values, the secondary quiet register falling through to link blue,
   missing color variants, the disabled model (component-level opacity, not
   grey swaps), fill/wash naming asymmetries.

## Rulings that SURVIVE into round 2 (owner-set)

- main/light/dark are Material's semantic slots and never hold the stamp.
  The additive register separates them: an analogous slot set FOR
  stamp-accepting components (buttons, chips, badges, avatars).
- Stamp doctrine: state colors are for buttons only; the stamp's contrast
  guarantee comes from its paired on and edge; stamps are used sparingly to
  imbue the essence of the role family. Stamps are never for text.
- The brand family never appears in a graph or chart. Data viz rides the
  signal families and the neutral ladder.
- Disabled is a component-level opacity; colors stay the enabled ones.
- Focus is ONE ring: 2px neutral crayon-26, 1px offset. No ripple.
- Our vocabulary is engine token names (paper-1 .. pen-70, stamp rows),
  never numeric ranges.
- The Figma contract: component/buttons collection — one mode per color,
  variants as groups, property-honest row names (label, fill, border used
  consistently by bound property).
- Engine work item (owner to spec): alpha rows join the engine until the
  Figma opacity feature leaves beta; the wax-tint state washes depend on it.

## Round 2 mandate

Start with SOLUTIONING, not code: one concrete top-down map, okchroma →
Material's semantics, agreed with the owner in full before implementation.
It must define, in one pass: what fills every Material semantic slot; the
additive stamp register; how every family (including inherit and
inherit-white — the neutral and pole columns of the same construction) gets
the identical row set; and where alphas come from. The map is the artifact;
the implementation is transcription.

## What is kept in this reset

- The app structure: dashboard template, docs site with sidebar, hash
  routing, the Docs link.
- Non-color product decisions: lucide icons, Noto Sans, the simple
  light/dark toggle.
- Dormant round-1 machinery for reference only: src/seed.ts,
  src/theme/tokens.ts (engine access by exported rosters, stopHex-only),
  scripts/check-wiring.ts (the wiring check pattern), the okchroma registry
  dependency.
- docs/customizing-mui.md (the MUI customization mechanics, still accurate).
