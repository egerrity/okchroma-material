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
  // The template's custom checkbox visual, under the F1 law: selection
  // controls never take stamp — checked fill is main (ink-42), the glyph is
  // contrastText (the ratio-symmetry pairing), box border is the 3:1 mark.
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
      icon: <CheckBoxOutlineBlankRoundedIcon style={{ opacity: 0 }} />,
      checkedIcon: <CheckRoundedIcon size={14} />,
      indeterminateIcon: <RemoveRoundedIcon size={14} />,
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const vars = theme.vars!;
        const fam =
          vars.palette[
            !ownerState.color || ownerState.color === 'default' ? 'neutral' : ownerState.color
          ];
        return {
          margin: 10,
          height: 16,
          width: 16,
          borderRadius: 5,
          border: '1px solid ',
          borderColor: vars.palette.neutral['mark-74'],
          transition: 'border-color, background-color, 120ms ease-in',
          '&:hover': {
            backgroundColor: vars.palette.neutral['wash-92'],
          },
          '&.Mui-checked': {
            color: fam.contrastText,
            backgroundColor: fam.main,
            borderColor: fam.main,
            '&:hover': {
              backgroundColor: fam.dark,
            },
          },
        };
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
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: 0,
      },
      root: ({ theme }) => ({
        padding: '8px 12px',
        color: theme.vars!.palette.text.primary,
        borderRadius: (theme.vars || theme).shape.borderRadius,
        // the border law (owner C1): input borders are mark-74, all states
        border: `1px solid ${theme.vars!.palette.neutral['mark-74']}`,
        backgroundColor: theme.vars!.palette.background.default,
        transition: 'border 120ms ease-in',
        variants: [
          { props: { size: 'small' }, style: { height: '2.25rem' } },
          { props: { size: 'medium' }, style: { height: '2.5rem' } },
        ],
      }),
      notchedOutline: {
        border: 'none',
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
