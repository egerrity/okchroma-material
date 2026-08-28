// Simple light/dark toggle (owner: no system option, no dropdown).
import IconButton from '@mui/material/IconButton';
import type { IconButtonOwnProps } from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';
import { Moon, Sun } from 'lucide-react';

export default function ColorModeToggle(props: IconButtonOwnProps) {
  const { mode, systemMode, setMode } = useColorScheme();
  const resolved = (mode === 'system' ? systemMode : mode) ?? 'light';
  const dark = resolved === 'dark';
  return (
    <IconButton
      onClick={() => setMode(dark ? 'light' : 'dark')}
      size="small"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      {...props}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </IconButton>
  );
}
