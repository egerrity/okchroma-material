// Inputs — template structure (sizes, radii, spacing, custom checkbox visual)
// with every color a MAP address (src/theme/map.ts vocabulary: family columns
// under engine spellings, surface planes, the action rows). Zero literals,
// zero derivations, zero applyStyles('dark') — one reference is correct in
// both modes; the engine moves the values. Color doctrine (stamp routing,
// focus ring, disabled law) lives in src/theme/laws.tsx, which loads first.
import type { Theme, Components } from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { toggleButtonClasses } from '@mui/material/ToggleButton';
import { Square as CheckBoxOutlineBlankRoundedIcon } from 'lucide-react';
import { Check as CheckRoundedIcon } from 'lucide-react';
import { Minus as RemoveRoundedIcon } from 'lucide-react';

/* eslint-disable import/prefer-default-export */
export const inputsCustomizations: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        textTransform: 'none',
        // Unify: things that are buttons are ROUND
        borderRadius: '999px',
        variants: [
          { props: { size: 'small' }, style: { height: '2.25rem', padding: '8px 12px' } },
          { props: { size: 'medium' }, style: { height: '2.5rem' } },
        ],
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none',
        // Unify: things that are buttons are ROUND
        borderRadius: '999px',
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightMedium,
        letterSpacing: 0,
        color: theme.vars!.palette.text.primary,
        border: '1px solid ',
        borderColor: theme.vars!.palette.neutral['wash-80'],
        '&:hover': {
          backgroundColor: theme.vars!.palette.neutral['wash-92'],
          borderColor: theme.vars!.palette.neutral['wash-80'],
        },
        '&:active': {
          backgroundColor: theme.vars!.palette.neutral['wash-85'],
        },
        // the disabled law: colors STAY the enabled ones (opacity comes from
        // the ButtonBase law). Neutralizes MUI's swap to action.disabled —
        // the read the sentinel exposed on the pagination arrows.
        '&.Mui-disabled': {
          color: theme.vars!.palette.text.primary,
          borderColor: theme.vars!.palette.neutral['wash-80'],
        },
        variants: [
          {
            props: { size: 'small' },
            style: {
              width: '2.25rem',
              height: '2.25rem',
              padding: '0.25rem',
              [`& .${svgIconClasses.root}`]: { fontSize: '1rem' },
            },
          },
          { props: { size: 'medium' }, style: { width: '2.5rem', height: '2.5rem' } },
        ],
      }),
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: {
        borderRadius: '10px',
      },
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: '12px 16px',
        textTransform: 'none',
        borderRadius: '10px',
        fontWeight: 500,
        color: theme.vars!.palette.neutral['lead-53'],
        '&:hover': {
          backgroundColor: theme.vars!.palette.action.hover,
        },
        [`&.${toggleButtonClasses.selected}`]: {
          color: theme.vars!.palette.neutral['ink-30'],
          backgroundColor: theme.vars!.palette.action.selected,
          '&:hover': {
            backgroundColor: theme.vars!.palette.neutral['wash-85'],
          },
        },
      }),
    },
  },
  // The Unify selection-control anatomy (Figma "Unify re-alias" § Selection
  // controls, pulled 2026-08-29), under the F1 law: selection controls never
  // take stamp — checked fill is main (ink-42), the glyph is contrastText
  // (the ratio-symmetry pairing), the unselected border is the 3:1 wax stop
  // (Unify's stroke-secondary register, same job). Geometry: md control 20px
  // (sm 16px), 2px border, checkbox radius 4, radio full-round with a 2px
  // contrastText ring glyph when checked. The 24px row height Unify keeps is
  // preserved by the root margin (hit area stays generous).
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
      icon: <CheckBoxOutlineBlankRoundedIcon style={{ opacity: 0 }} />,
      checkedIcon: <CheckRoundedIcon size={14} strokeWidth={3} />,
      indeterminateIcon: <RemoveRoundedIcon size={14} strokeWidth={3} />,
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const vars = theme.vars!;
        const fam =
          vars.palette[
            !ownerState.color || ownerState.color === 'default' ? 'neutral' : ownerState.color
          ];
        return {
          margin: 8,
          // padding 0 is LOAD-BEARING: MUI's default 9px padding + 2px borders
          // leaves a NEGATIVE content box at 20px, and the flexed glyph svg
          // collapses to width 0 (latent since the template's 16px box — the
          // gallery's live strip caught it, 2026-08-29)
          padding: 0,
          height: 20,
          width: 20,
          borderRadius: 4,
          border: '2px solid ',
          borderColor: vars.palette.neutral['wax-74'],
          backgroundColor: vars.palette.neutral['paper-100'],
          transition: 'border-color, background-color, 120ms ease-in',
          '&:hover': {
            backgroundColor: vars.palette.neutral['wash-92'],
          },
          // indeterminate is its OWN class, not .Mui-checked — Unify fills
          // both identically (white dash on the main fill)
          '&.Mui-checked, &.MuiCheckbox-indeterminate': {
            color: fam.contrastText,
            backgroundColor: fam.main,
            borderColor: fam.main,
            '&:hover': {
              backgroundColor: fam.dark,
              borderColor: fam.dark,
            },
          },
          // the disabled law: colors stay enabled (opacity from the ButtonBase
          // law); neutralizes MUI's swap of the glyph to action.disabled
          '&.Mui-disabled': {
            borderColor: vars.palette.neutral['wax-74'],
            backgroundColor: vars.palette.neutral['paper-100'],
            '&.Mui-checked, &.MuiCheckbox-indeterminate': {
              color: fam.contrastText,
              backgroundColor: fam.main,
              borderColor: fam.main,
            },
          },
          variants: [
            {
              props: { size: 'small' },
              style: { height: 16, width: 16, margin: 10, '& svg': { width: 12, height: 12 } },
            },
          ],
        };
      },
    },
  },
  // Radio — same law, the Unify ring anatomy: unselected = 2px wax circle on
  // the paper ground; checked = a main-filled disc with a 2px contrastText
  // ring glyph (the donut). The stock SVG pair is hidden; the root IS the
  // control (the checkbox pattern).
  MuiRadio: {
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const vars = theme.vars!;
        const fam =
          vars.palette[
            !ownerState.color || ownerState.color === 'default' ? 'neutral' : ownerState.color
          ];
        return {
          margin: 8,
          padding: 0, // same load-bearing zero as the checkbox
          height: 20,
          width: 20,
          borderRadius: 999,
          border: '2px solid ',
          borderColor: vars.palette.neutral['wax-74'],
          backgroundColor: vars.palette.neutral['paper-100'],
          transition: 'border-color, background-color, 120ms ease-in',
          '& svg': { display: 'none' },
          // the glyph is a SOLID contrastText disc (the Unify asset is a white
          // circle r=5 in the 12px inset box — a 10px disc on the 20px main
          // fill; the main reads as a thick outer ring). NOT a ring — the
          // ring-glyph first draft read bullseye-backwards (owner-caught).
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 10,
            height: 10,
            borderRadius: 999,
            backgroundColor: 'transparent',
          },
          '&:hover': {
            backgroundColor: vars.palette.neutral['wash-92'],
          },
          '&.Mui-checked': {
            backgroundColor: fam.main,
            borderColor: fam.main,
            '&::after': { backgroundColor: fam.contrastText },
            '&:hover': {
              backgroundColor: fam.dark,
              borderColor: fam.dark,
            },
          },
          '&.Mui-disabled': {
            borderColor: vars.palette.neutral['wax-74'],
            backgroundColor: vars.palette.neutral['paper-100'],
            '&.Mui-checked': {
              backgroundColor: fam.main,
              borderColor: fam.main,
              '&::after': { backgroundColor: fam.contrastText },
            },
          },
          variants: [
            {
              props: { size: 'small' },
              style: {
                height: 16,
                width: 16,
                margin: 10,
                '&::after': { width: 8, height: 8 },
              },
            },
          ],
        };
      },
    },
  },
  // Switch — the Unify contained pill: the track IS the control and the thumb
  // never overhangs (stock MUI's 58×38 overhang silhouette is the giveaway).
  // md 32×20 / sm 28×16; thumb 16/12 at a 2px inset; 12px travel both sizes.
  // COLORS live in the laws (F1: unchecked track wax-74, checked track main,
  // thumb contrastText) — mergeComponents arrays compose the two layers.
  MuiSwitch: {
    styleOverrides: {
      root: {
        padding: 0,
        // the 8px margin the other controls carry: hit-area parity, and the
        // FormControlLabel gap (MUI spaces labels off the control's padding,
        // which the pill zeroes)
        margin: 8,
        width: 32,
        height: 20,
        display: 'inline-flex',
        '& .MuiSwitch-switchBase': {
          padding: 2,
          '&.Mui-checked': { transform: 'translateX(12px)' },
        },
        '& .MuiSwitch-thumb': { width: 16, height: 16, boxShadow: 'none' },
        '& .MuiSwitch-track': { borderRadius: 999 },
        variants: [
          {
            props: { size: 'small' },
            style: {
              width: 28,
              height: 16,
              '& .MuiSwitch-thumb': { width: 12, height: 12 },
            },
          },
        ],
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        border: 'none',
      },
    },
  },
  // The Unify field chrome (Figma "Unify re-alias" § Inputs, pulled
  // 2026-08-30): radius 8, 12px side padding, md 48 / sm 40 (the kit's xs 32
  // is unmapped — MUI has two sizes), 8px adornment gap. Unify's own state
  // taxonomy is not mirrored (owner: "fit the visual styling into MUI's
  // states") — rest border here, focus/error/disabled borders in the laws.
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: 0,
      },
      root: ({ theme }) => ({
        padding: '0 12px',
        gap: 8,
        color: theme.vars!.palette.text.primary,
        borderRadius: (theme.vars || theme).shape.borderRadius,
        // the border law (owner C1): resting input borders are wax-74
        border: `1px solid ${theme.vars!.palette.neutral['wax-74']}`,
        backgroundColor: theme.vars!.palette.background.default,
        transition: 'border 120ms ease-in',
        variants: [
          { props: { size: 'small' }, style: { height: '2.5rem' } },
          { props: { size: 'medium' }, style: { height: '3rem' } },
        ],
        // textarea: height belongs to the content; Unify pads the box evenly
        '&.MuiInputBase-multiline': {
          height: 'auto',
          padding: '12px',
        },
      }),
      notchedOutline: {
        border: 'none',
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      icon: ({ theme }) => ({
        color: theme.vars!.palette.text.secondary,
        // the disabled law: MUI swaps the disabled chevron to action.disabled
        // (tripwire caught on the Select docs page, 2026-08-30) — color stays,
        // the control's opacity carries it
        '&.Mui-disabled': { color: theme.vars!.palette.text.secondary },
      }),
    },
  },
  // the field notice (Unify's alert row): flush left, 12px medium, 8px off the
  // field. (Unify pairs it with a 16px triangle icon — MUI's helper text has
  // no icon slot; logged as a docs-page convention instead.)
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        marginLeft: 0,
        marginTop: 8,
        fontSize: 12,
        fontWeight: 500,
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.vars!.palette.text.secondary,
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        typography: theme.typography.caption,
        marginBottom: 8,
      }),
    },
  },
};
