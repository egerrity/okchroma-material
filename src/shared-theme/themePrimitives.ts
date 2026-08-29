import { createTheme, Shadows } from '@mui/material/styles';
import { stopTokenName } from 'okchroma';
import { resolveSeed } from '../seed';
import { laneTokens, NAME } from '../theme/tokens';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    highlighted: true;
  }
}
declare module '@mui/material/styles' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}

  interface Palette {
    baseShadow: string;
  }
}

const defaultTheme = createTheme();

const customShadows: Shadows = [...defaultTheme.shadows];

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

// ── Per-lane scheme factory (the dynamic path) ───────────────────────────────
// Owner rulings encoded here:
//   · each scheme carries ITS OWN lane's ladder end to end — okchroma's dark is
//     the only dark; Material never re-derives
//   · the numeric ranges are PURE LADDER (data-safe; stamps never in a ramp)
//   · stamp states live only in okx (consumed by buttons alone); brand/alt
//     stamp fill is for avatars, buttons, chips, badges only
//   · signal ladders carry data-viz polarity
const LADDER_SLOTS: Array<[number, number]> = [
  [50, 1], [100, 2], [200, 3], [300, 4], [400, 5], [500, 7], [600, 8], [700, 9], [800, 10], [900, 11],
];

export interface OkxTokens {
  stampHover: string;
  stampPressed: string;
  stampEdge: string;
  secFill: string;
  secOn: string;
  secHover: string;
  secPressed: string;
  secEdge: string;
  inheritFill: string;
  inheritOn: string;
  inheritHover: string;
  inheritPressed: string;
  inheritEdge: string;
  link: string;
  linkHover: string;
  linkPressed: string;
  focus: string;
  alpha6: string;
  alpha8: string;
  alpha16: string;
  planeDim: string;
  planeHigh: string;
  borderSubtle: string;
  borderDefault: string;
  shadowLift: string;
  shadowPop: string;
  shadowFloat: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    okx: OkxTokens;
  }
  interface PaletteOptions {
    okx?: OkxTokens;
    baseShadow?: string;
  }
}

export function buildColorSchemes(brandHex: string, altHex?: string | null) {
  const seed = resolveSeed(brandHex, altHex);
  const lanePalette = (lane: 'light' | 'dark') => {
    const t = laneTokens(seed, lane);
    const ladder = (f: (n: string) => string) =>
      Object.fromEntries(LADDER_SLOTS.map(([slot, stop]) => [slot, f(stopTokenName(stop))]));
    const sig = (role: 'critical' | 'warning' | 'positive' | 'info') => ({
      ...ladder(n => t.signalStop(role, n)),
      light: t.signalStop(role, NAME.wash4),
      main: t.signals[role].fill,
      dark: t.signalStamp(role).fillHover,
      contrastText: t.signals[role].on,
    });
    const isDark = lane === 'dark';
    const shadow = isDark
      ? { s04: 'rgba(0, 0, 0, 0.32)', s08: 'rgba(0, 0, 0, 0.48)' }
      : { s04: 'rgba(0, 0, 0, 0.04)', s08: 'rgba(0, 0, 0, 0.08)' };
    return {
      primary: {
        ...ladder(t.brand),
        light: t.brand(NAME.wash4),
        main: t.stamp.fill,
        dark: t.stamp.fillHover,
        contrastText: t.stamp.on,
      },
      secondary: {
        ...ladder(t.secondary ?? t.brand),
        light: (t.secondary ?? t.brand)(NAME.wash4),
        main: (t.secondaryStamp ?? t.stamp).fill,
        dark: (t.secondaryStamp ?? t.stamp).fillHover,
        contrastText: (t.secondaryStamp ?? t.stamp).on,
      },
      info: sig('info'),
      warning: sig('warning'),
      error: sig('critical'),
      success: sig('positive'),
      grey: ladder(t.neutral),
      divider: t.neutral('wash-89'),
      background: { default: t.planes.low, paper: t.planes.mid },
      text: {
        primary: t.neutral(NAME.inkStrong),
        secondary: t.neutral(NAME.lead),
        warning: t.signalStop('warning', NAME.lead),
      },
      action: {
        active: t.neutral(NAME.mark),
        hover: t.alpha(6),
        selected: t.alpha(8),
        focus: t.alpha(16),
      },
      baseShadow: `0 4px 8px ${shadow.s04}, 0 0 1px ${shadow.s04}`,
      okx: {
        stampHover: t.stamp.fillHover,
        stampPressed: t.stamp.fillPressed,
        stampEdge: t.stamp.edge,
        secFill: (t.secondaryStamp ?? t.stamp).fill,
        secOn: (t.secondaryStamp ?? t.stamp).on,
        secHover: (t.secondaryStamp ?? t.stamp).fillHover,
        secPressed: (t.secondaryStamp ?? t.stamp).fillPressed,
        secEdge: (t.secondaryStamp ?? t.stamp).edge,
        inheritFill: t.neutralStamp.fill,
        inheritOn: t.neutralStamp.on,
        inheritHover: t.neutralStamp.fillHover,
        inheritPressed: t.neutralStamp.fillPressed,
        inheritEdge: t.neutralStamp.edge,
        link: t.link.default,
        linkHover: t.link.hover,
        linkPressed: t.link.pressed,
        focus: t.neutral(NAME.mark),
        alpha6: t.alpha(6),
        alpha8: t.alpha(8),
        alpha16: t.alpha(16),
        planeDim: t.planes.dim,
        planeHigh: t.planes.high,
        borderSubtle: t.neutral('wash-89'),
        borderDefault: t.neutral(NAME.mark),
        shadowLift: `0 4px 8px ${shadow.s04}, 0 0 1px ${shadow.s04}`,
        shadowPop: `0 4px 10px -2px ${shadow.s08}, 0 20px 25px -2px ${shadow.s04}`,
        shadowFloat: isDark
          ? '0 6px 16px -5px rgba(0,0,0,0.48), 0 16px 44px -8px rgba(0,0,0,0.58)'
          : '0 6px 16px -5px rgba(17,18,22,0.10), 0 16px 44px -8px rgba(17,18,22,0.16)',
      } satisfies OkxTokens,
    };
  };
  return {
    light: { palette: lanePalette('light') },
    dark: { palette: lanePalette('dark') },
  };
}
