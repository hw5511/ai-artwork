import { AppBar, Toolbar, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

interface NavigationProps {
  onMenuClick?: () => void
}

const Navigation = ({ onMenuClick }: NavigationProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <AppBar position="static" elevation={0} sx={{
      background: '#000000',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
    }}>
      <Toolbar sx={{
        minHeight: isMobile ? '56px' : '64px',
        px: isMobile ? 1.5 : 4,
        gap: 1,
      }}>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="강의 목차 열기"
            onClick={onMenuClick}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
            fontWeight: 400,
            color: '#ffffff',
            fontSize: isMobile ? '18px' : '24px',
            letterSpacing: isMobile ? '2px' : '4px',
          }}
        >
          {isMobile ? 'AI LECTURES' : 'AI ARTWORK LECTURES'}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
