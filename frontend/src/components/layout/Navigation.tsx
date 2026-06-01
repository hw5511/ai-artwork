// frontend/src/components/layout/Navigation.tsx
import { AppBar, Toolbar, Typography, useTheme, useMediaQuery, Tabs, Tab } from '@mui/material'

interface NavigationProps {
  currentSessionId?: string
  onSessionChange?: (sessionId: string) => void
  sessionFilter?: string  // 특정 세션만 표시
}

const Navigation = ({ currentSessionId = 'session1', onSessionChange, sessionFilter }: NavigationProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    onSessionChange?.(newValue)
  }

  // sessionFilter가 지정된 경우 해당 세션만 표시
  const sessions = sessionFilter ? [
    { label: sessionFilter === 'session1' ? '1회차' :
             sessionFilter === 'session2' ? '2회차' :
             sessionFilter === 'session3' ? '3회차' : '4회차', value: sessionFilter }
  ] : [
    { label: '1회차', value: 'session1' },
    { label: '2회차', value: 'session2' },
    { label: '3회차', value: 'session3' },
    { label: '4회차', value: 'session4' }
  ]

  return (
    <AppBar position="static" elevation={0} sx={{
      background: '#000000',
      borderBottom: '0.5px solid rgba(255,255,255,0.1)',
    }}>
      <Toolbar sx={{
        minHeight: isMobile ? '56px' : '64px',
        px: isMobile ? 2 : 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
            fontWeight: 400,
            color: '#ffffff',
            fontSize: isMobile ? '18px' : '24px',
            letterSpacing: isMobile ? '2px' : '4px',
            flexShrink: 0,
          }}
        >
          {isMobile ? 'AI LECTURES' : 'AI ARTWORK LECTURES'}
        </Typography>

        <Tabs
          value={currentSessionId}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
          sx={{
            flexShrink: 1,
            minWidth: 0,
            '& .MuiTabs-indicator': {
              backgroundColor: '#ffffff',
              height: 3,
            },
            '& .MuiTab-root': {
              color: 'rgba(255,255,255,0.6)',
              fontSize: isMobile ? '12px' : '14px',
              fontWeight: 500,
              minHeight: isMobile ? 48 : 56,
              minWidth: isMobile ? 60 : 80,
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: 'rgba(255,255,255,0.9)',
                backgroundColor: 'rgba(255,255,255,0.05)',
              },
              '&.Mui-selected': {
                color: '#ffffff',
                fontWeight: 600,
              }
            }
          }}
        >
          {sessions.map(session => (
            <Tab key={session.value} label={session.label} value={session.value} />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
