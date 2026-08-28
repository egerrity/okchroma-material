// Header controls for the brand and brand-alt seeds: a native color picker
// each, with the hex spelled beside it. Changing either rebuilds the whole
// theme through buildColorSchemes.
//
// brand-alt: while no custom hex is set, the field DISPLAYS the derived
// secondary (the engine's quiet companion), so it moves with the brand.
// Picking a color pins a custom alt; "auto" returns to derived.
import { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { stopHex } from 'okchroma';
import { useSeed } from '../../seedContext';
import { resolveSeed } from '../../seed';

function PickerChip({
  label,
  value,
  note,
  onChange,
  onReset,
}: {
  label: string;
  value: string;
  note?: string;
  onChange: (hex: string) => void;
  onReset?: () => void;
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
          {note ? ` · ${note}` : ''}
          {onReset && (
            <>
              {' · '}
              <Link component="button" onClick={onReset} sx={{ fontSize: 10 }}>
                auto
              </Link>
            </>
          )}
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
  // the derived secondary's resting fill, shown while no custom alt is pinned
  const derivedAlt = useMemo(() => {
    const seed = resolveSeed(brandHex, null);
    const scale = seed.theme.secondary?.scale;
    return scale ? stopHex(scale.cta) : brandHex;
  }, [brandHex]);
  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
      <PickerChip label="brand" value={brandHex} onChange={setBrandHex} />
      <PickerChip
        label="brand-alt"
        note={altHex ? 'custom' : 'derived'}
        value={altHex ?? derivedAlt}
        onChange={setAltHex}
        onReset={altHex ? () => setAltHex(null) : undefined}
      />
    </Stack>
  );
}
