// THE MAP — okchroma → Material, one pass, top-down.
//
// This file is the round-2 artifact (docs/round-1-failures.md, "Round 2 mandate").
// It is PURE DATA: no logic, no conditionals, no engine imports. The theme is a
// transcription of this file; the checker (scripts/check-map.ts) proves totality
// against a stock createTheme() walk and resolvability against the engine's own
// name tables. Companion: docs/derivation-audit.md (the ~90 derivation sites and
// the cluster laws referenced below).
//
// Value grammar — a row holds exactly one of TWO shapes:
//   1. an engine token path, one reference correct in BOTH modes
//      ('neutral/paper-99', 'critical/stamp/fill', 'system/surface/mid').
//      Family-relative spellings ('lead-53', 'stamp/fill') appear only inside
//      FAMILY_ROWS and are prefixed by the interpreter with the family's
//      source; absolute spellings start with a family or 'system'.
//   2. GAP('reason') — no honest okchroma answer reachable from the registry
//      install. Renders SENTINEL, joins the gap report.
//
// There is NO per-mode shape. Tokens that reverse between modes (the surface
// planes, the whole neutral ladder) reverse inside the ENGINE; the map only
// ever names them once. Respelling a reversal here is the round-1 okx-pocket
// failure and is barred.

export interface Gap {
  gap: string
}
export type LeafPath = string
export type Row = LeafPath | Gap

export const GAP = (reason: string): Gap => ({ gap: reason })
export const isGap = (r: Row): r is Gap => typeof r === 'object' && 'gap' in r

/** Every unmapped or unanswerable slot renders THIS. Gaps are self-reporting. */
export const SENTINEL = '#ff00ff'

// ---------------------------------------------------------------------------
// Rulings as data (owner-set; see docs/round-1-failures.md "Rulings that SURVIVE")
// ---------------------------------------------------------------------------

/** Focus is ONE ring. Never a wash ground, never a halo, no ripple. */
export const FOCUS_RING = {
  width: '2px',
  color: 'neutral/mark-74' satisfies LeafPath,
  offset: '1px',
} as const

/**
 * Disabled is a component-level opacity; colors stay the enabled ones (the
 * inverse of MUI's grey-swap default). The VALUE has no engine token behind it
 * — a logged value gap (docs/derivation-audit.md, residue #1).
 */
export const DISABLED_OPACITY = 0.38

/**
 * The multiplier law (audit, header): every derivation multiplier is zeroed so a
 * missed alpha() site renders NO feedback, never an invented color. State
 * grounds come from the wash law's explicit overrides instead.
 */
export const OPACITY_ZEROS = {
  hoverOpacity: 0,
  selectedOpacity: 0,
  focusOpacity: 0,
  activatedOpacity: 0,
  inputUnderline: 0,
  switchTrack: 0,
  switchTrackDisabled: 0,
} as const

/**
 * The wash law (audit, cluster B): state grounds are real wash stops in the
 * component's own family. Focus has no ground — it is the ring.
 */
export const STATE_WASH = {
  hover: 'wash-92',
  selected: 'wash-89',
  selectedHover: 'wash-85',
  pressed: 'wash-85',
} as const

// ---------------------------------------------------------------------------
// The four surface planes — ENGINE tokens, referenced once like every other
// token. The reversal lives in the engine: SURFACE_PLANE_LAW (its one
// machine-readable home, okchroma tokenNames) resolves each plane onto the
// neutral papers per mode inside themeToFigma's system group (worklist B2,
// landed 0.1.2; light-high and dark-dim are both paper-100, the pole that
// flips with the mode). GAP #1 is CLOSED — the interpreter's transcribed
// law is deleted; these paths resolve against the emit like any other row.
// Elevation decisions reference a plane, never a paper stop.
// ---------------------------------------------------------------------------

export const SURFACE = {
  dim: 'system/surface/dim',
  low: 'system/surface/low',
  mid: 'system/surface/mid',
  high: 'system/surface/high',
} as const satisfies Record<string, LeafPath>

// ---------------------------------------------------------------------------
// The family construction — two tables generate every family column, so the
// row set is identical by construction, not by discipline.
// ---------------------------------------------------------------------------

