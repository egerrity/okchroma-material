// Feedback — template structure only. Alert severity colors come from the
// map's palette.Alert.* rows (standard = family highlighter ground + pen text, icon
// on the crayon band; filled = the stamp register — a sanctioned use). The
// template's all-alerts-are-orange treatment is gone: severity is the family.
import type { Theme, Components } from '@mui/material/styles';

/* eslint-disable import/prefer-default-export */
export const feedbackCustomizations: Components<Theme> = {
  MuiAlert: {
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const vars = theme.vars!;
        const fam = vars.palette[ownerState.color ?? ownerState.severity ?? 'success'];
        return {
          borderRadius: 10,
          border: `1px solid ${fam['highlighter-20']}`,
        };
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          border: '1px solid',
          borderColor: theme.vars!.palette.divider,
        },
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      // the track color is the map's palette.LinearProgress.<color>Bg row
      // (family highlighter-15) — MUI reads it itself under cssVariables
      root: {
        height: 8,
        borderRadius: 8,
      },
    },
  },
};
