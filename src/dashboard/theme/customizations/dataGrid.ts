// DataGrid — MAP addresses only: grounds are planes, state grounds are the
// highlighter law (action rows), dark blocks gone.
import { paperClasses } from '@mui/material/Paper';
import type { Theme } from '@mui/material/styles';
import type { DataGridComponents } from '@mui/x-data-grid/themeAugmentation';

import { menuItemClasses } from '@mui/material/MenuItem';
import { listItemIconClasses } from '@mui/material/ListItemIcon';
import { iconButtonClasses } from '@mui/material/IconButton';
import { checkboxClasses } from '@mui/material/Checkbox';
import { listClasses } from '@mui/material/List';
import { gridClasses } from '@mui/x-data-grid';
import { tablePaginationClasses } from '@mui/material/TablePagination';

/* eslint-disable import/prefer-default-export */
export const dataGridCustomizations: DataGridComponents<Theme> = {
  MuiDataGrid: {
    styleOverrides: {
      root: ({ theme }) => ({
        '--DataGrid-overlayHeight': '300px',
        overflow: 'clip',
        borderColor: theme.vars!.palette.divider,
        backgroundColor: theme.vars!.palette.background.default,
        [`& .${gridClasses.columnHeader}`]: {
          backgroundColor: theme.vars!.palette.background.paper,
        },
        [`& .${gridClasses.footerContainer}`]: {
          backgroundColor: theme.vars!.palette.background.paper,
        },
        [`& .${checkboxClasses.root}`]: {
          padding: theme.spacing(0.5),
          '& > svg': {
            fontSize: '1rem',
          },
        },
        [`& .${tablePaginationClasses.root}`]: {
          marginRight: theme.spacing(1),
          '& .MuiIconButton-root': {
            maxHeight: 32,
            maxWidth: 32,
            '& > svg': {
              fontSize: '1rem',
            },
          },
        },
      }),
      cell: ({ theme }) => ({
        borderTopColor: theme.vars!.palette.divider,
      }),
      menu: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        backgroundImage: 'none',
        [`& .${paperClasses.root}`]: {
          border: `1px solid ${theme.vars!.palette.divider}`,
        },
        [`& .${menuItemClasses.root}`]: {
          margin: '0 4px',
        },
        [`& .${listItemIconClasses.root}`]: {
          marginRight: 0,
        },
        [`& .${listClasses.root}`]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      }),
      row: ({ theme }) => ({
        '&:last-of-type': {
          borderBottom: `1px solid ${theme.vars!.palette.divider}`,
        },
        '&:hover': {
          backgroundColor: theme.vars!.palette.action.hover,
        },
        '&.Mui-selected': {
          background: theme.vars!.palette.action.selected,
          '&:hover': {
            // selected + hover, per the highlighter law
            backgroundColor: theme.vars!.palette.neutral['highlighter-15'],
          },
        },
      }),
      iconButtonContainer: ({ theme }) => ({
        [`& .${iconButtonClasses.root}`]: {
          border: 'none',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: theme.vars!.palette.action.hover,
          },
          '&:active': {
            backgroundColor: theme.vars!.palette.neutral['highlighter-15'],
          },
        },
      }),
      menuIconButton: ({ theme }) => ({
        border: 'none',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: theme.vars!.palette.action.hover,
        },
        '&:active': {
          backgroundColor: theme.vars!.palette.neutral['highlighter-15'],
        },
      }),
      filterForm: ({ theme }) => ({
        gap: theme.spacing(1),
        alignItems: 'flex-end',
      }),
      columnsManagementHeader: ({ theme }) => ({
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
      }),
      columnHeaderTitleContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
      },
      columnHeaderDraggableContainer: { paddingRight: 2 },
    },
  },
};
