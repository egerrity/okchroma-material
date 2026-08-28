// One seed drives everything: hex → resolveSeed → LaneTokens → both adapters.
// The MUI build and the Own build re-theme together, light and dark, from the
// same values. The mode attribute MUI toggles ([data-mui-color-scheme]) also
// selects the MD3 var set, so one switch flips both lanes.
import { useMemo, useState } from 'react'
import { ThemeProvider, useColorScheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { resolveSeed, isHex, normalizeHex, DEFAULT_SEED } from './seed'
import { laneTokens } from './theme/tokens'
import { muiThemeFromTokens } from './theme/adapter-mui'
import { md3Css } from './theme/adapter-md3'
import { DashboardMui } from './views/DashboardMui'
import { DashboardOwn } from './views/DashboardOwn'
import { MdSwitch, MdField } from './md'

type Build = 'mui' | 'own'

function Controls({
  build,
  setBuild,
  seedInput,
  setSeedInput,
}: {
  build: Build
  setBuild: (b: Build) => void
  seedInput: string
  setSeedInput: (v: string) => void
}) {
  const { mode, setMode } = useColorScheme()
  const dark = mode === 'dark'
  return (
    <div
      className="md-scope"
      style={{
        display: 'flex',
        alignItems: 'end',
        gap: 16,
        padding: '10px 16px',
        borderBottom: '1px solid var(--md-sys-color-outline-variant)',
        background: 'var(--md-sys-color-surface-container)',
      }}
    >
      <strong style={{ fontSize: 13, alignSelf: 'center' }}>okchroma × Material PoC</strong>
      <div style={{ display: 'flex', gap: 6, alignSelf: 'center' }}>
        {(['mui', 'own'] as Build[]).map(b => (
          <button
            key={b}
            className={`md-btn ${build === b ? 'md-btn--tonal' : 'md-btn--text'}`}
            style={{ height: 32, padding: '0 14px' }}
            onClick={() => setBuild(b)}
          >
            {b === 'mui' ? 'Library build (MUI)' : 'Own build (MD3)'}
          </button>
        ))}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 16, alignItems: 'end' }}>
        <MdField label="Brand seed hex" value={seedInput} onChange={setSeedInput} />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingBottom: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--md-sys-color-on-surface-variant)' }}>Dark</span>
          <MdSwitch checked={dark} onChange={v => setMode(v ? 'dark' : 'light')} label="Dark mode" />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [seedInput, setSeedInput] = useState(DEFAULT_SEED)
  const [build, setBuild] = useState<Build>('mui')

  const hex = isHex(seedInput) ? normalizeHex(seedInput) : DEFAULT_SEED
  const seed = useMemo(() => resolveSeed(hex), [hex])
  const light = useMemo(() => laneTokens(seed, 'light'), [seed])
  const dark = useMemo(() => laneTokens(seed, 'dark'), [seed])
  const theme = useMemo(() => muiThemeFromTokens(light, dark), [light, dark])
  const roleCss = useMemo(() => md3Css(light, dark), [light, dark])

  return (
    <ThemeProvider theme={theme} defaultMode="light">
      <CssBaseline />
      <style>{roleCss}</style>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Controls build={build} setBuild={setBuild} seedInput={seedInput} setSeedInput={setSeedInput} />
        <div style={{ flex: 1 }}>{build === 'mui' ? <DashboardMui /> : <DashboardOwn />}</div>
      </div>
    </ThemeProvider>
  )
}
