// Switch — engineering documentation. Same audience rule as Button: an
// engineer building product UI. Import from @mui/material and use it — the
// Unify contained-pill anatomy, dark mode, and the disabled treatment are all
// theme-supplied. Theme internals stay out.
import Switch from '@mui/material/Switch';
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

export default function SwitchDoc() {
  return (
    <>
      <PageTitle>Switch</PageTitle>
      <Lede>
        The standard MUI Switch, pre-themed. A switch is for a setting that takes
        effect immediately — use a Checkbox when the choice is submitted with a form.
        The pill, thumb, states, dark mode, and disabled are handled by the theme
        for every brand.
      </Lede>
      <Snippet
        code={`import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

<FormControlLabel control={<Switch />} label="Auto-sync" />`}
      />

      <SectionTitle>States</SectionTitle>
      <Demo>
        <Switch aria-label="off" />
        <Switch defaultChecked aria-label="on" />
        <Switch disabled aria-label="disabled off" />
        <Switch disabled defaultChecked aria-label="disabled on" />
      </Demo>
      <Snippet
        code={`<Switch />
<Switch defaultChecked />
<Switch disabled />
<Switch disabled defaultChecked />`}
      />

      <SectionTitle>With labels</SectionTitle>
      <Demo>
        <FormGroup>
          <FormControlLabel control={<Switch defaultChecked />} label="Auto-sync" />
          <FormControlLabel control={<Switch />} label="Usage analytics" />
        </FormGroup>
      </Demo>
      <Caption>
        Always wrap a switch in FormControlLabel when it has visible text; a bare
        switch needs an aria-label.
      </Caption>

      <SectionTitle>Sizes</SectionTitle>
      <Demo>
        <Switch defaultChecked aria-label="medium" />
        <Switch size="small" defaultChecked aria-label="small" />
      </Demo>
      <Snippet code={`<Switch />               // medium — the default
<Switch size="small" />  // dense rows, table cells`} />

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
            <TableCell>color</TableCell>
            <TableCell>primary · secondary · error · warning · info · success</TableCell>
            <TableCell>primary</TableCell>
            <TableCell>the ON track follows the family</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>size</TableCell>
            <TableCell>small · medium</TableCell>
            <TableCell>medium</TableCell>
            <TableCell>28×16 / 32×20 pill</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>disabled</TableCell>
            <TableCell>boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>fully handled — no styling needed</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <SectionTitle>Do not style switches</SectionTitle>
      <Snippet
        code={`// WRONG
<Switch sx={{ '& .MuiSwitch-track': { bgcolor: 'grey.400' } }} />  // reaching into the anatomy
<Switch sx={{ opacity: 0.5 }} />                                    // hand-rolled disabled

// RIGHT — express meaning through props; the theme does the rest
<Switch color="success" checked={enabled} onChange={toggle} />`}
      />
    </>
  );
}
