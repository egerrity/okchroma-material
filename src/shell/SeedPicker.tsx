// The brand-seed control. The roster is the fixed edge-case set the checkers
// sweep (src/theme/SeedContext.tsx); the native color input takes any other
// brand. Either way one engine resolve runs and every reference in the app
// moves — the color input commits on every change, so a drag in the native
// picker previews live.
//
// Swatches paint the raw seed hex from the roster — the engine INPUT, the one
// sanctioned identity reference (the class DEFAULT_SEED is in).
import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';
import { SEED_ROSTER, useSeedHex } from '../theme/SeedContext';

export default function SeedPicker() {
  const { hex, setHex } = useSeedHex();
  const pick = (value: string) => setHex(value.toUpperCase());

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {SEED_ROSTER.map((seed) => {
          const active = seed.hex.toUpperCase() === hex.toUpperCase();
          return (
            <Tooltip key={seed.hex} title={seed.label}>
              <ButtonBase
                onClick={() => pick(seed.hex)}
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
      {/* a color input only takes lowercase #rrggbb; the seed state stays uppercase */}
      <Tooltip title={`Any brand color (${hex})`}>
        <Box
          component="input"
          type="color"
          value={hex.toLowerCase()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => pick(e.target.value)}
          aria-label="Brand color"
          sx={{
            width: 28,
            height: 22,
            p: 0,
            border: '2px solid',
            borderColor: 'divider',
            borderRadius: '6px',
            bgcolor: 'transparent',
            cursor: 'pointer',
            '&::-webkit-color-swatch-wrapper': { p: 0 },
            '&::-webkit-color-swatch': { border: 'none', borderRadius: '4px' },
            '&::-moz-color-swatch': { border: 'none', borderRadius: '4px' },
          }}
        />
      </Tooltip>
    </Box>
  );
}
