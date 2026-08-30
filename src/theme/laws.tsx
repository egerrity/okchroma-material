// THE LAWS — the owner's standing rulings as theme.components overrides.
//
// These are cross-component: they encode doctrine (docs/round-1-failures.md
// "Rulings that SURVIVE", docs/derivation-audit.md cluster laws), not any one
// component's look. They load BEFORE the per-area customization files in
// AppTheme, so those files extend them (array-merge pattern,
// docs/customizing-mui.md). Every color read is theme.vars.palette.* — the
// map's addresses — never theme.palette, never a literal, never a derivation.

import type { Theme, Components } from '@mui/material/styles'
import { FOCUS_RING, DISABLED_OPACITY } from './map'

type Vars = Theme['vars']

// The one focus treatment: 2px neutral mark-74 ring, 1px offset. No ripple
// anywhere (the same ruling), so focusVisible is the ring alone.
const focusRing = (vars: Vars) => ({
  outline: `${FOCUS_RING.width} solid ${vars!.palette.neutral['mark-74']}`,
  outlineOffset: FOCUS_RING.offset,
})

// The disabled law: component-level opacity, colors stay the enabled ones.
// (The value is the logged gap, map.ts DISABLED_OPACITY.)
const disabledLaw = {
  opacity: DISABLED_OPACITY,
} as const

