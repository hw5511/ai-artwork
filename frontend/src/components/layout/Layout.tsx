import { Box, Container, useTheme, useMediaQuery } from '@mui/material'
import Navigation from './Navigation'
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))
  const location = useLocation()

  // 강의 페이지에서는 Navigation을 숨김 (LecturesMain에서 자체적으로 렌더링)
  const isLecturesPage = location.pathname.startsWith('/lectures')

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: 'rgba(255, 255, 255, 0.9)',
      // Safe Area 대응 (iOS/Android 노치)
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)',
      paddingLeft: 'env(safe-area-inset-left)',
      paddingRight: 'env(safe-area-inset-right)',
    }}>
      {!isLecturesPage && <Navigation />}
      <Box component="main" sx={{
        flexGrow: 1,
        backgroundColor: '#000000',
        // Dynamic Spacing - 화면 크기별 padding 조정
        p: isMobile ? 1 : isTablet ? 2 : 3,
        // Container 최적화
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden', // 가로 스크롤 방지
      }}>
        <Container
          maxWidth={false}
          sx={{
            // 화면 크기별 최대 너비 설정 - 여백 문제 해결
            maxWidth: '100%', // 전체 너비 사용
            px: isMobile ? 1 : 2,
            py: 0,
            // 중앙 정렬
            mx: 'auto',
            // 부드러운 전환 효과
            transition: theme.transitions.create(['padding', 'max-width'], {
              duration: theme.transitions.duration.standard,
            }),
          }}
          disableGutters={isMobile}
        >
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default Layout