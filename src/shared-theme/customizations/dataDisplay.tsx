// Data display — template structure; every color a MAP address. Chip color
// doctrine (ink register on family wash ground, never stamp) lives in
// src/theme/laws.tsx; this file adds the template's structure (pill radius,
// sizes, the quiet border) with the same family construction.
import type { Theme, Components } from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { typographyClasses } from '@mui/material/Typography';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { chipClasses } from '@mui/material/Chip';
import { iconButtonClasses } from '@mui/material/IconButton';

/* eslint-disable import/prefer-default-export */
export const dataDisplayCustomizations: Components<Theme> = {
  MuiList: {
    styleOverrides: {
      root: {
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${svgIconClasses.root}`]: {
          width: '1rem',
          height: '1rem',
          color: theme.vars!.palette.text.secondary,
        },
        [`& .${typographyClasses.root}`]: {
          fontWeight: 500,
        },
        [`& .${buttonBaseClasses.root}`]: {
          display: 'flex',
          gap: 8,
          padding: '2px 8px',
          borderRadius: (theme.vars || theme).shape.borderRadius,
          // the standard system rows — no bespoke nav lane. The TEXT hovers
          // with the ground: quiet register at rest, rising on hover/selected.
          color: theme.vars!.palette.text.secondary,
          '&:hover': {
            color: theme.vars!.palette.text.primary,
            backgroundColor: theme.vars!.palette.action.hover,
            [`& .${svgIconClasses.root}`]: {
              color: theme.vars!.palette.text.primary,
            },
          },
          '&.Mui-selected': {
            color: theme.vars!.palette.text.primary,
            backgroundColor: theme.vars!.palette.action.selected,
            [`& .${svgIconClasses.root}`]: {
              color: theme.vars!.palette.text.primary,
            },
            '&:focus-visible': {
              backgroundColor: theme.vars!.palette.action.selected,
            },
            '&:hover': {
              backgroundColor: theme.vars!.palette.neutral['wash-85'],
            },
          },
          '&:focus-visible': {
            backgroundColor: 'transparent',
          },
        },
      }),
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: ({ theme }) => ({
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.body2.lineHeight,
      }),
      secondary: ({ theme }) => ({
        fontSize: theme.typography.caption.fontSize,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: 'transparent',
        padding: '4px 8px',
        fontSize: theme.typography.caption.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 0,
      },
    },
  },
  MuiChip: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const vars = theme.vars!;
        const fam =
          vars.palette[
            !ownerState.color || ownerState.color === 'default' ? 'neutral' : ownerState.color
          ];
        return {
          border: '1px solid',
          // Unify: buttons are round, LABELS are soft — chips are labels (6px)
          borderRadius: 6,
          borderColor: fam['wash-80'],
          [`& .${chipClasses.label}`]: {
            fontWeight: 600,
          },
          variants: [
            {
              props: { size: 'small' },
              style: {
                maxHeight: 20,
                [`& .${chipClasses.label}`]: {
                  fontSize: theme.typography.caption.fontSize,
                },
                [`& .${svgIconClasses.root}`]: {
                  fontSize: theme.typography.caption.fontSize,
                },
              },
            },
            {
              props: { size: 'medium' },
              style: {
                [`& .${chipClasses.label}`]: {
                  fontSize: theme.typography.caption.fontSize,
                },
              },
            },
          ],
        };
      },
    },
  },
  MuiTablePagination: {
    styleOverrides: {
      actions: {
        display: 'flex',
        gap: 8,
        marginRight: 6,
        [`& .${iconButtonClasses.root}`]: {
          minWidth: 0,
          width: 36,
          height: 36,
        },
      },
    },
  },
  MuiIcon: {
    defaultProps: {
      fontSize: 'small',
    },
    styleOverrides: {
      root: {
        variants: [
          {
            props: {
              fontSize: 'small',
            },
            style: {
              fontSize: '1rem',
            },
          },
        ],
      },
    },
  },
};