/**
 * One column, all families. light/main/dark are AA body-text stops — verbatim
 * the engine's text-CTA rest/hover/pressed sequence. contrastText rides the
 * ladder's self-reversal (paper-100 sits beyond paper-95, the text stops'
 * solved worst case, in both modes — warranted by ratio symmetry). The stamp
 * rows are the additive register: stamp-accepting components (buttons, chips,
 * badges, avatars, filled banners) read them; nothing else does; stamps are
 * never text.
 */
export const FAMILY_ROWS = {
  light: 'lead-53',
  main: 'ink-42',
  dark: 'ink-30',
  contrastText: 'neutral/paper-100',
  stampFill: 'stamp/fill',
  stampFillHover: 'stamp/fill-hover',
  stampFillPressed: 'stamp/fill-pressed',
  stampOn: 'stamp/on',
  stampEdge: 'stamp/edge',
  // The full ladder, identical per family, under ENGINE spellings — the
  // vocabulary OUR overrides speak (owner ruling: engine token names, never
  // numeric ranges; the numeric grey rows exist only because MUI internals
  // read them). CSS var comes out as e.g. --…-palette-primary-wash-89.
  'paper-99': 'paper-99',
  'paper-97': 'paper-97',
  'paper-95': 'paper-95',
  'wash-92': 'wash-92',
  'wash-89': 'wash-89',
  'wash-85': 'wash-85',
  'wash-80': 'wash-80',
  'mark-74': 'mark-74',
  'lead-53': 'lead-53',
  'ink-42': 'ink-42',
  'ink-30': 'ink-30',
} as const

/** The neutral column's two extended endpoints (neutral-only, engine-emitted). */
export const NEUTRAL_EXTRA_ROWS = {
  'paper-100': 'neutral/paper-100',
  'ink-0': 'neutral/ink-0',
} as const

/**
 * MUI family key → engine family prefix. `neutral` is code's color="inherit"
 * (overrides route it — MUI branches on the literal string 'inherit' before
 * any palette lookup, so the key is OURS, never 'inherit').
 */
export const FAMILY_SOURCE = {
  primary: 'brand',
  secondary: 'secondary',
  error: 'critical',
  warning: 'warning',
  info: 'info',
  success: 'positive',
  neutral: 'neutral',
} as const

/**
 * inherit-white — the pole register. DROPPED THIS ROUND (owner, 2026-08-29):
 * the whole column is one engine work item, not a set of cells to draft. Every
 * row is the same GAP so any inverted-ground consumer (Snackbar action, a
 * white button on a dark surface) renders the sentinel, keeping the register
 * visible in the render instead of silently absent.
 */
const POLE_GAP = GAP('pole register (inherit-white) dropped this round — one engine work item')
export const POLE_WHITE_ROWS = {
  light: POLE_GAP,
  main: POLE_GAP,
  dark: POLE_GAP,
  contrastText: POLE_GAP,
  stampFill: POLE_GAP,
  stampOn: POLE_GAP,
  stampFillHover: POLE_GAP,
  stampFillPressed: POLE_GAP,
  stampEdge: POLE_GAP,
} as const satisfies Record<string, Row>

// ---------------------------------------------------------------------------
// Core palette rows — every slot explicit.
// ---------------------------------------------------------------------------

export const CORE = {
  text: {
    primary: 'neutral/ink-30', // fg-default
    secondary: 'neutral/lead-53', // fg-subtle
    disabled: GAP('disabled is a component-level opacity, never a color swap'),
    icon: 'neutral/mark-74', // the mark band's stated job (dark scheme slot)
  },
  background: {
    default: SURFACE.mid,
    paper: SURFACE.high,
  },
  divider: 'neutral/wash-89', // border-subtle
  common: {
    black: 'system/abs-black', // B5, landed 0.1.2 — the emitted pole rows
    white: 'system/abs-white',
    background: SURFACE.mid,
    onBackground: 'neutral/ink-0', // max-emphasis anchor; feeds channel derivations until cluster C lands
  },
  action: {
    active: 'neutral/mark-74', // icons
    hover: 'neutral/wash-92', // the wash law
    selected: 'neutral/wash-89',
    focus: GAP('focus is the ring (FOCUS_RING), never a ground'),
    disabled: GAP('disabled law: component opacity, colors stay enabled'),
    disabledBackground: GAP('disabled law: component opacity, colors stay enabled'),
  },
} as const

/**
 * grey — all 14 rungs, explicit rows, no derivation rule (owner ruling).
 * Assigned by nearest nominal lightness to the stock v9 values, hand-checked;
 * collisions (reused stops) are deliberate and visible here. MUI internals
 * read only 100–900 + A100; the rest exist for totality.
 */
