// The edge-case seed switcher: the fixed roster from SeedContext (the same
// seeds the map checker sweeps), a swatch + label each. One engine resolve
// per change; every reference in the app moves with it.
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { SEED_ROSTER, useSeedHex } from '../../theme/SeedContext';

export default function SeedSelect() {
  const { hex, setHex } = useSeedHex();
  return (
    <Select
      size="small"
      value={hex}
      onChange={e => setHex(e.target.value)}
      aria-label="Brand seed"
      sx={{ minWidth: 170 }}
    >
      {SEED_ROSTER.map(seed => (
        <MenuItem key={seed.hex} value={seed.hex}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: '4px',
                // the swatch shows the raw SEED, not a token — it is the
                // engine INPUT, the one sanctioned identity reference
                backgroundColor: seed.hex,
                border: '1px solid',
                borderColor: 'divider',
              }}
            />
            {seed.label}
          </Stack>
        </MenuItem>
      ))}
    </Select>
  );
}
