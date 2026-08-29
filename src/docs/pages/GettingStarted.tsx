import Typography from '@mui/material/Typography';
import { PageTitle, Lede, SectionTitle, FileRef } from './shared';

export default function GettingStarted() {
  return (
    <>
      <PageTitle>Overview</PageTitle>
      <Lede>
        One brand hex in, a complete themed product out. The okchroma engine resolves every
        color for both modes; Material components supply the scaffolding; the design team owns
        the output.
      </Lede>

      <SectionTitle>How this system works</SectionTitle>
      <Typography component="div" sx={{ fontSize: 14, lineHeight: 2 }}>
        Tokens come from the okchroma package (<FileRef path="npm: okchroma" />) and resolve per
        theme through <FileRef path="src/shared-theme/themePrimitives.ts" />.
        <br />
        Component styling lives in <FileRef path="src/theme/cleanCustomizations.ts" /> and is
        documented per component in this site.
        <br />
        Components are designed in the Figma kit against the same variable names this code
        consumes; the wiring check (<FileRef path="npm run check:wiring" />) verifies every
        mapped pairing holds the engine bars.
        <br />
        Reference: <FileRef path="docs/customizing-mui.md" /> in the repo.
      </Typography>

      <SectionTitle>Components</SectionTitle>
      <Typography sx={{ fontSize: 14 }}>
        Each component the PoC adopts gets a page here: design guidelines (placeholder until the
        owner fills them) and a working code page with live examples.
      </Typography>
    </>
  );
}
