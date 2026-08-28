import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { PickerComponents } from '@mui/x-date-pickers/themeAugmentation';
import { menuItemClasses } from '@mui/material/MenuItem';
import { pickerDayClasses, yearCalendarClasses } from '@mui/x-date-pickers';
import { gray, brand } from '../../../shared-theme/themePrimitives';

/* eslint-disable import/prefer-default-export */
export const datePickersCustomizations: PickerComponents<Theme> = {
  MuiPickerPopper: {
    styleOverrides: {
      paper: ({ theme }) => ({
        marginTop: 4,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        backgroundImage: 'none',
        background: 'hsl(0, 0%, 100%)',
        boxShadow:
          'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        [`& .${menuItemClasses.root}`]: {
          borderRadius: 6,
          margin: '0 6px',
        },
        ...theme.applyStyles('dark', {
          background: gray[900],
          boxShadow:
            'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
        }),
      }),
    },
  },
  MuiPickersArrowSwitcher: {
    styleOverrides: {
      spacer: { width: 16 },
      button: ({ theme }) => ({
        backgroundColor: 'transparent',
        color: (theme.vars || theme).palette.grey[500],
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.grey[400],
        }),
      }),
    },
  },
  MuiPickersCalendarHeader: {
    styleOverrides: {
      switchViewButton: {
        padding: 0,
        border: 'none',
      },
    },
  },
  MuiMonthCalendar: {
    styleOverrides: {
      button: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: (theme.vars || theme).palette.grey[600],
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
        [`&.${yearCalendarClasses.selected}`]: {
          backgroundColor: (theme.vars || theme).palette.primary.main,
          color: (theme.vars || theme).palette.primary.contrastText,
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          outline: `2px solid ${(theme.vars || theme).palette.okx.focus}`,
          outlineOffset: '2px',
          backgroundColor: 'transparent',
          [`&.${yearCalendarClasses.selected}`]: { backgroundColor: (theme.vars || theme).palette.primary.main, color: (theme.vars || theme).palette.primary.contrastText },
        },
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.grey[300],
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },

          '&:focus': {
            outline: `2px solid ${(theme.vars || theme).palette.okx.focus}`,
            outlineOffset: '2px',
            backgroundColor: 'transparent',
            [`&.${yearCalendarClasses.selected}`]: { backgroundColor: (theme.vars || theme).palette.primary.main, color: (theme.vars || theme).palette.primary.contrastText },
          },
        }),
      }),
    },
  },
  MuiYearCalendar: {
    styleOverrides: {
      button: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: (theme.vars || theme).palette.grey[600],
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        height: 'fit-content',
        '&:hover': {
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
        [`&.${yearCalendarClasses.selected}`]: {
          backgroundColor: (theme.vars || theme).palette.primary.main,
          color: (theme.vars || theme).palette.primary.contrastText,
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          outline: `2px solid ${(theme.vars || theme).palette.okx.focus}`,
          outlineOffset: '2px',
          backgroundColor: 'transparent',
          [`&.${yearCalendarClasses.selected}`]: { backgroundColor: (theme.vars || theme).palette.primary.main, color: (theme.vars || theme).palette.primary.contrastText },
        },
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.grey[300],
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },

          '&:focus': {
            outline: `2px solid ${(theme.vars || theme).palette.okx.focus}`,
            outlineOffset: '2px',
            backgroundColor: 'transparent',
            [`&.${yearCalendarClasses.selected}`]: { backgroundColor: (theme.vars || theme).palette.primary.main, color: (theme.vars || theme).palette.primary.contrastText },
          },
        }),
      }),
    },
  },
  MuiPickerDay: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: (theme.vars || theme).palette.grey[600],
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
        [`&.${pickerDayClasses.selected}`]: {
          backgroundColor: (theme.vars || theme).palette.primary.main,
          color: (theme.vars || theme).palette.primary.contrastText,
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          outline: `2px solid ${(theme.vars || theme).palette.okx.focus}`,
          outlineOffset: '2px',
          backgroundColor: 'transparent',
          [`&.${pickerDayClasses.selected}`]: { backgroundColor: (theme.vars || theme).palette.primary.main, color: (theme.vars || theme).palette.primary.contrastText },
        },
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.grey[300],
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },

          '&:focus': {
            outline: `2px solid ${(theme.vars || theme).palette.okx.focus}`,
            outlineOffset: '2px',
            backgroundColor: 'transparent',
            [`&.${pickerDayClasses.selected}`]: { backgroundColor: (theme.vars || theme).palette.primary.main, color: (theme.vars || theme).palette.primary.contrastText },
          },
        }),
      }),
    },
  },
};
