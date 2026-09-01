// The product surface. The theme, the CssBaseline and the global nav are
// mounted by App.tsx; this file is the dashboard layout only.
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import GapsGrid from './components/GapsGrid';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';

export default function Dashboard({ main = 'home' }: { main?: 'home' | 'gaps' }) {
  return (
    <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
      <SideMenu />
      <AppNavbar />
      {/* Main content */}
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.vars!.palette.background.default,
          overflow: 'auto',
        })}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Header />
          {main === 'gaps' ? <GapsGrid /> : <MainGrid />}
        </Stack>
      </Box>
    </Box>
  );
}
