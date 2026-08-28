// Header controls for the brand and brand-alt seeds: a native color picker
// each, with the hex spelled beside it. Changing either rebuilds the whole
// theme through buildColorSchemes.
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSeed } from '../../seedContext';

function PickerChip({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
      <input
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label={`${label} seed color`}
        style={{
          width: 24,
          height: 24,
          padding: 0,
          border: 'none',
          borderRadius: 6,
          background: 'none',
          cursor: 'pointer',
        }}
      />
      <Stack>
        <Typography sx={{ fontSize: 10, lineHeight: 1.1 }} color="text.secondary">
          {label}
        </Typography>
        <Typography sx={{ fontSize: 12, lineHeight: 1.2, fontFamily: 'monospace' }}>
          {value.toUpperCase()}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default function SeedPickers() {
  const { brandHex, altHex, setBrandHex, setAltHex } = useSeed();
  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
      <PickerChip label="brand" value={brandHex} onChange={setBrandHex} />
      <PickerChip
        label="brand-alt"
        value={altHex ?? '#888888'}
        onChange={setAltHex}
      />
    </Stack>
  );
}
