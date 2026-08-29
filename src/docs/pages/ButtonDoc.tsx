// Button — engineering documentation. The audience is an engineer building
// product UI with this package: what to import, which props to pass, what
// comes free. Theme internals stay out of this page by design — if a reader
// needs token vocabulary to use a button, the theme has failed.
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Plus as AddIcon, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { PageTitle, Lede, SectionTitle, Demo, Snippet } from './shared';

const FAMILIES = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;

const Caption = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: 14, mb: 1, mt: 2 }} color="text.secondary">
    {children}
  </Typography>
);

export default function ButtonDoc() {
  return (
    <>
      <PageTitle>Button</PageTitle>
      <Lede>
        The standard MUI Button, pre-themed. Import from @mui/material and use it —
        colors, hover/pressed states, focus, dark mode, and accessibility are handled
        by the theme for every brand. There is nothing extra to import and nothing to
        style.
      </Lede>
      <Snippet
        code={`import Button from '@mui/material/Button';

<Button variant="contained">Contained</Button>`}
      />

      <SectionTitle>Variants</SectionTitle>
      <Demo>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </Demo>
      <Snippet
        code={`<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>`}
      />

      <SectionTitle>Color</SectionTitle>
      <Caption>
        primary is the default. The theme resolves the values for the active brand
        and mode.
      </Caption>
      {(['contained', 'outlined', 'text'] as const).map(variant => (
        <Box key={variant} sx={{ mb: 2 }}>
          <Caption>{variant}</Caption>
          <Demo>
            {FAMILIES.map(family => (
              <Button key={family} variant={variant} color={family}>
                {family}
              </Button>
            ))}
            <Button variant={variant} color="inherit">
              inherit
            </Button>
          </Demo>
        </Box>
      ))}
      <Snippet
        code={`<Button variant="contained" color="error">error</Button>
<Button variant="outlined" color="inherit">inherit</Button>`}
      />

      <SectionTitle>Disabled</SectionTitle>
      <Caption>
        Pass disabled. Hover, pressed, and keyboard focus need no code at all.
      </Caption>
      <Demo>
        <Button variant="contained" disabled>
          Contained
        </Button>
        <Button variant="outlined" disabled>
          Outlined
        </Button>
        <Button variant="text" disabled>
          Text
        </Button>
        <Button variant="contained" color="error" disabled>
          error
        </Button>
      </Demo>
      <Snippet code={`<Button variant="contained" disabled={isSaving}>Contained</Button>`} />

      <SectionTitle>Sizes and icons</SectionTitle>
      <Demo>
        <Button variant="contained" size="small">
          Small
        </Button>
        <Button variant="contained" size="medium">
          Medium
        </Button>
        <Button variant="outlined" size="small" startIcon={<AddIcon size={16} />}>
          Start icon
        </Button>
        <Button variant="contained" endIcon={<ChevronRightIcon size={16} />}>
          End icon
        </Button>
        <IconButton size="small" aria-label="add">
          <AddIcon size={16} />
        </IconButton>
      </Demo>
      <Snippet
        code={`<Button variant="outlined" size="small" startIcon={<AddIcon size={16} />}>
  Start icon
</Button>

// icon-only: always pass aria-label
<IconButton size="small" aria-label="add"><AddIcon size={16} /></IconButton>`}
      />

      <SectionTitle>Props</SectionTitle>
      <Table size="small" sx={{ mb: 3, maxWidth: 720 }}>
        <TableHead>
          <TableRow>
            <TableCell>Prop</TableCell>
            <TableCell>Values</TableCell>
            <TableCell>Default</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>variant</TableCell>
            <TableCell>contained · outlined · text</TableCell>
            <TableCell>text</TableCell>
            <TableCell>emphasis level</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>color</TableCell>
            <TableCell>primary · secondary · error · warning · info · success · inherit</TableCell>
            <TableCell>primary</TableCell>
            <TableCell>—</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>size</TableCell>
            <TableCell>small · medium</TableCell>
            <TableCell>medium</TableCell>
            <TableCell>36px / 40px tall</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>disabled</TableCell>
            <TableCell>boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>fully handled — no styling needed</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>startIcon / endIcon</TableCell>
            <TableCell>ReactNode</TableCell>
            <TableCell>—</TableCell>
            <TableCell>lucide icons at size 16</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>fullWidth</TableCell>
            <TableCell>boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>fills the container</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Caption>
        All other MUI Button props (href, onClick, component, loading) work as
        documented by MUI.
      </Caption>

      <SectionTitle>Do not style buttons</SectionTitle>
      <Caption>
        The theme carries the brand and the accessibility guarantees; local styling
        breaks both silently. These are review-blockers:
      </Caption>
      <Snippet
        code={`// WRONG
<Button sx={{ backgroundColor: '#1D5AF0' }}>…</Button>        // hardcoded color (map-check:allow — anti-example)
<Button sx={{ bgcolor: 'primary.light' }}>…</Button>           // reaching into the palette
<Button sx={{ opacity: 0.5 }}>…</Button>                       // hand-rolled disabled
<Button sx={{ '&:hover': { bgcolor: 'grey.200' } }}>…</Button> // hand-rolled hover

// RIGHT — express meaning through props; the theme does the rest
<Button variant="contained" color="error" disabled={busy}>Delete</Button>`}
      />
      <Caption>
        Layout via sx is fine (margins, width, alignment). Color, state, and shape
        are not — if a design seems to need one, that is a design-system request,
        not an sx override.
      </Caption>
    </>
  );
}
