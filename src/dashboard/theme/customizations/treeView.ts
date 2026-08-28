import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { TreeViewComponents } from '@mui/x-tree-view/themeAugmentation';

/* eslint-disable import/prefer-default-export */
export const treeViewCustomizations: TreeViewComponents<Theme> = {
  MuiTreeItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        position: 'relative',
        boxSizing: 'border-box',
        padding: theme.spacing(0, 1),
        '& .groupTransition': {
          marginLeft: theme.spacing(2),
          padding: theme.spacing(0),
          borderLeft: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
        },
        '&:focus-visible .focused': {
          outline: `3px solid color-mix(in srgb, ${(theme.vars || theme).palette.primary[500]} 50%, transparent)`,
          outlineOffset: '2px',
          '&:hover': {
            backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.grey[300]} 20%, transparent)`,
            outline: `3px solid color-mix(in srgb, ${(theme.vars || theme).palette.primary[500]} 50%, transparent)`,
            outlineOffset: '2px',
          },
        },
      }),
      content: ({ theme }) => ({
        marginTop: theme.spacing(1),
        padding: theme.spacing(0.5, 1),
        overflow: 'clip',
        '&:hover': {
          backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.grey[300]} 20%, transparent)`,
        },

        '&.selected': {
          backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.grey[300]} 40%, transparent)`,
          '&:hover': {
            backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.grey[300]} 60%, transparent)`,
          },
        },
        ...theme.applyStyles('dark', {
          '&:hover': {
            backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.grey[500]} 20%, transparent)`,
          },
          '&:focus-visible': {
            '&:hover': {
              backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.grey[500]} 20%, transparent)`,
            },
          },
          '&.selected': {
            backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.grey[500]} 40%, transparent)`,
            '&:hover': {
              backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.grey[500]} 60%, transparent)`,
            },
          },
        }),
      }),
    },
  },
};