export const lawCustomizations: Components<Theme> = {
  // ── ripple + focus, globally ─────────────────────────────────────────────
  MuiButtonBase: {
    defaultProps: { disableRipple: true, disableTouchRipple: true },
    styleOverrides: {
      root: ({ theme }) => ({
        boxSizing: 'border-box',
        transition: 'all 100ms ease-in',
        '&.Mui-focusVisible': focusRing(theme.vars),
        '&.Mui-disabled': disabledLaw,
      }),
    },
  },

  // ── contained Button = the stamp register (the ONE color-polymorphic
  //    expression the PaletteColor construction buys) ──────────────────────
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const vars = theme.vars!
        const fam =
          ownerState.color && ownerState.color !== 'inherit'
            ? vars.palette[ownerState.color]
            : vars.palette.neutral // color="inherit" routes to the neutral column
        return {
          ...(ownerState.variant === 'contained' && {
            backgroundColor: fam.stampFill,
            color: fam.stampOn,
            // stamp-edge is ALWAYS rendered (usually transparent) — layout never shifts
            border: `1.5px solid ${fam.stampEdge}`,
            '&:hover': { backgroundColor: fam.stampFillHover },
            '&:active': { backgroundColor: fam.stampFillPressed },
            '&.Mui-disabled': { ...disabledLaw, backgroundColor: fam.stampFill, color: fam.stampOn },
          }),
          ...(ownerState.variant === 'outlined' && {
            // border law (audit cluster C): colored outlines are the 3:1 mark stop
            color: fam.main,
            borderColor: fam['mark-74'],
            '&:hover': { backgroundColor: fam['wash-92'] },
            '&:active': { backgroundColor: fam['wash-85'] },
            '&.Mui-disabled': { ...disabledLaw, color: fam.main, borderColor: fam['mark-74'] },
          }),
          ...(ownerState.variant === 'text' && {
            // the text-style CTA: rest/hover/pressed ARE light/main/dark (lead-53/ink-42/ink-30)
            color: fam.light,
            '&:hover': { color: fam.main, backgroundColor: fam['wash-92'] },
            '&:active': { color: fam.dark, backgroundColor: fam['wash-85'] },
            '&.Mui-disabled': { ...disabledLaw, color: fam.light },
          }),
        }
      },
    },
  },

  // ── links ride the engine's emitted link trio, never palette.primary and
  //    never the text stops (owner D1) ─────────────────────────────────────
  MuiLink: {
    defaultProps: { underline: 'always' },
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.vars!.palette.link.default,
        textDecorationColor: 'currentcolor',
        '&:hover': { color: theme.vars!.palette.link.hover },
        '&:active': { color: theme.vars!.palette.link.pressed },
      }),
    },
  },

  // ── selection controls: never stamp (owner F1) — checked = main (ink-42),
  //    glyph = contrastText, hover ground = the wash law. (Checkbox's custom
  //    visual lives in the template's inputs customization, same law.) ─────
  MuiRadio: {
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const vars = theme.vars!
        const fam = vars.palette[ownerState.color === 'default' ? 'neutral' : (ownerState.color ?? 'primary')]
        return {
          color: vars.palette.neutral['mark-74'],
          '&:hover': { backgroundColor: vars.palette.neutral['wash-92'] },
          '&.Mui-checked': {
            color: fam.main,
            '&:hover': { backgroundColor: fam['wash-92'] },
          },
          '&.Mui-disabled': { ...disabledLaw, color: vars.palette.neutral['mark-74'] },
        }
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const vars = theme.vars!
        const fam = vars.palette[ownerState.color === 'default' ? 'neutral' : (ownerState.color ?? 'primary')]
        return {
          '& .MuiSwitch-switchBase': {
            '& .MuiSwitch-thumb': { backgroundColor: vars.palette.neutral['paper-100'] },
            '& + .MuiSwitch-track': {
              backgroundColor: vars.palette.neutral['wash-80'],
              opacity: 1,
            },
            '&.Mui-checked': {
              '& .MuiSwitch-thumb': { backgroundColor: fam.main },
              '& + .MuiSwitch-track': { backgroundColor: fam['mark-74'], opacity: 1 },
            },
            '&.Mui-disabled': {
              ...disabledLaw,
              '& .MuiSwitch-thumb': { backgroundColor: vars.palette.neutral['paper-100'] },
              '& + .MuiSwitch-track': { backgroundColor: vars.palette.neutral['wash-80'], opacity: DISABLED_OPACITY },
            },
          },
        }
      },
    },
  },

  // ── chips: ink register on wash ground; never stamp (owner doctrine) ─────
  MuiChip: {
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const vars = theme.vars!
        const fam = vars.palette[ownerState.color === 'default' ? 'neutral' : (ownerState.color ?? 'neutral')]
        return {
          ...(ownerState.variant === 'filled' && {
            backgroundColor: fam['wash-92'],
            color: fam['ink-30'],
            '& .MuiChip-deleteIcon': {
              color: fam['ink-42'],
              '&:hover': { color: fam['ink-30'] },
            },
            '& .MuiChip-icon': { color: fam['ink-42'] },
          }),
          ...(ownerState.variant === 'outlined' && {
            color: fam['ink-30'],
            borderColor: fam['mark-74'],
            '&:hover': { backgroundColor: fam['wash-92'] },
            '& .MuiChip-deleteIcon': {
              color: fam['ink-42'],
              '&:hover': { color: fam['ink-30'] },
            },
            '& .MuiChip-icon': { color: fam['ink-42'] },
          }),
          '&.Mui-disabled': disabledLaw,
        }
      },
    },
  },

  // ── badge with text + avatar: sanctioned stamp consumers ─────────────────
  MuiAvatar: {
    styleOverrides: {
      // the fallback (letter/icon) avatar rides the stamp trio: fill comes
      // from palette.Avatar.defaultBg (the map row), on + edge here
      colorDefault: ({ theme }) => ({
        color: theme.vars!.palette.neutral.stampOn,
        border: `1.5px solid ${theme.vars!.palette.neutral.stampEdge}`,
      }),
    },
  },
  MuiBadge: {
    styleOverrides: {
      badge: ({ ownerState, theme }) => {
        const vars = theme.vars!
        const fam = vars.palette[ownerState.color === 'default' ? 'neutral' : (ownerState.color ?? 'primary')]
        return {
          backgroundColor: fam.stampFill,
          color: fam.stampOn,
          border: `1.5px solid ${fam.stampEdge}`,
        }
      },
    },
  },

  // ── inputs: border law (mark-74, owner C1), placeholder = fg-subtle,
  //    focus = the ring (the 2px primary underline/border animation dies) ──
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.vars!.palette.neutral['mark-74'],
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.vars!.palette.neutral['mark-74'],
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.vars!.palette.neutral['mark-74'],
          borderWidth: '1px',
        },
        '&.Mui-focused': focusRing(theme.vars),
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.vars!.palette.error['mark-74'],
        },
        '&.Mui-disabled': {
          ...disabledLaw,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.vars!.palette.neutral['mark-74'],
          },
        },
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      input: ({ theme }) => ({
        '&::placeholder': {
          color: theme.vars!.palette.text.secondary,
          opacity: 1, // the honest color at full strength — no multiplier
        },
      }),
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&::before': { borderBottomColor: theme.vars!.palette.neutral['mark-74'] },
        '&::after': { display: 'none' }, // the 2px primary underline animation — dead (H1)
        '&.Mui-focused': focusRing(theme.vars),
      }),
    },
  },
  MuiInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&::before': { borderBottomColor: theme.vars!.palette.neutral['mark-74'] },
        '&::after': { display: 'none' },
        '&.Mui-focused': focusRing(theme.vars),
      }),
    },
  },

  // ── the modal veil: the engine's one scrim row (map SCRIM, B3 landed
  //    0.1.2). Stock's derived rgba(0,0,0,0.5) dies; the invisible variant
  //    (Menu/Popover backdrops) stays transparent ────────────────────────────
  MuiBackdrop: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.vars!.palette.scrim,
      }),
      invisible: { backgroundColor: 'transparent' },
    },
  },

  // ── inverted surfaces read the map's component rows; their action buttons
  //    are the pole register — dropped this round, so they inherit the
  //    sentinel through palette.poleWhite when routed ───────────────────────
  MuiSnackbarContent: {
    styleOverrides: {
      action: ({ theme }) => ({
        // pole register consumer — dropped this round: render the gap loud
        '& .MuiButton-root': { color: theme.vars!.palette.poleWhite.main },
      }),
    },
  },
}
