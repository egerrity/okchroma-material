import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './dashboard/Dashboard';
import DocsSite from './docs/DocsSite';
import AppTheme from './shared-theme/AppTheme';
import GlobalNav from './shell/GlobalNav';
import { SeedProvider } from './theme/SeedContext';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './dashboard/theme/customizations';

// The MUI X overrides ride the one theme, so the docs pages render X
// components (the date picker page) under the same rules as the dashboard.
const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function App() {
  const [route, setRoute] = useState(window.location.hash);
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <SeedProvider>
      <AppTheme themeComponents={xThemeComponents}>
        <CssBaseline enableColorScheme />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: 'background.default',
          }}
        >
          <GlobalNav route={route} />
          {route.startsWith('#/docs') ? (
            <DocsSite route={route} />
          ) : (
            <Dashboard main={route.startsWith('#/gaps') ? 'gaps' : 'home'} />
          )}
        </Box>
      </AppTheme>
    </SeedProvider>
  );
}
