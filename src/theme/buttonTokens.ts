// component/buttons — the CODE side of the Figma collection, mirrored 1:1.
//
// Two layers, exactly like the kit:
//   · THIS FILE is the alias table: per color mode (the collection's modes),
//     each row resolves to a theme reference. Register choices live here and
//     nowhere else.
//   · The button's styles (cleanCustomizations.MuiButton) consume ONLY the
//     --buttons-* variables — the same names as the kit rows. They never
//     touch palette ladders, okx, or ad-hoc expressions.
//
// Rows (matching the kit): contained/fill·label·fillHover·fillPressed·border,
// text/label·labelHover·labelPressed·fill·fillHover·fillPressed·border,
// focus/ring. Modes: primary · secondary · error · inherit
// (inherit-white is kit-only until the code grows a counterpart).
import type { Theme } from '@mui/material/styles';

export type ButtonMode = 'primary' | 'secondary' | 'error' | 'inherit';

const pal = (theme: Theme) => (theme.vars || theme).palette;

export function buttonModeVars(theme: Theme, mode: ButtonMode): Record<string, string> {
  const p = pal(theme);
  // per-mode sources, named in kit vocabulary
  const src = {
    primary: {
      stamp: { fill: p.okx.stampFill, on: p.okx.stampOn, hover: p.okx.stampHover, pressed: p.okx.stampPressed, edge: p.okx.stampEdge },
      ladder: p.primary,
      border: p.okx.borderDefault, // brand colors wear the neutral mark
    },
    secondary: {
      stamp: { fill: p.okx.secFill, on: p.okx.secOn, hover: p.okx.secHover, pressed: p.okx.secPressed, edge: p.okx.secEdge },
      ladder: p.secondary,
      border: p.okx.borderDefault,
    },
    error: {
      stamp: { fill: p.okx.criticalFill, on: p.okx.criticalOn, hover: p.okx.criticalHover, pressed: p.okx.criticalHover, edge: 'transparent' },
      ladder: p.error,
      border: p.error[600], // signals wear their own mark
    },
    inherit: {
      stamp: { fill: p.okx.inheritFill, on: p.okx.inheritOn, hover: p.okx.inheritHover, pressed: p.okx.inheritPressed, edge: p.okx.inheritEdge },
      ladder: p.grey,
      border: p.okx.borderDefault,
    },
  }[mode];

  return {
    '--buttons-contained-fill': src.stamp.fill,
    '--buttons-contained-label': src.stamp.on,
    '--buttons-contained-fillHover': src.stamp.hover,
    '--buttons-contained-fillPressed': src.stamp.pressed,
    '--buttons-contained-border': src.stamp.edge,
    '--buttons-text-label': src.ladder[700],
    '--buttons-text-labelHover': src.ladder[800],
    '--buttons-text-labelPressed': src.ladder[900],
    '--buttons-text-fill': 'transparent',
    '--buttons-text-fillHover': `color-mix(in srgb, ${src.ladder[600]} 12%, transparent)`,
    '--buttons-text-fillPressed': `color-mix(in srgb, ${src.ladder[600]} 16%, transparent)`,
    '--buttons-text-border': src.border,
    '--buttons-focus-ring': p.okx.focus,
  };
}

export const isButtonMode = (c: unknown): c is ButtonMode =>
  c === 'primary' || c === 'secondary' || c === 'error' || c === 'inherit';

/** The var sheet: each MUI color class carries its mode's token column —
 *  the literal CSS mirror of the collection's modes. Mounted once via
 *  GlobalStyles in AppTheme (MUI's styleOverrides pipeline mangles
 *  custom-property keys, so the vars cannot live there). */
export const buttonVarStyles = (theme: Theme) => ({
  '.MuiButton-colorPrimary': buttonModeVars(theme, 'primary'),
  '.MuiButton-colorSecondary': buttonModeVars(theme, 'secondary'),
  '.MuiButton-colorError': buttonModeVars(theme, 'error'),
  '.MuiButton-colorInherit': buttonModeVars(theme, 'inherit'),
});
