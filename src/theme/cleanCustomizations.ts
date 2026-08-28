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
  // buttons: the ONLY consumer of the stamp states. Flat unify pill, two
  // sizes, stamp-edge always rendered (usually transparent)
  MuiButton: {
    styleOverrides: {
      root: [
        ...prev(inputsCustomizations.MuiButton?.styleOverrides?.root),
        ({ ownerState, theme }: { ownerState: { variant?: string; color?: string; size?: string }; theme: Theme }) => ({
          '&&&': {
            borderRadius: 999,
            ...(ownerState.size === 'small'
              ? { height: 32, padding: '0 16px', fontSize: 14 }
              : { height: 48, padding: '0 24px', fontSize: 16 }),
          },
          ...(ownerState.variant === 'contained' &&
            (ownerState.color === 'primary' || ownerState.color === undefined) && {
              '&&': {
                backgroundColor: v(theme).primary.main,
                color: v(theme).primary.contrastText,
                backgroundImage: 'none',
                border: `1.5px solid ${v(theme).okx.stampEdge}`,
                boxShadow: 'none',
                '&:hover': { backgroundColor: v(theme).okx.stampHover, boxShadow: 'none' },
                '&:active': { backgroundColor: v(theme).okx.stampPressed, boxShadow: 'none' },
              },
            }),
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'secondary' && {
              '&&': {
                backgroundColor: v(theme).okx.secFill,
                color: v(theme).okx.secOn,
                backgroundImage: 'none',
                border: `1.5px solid ${v(theme).okx.secEdge}`,
                boxShadow: 'none',
                '&:hover': { backgroundColor: v(theme).okx.secHover, boxShadow: 'none' },
                '&:active': { backgroundColor: v(theme).okx.secPressed, boxShadow: 'none' },
              },
            }),
          ...(ownerState.variant === 'outlined' &&
            ownerState.color === 'primary' && {
              '&&': { borderColor: v(theme).primary[600] },
            }),
        }),
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
