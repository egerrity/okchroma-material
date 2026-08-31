// Date pickers — MAP addresses only: text registers for calendar cells, the
// wash law for states, the ring law for focus. Selected cells are BUTTONS →
// the secondary stamp trio (owner, 2026-08-29). Dark blocks gone.
import type { Theme } from '@mui/material/styles';
import type { PickerComponents } from '@mui/x-date-pickers/themeAugmentation';
import { menuItemClasses } from '@mui/material/MenuItem';
import { pickerDayClasses, yearCalendarClasses } from '@mui/x-date-pickers';
import { FOCUS_RING } from '../../../theme/map';

/* eslint-disable import/prefer-default-export */
export const datePickersCustomizations: PickerComponents<Theme> = {
  MuiPickerPopper: {
    styleOverrides: {
      paper: ({ theme }) => ({
        marginTop: 4,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.vars!.palette.divider}`,
        backgroundImage: 'none',
        background: theme.vars!.palette.surface.high,
        boxShadow: 'var(--template-palette-baseShadow)',
        [`& .${menuItemClasses.root}`]: {
          borderRadius: 6,
          margin: '0 6px',
        },
      }),
    },
  },
  MuiPickersArrowSwitcher: {
    styleOverrides: {
      spacer: { width: 16 },
      button: ({ theme }) => ({
        backgroundColor: 'transparent',
        color: theme.vars!.palette.text.secondary,
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
        color: theme.vars!.palette.text.secondary,
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
          backgroundColor: theme.vars!.palette.action.hover,
        },
        // selected date cells are BUTTONS → a secondary (brand-alt) stamp
        // consumer (owner, 2026-08-29): the fill/on/edge trio, edge always
        // rendered so layout never shifts, hover riding the stamp states.
        [`&.${yearCalendarClasses.selected}`]: {
          color: theme.vars!.palette.secondary.stampOn,
          backgroundColor: theme.vars!.palette.secondary.stampFill,
          border: `1.5px solid ${theme.vars!.palette.secondary.stampEdge}`,
          fontWeight: theme.typography.fontWeightMedium,
          '&:hover': {
            backgroundColor: theme.vars!.palette.secondary.stampFillHover,
          },
        },
        '&:focus': {
          outline: `${FOCUS_RING.width} solid ${theme.vars!.palette.neutral['wax-74']}`,
          outlineOffset: FOCUS_RING.offset,
          backgroundColor: 'transparent',
          [`&.${yearCalendarClasses.selected}`]: {
            backgroundColor: theme.vars!.palette.secondary.stampFill,
          },
        },
      }),
    },
  },
  MuiYearCalendar: {
    styleOverrides: {
      button: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: theme.vars!.palette.text.secondary,
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        height: 'fit-content',
        '&:hover': {
          backgroundColor: theme.vars!.palette.action.hover,
        },
        // selected date cells are BUTTONS → a secondary (brand-alt) stamp
        // consumer (owner, 2026-08-29): the fill/on/edge trio, edge always
        // rendered so layout never shifts, hover riding the stamp states.
        [`&.${yearCalendarClasses.selected}`]: {
          color: theme.vars!.palette.secondary.stampOn,
          backgroundColor: theme.vars!.palette.secondary.stampFill,
          border: `1.5px solid ${theme.vars!.palette.secondary.stampEdge}`,
          fontWeight: theme.typography.fontWeightMedium,
          '&:hover': {
            backgroundColor: theme.vars!.palette.secondary.stampFillHover,
          },
        },
        '&:focus': {
          outline: `${FOCUS_RING.width} solid ${theme.vars!.palette.neutral['wax-74']}`,
          outlineOffset: FOCUS_RING.offset,
          backgroundColor: 'transparent',
          [`&.${yearCalendarClasses.selected}`]: {
            backgroundColor: theme.vars!.palette.secondary.stampFill,
          },
        },
      }),
    },
  },
  MuiPickerDay: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: theme.vars!.palette.text.secondary,
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
          backgroundColor: theme.vars!.palette.action.hover,
        },
        // selected date cells are BUTTONS → a secondary (brand-alt) stamp
        // consumer (owner, 2026-08-29): the fill/on/edge trio, edge always
        // rendered so layout never shifts, hover riding the stamp states.
        [`&.${pickerDayClasses.selected}`]: {
          color: theme.vars!.palette.secondary.stampOn,
          backgroundColor: theme.vars!.palette.secondary.stampFill,
          border: `1.5px solid ${theme.vars!.palette.secondary.stampEdge}`,
          fontWeight: theme.typography.fontWeightMedium,
          '&:hover': {
            backgroundColor: theme.vars!.palette.secondary.stampFillHover,
          },
        },
        '&:focus': {
          outline: `${FOCUS_RING.width} solid ${theme.vars!.palette.neutral['wax-74']}`,
          outlineOffset: FOCUS_RING.offset,
          backgroundColor: 'transparent',
          [`&.${pickerDayClasses.selected}`]: {
            backgroundColor: theme.vars!.palette.secondary.stampFill,
          },
        },
      }),
    },
  },
};
