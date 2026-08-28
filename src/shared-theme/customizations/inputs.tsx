import { alpha } from '@mui/material/styles';
import type { Theme, Components } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import { toggleButtonClasses } from '@mui/material/ToggleButton';
import { Square as CheckBoxOutlineBlankRoundedIcon } from 'lucide-react';
import { Check as CheckRoundedIcon } from 'lucide-react';
import { Minus as RemoveRoundedIcon } from 'lucide-react';

/* eslint-disable import/prefer-default-export */
export const inputsCustomizations: Components<Theme> = {
  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        boxSizing: 'border-box',
        transition: 'all 100ms ease-in',
        '&:focus-visible': {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
        },
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none',
        borderRadius: (theme.vars || theme).shape.borderRadius,
        textTransform: 'none',
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2.25rem',
              padding: '8px 12px',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '2.5rem', // 40px
            },
          },
          {
            props: {
              color: 'primary',
              variant: 'contained',
            },
            style: {
              color: 'white',
              backgroundColor: (theme.vars || theme).palette.grey[900],
              backgroundImage: `linear-gradient(to bottom, ${(theme.vars || theme).palette.grey[700]}, ${(theme.vars || theme).palette.grey[800]})`,
              boxShadow: `inset 0 1px 0 ${(theme.vars || theme).palette.grey[600]}, inset 0 -1px 0 1px rgba(0, 0, 0, 1)`,
              border: `1px solid ${(theme.vars || theme).palette.grey[700]}`,
              '&:hover': {
                backgroundImage: 'none',
                backgroundColor: (theme.vars || theme).palette.grey[700],
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: (theme.vars || theme).palette.grey[800],
              },
              ...theme.applyStyles('dark', {
                color: 'black',
                backgroundColor: (theme.vars || theme).palette.grey[50],
                backgroundImage: `linear-gradient(to bottom, ${(theme.vars || theme).palette.grey[100]}, ${(theme.vars || theme).palette.grey[50]})`,
                boxShadow: 'inset 0 -1px 0 ${(theme.vars || theme).palette.grey[300]}',
                border: `1px solid ${(theme.vars || theme).palette.grey[50]}`,
                '&:hover': {
                  backgroundImage: 'none',
                  backgroundColor: (theme.vars || theme).palette.grey[300],
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: (theme.vars || theme).palette.grey[400],
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'contained',
            },
            style: {
              color: 'white',
              backgroundColor: (theme.vars || theme).palette.primary[300],
              backgroundImage: `linear-gradient(to bottom, color-mix(in srgb, ${(theme.vars || theme).palette.primary[400]} 80%, transparent), ${(theme.vars || theme).palette.primary[500]})`,
              boxShadow: `inset 0 2px 0 color-mix(in srgb, ${(theme.vars || theme).palette.primary[200]} 20%, transparent), inset 0 -2px 0 color-mix(in srgb, ${(theme.vars || theme).palette.primary[700]} 40%, transparent)`,
              border: `1px solid ${(theme.vars || theme).palette.primary[500]}`,
              '&:hover': {
                backgroundColor: (theme.vars || theme).palette.primary[700],
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: (theme.vars || theme).palette.primary[700],
                backgroundImage: 'none',
              },
            },
          },
          {
            props: {
              variant: 'outlined',
            },
            style: {
              color: (theme.vars || theme).palette.text.primary,
              border: '1px solid',
              borderColor: (theme.vars || theme).palette.grey[200],
              backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.grey[50]} 30%, transparent)`,
              '&:hover': {
                backgroundColor: (theme.vars || theme).palette.grey[100],
                borderColor: (theme.vars || theme).palette.grey[300],
              },
              '&:active': {
                backgroundColor: (theme.vars || theme).palette.grey[200],
              },
              ...theme.applyStyles('dark', {
                backgroundColor: (theme.vars || theme).palette.grey[800],
                borderColor: (theme.vars || theme).palette.grey[700],

                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.grey[900],
                  borderColor: (theme.vars || theme).palette.grey[600],
                },
                '&:active': {
                  backgroundColor: (theme.vars || theme).palette.grey[900],
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'outlined',
            },
            style: {
              color: (theme.vars || theme).palette.primary[700],
              border: '1px solid',
              borderColor: (theme.vars || theme).palette.primary[200],
              backgroundColor: (theme.vars || theme).palette.primary[50],
              '&:hover': {
                backgroundColor: (theme.vars || theme).palette.primary[100],
                borderColor: (theme.vars || theme).palette.primary[400],
              },
              '&:active': {
                backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.primary[200]} 70%, transparent)`,
              },
              ...theme.applyStyles('dark', {
                color: (theme.vars || theme).palette.primary[50],
                border: '1px solid',
                borderColor: (theme.vars || theme).palette.primary[900],
                backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.primary[900]} 30%, transparent)`,
                '&:hover': {
                  borderColor: (theme.vars || theme).palette.primary[700],
                  backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.primary[900]} 60%, transparent)`,
                },
                '&:active': {
                  backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.primary[900]} 50%, transparent)`,
                },
              }),
            },
          },
          {
            props: {
              variant: 'text',
            },
            style: {
              color: (theme.vars || theme).palette.grey[600],
              '&:hover': {
                backgroundColor: (theme.vars || theme).palette.grey[100],
              },
              '&:active': {
                backgroundColor: (theme.vars || theme).palette.grey[200],
              },
              ...theme.applyStyles('dark', {
                color: (theme.vars || theme).palette.grey[50],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.grey[700],
                },
                '&:active': {
                  backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.grey[700]} 70%, transparent)`,
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'text',
            },
            style: {
              color: (theme.vars || theme).palette.primary[700],
              '&:hover': {
                backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.primary[100]} 50%, transparent)`,
              },
              '&:active': {
                backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.primary[200]} 70%, transparent)`,
              },
              ...theme.applyStyles('dark', {
                color: (theme.vars || theme).palette.primary[100],
                '&:hover': {
                  backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.primary[900]} 50%, transparent)`,
                },
                '&:active': {
                  backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.primary[900]} 30%, transparent)`,
                },
              }),
            },
          },
        ],
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none',
        borderRadius: (theme.vars || theme).shape.borderRadius,
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightMedium,
        letterSpacing: 0,
        color: (theme.vars || theme).palette.text.primary,
        border: '1px solid ',
        borderColor: (theme.vars || theme).palette.grey[200],
        backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.grey[50]} 30%, transparent)`,
        '&:hover': {
          backgroundColor: (theme.vars || theme).palette.grey[100],
          borderColor: (theme.vars || theme).palette.grey[300],
        },
        '&:active': {
          backgroundColor: (theme.vars || theme).palette.grey[200],
        },
        ...theme.applyStyles('dark', {
          backgroundColor: (theme.vars || theme).palette.grey[800],
          borderColor: (theme.vars || theme).palette.grey[700],
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.grey[900],
            borderColor: (theme.vars || theme).palette.grey[600],
          },
          '&:active': {
            backgroundColor: (theme.vars || theme).palette.grey[900],
          },
        }),
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              width: '2.25rem',
              height: '2.25rem',
              padding: '0.25rem',
              [`& .${svgIconClasses.root}`]: { fontSize: '1rem' },
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              width: '2.5rem',
              height: '2.5rem',
            },
          },
        ],
      }),
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: '10px',
        boxShadow: `0 4px 16px color-mix(in srgb, ${(theme.vars || theme).palette.grey[400]} 20%, transparent)`,
        [`& .${toggleButtonGroupClasses.selected}`]: {
          color: (theme.vars || theme).palette.primary[500],
        },
        ...theme.applyStyles('dark', {
          [`& .${toggleButtonGroupClasses.selected}`]: {
            color: '#fff',
          },
          boxShadow: `0 4px 16px color-mix(in srgb, ${(theme.vars || theme).palette.primary[700]} 50%, transparent)`,
        }),
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: '12px 16px',
        textTransform: 'none',
        borderRadius: '10px',
        fontWeight: 500,
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.grey[400],
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
          [`&.${toggleButtonClasses.selected}`]: {
            color: (theme.vars || theme).palette.primary[300],
          },
        }),
      }),
    },
  },
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
      icon: (
        <CheckBoxOutlineBlankRoundedIcon style={{ opacity: 0 }} />
      ),
      checkedIcon: <CheckRoundedIcon size={14} />,
      indeterminateIcon: <RemoveRoundedIcon size={14} />,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        margin: 10,
        height: 16,
        width: 16,
        borderRadius: 5,
        border: '1px solid ',
        borderColor: `color-mix(in srgb, ${(theme.vars || theme).palette.grey[300]} 80%, transparent)`,
        boxShadow: '0 0 0 1.5px rgba(0, 0, 0, 0.04) inset',
        backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.grey[100]} 40%, transparent)`,
        transition: 'border-color, background-color, 120ms ease-in',
        '&:hover': {
          borderColor: (theme.vars || theme).palette.primary[300],
        },
        '&.Mui-focusVisible': {
          outline: `3px solid color-mix(in srgb, ${(theme.vars || theme).palette.primary[500]} 50%, transparent)`,
          outlineOffset: '2px',
          borderColor: (theme.vars || theme).palette.primary[400],
        },
        '&.Mui-checked': {
          color: 'white',
          backgroundColor: (theme.vars || theme).palette.primary[500],
          borderColor: (theme.vars || theme).palette.primary[500],
          boxShadow: `none`,
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.primary[600],
          },
        },
        ...theme.applyStyles('dark', {
          borderColor: `color-mix(in srgb, ${(theme.vars || theme).palette.grey[700]} 80%, transparent)`,
          boxShadow: '0 0 0 1.5px rgba(0, 0, 0, 1) inset',
          backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.grey[900]} 80%, transparent)`,
          '&:hover': {
            borderColor: (theme.vars || theme).palette.primary[300],
          },
          '&.Mui-focusVisible': {
            borderColor: (theme.vars || theme).palette.primary[400],
            outline: `3px solid color-mix(in srgb, ${(theme.vars || theme).palette.primary[500]} 50%, transparent)`,
            outlineOffset: '2px',
          },
        }),
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        border: 'none',
      },
      input: ({ theme }) => ({
        '&::placeholder': {
          opacity: 0.7,
          color: (theme.vars || theme).palette.grey[500],
        },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: 0,
      },
      root: ({ theme }) => ({
        padding: '8px 12px',
        color: (theme.vars || theme).palette.text.primary,
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        backgroundColor: (theme.vars || theme).palette.background.default,
        transition: 'border 120ms ease-in',
        '&:hover': {
          borderColor: (theme.vars || theme).palette.grey[400],
        },
        [`&.${outlinedInputClasses.focused}`]: {
          outline: `3px solid color-mix(in srgb, ${(theme.vars || theme).palette.primary[500]} 50%, transparent)`,
          borderColor: (theme.vars || theme).palette.primary[400],
        },
        ...theme.applyStyles('dark', {
          '&:hover': {
            borderColor: (theme.vars || theme).palette.grey[500],
          },
        }),
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2.25rem',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '2.5rem',
            },
          },
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
        color: (theme.vars || theme).palette.grey[500],
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.grey[400],
        }),
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
