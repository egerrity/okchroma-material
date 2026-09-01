// Date picker — MUI X, themed by the same map. The audience is an engineer
// building product UI: what to import, which props to pass, what comes free.
import * as React from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PageTitle, Lede, SectionTitle, Demo, Snippet, Rulings, FileRef } from './shared';

const Caption = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: 14, mb: 1, mt: 2 }} color="text.secondary">
    {children}
  </Typography>
);

// The house field pattern: the label sits above the control (Text field page).
const Field = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <FormControl sx={{ minWidth: 220 }}>
    <FormLabel>{label}</FormLabel>
    {children}
  </FormControl>
);

export default function DatePickerDoc() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2026-04-17'));
  const [errorValue, setErrorValue] = React.useState<Dayjs | null>(null);

  return (
    <>
      <PageTitle>Date picker</PageTitle>
      <Lede>
        The MUI X DatePicker, pre-themed. Import from @mui/x-date-pickers and use it —
        the calendar chrome, the selected cell, focus, dark mode, and the disabled
        treatment come from the theme for every brand.
      </Lede>
      <Snippet
        code={`import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

<LocalizationProvider dateAdapter={AdapterDayjs}>
  <FormControl>
    <FormLabel>Start date</FormLabel>
    <DatePicker value={value} onChange={setValue} />
  </FormControl>
</LocalizationProvider>`}
      />

      <SectionTitle>Basic use</SectionTitle>
      <Caption>Open the calendar to see the cell states under the current brand.</Caption>
      <Demo>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Field label="Start date">
            <DatePicker
              value={value}
              onChange={(next) => setValue(next)}
              slotProps={{ textField: { size: 'small' } }}
            />
          </Field>
        </LocalizationProvider>
      </Demo>

      <SectionTitle>Sizes, error and disabled</SectionTitle>
      <Demo>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Field label="Medium">
            <DatePicker value={value} onChange={(next) => setValue(next)} />
          </Field>
          <Field label="Required">
            <DatePicker
              value={errorValue}
              onChange={(next) => setErrorValue(next)}
              slotProps={{
                textField: { size: 'small', error: true, helperText: 'Pick a date' },
              }}
            />
          </Field>
          <Field label="Disabled">
            <DatePicker value={value} disabled slotProps={{ textField: { size: 'small' } }} />
          </Field>
        </LocalizationProvider>
      </Demo>
      <Snippet
        code={`<DatePicker
  value={value}
  onChange={setValue}
  slotProps={{ textField: { size: 'small', error: !value, helperText: 'Pick a date' } }}
/>`}
      />

      <SectionTitle>What we styled</SectionTitle>
      <Caption>
        <FileRef path="src/dashboard/theme/customizations/datePickers.ts" /> — the picker
        popper, the day grid, the month and year views, and the field.
      </Caption>
      <Rulings>
        <li>
          MUI X ships its own field family rather than reusing the text field's, so the
          border law and the disabled law are pinned onto it here: resting and hover
          borders on the neutral stop, focus on the brand, error on the critical family,
          and disabled carried by opacity with the enabled colors kept.
        </li>
        <li>
          Wrap the picker in FormControl and FormLabel, as with the text field. The
          floating label MUI X passes through is not the house pattern.
        </li>
        <li>
          The popper sits on the raised surface plane with the divider-register border
          and the engine's shadow row.
        </li>
        <li>
          Rest cells ride the secondary text register at the theme radius, with the
          action-hover wash. The header arrows ride the same register.
        </li>
        <li>
          Selected cells are buttons, so they take the secondary family's stamp trio —
          fill, its paired on-color, and the edge, always rendered so layout never
          shifts. Hover moves to the stamp's hover fill.
        </li>
        <li>
          Focus is the neutral ring on a transparent ground, and a selected cell keeps
          its fill while focused.
        </li>
        <li>Month and year views repeat the day cell's rules, so the three views match.</li>
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
            <TableCell>value / onChange</TableCell>
            <TableCell>Dayjs | null</TableCell>
            <TableCell>—</TableCell>
            <TableCell>controlled; the adapter is dayjs</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>slotProps.textField</TableCell>
            <TableCell>TextField props</TableCell>
            <TableCell>—</TableCell>
            <TableCell>size, error, helperText, required</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>views</TableCell>
            <TableCell>day · month · year</TableCell>
            <TableCell>day, month, year</TableCell>
            <TableCell>all three carry the same cell rules</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>disabled</TableCell>
            <TableCell>boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>fully handled — no styling needed</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>minDate / maxDate</TableCell>
            <TableCell>Dayjs</TableCell>
            <TableCell>—</TableCell>
            <TableCell>out-of-range cells use the disabled law</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Caption>
        A <code>LocalizationProvider</code> must wrap the picker. All other MUI X
        DatePicker props work as documented by MUI.
      </Caption>

      <SectionTitle>Do not style date pickers</SectionTitle>
      <Caption>
        The theme carries the brand and the accessibility guarantees; local styling
        breaks both silently. These are review-blockers:
      </Caption>
      <Snippet
        code={`// WRONG
<DatePicker slotProps={{ day: { sx: { bgcolor: 'primary.light' } } }} />  // reaching into the palette
<DatePicker sx={{ '& .MuiPickersDay-root.Mui-selected': { opacity: 0.6 } }} />  // hand-rolled state

// RIGHT — express meaning through props; the theme does the rest
<DatePicker value={value} onChange={setValue} disabled={busy} minDate={today} />`}
      />
      <Caption>
        Layout via sx is fine (width, margins). Color, state and shape are not — if a
        design seems to need one, that is a design-system request, not an sx override.
      </Caption>
    </>
  );
}
