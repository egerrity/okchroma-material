// The okchroma demo's Clean treatment, ported onto the template as a
// customization layer (docs/customizing-mui.md: array-merge preserves the
// template's own states where we extend an existing component entry).
//
// Clean law, from the demo (demo/shared.tsx + tokens/semantic.css):
//   elevation ladder  -1 sink = stroke only, no shadow
//                     +1 lift = 0 4px 8px shadow-04, 0 0 1px shadow-04
//                     +2 pop  = 0 4px 10px -2px shadow-08, 0 20px 25px -2px shadow-04
//                     +3 float (dialogs) = the literal float recipe
//   shadow alphas     light 4%/8%, dark 32%/48% (the engine's shadow rows)
//   strokes           subtle = neutral wash-89, default = neutral mark-74
//   card radius 12, round-rect chips (the unify chip shape), brand-fill
//   primary actions, mark-74 focus ring
import type { Theme, Components } from '@mui/material/styles';
import { L, D } from '../shared-theme/themePrimitives';
import { NAME } from './tokens';
import { inputsCustomizations } from '../shared-theme/customizations/inputs';
import { surfacesCustomizations } from '../shared-theme/customizations/surfaces';
import { dataDisplayCustomizations } from '../shared-theme/customizations/dataDisplay';

const SHADOW = {
  light: { s04: 'rgba(0, 0, 0, 0.04)', s08: 'rgba(0, 0, 0, 0.08)' },
  dark: { s04: 'rgba(0, 0, 0, 0.32)', s08: 'rgba(0, 0, 0, 0.48)' },
};
const lift = (s: { s04: string; s08: string }) => `0 4px 8px ${s.s04}, 0 0 1px ${s.s04}`;
const pop = (s: { s04: string; s08: string }) =>
  `0 4px 10px -2px ${s.s08}, 0 20px 25px -2px ${s.s04}`;
const FLOAT = {
  light: '0 6px 16px -5px rgba(17,18,22,0.10), 0 16px 44px -8px rgba(17,18,22,0.16)',
  dark: '0 6px 16px -5px rgba(0,0,0,0.48), 0 16px 44px -8px rgba(0,0,0,0.58)',
};

const prev = <T,>(v: T | undefined): T[] => (v === undefined ? [] : [v]);

export const cleanCustomizations: Components<Theme> = {
  // focus ring law: 2px mark-74, offset 1
  MuiButtonBase: {
    ...inputsCustomizations.MuiButtonBase,
    styleOverrides: {
      root: [
        ...prev(inputsCustomizations.MuiButtonBase?.styleOverrides?.root),
        ({ theme }: { theme: Theme }) => ({
          '&.Mui-focusVisible': {
            outline: `2px solid ${L.neutral(NAME.mark)}`,
            outlineOffset: 1,
            ...theme.applyStyles('dark', {
              outline: `2px solid ${D.neutral(NAME.mark)}`,
            }),
          },
        }),
      ] as never,
    },
  },
  // primary actions wear the stamp trio (the guarantee pinning lives here now)
  MuiButton: {
    styleOverrides: {
      root: [
        ...prev(inputsCustomizations.MuiButton?.styleOverrides?.root),
        ({ ownerState, theme }: { ownerState: { variant?: string; color?: string }; theme: Theme }) => ({
          // unify button shape: full pill
          '&&&': { borderRadius: 999 },
          // '&&' outranks the template's variants entries, which insert after
          // root styles and would otherwise keep the Sitemark gray buttons
          ...(ownerState.variant === 'contained' &&
            (ownerState.color === 'primary' || ownerState.color === undefined) && {
              // unify contained: flat pill — no shadow, no border, no gradient
              '&&': {
                backgroundColor: L.stamp.fill,
                color: L.stamp.on,
                backgroundImage: 'none',
                border: 'none',
                boxShadow: 'none',
                '&:hover': { backgroundColor: L.stamp.fillHover, boxShadow: 'none' },
                '&:active': { backgroundColor: L.stamp.fillPressed, boxShadow: 'none' },
                ...theme.applyStyles('dark', {
                  backgroundColor: D.stamp.fill,
                  color: D.stamp.on,
                  '&:hover': { backgroundColor: D.stamp.fillHover, boxShadow: 'none' },
                  '&:active': { backgroundColor: D.stamp.fillPressed, boxShadow: 'none' },
                }),
              },
            }),
          ...(ownerState.variant === 'outlined' &&
            ownerState.color === 'primary' && {
              '&&': {
                borderColor: L.brand(NAME.mark),
                ...theme.applyStyles('dark', { borderColor: D.brand(NAME.mark) }),
              },
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
          border: `1px solid ${L.neutral('wash-89')}`,
          boxShadow: lift(SHADOW.light),
          ...theme.applyStyles('dark', {
            border: `1px solid ${D.neutral('wash-89')}`,
            boxShadow: lift(SHADOW.dark),
          }),
        }),
      ] as never,
    },
  },
  // +2 pop for transient surfaces, +3 float for dialogs
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }: { theme: Theme }) => ({
        boxShadow: pop(SHADOW.light),
        ...theme.applyStyles('dark', { boxShadow: pop(SHADOW.dark) }),
      }),
    },
  },
  MuiPopover: {
    styleOverrides: {
      paper: ({ theme }: { theme: Theme }) => ({
        boxShadow: pop(SHADOW.light),
        ...theme.applyStyles('dark', { boxShadow: pop(SHADOW.dark) }),
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }: { theme: Theme }) => ({
        boxShadow: FLOAT.light,
        ...theme.applyStyles('dark', { boxShadow: FLOAT.dark }),
      }),
    },
  },
  // round-rect chips: the unify chip shape
  MuiChip: {
    ...dataDisplayCustomizations.MuiChip,
    styleOverrides: {
      root: [
        ...prev(dataDisplayCustomizations.MuiChip?.styleOverrides?.root),
        { borderRadius: 8 },
      ] as never,
    },
  },
};
