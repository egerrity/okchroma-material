// Text field — engineering documentation. Same audience rule as Button: an
// engineer building product UI. The Unify field chrome (radius, heights,
// borders, focus, error) is all theme-supplied; this page also carries the ONE
// structural house rule: labels sit ABOVE the field (FormLabel), never
// floating into the border.
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Search as SearchIcon } from 'lucide-react';
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

export default function TextFieldDoc() {
  return (
    <>
      <PageTitle>Text field</PageTitle>
      <Lede>
        Fields are built from FormControl + FormLabel + OutlinedInput (or TextField
        without a floating label). The chrome — borders, focus, error, sizes, dark
        mode, disabled — is theme-supplied. One structural rule: the label sits
        above the field; floating labels are not part of this system.
      </Lede>
      <Snippet
        code={`import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

<FormControl>
  <FormLabel htmlFor="email">Work email</FormLabel>
  <OutlinedInput id="email" placeholder="you@company.com" />
</FormControl>`}
      />

      <SectionTitle>Sizes</SectionTitle>
      <Demo>
        <Field label="Medium — the default" id="tf-md">
          <OutlinedInput id="tf-md" placeholder="Placeholder" />
        </Field>
        <Field label="Small — dense layouts" id="tf-sm">
          <OutlinedInput id="tf-sm" size="small" placeholder="Placeholder" />
        </Field>
      </Demo>
      <Caption>
        Click into a field to see the focus treatment: the border itself thickens in
        the brand register — fields do not take the offset focus ring buttons use.
      </Caption>

      <SectionTitle>Error</SectionTitle>
      <Demo>
        <Field label="Card number" id="tf-err">
          <TextField
            id="tf-err"
            error
            defaultValue="4242"
            helperText="This is an error alert notice"
            variant="outlined"
            size="small"
          />
        </Field>
      </Demo>
      <Snippet
        code={`<TextField error helperText="This is an error alert notice" />`}
      />
      <Caption>
        Pass error + helperText together — the border and the notice both come from
        the theme. Never color a field by hand to signal a problem.
      </Caption>

      <SectionTitle>Disabled</SectionTitle>
      <Demo>
        <Field label="Provisioned by your admin" id="tf-dis">
          <OutlinedInput id="tf-dis" disabled defaultValue="acme-corp.unify.app" size="small" />
        </Field>
      </Demo>
      <Caption>Disabled keeps the enabled colors and dims the control — the law, everywhere.</Caption>

      <SectionTitle>Select</SectionTitle>
      <Demo>
        <Field label="Role" id="tf-select">
          <Select id="tf-select" defaultValue="editor" size="small">
            <MenuItem value="viewer">Viewer</MenuItem>
            <MenuItem value="editor">Editor</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </Field>
      </Demo>
      <Snippet
        code={`<FormControl>
  <FormLabel htmlFor="role">Role</FormLabel>
  <Select id="role" value={role} onChange={handleChange}>
    <MenuItem value="viewer">Viewer</MenuItem>
    <MenuItem value="editor">Editor</MenuItem>
  </Select>
</FormControl>`}
      />

      <SectionTitle>Textarea</SectionTitle>
      <Demo>
        <Field label="Notes" id="tf-area">
          <OutlinedInput id="tf-area" multiline minRows={3} placeholder="Anything the team should know…" sx={{ width: 340 }} />
        </Field>
      </Demo>
      <Snippet code={`<OutlinedInput multiline minRows={3} placeholder="…" />`} />

      <SectionTitle>With adornments</SectionTitle>
      <Demo>
        <OutlinedInput
          size="small"
          placeholder="Search"
          aria-label="search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon size={16} />
            </InputAdornment>
          }
          sx={{ width: 260 }}
        />
      </Demo>
      <Snippet
        code={`<OutlinedInput
  placeholder="Search"
  startAdornment={
    <InputAdornment position="start"><SearchIcon size={16} /></InputAdornment>
  }
/>`}
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
            <TableCell>size</TableCell>
            <TableCell>small · medium</TableCell>
            <TableCell>medium</TableCell>
            <TableCell>40px / 48px tall</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>error</TableCell>
            <TableCell>boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>pair with helperText</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>disabled</TableCell>
            <TableCell>boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>fully handled — no styling needed</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>multiline / minRows</TableCell>
            <TableCell>boolean / number</TableCell>
            <TableCell>—</TableCell>
            <TableCell>textarea; height follows content</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>startAdornment / endAdornment</TableCell>
            <TableCell>InputAdornment</TableCell>
            <TableCell>—</TableCell>
            <TableCell>lucide icons at size 16</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Caption>
        Do not pass label to TextField — the floating label is not part of this
        system. Put a FormLabel above the field instead.
      </Caption>

      <SectionTitle>Do not style fields</SectionTitle>
      <Snippet
        code={`// WRONG
<OutlinedInput sx={{ borderColor: 'warning.main' }} />   // hand-rolled state
<TextField label="Email" />                               // floating label
<OutlinedInput sx={{ height: 44 }} />                     // off-scale size

// RIGHT — express meaning through props; the theme does the rest
<TextField error={!valid} helperText={message} size="small" />`}
      />
      <Box sx={{ height: 24 }} />
    </>
  );
}
