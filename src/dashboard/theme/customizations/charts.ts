import type { Theme } from '@mui/material/styles';
import { axisClasses, legendClasses, chartsGridClasses } from '@mui/x-charts';
import type { ChartsComponents } from '@mui/x-charts/themeAugmentation';

/* eslint-disable import/prefer-default-export */
export const chartsCustomizations: ChartsComponents<Theme> = {
  MuiChartsAxis: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${axisClasses.line}`]: {
          stroke: (theme.vars || theme).palette.grey[300],
        },
        [`& .${axisClasses.tick}`]: { stroke: (theme.vars || theme).palette.grey[300] },
        [`& .${axisClasses.tickLabel}`]: {
          fill: (theme.vars || theme).palette.grey[500],
          fontWeight: 500,
        },

      }),
    },
  },
  MuiChartsTooltip: {
    styleOverrides: {
      mark: ({ theme }) => ({
        ry: 6,
        boxShadow: 'none',
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
      }),
      table: ({ theme }) => ({
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        background: (theme.vars || theme).palette.okx.planeHigh,

      }),
    },
  },
  MuiChartsLegend: {
    styleOverrides: {
      root: {
        [`& .${legendClasses.mark}`]: {
          ry: 6,
        },
      },
    },
  },
  MuiChartsGrid: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${chartsGridClasses.line}`]: {
          stroke: (theme.vars || theme).palette.grey[200],
          strokeDasharray: '4 2',
          strokeWidth: 0.8,
        },

      }),
    },
  },
};
