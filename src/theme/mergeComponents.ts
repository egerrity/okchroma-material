// Slot-wise component-override composition — the array-merge pattern from
// docs/customizing-mui.md ("Component overrides merge by ARRAY syntax so the
// branded variants, states, and pseudo-class styles survive"). A flat object
// spread would let an area file silently clobber a law; this keeps every
// layer's styles in the cascade, later layers extending earlier ones.

import type { Theme, ThemeOptions, Components } from '@mui/material/styles'

type AnyRecord = Record<string, unknown>
type ComponentsLayer = Components<Theme> | ThemeOptions['components'] | undefined

export function mergeComponents(...layers: ComponentsLayer[]): ThemeOptions['components'] {
  const out: AnyRecord = {}
  for (const layer of layers) {
    if (!layer) continue
    for (const [component, entry] of Object.entries(layer as AnyRecord)) {
      const prev = out[component] as AnyRecord | undefined
      if (!prev) {
        out[component] = { ...(entry as AnyRecord) }
        continue
      }
      const next = entry as AnyRecord
      const merged: AnyRecord = { ...prev, ...next }
      if (prev.defaultProps || next.defaultProps) {
        merged.defaultProps = { ...(prev.defaultProps as AnyRecord), ...(next.defaultProps as AnyRecord) }
      }
      if (prev.styleOverrides || next.styleOverrides) {
        const slots: AnyRecord = { ...(prev.styleOverrides as AnyRecord) }
        for (const [slot, style] of Object.entries((next.styleOverrides as AnyRecord) ?? {})) {
          const existing = slots[slot]
          slots[slot] =
            existing === undefined
              ? style
              : ([] as unknown[]).concat(existing as unknown[], style as unknown[])
        }
        merged.styleOverrides = slots
      }
      out[component] = merged
    }
  }
  return out as Components<Theme>
}
