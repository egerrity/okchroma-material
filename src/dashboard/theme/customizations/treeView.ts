// Tree view — MAP addresses only: the wash law for hover/selected states,
// the ring law for focus. Dark block gone.
import type { Theme } from '@mui/material/styles';
import type { TreeViewComponents } from '@mui/x-tree-view/themeAugmentation';
import { FOCUS_RING } from '../../../theme/map';

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
          borderColor: theme.vars!.palette.divider,
        },
        '&:focus-visible .focused': {
          outline: `${FOCUS_RING.width} solid ${theme.vars!.palette.neutral['mark-74']}`,
          outlineOffset: FOCUS_RING.offset,
          '&:hover': {
            backgroundColor: theme.vars!.palette.action.hover,
            outline: `${FOCUS_RING.width} solid ${theme.vars!.palette.neutral['mark-74']}`,
            outlineOffset: FOCUS_RING.offset,
          },
        },
      }),
      content: ({ theme }) => ({
        marginTop: theme.spacing(1),
        padding: theme.spacing(0.5, 1),
        overflow: 'clip',
        '&:hover': {
          backgroundColor: theme.vars!.palette.action.hover,
        },
        '&.selected': {
          backgroundColor: theme.vars!.palette.action.selected,
          '&:hover': {
            // selected + hover, per the wash law
            backgroundColor: theme.vars!.palette.neutral['wash-85'],
          },
        },
      }),
    },
  },
};
