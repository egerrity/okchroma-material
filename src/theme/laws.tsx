// THE LAWS — the owner's standing rulings as theme.components overrides.
//
// These are cross-component: they encode doctrine (docs/round-1-failures.md
// "Rulings that SURVIVE", docs/derivation-audit.md cluster laws), not any one
// component's look. They load BEFORE the per-area customization files in
// AppTheme, so those files extend them (array-merge pattern,
// docs/customizing-mui.md). Every color read is theme.vars.palette.* — the
// map's addresses — never theme.palette, never a literal, never a derivation.

import type { Theme, Components } from '@mui/material/styles'
import { DISABLED_OPACITY } from 'okchroma'
import { FOCUS_RING } from './map'

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
  //    glyph = contrastText, borders = mark-74, hover ground = the wash law.
  //    The Checkbox AND Radio visuals live in the template's inputs
  //    customization (the Unify anatomy, same law); the Switch's colors stay
  //    here with its geometry in inputs — mergeComponents arrays compose. ──
  MuiSwitch: {
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const vars = theme.vars!
        const fam = vars.palette[ownerState.color === 'default' ? 'neutral' : (ownerState.color ?? 'primary')]
        return {
          // Unify anatomy (2026-08-29): the track IS the control — unchecked
          // it rides the input-border stop (mark-74, the same stroke register
          // Unify uses), checked it is the family MAIN; the thumb is the
          // contrastText glyph on it (F1's checked-fill pairing, swept).
          '& .MuiSwitch-switchBase': {
            '& .MuiSwitch-thumb': { backgroundColor: vars.palette.neutral['paper-100'] },
            '& + .MuiSwitch-track': {
              backgroundColor: vars.palette.neutral['mark-74'],
              opacity: 1,
            },
            '&.Mui-checked': {
              '& .MuiSwitch-thumb': { backgroundColor: fam.contrastText },
              '& + .MuiSwitch-track': { backgroundColor: fam.main, opacity: 1 },
            },
            '&.Mui-disabled': {
              ...disabledLaw,
              '& .MuiSwitch-thumb': { backgroundColor: vars.palette.neutral['paper-100'] },
              '& + .MuiSwitch-track': { opacity: DISABLED_OPACITY },
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
  // FIELD borders + states (reworked to the Unify chrome, owner 2026-08-30 —
  // "fit the visual styling into MUI's states"): rest/hover = 1px mark-74 (the
  // C1 border law unchanged), FOCUS = a 2px primary.main border (Unify's
  // brand-primary focus, the same brand-primary→main mapping the selection
  // controls locked) — the neutral FOCUS_RING stays the law for buttons and
  // controls, but fields signal focus with the border itself. Error = 1px
  // error.main, 2px when focused. The visible border is the ROOT border
  // (inputs.tsx owns the geometry; the notched outline is display-none there),
  // so the pins land on the root.
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-focused': {
          borderColor: theme.vars!.palette.primary.main,
          borderWidth: '2px',
          // keep text steady when the border thickens
          padding: '0 11px',
        },
        '&.MuiInputBase-multiline.Mui-focused': {
          padding: '11px', // the textarea's even padding, compensated
        },
        '&.Mui-error': {
          borderColor: theme.vars!.palette.error.main,
        },
        '&.Mui-disabled': {
          ...disabledLaw,
          borderColor: theme.vars!.palette.neutral['mark-74'],
        },
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        '&.Mui-disabled': disabledLaw,
      },
      input: ({ theme }) => ({
        '&::placeholder': {
          color: theme.vars!.palette.text.secondary,
          opacity: 1, // the honest color at full strength — no multiplier
        },
        // the disabled law: MUI's own .Mui-disabled swaps the input ink to
        // text.disabled via -webkit-text-fill-color (tripwire caught on the
        // gap-gallery roster, 2026-08-29) — pin the enabled ink; the root's
        // opacity carries the disabled read
        '&.Mui-disabled': {
          color: theme.vars!.palette.text.primary,
          WebkitTextFillColor: theme.vars!.palette.text.primary,
        },
      }),
    },
  },
  // labels ride the same law: MUI swaps .Mui-disabled labels to text.disabled
  // (same tripwire catch) — keep the enabled label color, opacity carries it
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-disabled': { ...disabledLaw, color: theme.vars!.palette.text.secondary },
        // Unify labels do not state-shift — the FIELD carries focus and error
        // (MUI swaps the label to primary/error.main; that doubles the signal)
        '&.Mui-focused': { color: theme.vars!.palette.text.secondary },
        '&.Mui-error': { color: theme.vars!.palette.text.secondary },
      }),
    },
  },
  // FormControlLabel's label is a DIFFERENT component with the same swap
  // (tripwire caught on the Checkbox docs page's disabled row, 2026-08-30)
  MuiFormControlLabel: {
    styleOverrides: {
      label: ({ theme }) => ({
        '&.Mui-disabled': { ...disabledLaw, color: theme.vars!.palette.text.primary },
      }),
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&::before': { borderBottomColor: theme.vars!.palette.neutral['mark-74'] },
        '&::after': { display: 'none' }, // the 2px primary underline animation — dead (H1)
        '&.Mui-focused': focusRing(theme.vars),
        // MUI reads palette.FilledInput.disabledBg (a GAP tripwire — caught on
        // the gap-gallery roster): the law keeps the ENABLED ground
        '&.Mui-disabled': {
          ...disabledLaw,
          backgroundColor: theme.vars!.palette.neutral['wash-92'],
        },
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
  //    are the pole register — text side MAPPED 2026-08-29: constant paper
  //    text on the inverse ground, state feedback = the inverse offset
  //    grounds (the state-layer ruling) ────────────────────────────────────
  MuiSnackbarContent: {
    styleOverrides: {
      action: ({ theme }) => ({
        // the FULL text-CTA idiom in pole tiers — hover/active COLOR pinned
        // too, or the MuiButton law's family hover (primary.main, blue) bleeds
        // through at equal specificity (owner-caught on the gallery panel,
        // 2026-08-29)
        '& .MuiButton-root': {
          color: theme.vars!.palette.poleWhite.light,
          '&:hover': {
            color: theme.vars!.palette.poleWhite.main,
            backgroundColor: theme.vars!.palette.inverseOffset.hover,
          },
          '&:active': {
            color: theme.vars!.palette.poleWhite.dark,
            backgroundColor: theme.vars!.palette.inverseOffset.pressed,
          },
        },
      }),
    },
  },
}
