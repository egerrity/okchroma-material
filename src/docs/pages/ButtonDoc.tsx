// Button — reset to stock for the round-2 restart. The page structure stays;
// content returns when the top-down mapping spec exists.
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PageTitle, Lede, SectionTitle, Placeholder, Demo, FileRef } from './shared';

export default function ButtonDoc() {
  return (
    <>
      <PageTitle>Button</PageTitle>
      <Lede>
        Reset to stock MUI template styling. Round 2 re-themes this from the top-down
        okchroma mapping spec before any component work.
      </Lede>

      <SectionTitle>Current state (stock)</SectionTitle>
      <Demo>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </Demo>

      <SectionTitle>Design guidelines</SectionTitle>
      <Placeholder>Guidelines land here. (Owner to fill.)</Placeholder>

      <SectionTitle>Round 2 inputs</SectionTitle>
      <Typography component="div" sx={{ fontSize: 14, lineHeight: 2 }}>
        Failure record and surviving rulings: <FileRef path="docs/round-1-failures.md" />
        <br />
        Figma contract: collection <FileRef path="component/buttons" /> — one mode per
        color, variants as groups, property-honest row names.
      </Typography>
    </>
  );
}
