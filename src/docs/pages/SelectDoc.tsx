// Select — engineering documentation. Same audience rule as the other pages.
// Select inherits the field chrome (borders, focus, error, sizes, dark mode)
// and adds the menu; both are theme-supplied.
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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

const Field = ({ children, label, id }: { children: React.ReactNode; label: string; id: string }) => (
  <FormControl sx={{ minWidth: 220 }}>
    <FormLabel htmlFor={id}>{label}</FormLabel>
    {children}
  </FormControl>
);

export default function SelectDoc() {
  return (
    <>
      <PageTitle>Select</PageTitle>
      <Lede>
        The standard MUI Select, built like every field: FormControl + FormLabel
        above, no floating label. The field chrome and the menu are theme-supplied —
        focus, error, sizes, dark mode, disabled all come free.
      </Lede>
      <Snippet
        code={`import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

<FormControl>
  <FormLabel htmlFor="role">Role</FormLabel>
  <Select id="role" value={role} onChange={handleChange}>
    <MenuItem value="viewer">Viewer</MenuItem>
    <MenuItem value="editor">Editor</MenuItem>
  </Select>
</FormControl>`}
      />

      <SectionTitle>Sizes</SectionTitle>
      <Demo>
        <Field label="Medium — the default" id="sel-md">
          <Select id="sel-md" defaultValue="editor">
            <MenuItem value="viewer">Viewer</MenuItem>
            <MenuItem value="editor">Editor</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </Field>
        <Field label="Small — dense layouts" id="sel-sm">
          <Select id="sel-sm" size="small" defaultValue="editor">
            <MenuItem value="viewer">Viewer</MenuItem>
            <MenuItem value="editor">Editor</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </Field>
      </Demo>

      <SectionTitle>Error and disabled</SectionTitle>
      <Demo>
        <Field label="Region" id="sel-err">
          <Select id="sel-err" error defaultValue="none" size="small">
            <MenuItem value="none">Not selected</MenuItem>
            <MenuItem value="us">US</MenuItem>
            <MenuItem value="eu">EU</MenuItem>
          </Select>
        </Field>
        <Field label="Plan tier" id="sel-dis">
          <Select id="sel-dis" disabled defaultValue="pro" size="small">
            <MenuItem value="pro">Pro</MenuItem>
          </Select>
        </Field>
      </Demo>
      <Caption>
        Error borders and the disabled dim are the field rules — pair error with a
        FormHelperText notice like any field.
      </Caption>

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
            <TableCell>value / onChange</TableCell>
            <TableCell>any / handler</TableCell>
            <TableCell>—</TableCell>
            <TableCell>controlled usage; defaultValue for uncontrolled</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>size</TableCell>
            <TableCell>small · medium</TableCell>
            <TableCell>medium</TableCell>
            <TableCell>40px / 48px tall — the field scale</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>error</TableCell>
            <TableCell>boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>pair with FormHelperText</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>disabled</TableCell>
            <TableCell>boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>fully handled — no styling needed</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>multiple</TableCell>
            <TableCell>boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>works as MUI documents</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <SectionTitle>Do not style selects</SectionTitle>
      <Snippet
        code={`// WRONG
<Select sx={{ borderColor: 'success.main' }} />   // hand-rolled state
<Select label="Role" />                            // floating label — not in this system

// RIGHT — express meaning through props; the theme does the rest
<Select value={role} onChange={handleChange} error={!role} size="small" />`}
      />
    </>
  );
}
