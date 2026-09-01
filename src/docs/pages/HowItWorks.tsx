// The engineering explainer: how the okchroma npm package attaches to MUI in
// this repo. Reference register — what calls what, what shape the data is, and
// what fails when. Design rulings live on the component pages, not here.
import type { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { PageTitle, Lede, SectionTitle, Snippet, FileRef } from './shared';

const BASE_DEMO = 'https://egerrity.github.io/okchroma-base/';

// The adversarial half of check-map.ts's seed roster, quoted as documentation
// text — engine INPUTS in prose, the same class as the SeedContext.tsx roster.
const SWEEP_SEEDS = 'near-white #F5F5F5, near-black #0A0A0A, #E53935 (collides with the critical signal), and #FFD600'; // map-check:allow

const Body = ({ children }: { children: ReactNode }) => (
  <Typography component="div" sx={{ fontSize: 14, lineHeight: 1.9, mb: 2 }}>
    {children}
  </Typography>
);

const FLOW = `src/seed.ts           resolveTheme + generateNeutralScale + signalScalesFor + resolveLinkTrio
src/theme/map.ts      every MUI palette slot -> one engine token path
src/theme/interpret.ts  resolves each path against the themeToFigma() emit
AppTheme.tsx          createTheme({ colorSchemes, components })`;

const MAP_EXCERPT = `// src/theme/map.ts — pure data, no logic, no engine import
export const CORE = {
  text: {
    primary: 'neutral/pen-70',
    secondary: 'neutral/pencil-47',
    disabled: GAP('disabled is a component-level opacity, never a color swap'),
    icon: 'neutral/crayon-26',
  },
  divider: 'neutral/highlighter-11',
  action: {
    hover: 'neutral/highlighter-8',
    selected: 'neutral/highlighter-11',
    focus: GAP('focus is the ring (FOCUS_RING), never a ground'),
  },
} as const`;

const THEME_EXCERPT = `// src/shared-theme/AppTheme.tsx
const mapSchemes = buildColorSchemes(resolveSeed(hex));

createTheme({
  cssVariables: { colorSchemeSelector: 'data-mui-color-scheme', cssVarPrefix: 'template' },
  colorSchemes: mapSchemes,
  typography, shadows, shape,
  components: mergeComponents(lawCustomizations, inputsCustomizations, /* ...areas */),
});`;

export default function HowItWorks() {
  return (
    <>
      <PageTitle>How this works</PageTitle>
      <Lede>
        How the okchroma npm package attaches to Material UI in this repo: the modules
        involved, the integration points used, and the checks that gate a build.
      </Lede>

      <SectionTitle>Data flow</SectionTitle>
      <Body>
        okchroma is a plain npm dependency, pinned at <code>^0.1.7</code>. It has no
        runtime dependencies and is pure computation — no DOM, no Node APIs — shipped as
        ESM and CJS with bundled types. Nothing here builds against the engine's source,
        and the engine repository is neither linked nor vendored.
      </Body>
      <Snippet code={FLOW} />
      <Body>
        <FileRef path="src/seed.ts" /> is the only module that calls the resolver, with{' '}
        <code>contrastProfile: 'wcag'</code> throughout; everything downstream consumes
        its result. One resolve runs per seed, memoized on the hex, so changing the brand
        color rebuilds the theme without touching component code.
      </Body>

      <SectionTitle>The map</SectionTitle>
      <Body>
        <FileRef path="src/theme/map.ts" /> is data only — no logic, no conditionals, no
        engine import. Each slot holds one of two values: an engine token leaf path, or a{' '}
        <code>GAP(reason)</code> for a slot with no honest answer from the engine.
      </Body>
      <Snippet code={MAP_EXCERPT} />
      <Body>
        Rows have no per-mode shape. Tokens that reverse between light and dark — the
        surface planes, the whole neutral ladder — reverse inside the engine, so the map
        names them once and both schemes read the same row.
      </Body>

      <SectionTitle>The interpreter</SectionTitle>
      <Body>
        <FileRef path="src/theme/interpret.ts" /> looks up each leaf path in the emit from{' '}
        <code>themeToFigma()</code> and writes the value into MUI{' '}
        <code>colorSchemes</code>. It makes no color decisions.
      </Body>
      <Body>
        A path that fails to resolve throws, so an engine rename fails the build at the
        lookup instead of silently mis-mapping a slot. <code>GAP</code> rows resolve to a
        magenta sentinel and are listed on the <Link href="#/gaps">Gap gallery</Link>,
        which derives its rows from the map rather than a hand-maintained list — a gap
        that closes drops off the page by itself.
      </Body>

      <SectionTitle>MUI integration points</SectionTitle>
      <Body>
        Three, all public API. There is no MUI fork and no patched internals; the
        dependency is <code>@mui/material ^9</code> as published.
      </Body>
      <Snippet code={THEME_EXCERPT} />
      <Box component="ol" sx={{ pl: 3, fontSize: 14, lineHeight: 1.9, mb: 2 }}>
        <li>
          <code>createTheme</code> with <code>cssVariables</code> and{' '}
          <code>colorSchemes</code> — the palette arrives as CSS custom properties under
          the <code>template</code> prefix, with the scheme selected by the{' '}
          <code>data-mui-color-scheme</code> attribute.
        </li>
        <li>
          <code>components[X].styleOverrides</code> — component styling, spending palette
          addresses only.
        </li>
        <li>
          Module augmentation on <code>PaletteColor</code> — the engine carries a stamp
          register (fill, fill-hover, fill-pressed, on, edge) and a full named ladder that
          MUI's palette type has no slot for. Declaring them on <code>PaletteColor</code>{' '}
          puts them at one address, correct for every family.
        </li>
      </Box>
      <Body>
        Override layers compose through <FileRef path="src/theme/mergeComponents.ts" />{' '}
        rather than object spread. A flat spread lets an area file replace a slot the laws
        file already set; this merges slot-wise and concatenates{' '}
        <code>styleOverrides</code> entries into arrays, so every layer stays in the
        cascade and later layers extend earlier ones.
      </Body>

      <SectionTitle>Enforcement</SectionTitle>
      <Body>
        Two scripts, both run in CI ahead of the Pages build. Neither tests the engine —
        the engine owns its contrast guarantees; these prove the adapter.
      </Body>
      <Body>
        <code>npm run check:map</code> runs six checks:
      </Body>
      <Box component="ul" sx={{ pl: 3, fontSize: 14, lineHeight: 1.9, mb: 2 }}>
        <li>
          <strong>Totality</strong> — every color-bearing slot a stock{' '}
          <code>createTheme()</code> carries has a value: a map row or a declared gap.
        </li>
        <li>
          <strong>Resolve</strong> — every leaf path resolves against the engine emit, for
          every seed.
        </li>
        <li>
          <strong>Literals</strong> — no hex, hsl, or rgb in the theme layer or the
          customizations.
        </li>
        <li>
          <strong>Primitives</strong> — no template ramps, no{' '}
          <code>applyStyles</code> dark-layer calls, no <code>theme.palette</code> color
          reads.
        </li>
        <li>
          <strong>Derivation</strong> — no <code>alpha</code>, <code>darken</code>,{' '}
          <code>lighten</code>, or <code>getContrastText</code> imports.
        </li>
        <li>
          <strong>Seed sweep</strong> — nine seeds, including {SWEEP_SEEDS}.
        </li>
      </Box>
      <Body>
        <code>npm run check:wiring</code> walks the pairings the mapping creates — which
        on-color lands on which fill, which text on which plane — and asserts 4.5:1 for
        text and 3.0:1 for non-text. The values come from the same tokens the app renders,
        so a failure here is a failure a user would see.
      </Body>

      <SectionTitle>The Base UI track</SectionTitle>
      <Body>
        A second proof of concept consumes the same package version against{' '}
        <Link href="https://base-ui.com" target="_blank" rel="noreferrer">
          Base UI
        </Link>{' '}
        headless primitives, in the opposite integration shape. Rather than walking
        resolved values into a theme object, it mounts the engine's own CSS emission from{' '}
        <code>brandCss()</code> as custom properties and styles hand-built components with{' '}
        <code>var()</code> — no theme object and no provider.
      </Body>
      <Body>
        <Link href={BASE_DEMO} target="_blank" rel="noreferrer">
          {BASE_DEMO}
        </Link>
      </Body>
    </>
  );
}
