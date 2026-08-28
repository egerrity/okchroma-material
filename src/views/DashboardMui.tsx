// The banking screen, MUI build — real library components, colors entirely from
// the okchroma-driven theme (see theme/adapter-mui.ts). Same content as Own.
import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Button,
  Chip,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Link,
  Alert,
  Stack,
  Box,
  Divider,
} from '@mui/material'
import HomeRounded from '@mui/icons-material/HomeRounded'
import AccountBalanceWalletRounded from '@mui/icons-material/AccountBalanceWalletRounded'
import SendRounded from '@mui/icons-material/SendRounded'
import CreditCardRounded from '@mui/icons-material/CreditCardRounded'
import SettingsRounded from '@mui/icons-material/SettingsRounded'
import { SpendChart } from '../components/SpendChart'
import { ACCOUNTS, TRANSACTIONS, STATUS_ROLE, BANK_NAME, money } from '../data'
import type { SignalRole } from '../seed'

const NAV = [
  { label: 'Home', icon: <HomeRounded /> },
  { label: 'Accounts', icon: <AccountBalanceWalletRounded /> },
  { label: 'Payments', icon: <SendRounded /> },
  { label: 'Cards', icon: <CreditCardRounded /> },
  { label: 'Settings', icon: <SettingsRounded /> },
]

const CHIP_COLOR: Record<SignalRole, 'success' | 'warning' | 'error' | 'info'> = {
  positive: 'success',
  warning: 'warning',
  critical: 'error',
  info: 'info',
}

const RAIL = 96

export function DashboardMui() {
  const [nav, setNav] = useState(0)
  const [transferOpen, setTransferOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', minHeight: '100%' }}>
      <Drawer
        variant="permanent"
        sx={{ width: RAIL, [`& .MuiDrawer-paper`]: { width: RAIL, position: 'relative' } }}
      >
        <List>
          {NAV.map((it, i) => (
            <ListItemButton
              key={it.label}
              selected={i === nav}
              onClick={() => setNav(i)}
              sx={{ flexDirection: 'column', py: 1.25 }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>{it.icon}</ListItemIcon>
              <ListItemText slotProps={{ primary: { sx: { fontSize: 12 } } }} primary={it.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flex: 1 }}>
              {BANK_NAME}
            </Typography>
            <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', width: 36, height: 36, fontSize: 14 }}>
              EG
            </Avatar>
          </Toolbar>
          <Divider />
        </AppBar>

        <Box component="main" sx={{ p: 3, display: 'grid', gap: 2 }}>
          {TRANSACTIONS.some(t => t.status === 'failed') && (
            <Alert severity="error">
              A wire transfer failed on Aug 25 — review and retry.
            </Alert>
          )}

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {ACCOUNTS.map(a => (
              <Card key={a.id} variant="outlined">
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    {a.name} · {a.number}
                  </Typography>
                  <Typography variant="h5">{money(a.balance)}</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                    <Button variant="contained" size="small">
                      Details
                    </Button>
                    {a.kind === 'credit' && (
                      <Button variant="outlined" size="small">
                        Pay card
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 2 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="overline" color="text.secondary">
                  Recent transactions
                </Typography>
                <List>
                  {TRANSACTIONS.map(t => (
                    <ListItemButton key={t.id} sx={{ borderRadius: 2, gap: 1.5 }}>
                      <ListItemText
                        primary={t.merchant}
                        secondary={`${t.date} · ${t.account}`}
                        slotProps={{ primary: { sx: { fontSize: 14 } }, secondary: { sx: { fontSize: 12 } } }}
                      />
                      <Chip size="small" color={CHIP_COLOR[STATUS_ROLE[t.status]]} label={t.status} />
                      <Typography sx={{ width: 90, textAlign: 'right', fontSize: 14 }}>
                        {money(t.amount)}
                      </Typography>
                    </ListItemButton>
                  ))}
                </List>
                <Link href="#all" sx={{ fontSize: 14 }}>
                  View all transactions
                </Link>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                  Spending this month
                </Typography>
                <SpendChart />
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Fab
          variant="extended"
          color="primary"
          onClick={() => setTransferOpen(true)}
          sx={{ position: 'fixed', right: 24, bottom: 24 }}
        >
          <SendRounded sx={{ mr: 1 }} />
          Transfer
        </Fab>

        <Dialog open={transferOpen} onClose={() => setTransferOpen(false)} fullWidth maxWidth="xs">
          <DialogTitle>Transfer money</DialogTitle>
          <DialogContent sx={{ display: 'grid', gap: 2, pt: '8px !important' }}>
            <TextField label="From" value="Everyday Checking •• 4821" size="small" />
            <TextField label="Amount" defaultValue="250.00" size="small" />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setTransferOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setTransferOpen(false)}>
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}
