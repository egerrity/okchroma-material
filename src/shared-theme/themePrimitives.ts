import { createTheme, alpha, PaletteMode, Shadows } from '@mui/material/styles';
import { resolveSeed, DEFAULT_SEED, type SignalRole } from '../seed';
import { laneTokens, NAME } from '../theme/tokens';

// okchroma supplies every color below. Static per-module seed; the template is
// the only preview surface.
const okSeed = resolveSeed(DEFAULT_SEED);
export const L = laneTokens(okSeed, 'light');
export const D = laneTokens(okSeed, 'dark');

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

export const brand = {
  50: L.brand(NAME.paperTop),
  100: L.brand(NAME.paper2),
  200: L.brand(NAME.paper3),
  300: L.brand(NAME.wash4),
  400: L.stamp.fill,
  500: D.stamp.fill,
  600: L.stamp.fillPressed,
  700: L.brand(NAME.inkMid),
  800: L.brand(NAME.inkStrong),
  900: D.brand(NAME.wash4),
};

export const gray = {
  50: L.neutral(NAME.paperTop),
  100: L.neutral(NAME.paper2),
  200: L.neutral(NAME.paper3),
  300: L.neutral(NAME.wash4),
  400: L.neutral(NAME.washBorder),
  500: L.neutral(NAME.mark),
  600: L.neutral(NAME.lead),
  700: L.neutral(NAME.inkMid),
  800: L.neutral(NAME.inkStrong),
  900: D.neutral(NAME.paper2),
};

const signalRamp = (role: SignalRole) => ({
  50: L.signalStop(role, NAME.paperTop),
  100: L.signalStop(role, NAME.paper2),
  200: L.signalStop(role, NAME.paper3),
  300: L.signalStop(role, NAME.wash4),
  400: L.signals[role].fill,
  500: D.signals[role].fill,
  600: L.signalStamp(role).fillPressed,
  700: L.signalStop(role, NAME.inkMid),
  800: L.signalStop(role, NAME.inkStrong),
  900: D.signalStop(role, NAME.wash4),
});

export const green = signalRamp('positive');

export const orange = signalRamp('warning');

export const red = signalRamp('critical');

export const getDesignTokens = (mode: PaletteMode) => {
  customShadows[1] =
    mode === 'dark'
      ? 'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px'
      : 'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px';

  return {
    palette: {
      mode,
      primary: {
        light: brand[200],
        main: brand[400],
        dark: brand[700],
        contrastText: brand[50],
        ...(mode === 'dark' && {
          contrastText: brand[50],
          light: brand[300],
          main: brand[400],
          dark: brand[700],
        }),
      },
      info: {
        light: brand[100],
        main: brand[300],
        dark: brand[600],
        contrastText: gray[50],
        ...(mode === 'dark' && {
          contrastText: brand[300],
          light: brand[500],
          main: brand[700],
          dark: brand[900],
        }),
      },
      warning: {
        light: orange[300],
        main: orange[400],
        dark: orange[800],
        ...(mode === 'dark' && {
          light: orange[400],
          main: orange[500],
          dark: orange[700],
        }),
      },
      error: {
        light: red[300],
        main: red[400],
        dark: red[800],
        ...(mode === 'dark' && {
          light: red[400],
          main: red[500],
          dark: red[700],
        }),
      },
      success: {
        light: green[300],
        main: green[400],
        dark: green[800],
        ...(mode === 'dark' && {
          light: green[400],
          main: green[500],
          dark: green[700],
        }),
      },
      grey: {
        ...gray,
      },
      divider: mode === 'dark' ? alpha(gray[700], 0.6) : alpha(gray[300], 0.4),
      background: {
        default: 'hsl(0, 0%, 99%)',
        paper: 'hsl(220, 35%, 97%)',
        ...(mode === 'dark' && { default: gray[900], paper: 'hsl(220, 30%, 7%)' }),
      },
      text: {
        primary: gray[800],
        secondary: gray[600],
        warning: orange[400],
        ...(mode === 'dark' && { primary: 'hsl(0, 0%, 100%)', secondary: gray[400] }),
      },
      action: {
        hover: alpha(gray[200], 0.2),
        selected: `${alpha(gray[200], 0.3)}`,
        ...(mode === 'dark' && {
          hover: alpha(gray[600], 0.2),
          selected: alpha(gray[600], 0.3),
        }),
      },
    },
    typography: {
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
    },
    shape: {
      borderRadius: 8,
    },
    shadows: customShadows,
  };
};

export const colorSchemes = {
  light: {
    palette: {
      primary: {
        light: L.brand(NAME.wash4),
        main: L.stamp.fill,
        dark: L.stamp.fillPressed,
        contrastText: L.stamp.on,
      },
      info: {
        light: L.signalStop('info', NAME.wash4),
        main: L.signals.info.fill,
        dark: L.signalStamp('info').fillPressed,
        contrastText: L.signals.info.on,
      },
      warning: {
        light: L.signalStop('warning', NAME.wash4),
        main: L.signals.warning.fill,
        dark: L.signalStamp('warning').fillPressed,
        contrastText: L.signals.warning.on,
      },
      error: {
        light: L.signalStop('critical', NAME.wash4),
        main: L.signals.critical.fill,
        dark: L.signalStamp('critical').fillPressed,
        contrastText: L.signals.critical.on,
      },
      success: {
        light: L.signalStop('positive', NAME.wash4),
        main: L.signals.positive.fill,
        dark: L.signalStamp('positive').fillPressed,
        contrastText: L.signals.positive.on,
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[300], 0.4),
      background: {
        default: L.planes.low,
        paper: L.planes.mid,
      },
      text: {
        primary: gray[800],
        secondary: gray[600],
        warning: orange[400],
      },
      action: {
        hover: alpha(gray[200], 0.2),
        selected: `${alpha(gray[200], 0.3)}`,
      },
      baseShadow:
        'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
    },
  },
  dark: {
    palette: {
      primary: {
        contrastText: D.stamp.on,
        light: D.brand(NAME.wash4),
        main: D.stamp.fill,
        dark: D.stamp.fillPressed,
      },
      info: {
        contrastText: D.signals.info.on,
        light: D.signalStop('info', NAME.wash4),
        main: D.signals.info.fill,
        dark: D.signalStamp('info').fillPressed,
      },
      warning: {
        light: D.signalStop('warning', NAME.wash4),
        main: D.signals.warning.fill,
        dark: D.signalStamp('warning').fillPressed,
        contrastText: D.signals.warning.on,
      },
      error: {
        light: D.signalStop('critical', NAME.wash4),
        main: D.signals.critical.fill,
        dark: D.signalStamp('critical').fillPressed,
        contrastText: D.signals.critical.on,
      },
      success: {
        light: D.signalStop('positive', NAME.wash4),
        main: D.signals.positive.fill,
        dark: D.signalStamp('positive').fillPressed,
        contrastText: D.signals.positive.on,
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[700], 0.6),
      background: {
        default: D.planes.low,
        paper: D.planes.mid,
      },
      text: {
        primary: D.neutral(NAME.inkStrong),
        secondary: D.neutral(NAME.lead),
      },
      action: {
        hover: alpha(gray[600], 0.2),
        selected: alpha(gray[600], 0.3),
      },
      baseShadow:
        'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
    },
  },
};

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
