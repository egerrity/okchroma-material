// Checkbox — engineering documentation. Same audience rule as Button: an
// engineer building product UI. Import from @mui/material and use it — the
// Unify anatomy (soft square, brand-checked fill, glyph), dark mode, and the
// disabled treatment are all theme-supplied. Theme internals stay out.
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { PageTitle, Lede, SectionTitle, Demo, Snippet } from './shared';

const Caption = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: 14, mb: 1, mt: 2 }} color="text.secondary">
    {children}
  </Typography>
);

export default function CheckboxDoc() {
  return (
    <>
      <PageTitle>Checkbox</PageTitle>
      <Lede>
        The standard MUI Checkbox, pre-themed. Import from @mui/material and use it —
        the checked fill, glyph, dark mode, and the disabled treatment are handled by
        the theme for every brand. There is nothing extra to import and nothing to
        style.
      </Lede>
      <Snippet
        code={`import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

<FormControlLabel control={<Checkbox />} label="Email me updates" />`}
      />

      <SectionTitle>States</SectionTitle>
      <Demo>
        <Checkbox aria-label="unchecked" />
        <Checkbox defaultChecked aria-label="checked" />
        <Checkbox indeterminate aria-label="indeterminate" />
        <Checkbox disabled aria-label="disabled" />
        <Checkbox disabled defaultChecked aria-label="disabled checked" />
      </Demo>
      <Snippet
        code={`<Checkbox />
<Checkbox defaultChecked />
<Checkbox indeterminate />   // "some of the children" — set from your data
<Checkbox disabled />
<Checkbox disabled defaultChecked />`}
      />
      <Caption>
        Disabled keeps the enabled colors and dims the whole control — never restyle
        it by hand.
      </Caption>

      <SectionTitle>With labels</SectionTitle>
      <Demo>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Weekly digest" />
          <FormControlLabel control={<Checkbox />} label="Product announcements" />
          <FormControlLabel disabled control={<Checkbox />} label="Legacy notifications" />
        </FormGroup>
      </Demo>
      <Snippet
        code={`<FormGroup>
  <FormControlLabel control={<Checkbox defaultChecked />} label="Weekly digest" />
  <FormControlLabel control={<Checkbox />} label="Product announcements" />
  <FormControlLabel disabled control={<Checkbox />} label="Legacy notifications" />
</FormGroup>`}
      />
      <Caption>
        Always wrap a checkbox in FormControlLabel when it has visible text; a bare
        checkbox needs an aria-label.
      </Caption>

      <SectionTitle>Sizes</SectionTitle>
      <Demo>
        <Checkbox defaultChecked aria-label="medium" />
        <Checkbox size="small" defaultChecked aria-label="small" />
      </Demo>
      <Snippet code={`<Checkbox />               // medium — the default
<Checkbox size="small" />  // dense tables, compact rows`} />

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
            <TableCell>checked / onChange</TableCell>
            <TableCell>boolean / handler</TableCell>
            <TableCell>—</TableCell>
            <TableCell>controlled usage; defaultChecked for uncontrolled</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>indeterminate</TableCell>
            <TableCell>boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>visual only — set it from your data</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>color</TableCell>
            <TableCell>primary · secondary · error · warning · info · success</TableCell>
            <TableCell>primary</TableCell>
            <TableCell>checked fill follows the family</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>size</TableCell>
            <TableCell>small · medium</TableCell>
            <TableCell>medium</TableCell>
            <TableCell>16px / 20px box</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>disabled</TableCell>
            <TableCell>boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>fully handled — no styling needed</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <SectionTitle>Do not style checkboxes</SectionTitle>
      <Caption>
        The theme carries the anatomy and the contrast guarantees; local styling
        breaks both silently. These are review-blockers:
      </Caption>
      <Snippet
        code={`// WRONG
<Checkbox sx={{ color: 'primary.main' }} />          // reaching into the palette
<Checkbox sx={{ opacity: 0.5 }} />                    // hand-rolled disabled
<Checkbox icon={<MyIcon />} />                        // replacing the anatomy

// RIGHT — express meaning through props; the theme does the rest
<Checkbox color="success" disabled={locked} />`}
      />
    </>
  );
}
