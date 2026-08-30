// Non-color theme primitives: typography, shape, shadows.
//
// ROUND 2: the template's hsl ramps (brand/gray/green/orange/red) and the
// numeric ColorRange augmentation are DELETED — Material's primitive color
// system is not used at all (docs/round-1-failures.md). Every palette value
// now comes from the map (src/theme/map.ts) via the interpreter
// (src/theme/interpret.ts).
//
// The SHADOW GAP is CLOSED (okchroma 0.1.2, worklist B4): palette.baseShadow
// is built by the interpreter from the map's BASE_SHADOW recipe — engine
// shadow rows composed with non-color geometry. This module is color-free;
// the shadows array below only points at the palette's CSS variable.
import { createTheme, Shadows } from '@mui/material/styles';

const defaultTheme = createTheme();

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
