// Navigation — template structure; every color a MAP address; dark blocks
// gone (single reference, the engine reverses). The template's MuiLink
// treatment is deleted outright: links ride the engine's emitted link trio
// (owner D1, src/theme/laws.tsx).
import * as React from 'react';
import type { Theme, Components } from '@mui/material/styles';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { dividerClasses } from '@mui/material/Divider';
import { menuItemClasses } from '@mui/material/MenuItem';
import { selectClasses } from '@mui/material/Select';
import { tabClasses } from '@mui/material/Tab';
import { ChevronsUpDown as UnfoldMoreRoundedIcon } from 'lucide-react';
import { FOCUS_RING } from '../../theme/map';

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
          backgroundColor: theme.vars!.palette.action.selected,
          [`&.${menuItemClasses.focusVisible}`]: {
            backgroundColor: theme.vars!.palette.action.selected,
          },
          '&:hover': {
            backgroundColor: theme.vars!.palette.neutral['highlighter-15'],
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
        border: `1px solid ${theme.vars!.palette.divider}`,
        backgroundImage: 'none',
        // menus inherit background.paper (surface-high) — no own background
        boxShadow: 'var(--template-palette-baseShadow)',
        [`& .${buttonBaseClasses.root}`]: {
          '&.Mui-selected': {
            backgroundColor: theme.vars!.palette.action.selected,
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
        // the border law (owner C1): input borders are crayon-26, all states
        borderColor: theme.vars!.palette.neutral['crayon-26'],
        backgroundColor: theme.vars!.palette.background.paper,
        '&:hover': {
          backgroundColor: theme.vars!.palette.background.paper,
        },
        [`&.${selectClasses.focused}`]: {
          outline: `${FOCUS_RING.width} solid ${theme.vars!.palette.neutral['crayon-26']}`,
          outlineOffset: FOCUS_RING.offset,
        },
        '&:before, &:after': {
          display: 'none',
        },
      }),
      select: {
        display: 'flex',
        alignItems: 'center',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: theme.vars!.palette.background.default,
      }),
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        // selected = the neutral register's emphasis fill; pen-58/paper-0
        // self-reverse, so one reference serves both modes
        '&.Mui-selected': {
          color: theme.vars!.palette.neutral.contrastText,
          backgroundColor: theme.vars!.palette.neutral.main,
        },
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: { minHeight: 'fit-content' },
      indicator: ({ theme }) => ({
        backgroundColor: theme.vars!.palette.neutral['pen-70'],
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
        color: theme.vars!.palette.text.secondary,
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: '1px solid',
        borderColor: 'transparent',
        ':hover': {
          color: theme.vars!.palette.text.primary,
          backgroundColor: theme.vars!.palette.neutral['highlighter-8'],
          borderColor: theme.vars!.palette.neutral['highlighter-20'],
        },
        [`&.${tabClasses.selected}`]: {
          color: theme.vars!.palette.neutral['pen-100'],
        },
      }),
    },
  },
  MuiStepConnector: {
    styleOverrides: {
      line: ({ theme }) => ({
        borderTop: '1px solid',
        borderColor: theme.vars!.palette.StepConnector.border,
        flex: 1,
        borderRadius: '99px',
      }),
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: 'transparent',
        border: `1px solid ${theme.vars!.palette.neutral['highlighter-20']}`,
        width: 12,
        height: 12,
        borderRadius: '50%',
        '& text': {
          display: 'none',
        },
        '&.Mui-active': {
          border: 'none',
          color: theme.vars!.palette.primary.main,
        },
        '&.Mui-completed': {
          border: 'none',
          color: theme.vars!.palette.success.main,
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
        // the quiet register, not an opacity dim
        '&.Mui-completed': {
          color: theme.vars!.palette.text.secondary,
        },
      }),
    },
  },
};
