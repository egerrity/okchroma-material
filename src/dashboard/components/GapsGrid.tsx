// THE GAP GALLERY (#/gaps) — every remaining sentinel row on one page.
//
// The rows are DERIVED from the map (isGap over its tables), never listed by
// hand, so this page stays honest as engine items land: a closed gap drops off
// by itself. Two kinds of section:
//   · declared gaps (the pole register) — magenta HERE IS the expected render;
//   · tripwire rosters (the disabled law) — the slots are deliberately
//     unrouted, so magenta in the LIVE roster means a missed law site, which
//     is exactly what the manual interaction pass exists to catch.
// Swatch colors are read from the palette's own CSS variables (the map's
// addresses under the template prefix) — no literals, no derivations.
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import SnackbarContent from '@mui/material/SnackbarContent';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Copyright from '../internals/components/Copyright';
import {
  POLE_WHITE_ROWS,
  CORE,
  COMPONENTS,
  NON_PALETTE_GAPS,
  DISABLED_OPACITY,
  isGap,
  type Row,
} from '../../theme/map';

interface GapEntry {
  path: string[];
  reason: string;
}

function collectGaps(
  tree: Record<string, Row | Record<string, Row>>,
  prefix: string[],
): GapEntry[] {
  const out: GapEntry[] = [];
  for (const [key, node] of Object.entries(tree)) {
    if (isGap(node as Row)) {
      out.push({ path: [...prefix, key], reason: (node as { gap: string }).gap });
    } else if (typeof node === 'object') {
      out.push(...collectGaps(node as Record<string, Row>, [...prefix, key]));
    }
  }
  return out;
}

const poleGaps = collectGaps(POLE_WHITE_ROWS as never, ['poleWhite']);
const coreAndComponentGaps = [
  ...collectGaps(CORE as never, []),
  ...collectGaps(COMPONENTS as never, []),
];
const disabledGaps = coreAndComponentGaps.filter((g) => g.reason.includes('disabled'));
const focusGaps = coreAndComponentGaps.filter((g) => g.reason.includes('focus'));
const paletteGapCount = poleGaps.length + coreAndComponentGaps.length;

function GapSwatch({ path, reason }: GapEntry) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', minWidth: 0 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: 1,
          backgroundColor: `var(--template-palette-${path.join('-')})`,
          border: '1px solid',
          borderColor: 'divider',
        }}
      />
      <Stack sx={{ minWidth: 0 }}>
        <Typography variant="subtitle2" sx={{ lineHeight: 1.3 }}>
          {path.join('.')}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {reason}
        </Typography>
      </Stack>
    </Stack>
  );
}

function SwatchGrid({ entries }: { entries: GapEntry[] }) {
  return (
    <Grid container spacing={2} columns={12}>
      {entries.map((e) => (
        <Grid key={e.path.join('.')} size={{ xs: 12, sm: 6, lg: 4 }}>
          <GapSwatch {...e} />
        </Grid>
      ))}
    </Grid>
  );
}

