// Radio — engineering documentation. Same audience rule as Button: an
// engineer building product UI. Import from @mui/material and use it — the
// Unify anatomy (white-core disc), dark mode, and the disabled treatment are
// all theme-supplied. Theme internals stay out.
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { PageTitle, Lede, SectionTitle, Demo, Snippet, Rulings, FileRef } from './shared';

const Caption = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: 14, mb: 1, mt: 2 }} color="text.secondary">
    {children}
  </Typography>
);

export default function RadioDoc() {
  return (
    <>
      <PageTitle>Radio</PageTitle>
      <Lede>
        The standard MUI Radio, pre-themed. Radios always live in a RadioGroup —
        the group owns the value and the name; each radio just declares what it
        stands for. Checked fill, dark mode, and disabled are handled by the theme
        for every brand.
      </Lede>
      <Snippet
        code={`import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

<RadioGroup value={plan} onChange={(e) => setPlan(e.target.value)} name="plan">
  <FormControlLabel value="starter" control={<Radio />} label="Starter" />
  <FormControlLabel value="pro" control={<Radio />} label="Pro" />
</RadioGroup>`}
      />

      <SectionTitle>Group with labels</SectionTitle>
      <Demo>
        <FormControl>
          <FormLabel id="plan-demo-label">Plan</FormLabel>
          <RadioGroup aria-labelledby="plan-demo-label" defaultValue="pro" name="plan-demo">
            <FormControlLabel value="starter" control={<Radio />} label="Starter" />
            <FormControlLabel value="pro" control={<Radio />} label="Pro" />
            <FormControlLabel value="enterprise" disabled control={<Radio />} label="Enterprise" />
          </RadioGroup>
        </FormControl>
      </Demo>
      <Caption>
        Give the group a FormLabel (wired via aria-labelledby) or an aria-label.
        Use `row` on RadioGroup for a horizontal layout.
      </Caption>

      <SectionTitle>Sizes</SectionTitle>
      <Demo>
        <RadioGroup row defaultValue="a" name="radio-size-demo">
          <Radio value="a" aria-label="medium" />
          <Radio value="b" size="small" aria-label="small" />
        </RadioGroup>
      </Demo>
      <Snippet code={`<Radio />               // medium — the default
<Radio size="small" />  // dense rows`} />

      <SectionTitle>What we styled</SectionTitle>
      <Caption>
        <code>components.MuiRadio</code> in{' '}
        <FileRef path="src/shared-theme/customizations/inputs.tsx" />, under the same law
        as the checkbox.
      </Caption>
      <Rulings>
        <li>No stamp. Checked is a main-filled disc; unchecked is a 2px neutral circle
          on the paper ground.</li>
        <li>
          The glyph is a solid 10px disc on the 20px fill, so the main reads as a thick
          outer ring. A ring glyph reads bullseye-backwards.
        </li>
        <li>
          The stock SVG pair is hidden and the root is the control, drawn with{' '}
          <code>::after</code> — the checkbox pattern.
        </li>
        <li>Focus, ripple and disabled follow the same cross-component laws.</li>
      </Rulings>

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
            <TableCell>value</TableCell>
            <TableCell>any</TableCell>
            <TableCell>—</TableCell>
            <TableCell>what this option stands for; the group compares against it</TableCell>
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
            <TableCell>16px / 20px circle</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>disabled</TableCell>
            <TableCell>boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>fully handled — no styling needed</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Caption>
        value/onChange and name belong on the RadioGroup, not on individual radios.
      </Caption>

      <SectionTitle>Do not style radios</SectionTitle>
      <Snippet
        code={`// WRONG
<Radio sx={{ color: 'primary.main' }} />   // reaching into the palette
<Radio checkedIcon={<MyDot />} />           // replacing the anatomy

// RIGHT — express meaning through props; the theme does the rest
<Radio value="pro" color="success" />`}
      />
    </>
  );
}
