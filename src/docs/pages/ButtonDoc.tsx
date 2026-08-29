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

const MAPPING = `Figma (component/buttons)      code (component tokens, 1:1)
contained/fill              →  --buttons-contained-fill
contained/label             →  --buttons-contained-label
contained/fillHover         →  --buttons-contained-fillHover
contained/fillPressed       →  --buttons-contained-fillPressed
contained/border            →  --buttons-contained-border
text/label                  →  --buttons-text-label
text/labelHover             →  --buttons-text-labelHover
text/labelPressed           →  --buttons-text-labelPressed
text/fill                   →  --buttons-text-fill
text/fillHover              →  --buttons-text-fillHover
text/fillPressed            →  --buttons-text-fillPressed
text/border  (outlined)     →  --buttons-text-border
focus/ring                  →  --buttons-focus-ring
borderRadiusAction          →  999 (pill)

The color prop is the collection MODE. The per-mode aliases (which theme
token each row points to) live in src/theme/buttonTokens.ts — the code
mirror of the collection's mode columns. The button's styles reference
only these variables.`;

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
      <Demo>
        <Button variant="contained" color="inherit">Inherit</Button>
        <Button variant="outlined" color="inherit">Inherit</Button>
        <Button variant="text" color="inherit">Inherit</Button>
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
        Disabled is a component-level opacity (the theme's disabledOpacity) — colors stay the
        enabled ones, per Unify.
      </Box>
    </>
  );
}
