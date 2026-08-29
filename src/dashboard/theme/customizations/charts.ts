// Charts chrome — MAP addresses only, dark blocks gone. Data viz doctrine
// (brand never in a chart; series ride the info tiers, the neutral ladder,
// and the signal families) lives where the series are declared, in the chart
// components. This file is only the chrome: axes, grid, tooltip, legend.
import type { Theme } from '@mui/material/styles';
import { axisClasses, legendClasses, chartsGridClasses } from '@mui/x-charts';
import type { ChartsComponents } from '@mui/x-charts/themeAugmentation';

/* eslint-disable import/prefer-default-export */
export const chartsCustomizations: ChartsComponents<Theme> = {
  MuiChartsAxis: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${axisClasses.line}`]: {
          stroke: theme.vars!.palette.neutral['wash-89'],
        },
        [`& .${axisClasses.tick}`]: { stroke: theme.vars!.palette.neutral['wash-89'] },
        [`& .${axisClasses.tickLabel}`]: {
          fill: theme.vars!.palette.text.secondary,
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
        border: `1px solid ${theme.vars!.palette.divider}`,
      }),
      table: ({ theme }) => ({
        border: `1px solid ${theme.vars!.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        // the topmost plane — tooltips float above everything
        background: theme.vars!.palette.surface.high,
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
          stroke: theme.vars!.palette.neutral['wash-92'],
          strokeDasharray: '4 2',
          strokeWidth: 0.8,
        },
      }),
    },
  },
};
