# okchroma integration brief

Draft for engineering review, 2026-08-22. Package facts re-verified against okchroma 0.3.1.

## Summary

okchroma is an npm color-token engine: one brand hex in, a complete light and dark token system out, with every text and UI stop solved to its WCAG requirement. This brief proposes evaluating it as the generator for per-client color themes, so each client's brand color produces a full, contrast-verified palette instead of a hand-tuned one. It covers what the package is, the two standard ways an engine like this integrates with a design-token pipeline, and the information needed to scope the work.

## What okchroma does

Given a brand hex, the engine solves a fixed ladder of eleven stops per family (brand, an optional companion, a brand-tinted neutral, and four signal families), in both light and dark mode. Contrast is not checked after the fact: each stop is solved to its requirement. The text stops (pencil-47, pen-58, pen-70) hold 4.5:1, the WCAG AA bar for body text, against every paper stop of their own family and of the neutral; the crayon-26 stop holds 3:1, the bar for UI components and large text, against the same papers. The promise is AA and nothing above it is claimed. Signal colors shift automatically when a brand color would collide with them (a red brand versus the critical red, for example).

The output is data: per-stop color values, plus emitters for CSS custom properties and for a Figma-variables JSON tree. A requirement-token export in DTCG form exists as an experiment; no shipped pipeline uses it. The engine's own documentation is at https://egerrity.github.io/okchroma/#/docs.

## Package facts

| Property | Value |
| --- | --- |
| Package | `okchroma` (MIT); 0.3.1 at the time of writing |
| Formats | ESM + CJS, bundled TypeScript types, `sideEffects: false` |
| Runtime dependencies | None (the one color-math dependency is inlined at build) |
| Environment | Pure computation, no DOM or Node APIs: current Node LTS, browsers, React Native |
| Accessibility | WCAG 2.x ratios as the shipped lane: AA, 4.5:1 on the text stops and 3:1 on the UI stop |
| Compile target | ES2020 |
| Also in the package | `tokens/semantic.css`, a thin alias layer over the CSS emit (`--surface-*`, `--fg-*`, `--border-*`, the shadow alphas, the disabled opacity) |

## Two standard integration points

### Option A: feed the token pipeline

If tokens flow through a build tool (Style Dictionary or similar), a build step calls `themeToFigma` and writes its tree to disk: one JSON document per mode, keyed by token path (`neutral/pen-70`, `brand/stamp/fill`, `system/surface/mid`), each leaf a `{ $type: "color", $value: { hex, alpha, components } }` object. Every platform output the pipeline already produces then inherits the generated values, and the tokens ride the existing validation and versioning process.

- Best long-term shape: one source of truth, all platforms, existing governance.
- Read `$value.hex`, not `components`: the hex carries the exact solved 8-bit value and works with every Style Dictionary version without custom transforms.

### Option B: runtime theme object

If the application layer accepts a theme object at startup (a set of semantic names mapped to color strings, per mode), a small adapter maps the engine's output onto those names. This also fits React Native, where CSS custom properties are not available and a plain object of hex values is the natural shape.

```ts
import { resolveTheme, themeToFigma, signalScalesFor, SIGNAL_EMIT_NAME } from 'okchroma'

const t = resolveTheme({ primaryHex: client.brandHex, name: client.name, deriveSecondary: true })
// the four signals; a brand that collides with one ships a per-brand variant in
// t.themed.signalOverrides, substituted by name (this repo's src/seed.ts does exactly that)
const signals = [...signalScalesFor('wcag')].map(([id, { scale }]) => ({ name: SIGNAL_EMIT_NAME[id], scale }))
const { light, dark } = themeToFigma(t.themed, {
  secondary: t.secondary?.scale ?? null,
  secondaryStyle: t.secondary?.style,
  neutralLevel: 'default',
  signals,
})
// toThemeObject: a one-file adapter mapping token paths onto your semantic names
applyTheme({ light: toThemeObject(light), dark: toThemeObject(dark) })
```

- No pipeline changes, pilots quickly, per-client at runtime or precomputed per client at build.
- Limit: only surfaces that read the injected theme get the values; anything baked statically is not covered.

Which option fits depends on how the existing pipeline is wired; the questions at the end are what settles it.

## Mapping onto a semantic layer

okchroma's vocabulary is by band: paper stops for grounds, highlighter stops for tinted washes and quiet borders, one crayon stop for UI strokes and icons, pencil and pen stops for text, a stamp group per family (a solid fill with hover and pressed states, a solved on-color, and a gated edge), elevation planes on the neutral, a link trio, and the same ladder on every signal family. A semantic layer maps onto this by role. As an illustration, for a typical semantic set:

| Typical semantic slot | okchroma source |
| --- | --- |
| page / surface backgrounds | the neutral planes (`system/surface/dim`, `low`, `mid`, `high`) and the paper stops |
| primary / secondary text | neutral pen-70 and pencil-47, both AA body text, pen-70 the stronger |
| inverse text or background | a pen-100 ground with paper-0 text; the `link-inverse` trio for links on it |
| brand fill, brand tint, brand highlight | brand `stamp/fill` with `stamp/on`, brand paper-3, brand highlighter-11 |
| error / success / warning (+ tints) | the signal families, same ladder: the stamp for fills, pen for text, paper and highlighter for tints |
| borders and dividers | crayon-26 where 3:1 is required, highlighter-11 or highlighter-20 for quiet dividers |
| overlay / scrim | `system/alpha/abs-black-060` |

The real mapping is a short workshop against the actual token inventory. Two things to decide there:

- If a single semantic token serves both fills and text, note that okchroma solves those to different requirements, so the mapping picks one per token (or the semantic layer eventually splits them).
- Capabilities without a semantic slot (an info signal, link states, hover and pressed states) simply go unused; they are headroom, not integration work.

Token names have been stable since okchroma 0.2.0 and are exported as tables (`stopTokenName`, the `STAMP_*` constants, `SYSTEM_LEAF`, `SIGNAL_EMIT_NAME`). An adapter keys on those, so a rename on the okchroma side fails the adapter's build instead of mis-mapping a slot.

## Guidance for the adapter author

Read color values from the emit (`$value.hex`, as in the sketch above) or format a stop with `stopHex`. Raw `ColorStop` channel fields are wide-gamut encoded and are not the sRGB values to ship.

## What we would need to scope this

1. Token file format: is the token source DTCG JSON or another schema, and is there a validation suite generated tokens must pass?
2. Build tooling: Style Dictionary or similar? Its source locations and platform outputs decide Option A's shape.
3. Platforms: web, React Native, native iOS/Android? Which outputs are built from tokens versus hand-kept?
4. Runtime theming: does the app layer accept a theme object at startup, and what shape?
5. The semantic token inventory (names and intended roles), for the mapping workshop.
6. Environment: Node version, bundlers, and the process for approving an external npm dependency.
7. Where a client's brand hex would live as input (config, CMS, build parameter).
