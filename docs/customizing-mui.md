# How to customize MUI

Working reference for the Unify-restyle effort. Verified against MUI's docs
(how-to-customize, theme-components, building-extensible-themes) on 2026-08-28.
MUI version in this repo: v9.

## The four scopes, narrowest to broadest

1. **One instance: the `sx` prop.** The recommended tool for a single
   component instance. Reaches nested slots through MUI's global class names
   (`'& .MuiSlider-thumb': {...}`) and states through state classes
   (`.Mui-disabled`, `.Mui-selected`, `.Mui-focusVisible`).
2. **A reusable component: `styled()`.** Wraps one MUI component with
   permanent overrides. Supports prop-conditional styles and CSS variables.
3. **Every instance: `theme.components`.** The theme-level mechanism, detailed
   below. This is where the Unify restyle lives.
4. **Page baseline: `<GlobalStyles />`.** Global CSS with theme access. Hoist
   the styles object to a static constant to avoid rerenders.

Specificity: `sx` beats theme `styleOverrides`. State classes need the class
selectors above, not CSS pseudo-classes, because MUI applies states as classes.

## theme.components, the mechanism that matters

```js
createTheme({
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },      // app-wide prop defaults
      styleOverrides: {
        root: ({ ownerState, theme }) => ({ ... }),  // callback gets ownerState + theme
        // or a plain object; nested selectors allowed as values
      },
    },
  },
})
```

- **Slot keys**: each component exposes named slots; `root` is the outermost.
- **Callbacks**: `({ ownerState, theme })` lets one override branch on the
  instance's props (variant, color, size).
- **variants API**: inside a slot, `variants: [{ props: {...} | (props) => bool,
  style: {...} }]` matches prop combinations. This is also how you ADD new
  variants that do not exist in MUI (a Unify-specific button style, for
  example) without forking the component.
- **v9 trap (hit in this repo)**: the old slot-variant keys
  (`containedPrimary`, `standardError`) are gone. Use `root` callbacks or the
  variants array. Same round: `primaryTypographyProps` is gone, use
  `slotProps.primary.sx`.

## Layering for an extensible theme (the pattern we follow)

MUI's guide prescribes a two-module layering:

1. **Branded theme module** (ours: okchroma + the Unify-look overrides).
   Export three things separately so consumers can take only what they need:
   tokens (`palette`, `typography`, `shape`, `shadows`), component overrides
   (`ThemeOptions['components']`, optionally one file per component like
   `brandedButtons.ts`), and the assembled theme.
2. **Application theme module** consumes and extends the branded module.

Merging rules from the guide:

- Tokens merge by spread: `...brandedTokens.palette`.
- Component overrides merge by ARRAY syntax so the branded variants, states,
  and pseudo-class styles survive:

```js
MuiButton: {
  styleOverrides: {
    root: [
      brandedComponents?.MuiButton?.styleOverrides?.root,
      { /* app-specific additions */ },
    ],
  },
}
```

- Do not deep-merge with utilities; it costs first-render performance and the
  array syntax already preserves the cascade.

## Where tokens end and overrides begin

MUI's code defines very few component-level color tokens (for Button, only
`palette.Button.inheritContainedBg` and `inheritContainedHoverBg`; the kit's
`_components/*` variables mirror this same code tier for other components).
Everything else a button shows comes from `palette` + `action` + derivation.
Consequence: **customizing buttons correctly means `theme.components.MuiButton`
overrides, not inventing token rows.** Token rows are only correct where MUI's
code has the matching token.

In this repo the layering is:

- okchroma engine seed resolves to `colorSchemes` palettes
  ([adapter-mui.ts](../src/theme/adapter-mui.ts)), the token layer.
- State pinning (hover/pressed to real engine values instead of MUI's
  `darken()` derivation) lives in `theme.components` overrides, the branded
  component layer. The Unify restyle extends this same layer.

## The base to restyle

MUI's official Dashboard template (Sitemark-web,
mui.com/material-ui/getting-started/templates/dashboard) is the agreed
starting point; it already reads close to Unify. Its source ships a
`shared-theme` module plus per-area `customizations/` files, which is the
extensible-theme layering above in practice: adopt its structure, replace its
tokens with okchroma output, and grow the Unify look inside the component
override files.
