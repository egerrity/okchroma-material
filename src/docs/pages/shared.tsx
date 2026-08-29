// Shared building blocks for documentation pages.
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const PageTitle = ({ children }: { children: ReactNode }) => (
  <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
    {children}
  </Typography>
);

export const Lede = ({ children }: { children: ReactNode }) => (
  <Typography sx={{ fontSize: 16, mb: 5 }} color="text.secondary">
    {children}
  </Typography>
);

export const SectionTitle = ({ children }: { children: ReactNode }) => (
  <Typography variant="h5" component="h2" sx={{ mt: 6, mb: 2 }}>
    {children}
  </Typography>
);

export const Placeholder = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      border: '1px dashed',
      borderColor: 'divider',
      borderRadius: 2,
      p: 3,
      color: 'text.secondary',
      fontSize: 14,
    }}
  >
    {children}
  </Box>
);

/** Live example well: real components rendered under the real theme. */
export const Demo = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      p: 3,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 2,
      bgcolor: 'background.paper',
    }}
  >
    {children}
  </Box>
);

export const Snippet = ({ code }: { code: string }) => (
  <Box
    component="pre"
    sx={{
      m: 0,
      mt: 1,
      mb: 3,
      p: 2,
      borderRadius: 2,
      bgcolor: 'grey.100',
      color: 'text.primary',
      fontSize: 13,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      overflowX: 'auto',
    }}
  >
    {code}
  </Box>
);

export const FileRef = ({ path }: { path: string }) => (
  <Typography
    component="span"
    sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 13 }}
  >
    {path}
  </Typography>
);
