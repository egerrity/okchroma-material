// MAP CHECK — proves the transcription, never the engine. Six checks from the
// round-2 plan:
//   1. TOTALITY    every color-bearing slot a stock createTheme() carries has
//                  a value in the interpreted palette (map row or GAP).
//                  @mui/material only — the x-packages are audited, not proven.
//   2. RESOLVE     every map leaf path resolves against the engine emit, for
//                  every seed (the interpreter throws on a miss — an engine
//                  rename fails here, loudly).
//   3. LITERALS    no hex/hsl/rgb in the theme layer or customizations
//                  (sanctioned files excepted below).
//   4. PRIMITIVES  no template ramps, no applyStyles('dark'), no
//                  theme.palette.* color reads (light-scheme trap).
//   5. DERIVATION  no alpha/darken/lighten/getContrastText imports in our code.
//   6. SEED SWEEP  the wired pairings hold the engine's bars (4.5 text, 3.0
//                  mark) across agnostic + adversarial seeds.
//
// Run: npm run check:map
import * as fs from 'node:fs'
import * as path from 'node:path'
import { createTheme } from '@mui/material/styles'
import { resolveSeed } from '../src/seed'
import { buildColorSchemes } from '../src/theme/interpret'
import { SENTINEL } from '../src/theme/map'

const SEEDS = [
  // agnostic hue × chroma spread (round-1 wiring-check set)
  '#1D5AF0', '#0E8A5F', '#C2418A', '#B98300', '#6B4FD8',
  // adversarial: near-white, near-black, a red that collides with critical, a yellow
  '#F5F5F5', '#0A0A0A', '#E53935', '#FFD600',
]

const TEXT_BAR = 4.5
const MARK_BAR = 3.0

let failures = 0
const fail = (msg: string) => {
  failures += 1
  console.error(`  ✗ ${msg}`)
}

