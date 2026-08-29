import Typography from '@mui/material/Typography';
import { PageTitle, Lede, SectionTitle, FileRef } from './shared';

export default function GettingStarted() {
  return (
    <>
      <PageTitle>Overview</PageTitle>
      <Lede>
        Proof of concept: a design-owned system on Material scaffolding, colored entirely
        by the okchroma engine. Currently reset to stock values for the round-2 restart.
      </Lede>

      <SectionTitle>Where things stand</SectionTitle>
      <Typography component="div" sx={{ fontSize: 14, lineHeight: 2 }}>
        Round 1 is recorded, failures and rulings, in{' '}
        <FileRef path="docs/round-1-failures.md" />.
        <br />
        Round 2 starts with SOLUTIONING: one concrete top-down mapping of okchroma onto
        Material's semantics — including the additive register separating main/light/dark
        from the stamp — agreed before any implementation.
        <br />
        Dormant reference machinery from round 1: <FileRef path="src/seed.ts" />,{' '}
        <FileRef path="src/theme/tokens.ts" />, <FileRef path="scripts/check-wiring.ts" />.
      </Typography>
    </>
  );
}
