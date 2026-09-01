// The brand-seed control. The roster is the fixed edge-case set the checkers
// sweep (src/theme/SeedContext.tsx); the hex field takes any other brand.
// Either way one engine resolve runs and every reference in the app moves.
//
// Swatches paint the raw seed hex from the roster — the engine INPUT, the one
// sanctioned identity reference (the class DEFAULT_SEED is in).
import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { SEED_ROSTER, useSeedHex } from '../theme/SeedContext';
import { DEFAULT_SEED } from '../seed';

const SIX_HEX = /^#?[0-9a-fA-F]{6}$/;

export default function SeedPicker() {
  const { hex, setHex } = useSeedHex();
  const [draft, setDraft] = React.useState(hex);
  // a swatch click changes the seed elsewhere; the field follows it
  const [shown, setShown] = React.useState(hex);
  if (shown !== hex) {
    setShown(hex);
    setDraft(hex);
  }

  // An unparseable value is left alone rather than resolved.
  const commit = (raw: string) => {
    const value = raw.trim();
    if (SIX_HEX.test(value)) setHex(`#${value.replace('#', '')}`.toUpperCase());
    else setDraft(hex);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {SEED_ROSTER.map((seed) => {
          const active = seed.hex.toUpperCase() === hex.toUpperCase();
          return (
            <Tooltip key={seed.hex} title={seed.label}>
              <ButtonBase
                onClick={() => setHex(seed.hex)}
                aria-label={seed.label}
                aria-pressed={active}
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: '999px',
                  backgroundColor: seed.hex,
                  border: '2px solid',
                  borderColor: active ? 'text.primary' : 'divider',
                }}
              />
            </Tooltip>
          );
        })}
      </Box>
      <TextField
        size="small"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit((e.target as HTMLInputElement).value);
        }}
        placeholder={DEFAULT_SEED}
        slotProps={{ htmlInput: { 'aria-label': 'Brand hex', spellCheck: false } }}
        sx={{ width: 110 }}
      />
    </Box>
  );
}