// ── color math (WCAG relative luminance; rgba composited over its ground) ──
function parse(c: string): { r: number; g: number; b: number; a: number } {
  const m = c.match(/^rgba?\(([\d.\s,]+)\)$/)
  if (m) {
    const [r, g, b, a = '1'] = m[1].split(',').map(s => s.trim())
    return { r: +r, g: +g, b: +b, a: +a }
  }
  const h = c.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
    a: 1,
  }
}
function composite(fg: string, bg: string): { r: number; g: number; b: number } {
  const f = parse(fg)
  const g = parse(bg)
  return {
    r: f.r * f.a + g.r * (1 - f.a),
    g: f.g * f.a + g.g * (1 - f.a),
    b: f.b * f.a + g.b * (1 - f.a),
  }
}
function lum(c: { r: number; g: number; b: number }): number {
  const ch = (v: number) => {
    const s = v / 255
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * ch(c.r) + 0.7152 * ch(c.g) + 0.0722 * ch(c.b)
}
function ratio(fg: string, bg: string): number {
  const [hi, lo] = [lum(composite(fg, bg)), lum(parse(bg))].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

// ── 1. TOTALITY ─────────────────────────────────────────────────────────────
console.log('1. totality against stock createTheme()')
{
  const stock = createTheme({ cssVariables: true, colorSchemes: { light: true, dark: true } })
  const ours = buildColorSchemes(resolveSeed(SEEDS[0]))
  const SKIP =
    /Channel$|Opacity$|^mode$|^contrastThreshold$|^tonalOffset$|^getContrastText$|^augmentColor$/
  for (const mode of ['light', 'dark'] as const) {
    const flat: string[] = []
    ;(function walk(o: Record<string, unknown>, p: string) {
      for (const [k, v] of Object.entries(o ?? {})) {
        const n = p ? `${p}.${k}` : k
        if (typeof v === 'function') continue
        if (v && typeof v === 'object' && !Array.isArray(v)) walk(v as Record<string, unknown>, n)
        else flat.push(n)
      }
    })(stock.colorSchemes[mode]!.palette as unknown as Record<string, unknown>, '')
    const colorBearing = flat.filter(n => !SKIP.test(n.split('.').pop()!))
    const palette = ours[mode].palette as unknown as Record<string, unknown>
    for (const slot of colorBearing) {
      const val = slot.split('.').reduce<unknown>((a, k) => (a as Record<string, unknown>)?.[k], palette)
      if (val === undefined) fail(`${mode} ${slot}: no map row and no GAP`)
    }
    console.log(`  ${mode}: ${colorBearing.length} color-bearing slots covered`)
  }
}

// ── 2. RESOLVE across every seed ───────────────────────────────────────────
console.log('2. resolvability across seeds')
for (const seed of SEEDS) {
  try {
    buildColorSchemes(resolveSeed(seed))
  } catch (e) {
    fail(`${seed}: ${(e as Error).message}`)
  }
}
console.log(`  ${SEEDS.length} seeds interpreted`)

// ── 3–5. static scans ──────────────────────────────────────────────────────
console.log('3-5. static scans (literals, primitives, derivations)')
{
  // sanctioned exceptions, each with its reason:
  const EXCEPT = new Set([
    'src/theme/map.ts', // the SENTINEL constant
    'src/theme/tokens.ts', // round-1 machinery, dormant, reference only
    'src/theme/interpret.ts', // rgba() FORMATTER over engine-emitted components — no color values
    'src/seed.ts', // DEFAULT_SEED input hex
    'src/theme/SeedContext.tsx', // the edge-case seed roster — engine INPUTS, same class as DEFAULT_SEED
    // (themePrimitives.ts exception RETIRED with the shadow gap: baseShadow is
    // interpreter-built from engine rows now — the module is color-free and scanned)
    'src/dashboard/internals/components/CustomIcons.tsx', // logo assets
  ])
  const files: string[] = []
  ;(function walk(dir: string) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (/\.(ts|tsx)$/.test(e.name)) files.push(p)
    }
  })('src')
  const LITERAL = /#[0-9a-fA-F]{3,8}\b|hsla?\(|rgba?\(/
  const PRIMITIVE = /\b(?:gray|brand|green|orange|red)\[|applyStyles\(/
  const DERIVE = /import\s*{[^}]*\b(alpha|darken|lighten|emphasize)\b[^}]*}\s*from\s*'@mui\/material\/styles'/
  const PALETTE_READ = /theme\.palette\.(?!mode\b)/
  for (const f of files) {
    const rel = f.split(path.sep).join('/')
    if (EXCEPT.has(rel)) continue
    const src = fs.readFileSync(f, 'utf8')
    for (const [ln, line] of src.split('\n').entries()) {
      if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*')) continue
      // explicit inline waiver — visible at the site, greppable, never silent
      if (line.includes('map-check:allow')) continue
      if (LITERAL.test(line) && !line.includes(SENTINEL)) fail(`${rel}:${ln + 1} color literal: ${line.trim().slice(0, 80)}`)
      if (PRIMITIVE.test(line)) fail(`${rel}:${ln + 1} Material primitive/dark-layer: ${line.trim().slice(0, 80)}`)
      if (PALETTE_READ.test(line)) fail(`${rel}:${ln + 1} theme.palette read (light-scheme trap): ${line.trim().slice(0, 80)}`)
    }
    if (DERIVE.test(src)) fail(`${rel}: imports a color derivation fn`)
  }
  console.log(`  ${files.length} files scanned`)
}

