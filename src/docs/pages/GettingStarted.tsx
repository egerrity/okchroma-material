import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { PageTitle, Lede, SectionTitle, FileRef } from './shared';

const Body = ({ children }: { children: React.ReactNode }) => (
  <Typography component="div" sx={{ fontSize: 14, lineHeight: 1.9, mb: 2 }}>
    {children}
  </Typography>
);

export default function GettingStarted() {
  return (
    <>
      <PageTitle>Overview</PageTitle>
      <Lede>
        A design-owned system on Material UI scaffolding, colored entirely by the okchroma
        engine. One brand hex resolves the full light and dark system; nothing in this
        repo picks a color.
      </Lede>

      <SectionTitle>What is here</SectionTitle>
      <Box component="ul" sx={{ pl: 3, fontSize: 14, lineHeight: 1.9, mb: 2 }}>
        <li>
          <Link href="#/docs/how-it-works">How this works</Link> — the engineering
          explainer: data flow from the npm package to <code>createTheme</code>, the three
          MUI integration points, and the checks that gate a build.
        </li>
        <li>
          The component pages — Button, Checkbox, Radio, Select, Switch, and Text field.
          Each carries the rulings that shaped it and renders the real component under the
          real theme, so an example cannot drift from the code.
        </li>
        <li>
          <Link href="#/">The dashboard</Link> — the product surface the system is proved
          against, and <Link href="#/gaps">the gap gallery</Link>, which lists every slot
          with no honest engine answer. Those rows render magenta on purpose.
        </li>
      </Box>

      <SectionTitle>The seed picker</SectionTitle>
      <Body>
        The header control swaps the brand hex and re-resolves the entire system live. The
        roster is fixed rather than a free picker: these are the same seeds the checkers
        sweep, including a green that sits next to the positive signal, a red that collides
        with the critical signal, a light gold, and a near-white degenerate case. Anything
        the eye catches on one of them is reproducible and already contrast-measured.
      </Body>

      <SectionTitle>The construction record</SectionTitle>
      <Body>
        Round 1 is recorded — failures and the rulings that survived them — in{' '}
        <FileRef path="docs/round-1-failures.md" />. Round 2 replaced it with one top-down
        mapping agreed before implementation: <FileRef path="src/theme/map.ts" />, checked
        for totality by <FileRef path="scripts/check-map.ts" />. Every gap found against
        the engine, and its current status, is in <FileRef path="docs/gap-report.md" />;
        the engine items it produced are in <FileRef path="docs/engine-worklist.md" /> and
        have since landed.
      </Body>
    </>
  );
}
