import * as React from 'react';
import { alpha } from '@mui/material/styles';
import type { Theme, Components } from '@mui/material/styles';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { dividerClasses } from '@mui/material/Divider';
import { menuItemClasses } from '@mui/material/MenuItem';
import { selectClasses } from '@mui/material/Select';
import { tabClasses } from '@mui/material/Tab';
import { ChevronsUpDown as UnfoldMoreRoundedIcon } from 'lucide-react';

/* eslint-disable import/prefer-default-export */
export const navigationCustomizations: Components<Theme> = {
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: (theme.vars || theme).shape.borderRadius,
        padding: '6px 8px',
        [`&.${menuItemClasses.focusVisible}`]: {
          backgroundColor: 'transparent',
        },
        [`&.${menuItemClasses.selected}`]: {
          [`&.${menuItemClasses.focusVisible}`]: {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
        },
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: {
        gap: '0px',
        [`&.${dividerClasses.root}`]: {
          margin: '0 -8px',
        },
      },
      paper: ({ theme }) => ({
        marginTop: '4px',
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        backgroundImage: 'none',
        background: (theme.vars || theme).palette.okx.planeHigh,
        boxShadow:
          (theme.vars || theme).palette.okx.shadowPop,
        [`& .${buttonBaseClasses.root}`]: {
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
        },

      }),
    },
  },
  MuiSelect: {
    defaultProps: {
      IconComponent: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
        <UnfoldMoreRoundedIcon size={16} {...props} ref={ref} />
      )),
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: '1px solid',
        borderColor: (theme.vars || theme).palette.grey[200],
        backgroundColor: (theme.vars || theme).palette.background.paper,
        boxShadow: `inset 0 1px 0 1px rgba(255, 255, 255, 0.6), inset 0 -1px 0 1px color-mix(in srgb, ${(theme.vars || theme).palette.grey[200]} 50%, transparent)`,
        '&:hover': {
          borderColor: (theme.vars || theme).palette.grey[300],
          backgroundColor: (theme.vars || theme).palette.background.paper,
          boxShadow: 'none',
        },
        [`&.${selectClasses.focused}`]: {
          outlineOffset: 0,
          borderColor: (theme.vars || theme).palette.grey[400],
        },
        '&:before, &:after': {
          display: 'none',
        },


      }),
      select: ({ theme }) => ({
        display: 'flex',
        alignItems: 'center',

      }),
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        color: (theme.vars || theme).palette.text.primary,
        fontWeight: 500,
        position: 'relative',
        textDecoration: 'none',
        width: 'fit-content',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '1px',
          bottom: 0,
          left: 0,
          backgroundColor: (theme.vars || theme).palette.text.secondary,
          opacity: 0.3,
          transition: 'width 0.3s ease, opacity 0.3s ease',
        },
        '&:hover::before': {
          width: 0,
        },
        '&:focus-visible': {
          outline: `3px solid color-mix(in srgb, ${(theme.vars || theme).palette.primary[500]} 50%, transparent)`,
          outlineOffset: '4px',
          borderRadius: '2px',
        },
      }),
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: (theme.vars || theme).palette.background.default,
      }),
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-selected': {
          color: 'white',
          backgroundColor: (theme.vars || theme).palette.grey[900],
        },

      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: { minHeight: 'fit-content' },
      indicator: ({ theme }) => ({
        backgroundColor: (theme.vars || theme).palette.grey[800],

      }),
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: '6px 8px',
        marginBottom: '8px',
        textTransform: 'none',
        minWidth: 'fit-content',
        minHeight: 'fit-content',
        color: (theme.vars || theme).palette.text.secondary,
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: '1px solid',
        borderColor: 'transparent',
        ':hover': {
          color: (theme.vars || theme).palette.text.primary,
          backgroundColor: (theme.vars || theme).palette.grey[100],
          borderColor: (theme.vars || theme).palette.grey[200],
        },
        [`&.${tabClasses.selected}`]: {
          color: (theme.vars || theme).palette.grey[900],
        },

      }),
    },
  },
  MuiStepConnector: {
    styleOverrides: {
      line: ({ theme }) => ({
        borderTop: '1px solid',
        borderColor: (theme.vars || theme).palette.divider,
        flex: 1,
        borderRadius: '99px',
      }),
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: 'transparent',
        border: `1px solid ${(theme.vars || theme).palette.grey[400]}`,
        width: 12,
        height: 12,
        borderRadius: '50%',
        '& text': {
          display: 'none',
        },
        '&.Mui-active': {
          border: 'none',
          color: (theme.vars || theme).palette.primary.main,
        },
        '&.Mui-completed': {
          border: 'none',
          color: (theme.vars || theme).palette.success.main,
        },

        variants: [
          {
            props: { completed: true },
            style: {
              width: 12,
              height: 12,
            },
          },
        ],
      }),
    },
  },
  MuiStepLabel: {
    styleOverrides: {
      label: ({ theme }) => ({
        '&.Mui-completed': {
          opacity: 0.6,

        },
      }),
    },
  },
};
