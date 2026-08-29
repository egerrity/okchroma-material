// The okchroma demo's Clean treatment, ported onto the template as a
// customization layer (docs/customizing-mui.md: array-merge preserves the
// template's own states where we extend an existing component entry).
//
// Every color here is a theme VAR from the per-lane palette (see
// buildColorSchemes): the var flips with the scheme, so no applyStyles('dark')
// blocks are needed and okchroma's dark lane is the only dark.
//
// Owner rules encoded: stamp states touch BUTTONS only; brand/alt stamp fill
// is for avatars, buttons, chips, badges only; chips wear family wash + ink
// (stamps are never for text); focus rings ride the mark band.
import type { Theme, Components } from '@mui/material/styles';
import { inputsCustomizations } from '../shared-theme/customizations/inputs';
import { surfacesCustomizations } from '../shared-theme/customizations/surfaces';
import { dataDisplayCustomizations } from '../shared-theme/customizations/dataDisplay';

const prev = <T,>(v: T | undefined): T[] => (v === undefined ? [] : [v]);
const v = (theme: Theme) => (theme.vars || theme).palette;

export const cleanCustomizations: Components<Theme> = {
  // focus ring law: 2px mark-74, offset 1
  MuiButtonBase: {
    ...inputsCustomizations.MuiButtonBase,
    styleOverrides: {
      root: [
        ...prev(inputsCustomizations.MuiButtonBase?.styleOverrides?.root),
        ({ theme }: { theme: Theme }) => ({
          '&.Mui-focusVisible': {
            outline: `2px solid ${v(theme).okx.focus}`,
            outlineOffset: 1,
          },
        }),
      ] as never,
    },
  },
  // buttons read the palette stamp slots (fill/fillHover/fillPressed/on/edge
  // — the additive register for stamp-accepting components) and the ladder
  // for the quiet variants. color="inherit" rides Material's OWN routing
  // (palette.Button.inheritContained*), filled with the neutral stamp.
  MuiButton: {
    styleOverrides: {
      root: [
        ...prev(inputsCustomizations.MuiButton?.styleOverrides?.root),
        ({ ownerState, theme }: { ownerState: { variant?: string; color?: string; size?: string }; theme: Theme }) => {
          const geometry = {
            '&&&': {
              borderRadius: 999,
              ...(ownerState.size === 'small'
                ? { height: 32, padding: '0 16px', fontSize: 12 }
                : ownerState.size === 'large'
                  ? { height: 48, padding: '0 24px', fontSize: 16 }
                  : { height: 40, padding: '0 20px', fontSize: 14 }),
            },
          }
          const famKey = (['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).find(
            k => k === ownerState.color,
          )
          const famPalette = famKey ? v(theme)[famKey] : ownerState.color === undefined ? v(theme).primary : undefined
          const inherit = ownerState.color === 'inherit'
          const quietFam = famPalette ?? (inherit ? v(theme).grey : undefined)
          const disabled = {
            '&.Mui-disabled': { opacity: (theme.vars || theme).palette.action.disabledOpacity },
          }
          const signal =
            ownerState.color === 'error' || ownerState.color === 'warning' ||
            ownerState.color === 'info' || ownerState.color === 'success'
          return {
            ...geometry,
            ...(ownerState.variant === 'contained' && famPalette && {
              '&&': {
                backgroundColor: famPalette.fill,
                color: famPalette.on,
                backgroundImage: 'none',
                border: `1.5px solid ${famPalette.edge}`,
                boxShadow: 'none',
                '&:hover': { backgroundColor: famPalette.fillHover, boxShadow: 'none' },
                '&:active': { backgroundColor: famPalette.fillPressed, boxShadow: 'none' },
                ...disabled,
              },
            }),
            ...(ownerState.variant === 'contained' && inherit && {
              '&&': {
                backgroundColor: (theme.vars || theme).palette.Button.inheritContainedBg,
                backgroundImage: 'none',
                border: '1.5px solid transparent',
                boxShadow: 'none',
                '&:hover': { backgroundColor: (theme.vars || theme).palette.Button.inheritContainedHoverBg, boxShadow: 'none' },
                '&:active': { backgroundColor: (theme.vars || theme).palette.Button.inheritContainedHoverBg, boxShadow: 'none' },
                ...disabled,
              },
            }),
            ...((ownerState.variant === 'text' || ownerState.variant === 'outlined') && quietFam && {
              '&&': {
                color: quietFam['lead-53'],
                ...(ownerState.variant === 'outlined' && {
                  // brand colors wear the neutral mark border; signals their own mark
                  border: `1px solid ${signal ? quietFam['mark-74'] : v(theme).okx.borderDefault}`,
                }),
                // hover/pressed grounds: the owner's mark-tint washes — INTERIM
                // color-mix until the alpha rows join the engine
                '&:hover': {
                  color: quietFam['ink-42'],
                  backgroundColor: `color-mix(in srgb, ${quietFam['mark-74']} 12%, transparent)`,
                },
                '&:active': {
                  color: quietFam['ink-30'],
                  backgroundColor: `color-mix(in srgb, ${quietFam['mark-74']} 16%, transparent)`,
                },
                ...disabled,
              },
            }),
          }
        },
      ] as never,
    },
  },
  // +1 lift cards: subtle stroke, clean shadow recipe, radius 12
  MuiCard: {
    styleOverrides: {
      root: [
        ...prev(surfacesCustomizations.MuiCard?.styleOverrides?.root),
        ({ theme }: { theme: Theme }) => ({
          borderRadius: 12,
          border: `1px solid ${v(theme).okx.borderSubtle}`,
          boxShadow: v(theme).okx.shadowLift,
        }),
      ] as never,
    },
  },
  // +2 pop for transient surfaces, +3 float for dialogs
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }: { theme: Theme }) => ({ boxShadow: v(theme).okx.shadowPop }),
    },
  },
  MuiPopover: {
    styleOverrides: {
      paper: ({ theme }: { theme: Theme }) => ({ boxShadow: v(theme).okx.shadowPop }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }: { theme: Theme }) => ({ boxShadow: v(theme).okx.shadowFloat }),
    },
  },
  // unify nav selection: soft brand wash pill, brand ink text and icon
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        borderRadius: 8,
        '&&.Mui-selected, &&.Mui-selected:hover': {
          backgroundColor: v(theme).primary['paper-95'],
          color: v(theme).primary['ink-42'],
          '& .MuiListItemIcon-root': { color: 'inherit' },
          '& .MuiListItemText-primary': { color: 'inherit', fontWeight: 600 },
        },
      }),
    },
  },
  // alert soft law: family wash ground + family ink text; icon in the family fill
  MuiAlert: {
    styleOverrides: {
      root: ({ ownerState, theme }: { ownerState: { severity?: string; variant?: string }; theme: Theme }) => {
        if (ownerState.variant !== 'standard' && ownerState.variant !== undefined) return {}
        const fam = ({ error: 'error', warning: 'warning', success: 'success', info: 'info' } as const)[
          ownerState.severity ?? 'success'
        ]
        if (!fam) return {}
        const p = v(theme)[fam]
        return {
          backgroundColor: p['paper-97'],
          color: p['ink-30'],
          '& .MuiAlert-icon': { color: p.main },
        }
      },
    },
  },
  // the SYSTEM link trio (a link is not a text-style CTA)
  MuiLink: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        color: v(theme).okx.link,
        textDecorationColor: v(theme).okx.link,
        '&:hover': { color: v(theme).okx.linkHover },
        '&:active': { color: v(theme).okx.linkPressed },
      }),
    },
  },
  // round-rect chips: the unify chip shape. Colors follow the soft law —
  // family wash ground + family INK text (ladder tiers, per lane via vars)
  MuiChip: {
    ...dataDisplayCustomizations.MuiChip,
    styleOverrides: {
      root: [
        ...prev(dataDisplayCustomizations.MuiChip?.styleOverrides?.root),
        ({ ownerState, theme }: { ownerState: { color?: string }; theme: Theme }) => {
          const fam = { error: 'error', warning: 'warning', success: 'success', info: 'info' }[
            ownerState.color ?? ''
          ] as 'error' | 'warning' | 'success' | 'info' | undefined
          const p = fam ? v(theme)[fam] : v(theme).grey
          return {
            borderRadius: 8,
            '&&': {
              backgroundColor: p['paper-95'],
              border: `1px solid ${p['wash-85']}`,
              color: p['ink-30'],
              '& .MuiChip-label': { color: 'inherit' },
              '& .MuiChip-icon': { color: 'inherit' },
            },
          }
        },
      ] as never,
    },
  },
};
