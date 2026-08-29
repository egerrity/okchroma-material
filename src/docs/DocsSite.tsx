// The PoC's documentation site: plain design-system format — fixed sidebar,
// typographic content pages. Rendered under the SAME theme as the app, so
// every live example is the real component and cannot drift from the code.
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeToggle from '../shared-theme/ColorModeToggle';
import ButtonDoc from './pages/ButtonDoc';
import GettingStarted from './pages/GettingStarted';

const NAV = [
  {
    section: 'Getting started',
    items: [{ label: 'Overview', hash: '#/docs' }],
  },
  {
    section: 'Components',
    items: [{ label: 'Button', hash: '#/docs/button' }],
  },
];

export default function DocsSite({ route }: { route: string }) {
  const page = route === '#/docs/button' ? <ButtonDoc /> : <GettingStarted />;
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Box
          component="nav"
          sx={{
            width: 260,
            flexShrink: 0,
            borderRight: '1px solid',
            borderColor: 'divider',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>PoC Design System</Typography>
            <ColorModeToggle />
          </Box>
          <Divider />
          {NAV.map(group => (
            <Box key={group.section}>
              <Typography
                sx={{ px: 1, pt: 1.5, pb: 0.5, fontSize: 12, fontWeight: 600 }}
                color="text.secondary"
              >
                {group.section}
              </Typography>
              <List dense disablePadding>
                {group.items.map(item => (
                  <ListItemButton
                    key={item.hash}
                    selected={route === item.hash}
                    onClick={() => {
                      window.location.hash = item.hash;
                    }}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          ))}
          <Box sx={{ flex: 1 }} />
          <Link href="#/" sx={{ fontSize: 13, px: 1 }}>
            Back to the dashboard
          </Link>
        </Box>
        <Box component="main" sx={{ flex: 1, minWidth: 0, px: { xs: 3, md: 8 }, py: 6 }}>
          <Box sx={{ maxWidth: 860 }}>{page}</Box>
        </Box>
      </Box>
    </AppTheme>
  );
}
