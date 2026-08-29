// Round 1 handoff state: the demo structure stays; ALL theming is stock MUI
// template values. Round 2 begins with the top-down mapping spec (see
// docs/round-1-failures.md) before any implementation.
import { useEffect, useState } from 'react'
import Dashboard from './dashboard/Dashboard'
import DocsSite from './docs/DocsSite'
import { SeedProvider } from './theme/SeedContext'

export default function App() {
  const [route, setRoute] = useState(window.location.hash)
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return (
    <SeedProvider>
      {route.startsWith('#/docs') ? <DocsSite route={route} /> : <Dashboard />}
    </SeedProvider>
  )
}
