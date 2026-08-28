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
  // lucide icons size via font-size like MUI's did (their width/height attrs
  // would otherwise render every icon at 24px); inline style wins where a
  // component sets an explicit size
  MuiCssBaseline: {
    styleOverrides: {
      'svg.lucide': {
        width: '1em',
        height: '1em',
        fontSize: '1.25rem',
      },
    },
  },
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
        ({ ownerState, theme }: { ownerState: { variant?: string; color?: string; size?: string }; theme: Theme }) => ({
          // unify button shape: full pill, TWO sizes (32 / 48, from the kit set)
          '&&&': {
            borderRadius: 999,
            ...(ownerState.size === 'small'
              ? { height: 32, padding: '0 16px', fontSize: 14 }
              : { height: 48, padding: '0 24px', fontSize: 16 }),
          },
          // '&&' outranks the template's variants entries, which insert after
          // root styles and would otherwise keep the Sitemark gray buttons
          ...(ownerState.variant === 'contained' &&
            (ownerState.color === 'primary' || ownerState.color === undefined) && {
              // unify contained: flat pill — no shadow, no gradient. stamp-edge is
              // ALWAYS rendered (usually transparent; the engine resolves it)
              '&&': {
                backgroundColor: L.stamp.fill,
                color: L.stamp.on,
                backgroundImage: 'none',
                border: `1.5px solid ${L.stamp.edge}`,
                boxShadow: 'none',
                '&:hover': { backgroundColor: L.stamp.fillHover, boxShadow: 'none' },
                '&:active': { backgroundColor: L.stamp.fillPressed, boxShadow: 'none' },
                ...theme.applyStyles('dark', {
                  backgroundColor: D.stamp.fill,
                  color: D.stamp.on,
                  border: `1.5px solid ${D.stamp.edge}`,
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
  // unify nav selection: soft brand wash pill, brand ink text and icon
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        borderRadius: 8,
        '&&.Mui-selected, &&.Mui-selected:hover': {
          backgroundColor: L.brand(NAME.paper3),
          color: L.brand(NAME.inkMid),
          '& .MuiListItemIcon-root': { color: 'inherit' },
          '& .MuiListItemText-primary': { color: 'inherit', fontWeight: 600 },
          ...theme.applyStyles('dark', {
            backgroundColor: D.brand(NAME.paper3),
            color: D.brand(NAME.inkMid),
          }),
        },
      }),
    },
  },
  // the SYSTEM link trio (a link is not a text-style CTA)
  MuiLink: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        color: L.link.default,
        textDecorationColor: L.link.default,
        '&:hover': { color: L.link.hover },
        '&:active': { color: L.link.pressed },
        ...theme.applyStyles('dark', {
          color: D.link.default,
          textDecorationColor: D.link.default,
          '&:hover': { color: D.link.hover },
          '&:active': { color: D.link.pressed },
        }),
      }),
    },
  },
  // round-rect chips: the unify chip shape. Colors follow the soft law —
  // family wash ground + family INK text. Stamps are never for text.
  MuiChip: {
    ...dataDisplayCustomizations.MuiChip,
    styleOverrides: {
      root: [
        ...prev(dataDisplayCustomizations.MuiChip?.styleOverrides?.root),
        ({ ownerState, theme }: { ownerState: { color?: string }; theme: Theme }) => {
          const family: Record<string, 'critical' | 'warning' | 'positive' | 'info'> = {
            error: 'critical',
            warning: 'warning',
            success: 'positive',
            info: 'info',
          }
          const soft = (t: typeof L, fam?: 'critical' | 'warning' | 'positive' | 'info') =>
            fam
              ? {
                  backgroundColor: t.signalStop(fam, NAME.paper3),
                  border: `1px solid ${t.signalStop(fam, 'wash-85')}`,
                  color: t.signalStop(fam, NAME.inkStrong),
                }
              : {
                  backgroundColor: t.neutral(NAME.paper3),
                  border: `1px solid ${t.neutral('wash-85')}`,
                  color: t.neutral(NAME.inkStrong),
                }
          const fam = family[ownerState.color ?? '']
          return {
            borderRadius: 8,
            '&&': {
              ...soft(L, fam),
              '& .MuiChip-label': { color: 'inherit' },
              '& .MuiChip-icon': { color: 'inherit' },
              ...theme.applyStyles('dark', soft(D, fam)),
            },
          }
        },
      ] as never,
    },
  },
};
