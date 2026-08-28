// LaneTokens → a MUI theme (colorSchemes light+dark, CSS variables mode).
//
// The library-path guarantee story lives in the component overrides: MUI's own
// hover/active derivation (darken()/alpha() on palette.main) manufactures
// colors the engine never guaranteed, so every state is pinned to an engine
// value instead — via the --okx-*/--md-sys-color-* vars the MD3 adapter emits,
// which keeps the overrides scheme-correct with a single definition.
//
// Documented gaps (slots okchroma deliberately doesn't cover — MUI defaults
// stand): action.disabled / disabledBackground / text.disabled (no disabled
// tier in the engine), palette.*.light (no lighter-solid role).
import { createTheme, type Theme } from '@mui/material/styles'
import { type LaneTokens, NAME } from './tokens'

function schemePalette(t: LaneTokens) {
  const secStamp = t.secondaryStamp ?? t.stamp
  return {
    palette: {
      primary: {
        main: t.stamp.fill,
        dark: t.stamp.fillPressed,
        contrastText: t.stamp.on,
      },
      secondary: {
        main: secStamp.fill,
        dark: secStamp.fillPressed,
        contrastText: secStamp.on,
      },
      error: { main: t.signals.critical.fill, contrastText: t.signals.critical.on },
      warning: { main: t.signals.warning.fill, contrastText: t.signals.warning.on },
      success: { main: t.signals.positive.fill, contrastText: t.signals.positive.on },
      info: { main: t.signals.info.fill, contrastText: t.signals.info.on },
      text: {
        primary: t.neutral(NAME.inkStrong),
        secondary: t.neutral(NAME.lead),
      },
      divider: t.neutral(NAME.washBorder),
      background: { default: t.planes.low, paper: t.planes.mid },
      action: {
        active: t.neutral(NAME.lead),
        hover: t.alpha(6),
        selected: t.alpha(8),
        focus: t.alpha(16),
      },
    },
  }
}

export function muiThemeFromTokens(light: LaneTokens, dark: LaneTokens): Theme {
  return createTheme({
    cssVariables: { colorSchemeSelector: 'data-mui-color-scheme' },
    colorSchemes: {
      light: schemePalette(light),
      dark: schemePalette(dark),
    },
    typography: {
      fontFamily: "'Roboto', 'Helvetica Neue', Arial, sans-serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            '&.Mui-focusVisible': {
              outline: '2px solid var(--okx-focus)',
              outlineOffset: 2,
            },
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'primary' && {
                '&:hover': { backgroundColor: 'var(--okx-fill-hover)' },
                '&:active': { backgroundColor: 'var(--okx-fill-pressed)' },
              }),
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'secondary' && {
                '&:hover': { backgroundColor: 'var(--okx-secondary-fill-hover)' },
                '&:active': { backgroundColor: 'var(--okx-secondary-fill-pressed)' },
              }),
            // outlined-action border = the family's own gated ring stop, replacing
            // MUI's primary-at-50%-alpha border
            ...(ownerState.variant === 'outlined' &&
              ownerState.color === 'primary' && {
                borderColor: 'var(--okx-primary-outline)',
              }),
          }),
        },
      },
      MuiFab: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.color === 'primary' && {
              '&:hover': { backgroundColor: 'var(--okx-fill-hover)' },
              '&:active': { backgroundColor: 'var(--okx-fill-pressed)' },
            }),
          }),
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: 'var(--okx-link)',
            textDecorationColor: 'var(--okx-link)',
            '&:hover': { color: 'var(--okx-link-hover)', textDecorationColor: 'var(--okx-link-hover)' },
            '&:active': { color: 'var(--okx-link-pressed)' },
          },
        },
      },
      // Alert soft variants = the signal's own wash + ink stops, replacing MUI's
      // lighten()/darken() derivation from palette.main
      MuiAlert: {
        styleOverrides: {
          root: ({ ownerState }) => {
            if (ownerState.variant !== 'standard' && ownerState.variant !== undefined) return {}
            const pair: Record<string, { bg: string; fg: string }> = {
              error: { bg: 'var(--md-sys-color-error-container)', fg: 'var(--md-sys-color-on-error-container)' },
              warning: { bg: 'var(--okx-warning-container)', fg: 'var(--okx-on-warning-container)' },
              success: { bg: 'var(--okx-positive-container)', fg: 'var(--okx-on-positive-container)' },
              info: { bg: 'var(--okx-info-container)', fg: 'var(--okx-on-info-container)' },
            }
            const p = pair[ownerState.severity ?? 'success']
            return p ? { backgroundColor: p.bg, color: p.fg } : {}
          },
        },
      },
    },
  })
}
