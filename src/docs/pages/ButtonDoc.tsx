// Button — the pilot component. Design guidelines are a placeholder (owner);
// the code page is filled. Every example below is the LIVE component.
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PageTitle, Lede, SectionTitle, Placeholder, Demo, Snippet, FileRef } from './shared';

const USAGE = `import Button from '@mui/material/Button';

<Button variant="contained" size="large">Label</Button>
<Button variant="outlined" color="error">Label</Button>
<Button variant="text" size="small">Label</Button>`;

const MAPPING = `Figma (component/buttons)      code
contained/fill              →  palette.primary.main            (stamp/fill)
contained/label             →  palette.primary.contrastText    (stamp/on)
contained/fillHover         →  palette.okx.stampHover          (stamp/fill-hover)
contained/fillPressed       →  palette.okx.stampPressed        (stamp/fill-pressed)
contained/border            →  palette.okx.stampEdge           (always rendered, usually transparent)
text/label                  →  palette[color][700]             (lead-53)
text/labelHover             →  palette[color][800]             (ink-42)
text/labelPressed           →  palette[color][900]             (ink-30)
text/fillHover              →  color-mix(mark-74 12%)          (owner's mark-tint wash)
text/fillPressed            →  color-mix(mark-74 16%)
text/border  (outlined)     →  palette[color][600]             (mark-74, solid)
focus/ring                  →  palette.okx.focus               (2px, 1px offset, one stroke)
borderRadiusAction          →  999 (pill)`;

export default function ButtonDoc() {
  return (
    <>
      <PageTitle>Button</PageTitle>
      <Lede>
        Buttons carry the call to action. They are the only surface that wears the stamp state
        colors; the quiet variants ride the text register.
      </Lede>

      <SectionTitle>Design guidelines</SectionTitle>
      <Placeholder>Guidelines land here. (Owner to fill.)</Placeholder>

      <SectionTitle>Variants</SectionTitle>
      <Demo>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </Demo>
      <Snippet code={USAGE} />

      <SectionTitle>Colors</SectionTitle>
      <Demo>
        <Button variant="contained" color="primary">Primary</Button>
        <Button variant="outlined" color="primary">Primary</Button>
        <Button variant="text" color="primary">Primary</Button>
      </Demo>
      <Demo>
        <Button variant="contained" color="secondary">Secondary</Button>
        <Button variant="outlined" color="secondary">Secondary</Button>
        <Button variant="text" color="secondary">Secondary</Button>
      </Demo>
      <Demo>
        <Button variant="contained" color="error">Error</Button>
        <Button variant="outlined" color="error">Error</Button>
        <Button variant="text" color="error">Error</Button>
      </Demo>

      <SectionTitle>Sizes</SectionTitle>
      <Demo>
        <Button variant="contained" size="small">Small · 32</Button>
        <Button variant="contained" size="medium">Medium · 40</Button>
        <Button variant="contained" size="large">Large · 48</Button>
      </Demo>

      <SectionTitle>States</SectionTitle>
      <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
        Hover and press the examples above: contained swaps to the real engine state fills;
        quiet variants deepen the label along the text trio over a mark-tint wash. Keyboard
        focus draws one ring (2px mark, 1px offset) — there is no ripple.
      </Typography>
      <Demo>
        <Button variant="contained" disabled>Disabled</Button>
        <Button variant="outlined" disabled>Disabled</Button>
        <Button variant="text" disabled>Disabled</Button>
      </Demo>

      <SectionTitle>Where it lives</SectionTitle>
      <Typography component="div" sx={{ fontSize: 14, lineHeight: 2 }}>
        Theme entry: <FileRef path="src/theme/cleanCustomizations.ts" /> (MuiButton)
        <br />
        Tokens: Figma collection <FileRef path="component/buttons" /> — one mode per color,
        variants as groups
        <br />
        Checks: <FileRef path="npm run check:wiring" /> · <FileRef path="npx tsc -b" />
      </Typography>
      <Snippet code={MAPPING} />

      <Box sx={{ mt: 2, fontSize: 13, color: 'text.secondary' }}>
        Kit-only: the inherit-white color mode (media surfaces) has no code counterpart yet.
        Disabled states keep library defaults — the engine has no disabled tier.
      </Box>
    </>
  );
}