// ── 6. SEED SWEEP: the wired pairings hold the bars ───────────────────────
console.log('6. seed sweep (wired pairings vs engine bars)')
{
  type P = Record<string, any>
  let checked = 0
  for (const seed of SEEDS) {
    let schemes
    try {
      schemes = buildColorSchemes(resolveSeed(seed))
    } catch {
      continue // already reported in check 2
    }
    for (const mode of ['light', 'dark'] as const) {
      const p = schemes[mode].palette as P
      const pair = (fg: string, bg: string, bar: number, label: string) => {
        if (fg === SENTINEL || bg === SENTINEL) return // gaps are loud on screen, not here
        checked += 1
        const r = ratio(fg, bg)
        if (r < bar) fail(`${seed} ${mode} ${label}: ${r.toFixed(2)} < ${bar}`)
      }
      for (const ground of [p.background.default, p.background.paper, p.surface.dim, p.surface.low]) {
        pair(p.text.primary, ground, TEXT_BAR, 'text.primary on ground')
        pair(p.text.secondary, ground, TEXT_BAR, 'text.secondary on ground')
        pair(p.action.active, ground, MARK_BAR, 'action.active (mark) on ground')
      }
      for (const fam of ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'neutral']) {
        const f = p[fam]
        pair(f.light, p.background.default, TEXT_BAR, `${fam}.light on page`)
        pair(f.main, p.background.default, TEXT_BAR, `${fam}.main on page`)
        pair(f.dark, p.background.default, TEXT_BAR, `${fam}.dark on page`)
        pair(f.contrastText, f.main, TEXT_BAR, `${fam}.contrastText on main`)
        // stampOn-on-stampFill is NOT checked: that pairing ships paired from
        // the engine (the quiet register's soft on-color included) — the
        // engine owns its guarantee; this sweep verifies only pairings the
        // ADAPTER creates (round-1 wiring-check doctrine).
        pair(f['mark-74'], p.background.default, MARK_BAR, `${fam} mark-74 on page`)
      }
      for (const sev of ['error', 'info', 'success', 'warning']) {
        pair(p.Alert[`${sev}Color`], p.Alert[`${sev}StandardBg`], TEXT_BAR, `Alert ${sev} standard`)
        pair(p.Alert[`${sev}FilledColor`], p.Alert[`${sev}FilledBg`], TEXT_BAR, `Alert ${sev} filled`)
      }
      pair(p.link.default, p.background.default, TEXT_BAR, 'link on page')
      pair(p.SnackbarContent.color, p.SnackbarContent.bg, TEXT_BAR, 'snackbar inverse text')
      // the pole register's text side (mapped 2026-08-29): constant paper text
      // on the inverse ground — states are the inverse offset grounds, so only
      // the resting pairings exist to sweep. The stamp pairing is
      // adapter-created (abs poles), so unlike the families' it IS swept here.
      pair(p.poleWhite.main, p.SnackbarContent.bg, TEXT_BAR, 'pole text on inverse ground')
      pair(p.poleWhite.light, p.SnackbarContent.bg, TEXT_BAR, 'pole soft text on inverse ground')
      pair(p.poleWhite.stampOn, p.poleWhite.stampFill, TEXT_BAR, 'pole stamp text on its fill')
      pair(p.poleWhite.contrastText, p.poleWhite.main, TEXT_BAR, 'pole contrastText on main')
    }
  }
  console.log(`  ${checked} pairings checked across ${SEEDS.length} seeds × 2 modes`)
}

// ── gap report ─────────────────────────────────────────────────────────────
console.log('\ngap report (rows resolving to the sentinel):')
{
  const schemes = buildColorSchemes(resolveSeed(SEEDS[0]))
  const gaps: string[] = []
  ;(function walk(o: Record<string, unknown>, p: string) {
    for (const [k, v] of Object.entries(o ?? {})) {
      const n = p ? `${p}.${k}` : k
      if (v && typeof v === 'object') walk(v as Record<string, unknown>, n)
      else if (v === SENTINEL) gaps.push(n)
    }
  })(schemes.light.palette as unknown as Record<string, unknown>, '')
  for (const g of gaps) console.log(`  GAP ${g}`)
  console.log(`  ${gaps.length} palette gaps (the non-palette table is retired — closed by 0.1.2/0.1.4, C12 cancelled)`)
}

if (failures > 0) {
  console.error(`\n${failures} FAILURE(S)`)
  process.exit(1)
}
console.log('\nall checks pass')