export const GREY = {
  50: 'neutral/paper-99',
  100: 'neutral/paper-97',
  200: 'neutral/paper-95',
  300: 'neutral/wash-92',
  400: 'neutral/wash-80',
  500: 'neutral/mark-74',
  600: 'neutral/lead-53',
  700: 'neutral/ink-42',
  800: 'neutral/ink-30',
  900: 'neutral/ink-0',
  A100: 'neutral/wash-89', // live: Button.inheritContainedHoverBg default
  A200: 'neutral/wash-80',
  A400: 'neutral/lead-53',
  A700: 'neutral/ink-30',
} as const satisfies Record<string, LeafPath>

// ---------------------------------------------------------------------------
// Component token namespaces — the palette.<Component>.* tier MUI's own code
// reads under cssVariables (this is what makes audit cluster A dead).
// ---------------------------------------------------------------------------

/** Alert: standard = ink on wash (chip/badge doctrine); filled = a sanctioned
 *  stamp use (filled banners); icons = the mark band. */
export const ALERT = {
  errorColor: 'critical/ink-30',
  infoColor: 'info/ink-30',
  successColor: 'positive/ink-30',
  warningColor: 'warning/ink-30',
  errorStandardBg: 'critical/wash-92',
  infoStandardBg: 'info/wash-92',
  successStandardBg: 'positive/wash-92',
  warningStandardBg: 'warning/wash-92',
  errorFilledBg: 'critical/stamp/fill',
  infoFilledBg: 'info/stamp/fill',
  successFilledBg: 'positive/stamp/fill',
  warningFilledBg: 'warning/stamp/fill',
  errorFilledColor: 'critical/stamp/on',
  infoFilledColor: 'info/stamp/on',
  successFilledColor: 'positive/stamp/on',
  warningFilledColor: 'warning/stamp/on',
  errorIconColor: 'critical/mark-74',
  infoIconColor: 'info/mark-74',
  successIconColor: 'positive/mark-74',
  warningIconColor: 'warning/mark-74',
} as const satisfies Record<string, Row>

export const COMPONENTS = {
  Alert: ALERT,
  AppBar: {
    defaultBg: SURFACE.mid,
    darkBg: SURFACE.mid,
    darkColor: 'neutral/ink-30',
  },
  Avatar: {
    // avatars are a sanctioned stamp consumer (owner): the fill/on/edge trio.
    // MUI reads defaultBg itself under cssVariables; on + edge land via the
    // MuiAvatar law in src/theme/laws.tsx.
    defaultBg: 'neutral/stamp/fill',
  },
  Button: {
    // color="inherit" contained IS the neutral stamp (the neutral column's CTA)
    inheritContainedBg: 'neutral/stamp/fill',
    inheritContainedHoverBg: 'neutral/stamp/fill-hover',
  },
  Chip: {
    defaultBorder: 'neutral/wash-80',
    defaultAvatarColor: 'neutral/ink-42', // chip doctrine: ink register on wash ground
    defaultIconColor: 'neutral/ink-42',
  },
  FilledInput: {
    bg: 'neutral/wash-92',
    hoverBg: 'neutral/wash-89',
    disabledBg: GAP('disabled law: component opacity, colors stay enabled'),
  },
  LinearProgress: {
    // the track behind the bar — wash tier of the SAME family as the bar
    primaryBg: 'brand/wash-85',
    secondaryBg: 'secondary/wash-85',
    errorBg: 'critical/wash-85',
    infoBg: 'info/wash-85',
    successBg: 'positive/wash-85',
    warningBg: 'warning/wash-85',
  },
  Skeleton: {
    bg: 'neutral/wash-92',
  },
  Slider: {
    // the 'inverted' track
    primaryTrack: 'brand/wash-80',
    secondaryTrack: 'secondary/wash-80',
    errorTrack: 'critical/wash-80',
    infoTrack: 'info/wash-80',
    successTrack: 'positive/wash-80',
    warningTrack: 'warning/wash-80',
  },
  SnackbarContent: {
    // inverted surface: ink-30-filled ground, paper-band text (okchroma doctrine)
    bg: 'neutral/ink-30',
    color: 'neutral/paper-100',
  },
  SpeedDialAction: {
    fabHoverBg: 'neutral/wash-89',
  },
  StepConnector: {
    border: 'neutral/wash-80',
  },
  StepContent: {
    border: 'neutral/wash-80',
  },
  Switch: {
    defaultColor: 'neutral/paper-100', // unchecked thumb
    defaultDisabledColor: GAP('disabled law: component opacity, colors stay enabled'),
    primaryDisabledColor: GAP('disabled law'),
    secondaryDisabledColor: GAP('disabled law'),
    errorDisabledColor: GAP('disabled law'),
    infoDisabledColor: GAP('disabled law'),
    successDisabledColor: GAP('disabled law'),
    warningDisabledColor: GAP('disabled law'),
  },
  TableCell: {
    border: 'neutral/wash-89', // the divider law
  },
  Tooltip: {
    bg: 'neutral/ink-30', // inverted surface, SOLID (rule 5 bars stock's 0.92 alpha)
  },
} as const

