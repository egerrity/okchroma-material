// THE INTERPRETER — transcribes src/theme/map.ts into MUI colorSchemes.
//
// No color decision lives here. Every value is looked up from the engine's
// themeToFigma emit by the leaf path the map names; a path that fails to
// resolve THROWS (the loud failure an engine rename should cause — round-1
// rename-resilience discipline, now enforced at the lookup instead of by
// spelling constants). GAP rows resolve to the sentinel.
//
// The ONE law this file carries: the surface-plane aliasing (SURFACE_LAW
// below), transcribed from the engine's own token layer because the published
// npm package does not include tokens/semantic.css in its files array —
// gap #1, a packaging hole. It is keyed by the engine's system/surface/*
// names and dies the day the package ships the token layer.

import { themeToFigma, type FigmaGroup, type FigmaColorToken } from 'okchroma'
import type { Seed, SignalRole } from '../seed'
import {
  SENTINEL,
  isGap,
  FAMILY_ROWS,
  NEUTRAL_EXTRA_ROWS,
  FAMILY_SOURCE,
  POLE_WHITE_ROWS,
  CORE,
  GREY,
  COMPONENTS,
  LINK,
  SURFACE,
  OPACITY_ZEROS,
  DISABLED_OPACITY,
  type Row,
} from './map'

// ---------------------------------------------------------------------------
// MUI module augmentation: the additive stamp register on PaletteColor (one
// address, correct for every family — see map.ts "Why the stamp rows go on
// PaletteColor"), the neutral/poleWhite families, and the system link trios.
// ---------------------------------------------------------------------------

declare module '@mui/material/styles' {
  interface PaletteColor {
    stampFill: string
    stampFillHover: string
    stampFillPressed: string
    stampOn: string
    stampEdge: string
    // the ladder under engine spellings — the vocabulary our overrides speak
    'paper-99': string
    'paper-97': string
    'paper-95': string
    'wash-92': string
    'wash-89': string
    'wash-85': string
    'wash-80': string
    'mark-74': string
    'lead-53': string
    'ink-42': string
    'ink-30': string
    'paper-100'?: string // neutral column only
    'ink-0'?: string // neutral column only
  }
  interface SimplePaletteColorOptions {
    stampFill?: string
    stampFillHover?: string
    stampFillPressed?: string
    stampOn?: string
    stampEdge?: string
    'paper-99'?: string
    'paper-97'?: string
    'paper-95'?: string
    'wash-92'?: string
    'wash-89'?: string
    'wash-85'?: string
    'wash-80'?: string
    'mark-74'?: string
    'lead-53'?: string
    'ink-42'?: string
    'ink-30'?: string
    'paper-100'?: string
    'ink-0'?: string
  }
  interface Palette {
    neutral: Palette['primary']
    poleWhite: Palette['primary']
    link: {
      default: string
      hover: string
      pressed: string
      inverse: string
      inverseHover: string
      inversePressed: string
    }
    surface: { dim: string; low: string; mid: string; high: string }
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary']
    poleWhite?: PaletteOptions['primary']
    link?: Partial<Palette['link']>
    surface?: Partial<Palette['surface']>
    baseShadow?: string
  }
}

type Mode = 'light' | 'dark'

// ---------------------------------------------------------------------------
// Leaf table: themeToFigma emit → path → CSS color string, per mode.
// ---------------------------------------------------------------------------

type LeafTable = Map<string, string>

function flatten(group: FigmaGroup, prefix: string, out: LeafTable): void {
  for (const [key, node] of Object.entries(group)) {
    const path = prefix ? `${prefix}/${key}` : key
    if (node && typeof node === 'object' && '$type' in node && node.$type === 'color') {
      const { hex, alpha, components } = (node as FigmaColorToken).$value
      out.set(
        path,
        alpha === 1
          ? hex
          : `rgba(${components.map((c: number) => Math.round(c * 255)).join(', ')}, ${alpha})`,
      )
    } else if (node && typeof node === 'object') {
      flatten(node as FigmaGroup, path, out)
    }
  }
}

/** One engine call per seed: the same emit Figma consumes, edge gate on. */
export function leafTables(seed: Seed): Record<Mode, LeafTable> {
  const roles: SignalRole[] = ['critical', 'warning', 'positive', 'info']
  const { light, dark } = themeToFigma(seed.theme.themed, {
    secondary: seed.theme.secondary?.scale ?? null,
    secondaryStyle: seed.theme.secondary?.style,
    neutralLevel: 'default',
    signals: roles.map(name => ({ name, scale: seed.signal(name) })),
    contrastProfile: 'wcag',
    ctaBorder: true,
  })
  const tables: Record<Mode, LeafTable> = { light: new Map(), dark: new Map() }
  flatten(light, '', tables.light)
  flatten(dark, '', tables.dark)
  return tables
}

// ---------------------------------------------------------------------------
// Gap #1 shim: the engine's surface-plane law (tokens/semantic.css), keyed by
// the engine's own system/surface/* names. light-high and dark-dim are both
// paper-100 — the pole that flips with the mode.
// ---------------------------------------------------------------------------

