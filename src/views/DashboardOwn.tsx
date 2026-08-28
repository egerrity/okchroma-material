// The banking screen, Own build — hand-built MD3 components on the
// --md-sys-color-* / --okx-* vars. Same content as the MUI build.
import { useState } from 'react'
import {
  MdAppBar,
  MdNavRail,
  MdCard,
  MdButton,
  MdFab,
  MdChip,
  MdDialog,
  MdField,
} from '../md'
import { HomeIcon, WalletIcon, SendIcon, CardIcon, GearIcon } from '../md/icons'
import { SpendChart } from '../components/SpendChart'
import { ACCOUNTS, TRANSACTIONS, STATUS_ROLE, BANK_NAME, money } from '../data'

const NAV = [
  { label: 'Home', icon: <HomeIcon /> },
  { label: 'Accounts', icon: <WalletIcon /> },
  { label: 'Payments', icon: <SendIcon /> },
  { label: 'Cards', icon: <CardIcon /> },
  { label: 'Settings', icon: <GearIcon /> },
]

export function DashboardOwn() {
  const [nav, setNav] = useState(0)
  const [transferOpen, setTransferOpen] = useState(false)
  const [amount, setAmount] = useState('250.00')

  return (
    <div className="md-scope" style={{ display: 'flex', minHeight: '100%' }}>
      <MdNavRail items={NAV} active={nav} onSelect={setNav} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <MdAppBar title={BANK_NAME} />
        <main style={{ padding: 24, display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {ACCOUNTS.map(a => (
              <MdCard key={a.id}>
                <div className="md-card__label">
                  {a.name} · {a.number}
                </div>
                <div className="md-card__value">{money(a.balance)}</div>
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  <MdButton variant="tonal">Details</MdButton>
                  {a.kind === 'credit' && <MdButton variant="outlined">Pay card</MdButton>}
                </div>
              </MdCard>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
            <MdCard>
              <div className="md-card__label">Recent transactions</div>
              <ul className="md-list" style={{ marginTop: 8 }}>
                {TRANSACTIONS.map(t => (
                  <li key={t.id} className="md-list__item">
                    <div style={{ flex: 1 }}>
                      <div className="md-list__primary">{t.merchant}</div>
                      <div className="md-list__secondary">
                        {t.date} · {t.account}
                      </div>
                    </div>
                    <MdChip role={STATUS_ROLE[t.status]}>{t.status}</MdChip>
                    <div className="md-list__primary" style={{ width: 90, textAlign: 'right' }}>
                      {money(t.amount)}
                    </div>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 12 }}>
                <a className="md-link" href="#all">
                  View all transactions
                </a>
              </div>
            </MdCard>

            <MdCard>
              <div className="md-card__label" style={{ marginBottom: 12 }}>
                Spending this month
              </div>
              <SpendChart />
            </MdCard>
          </div>
        </main>

        <div style={{ position: 'fixed', right: 24, bottom: 24 }}>
          <MdFab onClick={() => setTransferOpen(true)}>
            <SendIcon size={20} />
            Transfer
          </MdFab>
        </div>

        <MdDialog
          open={transferOpen}
          title="Transfer money"
          onClose={() => setTransferOpen(false)}
          actions={
            <>
              <MdButton variant="text" onClick={() => setTransferOpen(false)}>
                Cancel
              </MdButton>
              <MdButton variant="filled" onClick={() => setTransferOpen(false)}>
                Send
              </MdButton>
            </>
          }
        >
          <div style={{ display: 'grid', gap: 12 }}>
            <MdField label="From — Everyday Checking •• 4821" value="" onChange={() => {}} />
            <MdField label="Amount" value={amount} onChange={setAmount} />
          </div>
        </MdDialog>
      </div>
    </div>
  )
}
