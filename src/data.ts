// Fictional placeholder data — no real bank branding.
import type { SignalRole } from './seed'

export const BANK_NAME = 'Meridian Bank'

export interface Account {
  id: string
  name: string
  number: string
  balance: number
  kind: 'checking' | 'savings' | 'credit'
}

export const ACCOUNTS: Account[] = [
  { id: 'chk', name: 'Everyday Checking', number: '•• 4821', balance: 12480.32, kind: 'checking' },
  { id: 'sav', name: 'High-Yield Savings', number: '•• 7310', balance: 48210.09, kind: 'savings' },
  { id: 'cc', name: 'Meridian Rewards Card', number: '•• 9954', balance: -1240.55, kind: 'credit' },
]

export type TxStatus = 'cleared' | 'pending' | 'failed'

// status → signal role, by identity of the state (never by hue)
export const STATUS_ROLE: Record<TxStatus, SignalRole> = {
  cleared: 'positive',
  pending: 'warning',
  failed: 'critical',
}

export interface Tx {
  id: string
  date: string
  merchant: string
  account: string
  amount: number
  status: TxStatus
}

export const TRANSACTIONS: Tx[] = [
  { id: 't1', date: 'Aug 27', merchant: 'Whole Harvest Market', account: '•• 4821', amount: -84.12, status: 'cleared' },
  { id: 't2', date: 'Aug 27', merchant: 'Transit Authority', account: '•• 4821', amount: -2.9, status: 'cleared' },
  { id: 't3', date: 'Aug 26', merchant: 'Acme Payroll', account: '•• 4821', amount: 3120.0, status: 'cleared' },
  { id: 't4', date: 'Aug 26', merchant: 'Bluebird Coffee', account: '•• 9954', amount: -6.75, status: 'pending' },
  { id: 't5', date: 'Aug 25', merchant: 'Wire — R. Alvarez', account: '•• 4821', amount: -500.0, status: 'failed' },
  { id: 't6', date: 'Aug 25', merchant: 'City Utilities', account: '•• 4821', amount: -142.6, status: 'cleared' },
  { id: 't7', date: 'Aug 24', merchant: 'Nimbus Streaming', account: '•• 9954', amount: -15.99, status: 'pending' },
  { id: 't8', date: 'Aug 23', merchant: 'Savings transfer', account: '•• 7310', amount: 750.0, status: 'cleared' },
]

export interface SpendCategory {
  category: string
  amount: number
}

export const SPENDING: SpendCategory[] = [
  { category: 'Housing', amount: 2100 },
  { category: 'Groceries', amount: 640 },
  { category: 'Transport', amount: 310 },
  { category: 'Dining', amount: 285 },
  { category: 'Utilities', amount: 190 },
  { category: 'Entertainment', amount: 145 },
]

export const money = (v: number): string =>
  (v < 0 ? '−' : '') +
  '$' +
  Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
