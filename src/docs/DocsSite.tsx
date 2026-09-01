// The documentation site: a fixed sidebar and typographic content pages,
// rendered under the SAME theme as the app, so every live example is the real
// component and cannot drift from the code.
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import UsingWithMui from './pages/UsingWithMui';
import ButtonDoc from './pages/ButtonDoc';
import CheckboxDoc from './pages/CheckboxDoc';
import RadioDoc from './pages/RadioDoc';
import SwitchDoc from './pages/SwitchDoc';
import TextFieldDoc from './pages/TextFieldDoc';
import SelectDoc from './pages/SelectDoc';
import DatePickerDoc from './pages/DatePickerDoc';
import { NAV_HEIGHT } from '../shell/GlobalNav';

const NAV = [
  {
    section: 'Using okchroma',
    items: [{ label: 'With Material UI', hash: '#/docs' }],
  },
  {
    section: 'Components',
    items: [
      { label: 'Button', hash: '#/docs/button' },
      { label: 'Checkbox', hash: '#/docs/checkbox' },
      { label: 'Radio', hash: '#/docs/radio' },
      { label: 'Switch', hash: '#/docs/switch' },
      { label: 'Text field', hash: '#/docs/text-field' },
      { label: 'Select', hash: '#/docs/select' },
      { label: 'Date picker', hash: '#/docs/date-picker' },
    ],
  },
];

const PAGES: Record<string, () => React.JSX.Element> = {
  '#/docs/button': ButtonDoc,
  '#/docs/checkbox': CheckboxDoc,
  '#/docs/radio': RadioDoc,
  '#/docs/switch': SwitchDoc,
  '#/docs/text-field': TextFieldDoc,
  '#/docs/select': SelectDoc,
  '#/docs/date-picker': DatePickerDoc,
};

export default function DocsSite({ route }: { route: string }) {
  const Page = PAGES[route] ?? UsingWithMui;
  // #/docs/how-it-works is the old address of the integration page.
  const selected = PAGES[route] ? route : '#/docs';
  return (
    <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
      <Box
        component="nav"
        sx={{
          width: 240,
          flexShrink: 0,
          borderRight: '1px solid',
          borderColor: 'divider',
          p: 2,
          position: 'sticky',
          top: NAV_HEIGHT,
          alignSelf: 'flex-start',
          maxHeight: `calc(100vh - ${NAV_HEIGHT}px)`,
          overflowY: 'auto',
        }}
      >
        {NAV.map((group) => (
          <Box key={group.section}>
            <Typography
              sx={{ px: 1, pt: 1.5, pb: 0.5, fontSize: 12, fontWeight: 600 }}
              color="text.secondary"
            >
              {group.section}
            </Typography>
            <List dense disablePadding>
              {group.items.map((item) => (
                <ListItemButton
                  key={item.hash}
                  selected={selected === item.hash}
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
      </Box>
      <Box component="main" sx={{ flex: 1, minWidth: 0, px: { xs: 3, md: 8 }, py: 6 }}>
        <Box sx={{ maxWidth: 860 }}>
          <Page />
        </Box>
      </Box>
    </Box>
  );
}
