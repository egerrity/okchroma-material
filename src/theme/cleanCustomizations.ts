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
import { isButtonMode } from './buttonTokens';
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
  // buttons consume ONLY the component tokens (--buttons-*), the code mirror
  // of the Figma component/buttons collection. The alias table lives in
  // theme/buttonTokens.ts; nothing here names a palette or okx path.
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
          const mode = isButtonMode(ownerState.color)
            ? ownerState.color
            : ownerState.color === undefined
              ? 'primary'
              : undefined
          // colors outside the kit collection's modes are out of contract
          if (!mode) return geometry
          const disabled = {
            '&.Mui-disabled': { opacity: (theme.vars || theme).palette.action.disabledOpacity },
          }
          void mode // the var sheet (buttonVarStyles) carries the mode columns
          return {
            ...geometry,
            '&.Mui-focusVisible': {
              outline: '2px solid var(--buttons-focus-ring)',
              outlineOffset: 1,
            },
            ...(ownerState.variant === 'contained' && {
              '&&': {
                backgroundColor: 'var(--buttons-contained-fill)',
                color: 'var(--buttons-contained-label)',
                backgroundImage: 'none',
                border: '1.5px solid var(--buttons-contained-border)',
                boxShadow: 'none',
                '&:hover': { backgroundColor: 'var(--buttons-contained-fillHover)', boxShadow: 'none' },
                '&:active': { backgroundColor: 'var(--buttons-contained-fillPressed)', boxShadow: 'none' },
                ...disabled,
              },
            }),
            ...((ownerState.variant === 'text' || ownerState.variant === 'outlined') && {
              '&&': {
                color: 'var(--buttons-text-label)',
                backgroundColor: 'var(--buttons-text-fill)',
                ...(ownerState.variant === 'outlined' && {
                  border: '1px solid var(--buttons-text-border)',
                }),
                '&:hover': {
                  color: 'var(--buttons-text-labelHover)',
                  backgroundColor: 'var(--buttons-text-fillHover)',
                },
                '&:active': {
                  color: 'var(--buttons-text-labelPressed)',
                  backgroundColor: 'var(--buttons-text-fillPressed)',
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
          backgroundColor: v(theme).primary[200],
          color: v(theme).primary[800],
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
          backgroundColor: p[100],
          color: p[900],
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
              backgroundColor: p[200],
              border: `1px solid ${p[400]}`,
              color: p[900],
              '& .MuiChip-label': { color: 'inherit' },
              '& .MuiChip-icon': { color: 'inherit' },
            },
          }
        },
      ] as never,
    },
  },
};
