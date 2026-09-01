// The one global nav, above every route: page nav, the brand-seed control,
// and the light/dark toggle. The dashboard's side menu and the docs sidebar
// are page furniture below it.
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ColorModeToggle from '../shared-theme/ColorModeToggle';
import SeedPicker from './SeedPicker';

/** The drawer and the mobile app bar are position:fixed — both offset by this. */
export const NAV_HEIGHT = 56;

const PAGES: ReadonlyArray<{ label: string; hash: string }> = [
  { label: 'Home', hash: '#/' },
  { label: 'Docs', hash: '#/docs' },
];

const isActive = (route: string, hash: string) =>
  hash === '#/' ? !route.startsWith('#/docs') : route.startsWith(hash);

export default function GlobalNav({ route }: { route: string }) {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        height: NAV_HEIGHT,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        px: 2,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
        okchroma · Material UI
      </Typography>
      <Box component="nav" sx={{ display: 'flex', gap: 2 }}>
        {PAGES.map((page) => {
          const active = isActive(route, page.hash);
          return (
            <ButtonBase
              key={page.hash}
              onClick={() => {
                window.location.hash = page.hash;
              }}
              aria-current={active ? 'page' : undefined}
              sx={{
                px: 1,
                py: 0.5,
                borderRadius: 1,
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                color: active ? 'text.primary' : 'text.secondary',
              }}
            >
              {page.label}
            </ButtonBase>
          );
        })}
      </Box>
      <Box sx={{ flex: 1 }} />
      <SeedPicker />
      <ColorModeToggle />
    </Box>
  );
}