export default function GapsGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 0.5 }}>
        Gap gallery
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        Every row below is read from the map — {paletteGapCount} palette gap rows
        resolving to the sentinel, plus the non-palette gaps. When an engine item
        lands and its rows un-gap, they disappear from this page on their own.
      </Typography>

      <Typography component="h3" variant="subtitle1" sx={{ mb: 1 }}>
        The pole register — mapped 2026-08-29, one loud remnant
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
        The column resolves from existing rows now: constant paper text on
        inverted grounds (states are the inverse offset layers), and a
        deliberate no-feedback white button (Unify has no white button — no
        invention). The one magenta left is stampEdge: the white-button
        separation guarantee the engine does not account for.
      </Typography>
      <Grid container spacing={2} columns={12} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Promo banner — white CTA on the brand stamp
              </Typography>
              <Box
                sx={(theme) => ({
                  p: 2.5,
                  borderRadius: 2,
                  backgroundColor: theme.vars!.palette.primary.stampFill,
                })}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
                  <Typography
                    variant="subtitle1"
                    sx={(theme) => ({ color: theme.vars!.palette.primary.stampOn, fontWeight: 600 })}
                  >
                    Go further with Pro
                  </Typography>
                  <Box
                    component="span"
                    sx={(theme) => ({
                      px: 1,
                      py: 0.25,
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 600,
                      backgroundColor: theme.vars!.palette.poleWhite.main,
                      color: theme.vars!.palette.poleWhite.contrastText,
                    })}
                  >
                    NEW
                  </Box>
                </Stack>
                <Typography
                  variant="body2"
                  sx={(theme) => ({ color: theme.vars!.palette.primary.stampOn, mb: 1.5 })}
                >
                  Advanced reporting, unlimited seats, priority support.
                </Typography>
                <Button
                  size="small"
                  sx={(theme) => {
                    const p = theme.vars!.palette.poleWhite;
                    return {
                      backgroundColor: p.stampFill,
                      color: p.stampOn,
                      border: `1.5px solid ${p.stampEdge}`,
                      '&:hover': { backgroundColor: p.stampFillHover },
                      '&:active': { backgroundColor: p.stampFillPressed },
                    };
                  }}
                >
                  Get started
                </Button>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
                LANDED: abs-white button, abs-black text, states deliberately
                identical (no feedback over invention) · the badge rides main +
                contrastText. REMNANT: the magenta stampEdge — separation vs a
                pale dark stamp is unaccounted.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Inverted panel — buttons on the ink-30 ground
              </Typography>
              <Box
                sx={(theme) => ({
                  p: 2.5,
                  borderRadius: 2,
                  backgroundColor: theme.vars!.palette.neutral['ink-30'],
                })}
              >
                <Typography
                  variant="subtitle2"
                  sx={(theme) => ({ color: theme.vars!.palette.neutral['paper-100'] })}
                >
                  You&apos;re offline
                </Typography>
                <Typography
                  variant="caption"
                  sx={(theme) => ({
                    color: theme.vars!.palette.neutral['paper-95'],
                    display: 'block',
                    mb: 1.5,
                  })}
                >
                  Changes will sync when you reconnect.
                </Typography>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Button
                    size="small"
                    sx={(theme) => {
                      const p = theme.vars!.palette.poleWhite;
                      const w = theme.vars!.palette.inverseOffset;
                      return {
                        color: p.main,
                        border: `1px solid ${p.main}`,
                        // hover/active COLOR pinned — the MuiButton law's family
                        // hover (primary.main) bleeds through otherwise
                        '&:hover': { color: p.main, backgroundColor: w.hover },
                        '&:active': { color: p.dark, backgroundColor: w.pressed },
                      };
                    }}
                  >
                    Retry now
                  </Button>
                  <Button
                    size="small"
                    sx={(theme) => {
                      const p = theme.vars!.palette.poleWhite;
                      const w = theme.vars!.palette.inverseOffset;
                      return {
                        color: p.light,
                        '&:hover': { color: p.main, backgroundColor: w.hover },
                        '&:active': { color: p.dark, backgroundColor: w.pressed },
                      };
                    }}
                  >
                    Dismiss
                  </Button>
                  <Box
                    component="span"
                    sx={(theme) => ({
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      fontSize: 12,
                      backgroundColor: theme.vars!.palette.inverseOffset.ground,
                      color: theme.vars!.palette.neutral['paper-100'],
                    })}
                  >
                    3 queued
                  </Box>
                </Stack>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
                LANDED, whole card: text = the paper tiers (main / the soft
                light), constant across states; hover/pressed grounds + the
                &quot;queued&quot; chip ride the inverse offset ladder — hover
                the buttons to see it. Both text pairings are swept vs ink-30.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Snackbar action
              </Typography>
              <SnackbarContent
                sx={{ minWidth: 'auto' }}
                message="Report archived"
                action={<Button size="small">Undo</Button>}
              />
              <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
                LANDED: the action rides poleWhite.main (paper on the inverse
                ground) with inverse offset state grounds — the
                MuiSnackbarContent law.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Card variant="outlined">
            <CardContent>
              <SwatchGrid entries={poleGaps} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography component="h3" variant="subtitle1" sx={{ mb: 1 }}>
        Disabled-law tripwires
      </Typography>
      <Grid container spacing={2} columns={12} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
                These slots are deliberately unrouted (disabled = component
                opacity, colors stay enabled), so the swatches are magenta by
                design. They exist as tripwires for any MUI-internal read the
                law&apos;s overrides miss.
              </Typography>
              <SwatchGrid entries={disabledGaps} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                Live roster — must show NO magenta
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
                Every control below is disabled. Magenta anywhere here is a
                tripwire firing: a disabled read the law missed.
              </Typography>
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button variant="contained" disabled>
                    Contained
                  </Button>
                  <Button variant="outlined" disabled>
                    Outlined
                  </Button>
                  <Button variant="text" disabled>
                    Text
                  </Button>
                  <Chip label="Chip" disabled />
                </Stack>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Switch disabled />
                  <Switch disabled defaultChecked />
                  <Switch disabled defaultChecked color="warning" />
                  <Checkbox disabled />
                  <Checkbox disabled defaultChecked />
                  <Radio disabled checked />
                </Stack>
                <TextField disabled label="Outlined input" defaultValue="Disabled value" size="small" />
                <TextField
                  disabled
                  label="Filled input"
                  defaultValue="Disabled value"
                  variant="filled"
                  size="small"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography component="h3" variant="subtitle1" sx={{ mb: 1 }}>
        Focus tripwire + non-palette gaps
      </Typography>
      <Grid container spacing={2} columns={12} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <SwatchGrid entries={focusGaps} />
              <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1.5, display: 'block' }}>
                Focus is the ring (FOCUS_RING), never a ground — tab through the
                roster above to see the one focus treatment.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Stack spacing={1}>
                {Object.entries(NON_PALETTE_GAPS).map(([key, gap]) => (
                  <Stack key={key} sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle2">{key}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {gap.gap}
                    </Typography>
                  </Stack>
                ))}
                <Stack sx={{ minWidth: 0 }}>
                  <Typography variant="subtitle2">DISABLED_OPACITY = {DISABLED_OPACITY}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    the interim project constant the disabled law applies (C11
                    replaces it with an engine row or a blessed constant)
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