// ---------------------------------------------------------------------------
// The modal veil + the base shadow — the system alpha rows (B3/B4, landed
// 0.1.2).
// ---------------------------------------------------------------------------

/** The scrim behind modals. One engine row, mode-invariant (black@0.60 in both
 *  schemes — the engine spells it by its composition). The MuiBackdrop law in
 *  laws.tsx reads palette.scrim; stock's derived rgba(0,0,0,0.5) dies there. */
export const SCRIM = 'system/alpha/abs-black-060' satisfies LeafPath

/**
 * State layers for INVERTED grounds (the inverse offset ladder, engine 0.1.3 —
 * owner ruling 2026-08-29): the offset rungs with the pole flipped per mode,
 * white over the dark panel in light scheme, black over the light panel in
 * dark. The reversal lives in the ENGINE (the system/surface posture); the map
 * names each rung once. NAMED FOR ITS SPECIES like STATE_WASH is — and never
 * called a wash: "wash" is the tinted band (wash-92…80, real solved stops);
 * these are colorless pole-at-alpha layers. COLORED FILLS NEVER RIDE THESE —
 * a pole at alpha greys a hue — their states stay the engine-solved stops.
 * Scope: neutral inverted territory only (ink-30 panels, the pole register's
 * neighborhood, a chip's resting ground on an inverted card).
 */
export const INVERSE_OFFSET = {
  ground: 'system/alpha/inverse-006',
  hover: 'system/alpha/inverse-008',
  pressed: 'system/alpha/inverse-016',
} as const satisfies Record<string, LeafPath>

/**
 * The base shadow recipe. Geometry (offsets/blur/spread) is a non-color
 * primitive and stays the template's two-layer shape; the LAYER COLORS are the
 * engine's shadow ladder — the soft ambient layer rides shadow-04, the offset
 * key layer shadow-08. Per-mode weight (4/8% light, 32/48% dark) reverses
 * inside the ENGINE like every other row; the map names each color once.
 * Retires themePrimitives' hsla literals (the logged shadow gap, closed).
 */
export const BASE_SHADOW = [
  { geometry: '0px 4px 16px 0px', color: 'system/alpha/shadow-04' },
  { geometry: '0px 8px 16px -5px', color: 'system/alpha/shadow-08' },
] as const satisfies ReadonlyArray<{ geometry: string; color: LeafPath }>

// ---------------------------------------------------------------------------
// System links — a link is not a text-style CTA; never the text stops.
// ---------------------------------------------------------------------------

export const LINK = {
  default: 'link/link',
  hover: 'link/link-hover',
  pressed: 'link/link-pressed',
  inverse: 'link-inverse/link',
  inverseHover: 'link-inverse/link-hover',
  inversePressed: 'link-inverse/link-pressed',
} as const satisfies Record<string, LeafPath>

// ---------------------------------------------------------------------------
// Non-palette gaps — no MUI palette slot to hold them, logged here so the gap
// report is total.
// ---------------------------------------------------------------------------

// (surfacePlanes, shadows, scrim CLOSED by okchroma 0.1.2 — the B2–B7 emitter
// pass ships system/* through the JS emit; their rows live above as SURFACE,
// BASE_SHADOW, SCRIM.)
export const NON_PALETTE_GAPS = {
  disabledOpacityValue: GAP('value: DISABLED_OPACITY has no engine token — a value gap, not a slot gap'),
  stateTintAlphas: GAP('emitter: cluster B rides opaque wash stops until the alpha-rows engine item ships'),
} as const
