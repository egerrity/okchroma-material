// The template dashboard (MUI's official Dashboard, okchroma-themed via
// shared-theme/themePrimitives) is the product surface. The two earlier builds
// stay reachable as legacy scaffolding with the live seed input.
//
// Dark mode: the template's own ColorModeIconDropdown and the legacy switch
// both drive the same data-mui-color-scheme attribute, which also selects the
// MD3 var set the md-scope chrome and Own build consume.
import { useMemo, useState } from 'react'
import { ThemeProvider, useColorScheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { resolveSeed, isHex, normalizeHex, DEFAULT_SEED } from './seed'
import { laneTokens } from './theme/tokens'
import { muiThemeFromTokens } from './theme/adapter-mui'
import { md3Css } from './theme/adapter-md3'
import Dashboard from './dashboard/Dashboard'
import { DashboardMui } from './views/DashboardMui'
import { DashboardOwn } from './views/DashboardOwn'
import { MdSwitch, MdField } from './md'

type Build = 'template' | 'mui' | 'own'

function TopBar({ build, setBuild }: { build: Build; setBuild: (b: Build) => void }) {
  const LABEL: Record<Build, string> = {
    template: 'Template (MUI Dashboard)',
    mui: 'Legacy MUI build',
    own: 'Legacy Own build',
  }
  return (
    <div
      className="md-scope"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 16px',
        borderBottom: '1px solid var(--md-sys-color-outline-variant)',
        background: 'var(--md-sys-color-surface-container)',
      }}
    >
      <strong style={{ fontSize: 13, marginRight: 10 }}>okchroma × Material PoC</strong>
      {(Object.keys(LABEL) as Build[]).map(b => (
        <button
          key={b}
          className={`md-btn ${build === b ? 'md-btn--tonal' : 'md-btn--text'}`}
          style={{ height: 32, padding: '0 14px' }}
          onClick={() => setBuild(b)}
        >
          {LABEL[b]}
        </button>
      ))}
    </div>
  )
}

function LegacyControls({
  seedInput,
  setSeedInput,
}: {
  seedInput: string
  setSeedInput: (v: string) => void
}) {
  const { mode, setMode } = useColorScheme()
  return (
    <div
      className="md-scope"
      style={{ display: 'flex', alignItems: 'end', gap: 16, padding: '8px 16px' }}
    >
      <MdField label="Brand seed hex (legacy views only)" value={seedInput} onChange={setSeedInput} />
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingBottom: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--md-sys-color-on-surface-variant)' }}>Dark</span>
        <MdSwitch checked={mode === 'dark'} onChange={v => setMode(v ? 'dark' : 'light')} label="Dark mode" />
      </div>
    </div>
  )
}

export default function App() {
  const [seedInput, setSeedInput] = useState(DEFAULT_SEED)
  const [build, setBuild] = useState<Build>('template')

  const hex = isHex(seedInput) ? normalizeHex(seedInput) : DEFAULT_SEED
  const seed = useMemo(() => resolveSeed(hex), [hex])
  const light = useMemo(() => laneTokens(seed, 'light'), [seed])
  const dark = useMemo(() => laneTokens(seed, 'dark'), [seed])
  const theme = useMemo(() => muiThemeFromTokens(light, dark), [light, dark])
  const roleCss = useMemo(() => md3Css(light, dark), [light, dark])

  return (
    <>
      <style>{roleCss}</style>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TopBar build={build} setBuild={setBuild} />
        {build === 'template' ? (
          <Dashboard />
        ) : (
          <ThemeProvider theme={theme} defaultMode="light">
            <CssBaseline />
            <LegacyControls seedInput={seedInput} setSeedInput={setSeedInput} />
            <div style={{ flex: 1 }}>{build === 'mui' ? <DashboardMui /> : <DashboardOwn />}</div>
          </ThemeProvider>
        )}
      </div>
    </>
  )
}
