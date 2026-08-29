// Non-color theme primitives: typography, shape, shadows.
//
// ROUND 2: the template's hsl ramps (brand/gray/green/orange/red) and the
// numeric ColorRange augmentation are DELETED — Material's primitive color
// system is not used at all (docs/round-1-failures.md). Every palette value
// now comes from the map (src/theme/map.ts) via the interpreter
// (src/theme/interpret.ts).
//
// baseShadow is the logged SHADOW GAP: the engine's token layer emits
// --shadow-04/-08/-12 per mode, but the published npm package does not carry
// it (docs/derivation-audit.md, residue). Template shadow values ride along
// until the package ships the token layer; they are the only color-adjacent
// literals sanctioned in this module.
import { createTheme, Shadows } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    baseShadow: string;
  }
}

const defaultTheme = createTheme();

/** The shadow-gap values (see module header). */
export const baseShadows = {
  light:
    'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
  dark: 'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
} as const;

export const typography = {
  fontFamily: "'Noto Sans', sans-serif",
  h1: {
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: defaultTheme.typography.pxToRem(36),
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: defaultTheme.typography.pxToRem(30),
    lineHeight: 1.2,
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(20),
    fontWeight: 600,
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(18),
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(18),
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 500,
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(14),
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 400,
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
  },
};

export const shape = {
  borderRadius: 8,
};

// @ts-ignore
const defaultShadows: Shadows = [
  'none',
  'var(--template-palette-baseShadow)',
  ...defaultTheme.shadows.slice(2),
];
export const shadows = defaultShadows;
