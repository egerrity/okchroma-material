// Hand-built MD3 components — consume only the --md-sys-color-* / --okx-* vars.
import { type ReactNode } from 'react'
import './md.css'
import type { SignalRole } from '../seed'
import { CloseIcon } from './icons'

export const MdAppBar = ({ title, children }: { title: string; children?: ReactNode }) => (
  <header className="md-appbar">
    <div className="md-appbar__title">{title}</div>
    {children}
    <div className="md-avatar">EG</div>
  </header>
)

export interface NavItem {
  label: string
  icon: ReactNode
}

export const MdNavRail = ({
  items,
  active,
  onSelect,
}: {
  items: NavItem[]
  active: number
  onSelect: (i: number) => void
}) => (
  <nav className="md-navrail">
    {items.map((it, i) => (
      <button
        key={it.label}
        className={`md-navrail__item${i === active ? ' is-active' : ''}`}
        onClick={() => onSelect(i)}
      >
        <span className="md-navrail__pill">{it.icon}</span>
        {it.label}
      </button>
    ))}
  </nav>
)

export const MdCard = ({ children, style }: { children: ReactNode; style?: React.CSSProperties }) => (
  <section className="md-card" style={style}>
    {children}
  </section>
)

export const MdButton = ({
  variant = 'filled',
  children,
  onClick,
}: {
  variant?: 'filled' | 'tonal' | 'outlined' | 'text'
  children: ReactNode
  onClick?: () => void
}) => (
  <button className={`md-btn md-btn--${variant}`} onClick={onClick}>
    {children}
  </button>
)

export const MdFab = ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
  <button className="md-fab" onClick={onClick}>
    {children}
  </button>
)

export const MdChip = ({ role, children }: { role: SignalRole; children: ReactNode }) => (
  <span className={`md-chip md-chip--${role}`}>
    <span className="md-chip__dot" />
    {children}
  </span>
)

export const MdSwitch = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) => (
  <button
    className="md-switch"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
  />
)

export const MdField = ({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) => (
  <label className="md-field">
    {label}
    <input value={value} onChange={e => onChange(e.target.value)} />
  </label>
)

export const MdDialog = ({
  open,
  title,
  onClose,
  children,
  actions,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  actions?: ReactNode
}) => {
  if (!open) return null
  return (
    <div className="md-scrim" onClick={onClose}>
      <div className="md-dialog" role="dialog" aria-label={title} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'start' }}>
          <h2 className="md-dialog__title" style={{ flex: 1 }}>
            {title}
          </h2>
          <button className="md-btn md-btn--text" onClick={onClose} aria-label="Close">
            <CloseIcon size={18} />
          </button>
        </div>
        {children}
        {actions && <div className="md-dialog__actions">{actions}</div>}
      </div>
    </div>
  )
}
