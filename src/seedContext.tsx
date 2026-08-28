// One seed, app-wide: brand + brand-alt hexes feed buildColorSchemes and the
// header's color pickers.
import { createContext, useContext } from 'react'
import { DEFAULT_SEED } from './seed'

export interface SeedState {
  brandHex: string
  altHex: string | null
  setBrandHex: (hex: string) => void
  setAltHex: (hex: string | null) => void
}

export const SeedContext = createContext<SeedState>({
  brandHex: DEFAULT_SEED,
  altHex: null,
  setBrandHex: () => {},
  setAltHex: () => {},
})

export const useSeed = () => useContext(SeedContext)