const SURFACE_LAW: Record<string, Record<Mode, string>> = {
  [SURFACE.dim]: { light: 'neutral/paper-95', dark: 'neutral/paper-100' },
  [SURFACE.low]: { light: 'neutral/paper-97', dark: 'neutral/paper-99' },
  [SURFACE.mid]: { light: 'neutral/paper-99', dark: 'neutral/paper-97' },
  [SURFACE.high]: { light: 'neutral/paper-100', dark: 'neutral/paper-95' },
}

// ---------------------------------------------------------------------------
// Row resolution.
// ---------------------------------------------------------------------------

function resolveRow(row: Row, mode: Mode, leaves: LeafTable): string {
  if (isGap(row)) return SENTINEL
  const path = SURFACE_LAW[row]?.[mode] ?? row
  const value = leaves.get(path)
  if (value === undefined) {
    throw new Error(`map path does not resolve against the engine emit: "${path}"`)
  }
  return value
}

/** Family-relative spellings resolve absolute-first, then family-prefixed. */
function resolveFamilyRow(row: Row, family: string, mode: Mode, leaves: LeafTable): string {
  if (isGap(row)) return SENTINEL
  if (leaves.has(row) || row in SURFACE_LAW) return resolveRow(row, mode, leaves)
  return resolveRow(`${family}/${row}`, mode, leaves)
}

function resolveTree<T extends Record<string, Row | Record<string, Row>>>(
  tree: T,
  mode: Mode,
  leaves: LeafTable,
): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, node] of Object.entries(tree)) {
    out[key] =
      typeof node === 'string' || isGap(node as Row)
        ? resolveRow(node as Row, mode, leaves)
        : resolveTree(node as Record<string, Row>, mode, leaves)
  }
  return out
}

// ---------------------------------------------------------------------------
// The palette per mode — a walk of the map, nothing else.
// ---------------------------------------------------------------------------

function buildPalette(mode: Mode, leaves: LeafTable) {
  const family = (source: string) =>
    Object.fromEntries(
      Object.entries(FAMILY_ROWS).map(([slot, row]) => [
        slot,
        resolveFamilyRow(row, source, mode, leaves),
      ]),
    )

  const families = Object.fromEntries(
    Object.entries(FAMILY_SOURCE).map(([muiKey, source]) => [
      muiKey,
      source === 'neutral'
        ? {
            ...family(source),
            ...Object.fromEntries(
              Object.entries(NEUTRAL_EXTRA_ROWS).map(([slot, row]) => [
                slot,
                resolveRow(row, mode, leaves),
              ]),
            ),
          }
        : family(source),
    ]),
  )

  const core = resolveTree(CORE, mode, leaves)

  return {
    ...families,
    poleWhite: Object.fromEntries(
      Object.entries(POLE_WHITE_ROWS).map(([slot, row]) => [slot, resolveRow(row, mode, leaves)]),
    ),
    ...core,
    action: {
      ...(core.action as Record<string, string>),
      hoverOpacity: OPACITY_ZEROS.hoverOpacity,
      selectedOpacity: OPACITY_ZEROS.selectedOpacity,
      focusOpacity: OPACITY_ZEROS.focusOpacity,
      activatedOpacity: OPACITY_ZEROS.activatedOpacity,
      disabledOpacity: DISABLED_OPACITY,
    },
    grey: Object.fromEntries(
      Object.entries(GREY).map(([rung, row]) => [rung, resolveRow(row, mode, leaves)]),
    ),
    ...Object.fromEntries(
      Object.entries(COMPONENTS).map(([name, rows]) => [
        name,
        Object.fromEntries(
          Object.entries(rows).map(([slot, row]) => [slot, resolveRow(row, mode, leaves)]),
        ),
      ]),
    ),
    link: Object.fromEntries(
      Object.entries(LINK).map(([slot, row]) => [slot, resolveRow(row, mode, leaves)]),
    ),
    surface: Object.fromEntries(
      Object.entries(SURFACE).map(([plane, row]) => [plane, resolveRow(row, mode, leaves)]),
    ),
  }
}

/** Seed → MUI colorSchemes palettes. The non-palette opacity table rides along. */
export function buildColorSchemes(seed: Seed) {
  const tables = leafTables(seed)
  return {
    light: { palette: buildPalette('light', tables.light), opacity: MODE_OPACITY },
    dark: { palette: buildPalette('dark', tables.dark), opacity: MODE_OPACITY },
  }
}

/** The zeroed derivation multipliers MUI reads from theme.vars.opacity.
 *  inputPlaceholder is 1 (not zeroed): the placeholder's honest color is
 *  text.secondary (lead-53) at full strength, pinned by the InputBase override
 *  — a multiplier over the input's ink is the same invented-intermediate shape
 *  as the disabled value (audit, cluster H addendum). */
const MODE_OPACITY = {
  inputPlaceholder: 1,
  inputUnderline: OPACITY_ZEROS.inputUnderline,
  switchTrackDisabled: OPACITY_ZEROS.switchTrackDisabled,
  switchTrack: OPACITY_ZEROS.switchTrack,
} as const
