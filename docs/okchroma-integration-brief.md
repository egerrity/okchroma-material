# okchroma integration brief

Draft for engineering review, 2026-08-22

## Summary

okchroma is an npm color-token engine: one brand hex in, a complete WCAG-conformant light and dark token system out. This brief proposes evaluating it as the generator for per-client color themes, so each client's brand color produces a full, contrast-verified palette instead of a hand-tuned one. It covers what the package is, the two standard ways an engine like this integrates with a design-token pipeline, and the information needed to scope the work.

## What okchroma does

Given a brand hex, the engine solves a fixed ladder of color stops per family (brand, an optional secondary, a brand-tinted neutral, and four signal families), in both light and dark mode. Contrast is not checked after the fact: each stop is solved to its requirement (for example, body-text stops are solved to WCAG AA against their background stop, strong-emphasis stops to AAA), so the guarantees hold for any input hex, including edge-case brand colors. Signal colors shift automatically when a brand color would collide with them (a red brand versus an error red, for example).

The output is data: per-stop color values, plus emitters for CSS custom properties, Figma variables, and DTCG JSON.

## Package facts

| Property | Value |
| --- | --- |
| Package | `okchroma` (MIT) |
| Formats | ESM + CJS, bundled TypeScript types, `sideEffects: false` |
| Runtime dependencies | None (the one color-math dependency is inlined at build) |
| Environment | Pure computation, no DOM or Node APIs: current Node LTS, browsers, React Native |
| Accessibility | WCAG 2.x ratios (AA / AAA per role) as the shipped default |
| Compile target | ES2020 |

## Two standard integration points

### Option A: feed the token pipeline

If tokens flow through a build tool (Style Dictionary or similar), okchroma generates a client's token JSON (DTCG-format keys, hex string values) into the location the build reads. Every platform output the pipeline already produces then inherits the generated values, and the tokens ride the existing validation and versioning process.

- Best long-term shape: one source of truth, all platforms, existing governance.
- Hex string values are recommended over DTCG color objects: they carry the exact solved 8-bit values and work with every Style Dictionary version without custom transforms.

### Option B: runtime theme object

If the application layer accepts a theme object at startup (a set of semantic names mapped to color strings, per mode), a small adapter maps the engine's output onto those names. This also fits React Native, where CSS custom properties are not available and a plain object of hex values is the natural shape.

```ts
import { resolveTheme, themeToFigma, toHex } from 'okchroma'

// sketch: toThemeObject is a ~one-file adapter mapping engine output
// onto your semantic token names
const t = resolveTheme({
  primaryHex: client.brandHex, name: client.name,
  primaryMode: 'recommended', secondaryHex: null, deriveSecondary: true,
})
const { light, dark } = themeToFigma(t.themed, {
  secondary: t.secondary?.scale ?? null,
  secondaryStyle: t.secondary?.style, neutralLevel: 'default',
})
applyTheme({ light: toThemeObject(light), dark: toThemeObject(dark) })
```

- No pipeline changes, pilots quickly, per-client at runtime or precomputed per client at build.
- Limit: only surfaces that read the injected theme get the values; anything baked statically is not covered.

Which option fits depends on how the existing pipeline is wired; the questions at the end are what settles it.

## Mapping onto a semantic layer

okchroma's vocabulary is role-based: a background ladder from page whites through tinted washes, a text ladder at AA and AAA registers, focus-ring and border stops, solid interactive fills with hover and pressed states plus a solved on-color, elevation planes for the neutral, and per-signal families with the same structure. A semantic layer maps onto this by role. As an illustration, for a typical semantic set:

| Typical semantic slot | okchroma source |
| --- | --- |
| page / surface backgrounds | neutral elevation planes and paper ladder |
| primary / secondary / tertiary text | neutral ink ladder (AAA / AA registers) |
| inverse text or background | the opposite pole of the ladder |
| brand fill, brand tint, brand highlight | brand solid fill, brand paper, brand wash |
| error / success / warning (+ tints) | signal families (fill or ink per usage, paper, wash) |
| borders and dividers | ink, focus-ring, and wash stops by emphasis |
| overlay / scrim | the black veil alpha token |

The real mapping is a short workshop against the actual token inventory. Two things to decide there:

- If a single semantic token serves both fills and text, note that okchroma solves those to different requirements, so the mapping picks one per token (or the semantic layer eventually splits them).
- Capabilities without a semantic slot (an info signal, link states, hover and pressed states) simply go unused; they are headroom, not integration work.

okchroma's internal token names are currently being revised; adapters key on stable exported identity tables rather than name spellings, so a rename on the okchroma side does not ripple outward.

## Guidance for the adapter author

Read color values from `themeToFigma`'s emitted components (as in the sketch above) and format with `toHex`. Raw `ColorStop` channel fields are wide-gamut encoded and are not the sRGB values to ship. A convenience export can be added to make the safe path the obvious one.

## What we would need to scope this

1. Token file format: is the token source DTCG JSON or another schema, and is there a validation suite generated tokens must pass?
2. Build tooling: Style Dictionary or similar? Its source locations and platform outputs decide Option A's shape.
3. Platforms: web, React Native, native iOS/Android? Which outputs are built from tokens versus hand-kept?
4. Runtime theming: does the app layer accept a theme object at startup, and what shape?
5. The semantic token inventory (names and intended roles), for the mapping workshop.
6. Environment: Node version, bundlers, and the process for approving an external npm dependency.
7. Where a client's brand hex would live as input (config, CMS, build parameter).
