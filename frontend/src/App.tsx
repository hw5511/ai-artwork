// frontend/src/App.tsx
import { lazy, Suspense } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CircularProgress, Box, Typography } from '@mui/material'
import { theme } from './styles/theme'
import Layout from './components/layout/Layout'

const LecturesMain = lazy(() => import('./pages/lectures/LecturesMain'))

const LecturesLoader = () => (
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh'
  }}>
    <CircularProgress size={40} />
    <Typography variant="body2" sx={{ mt: 2 }}>
      강의 내용을 불러오는 중...
    </Typography>
  </Box>
)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/lectures/session1/step1" replace />} />
            <Route path="/lectures" element={<Navigate to="/lectures/session1/step1" replace />} />
            <Route path="/lectures/:sessionId/:stepId" element={
              <Suspense fallback={<LecturesLoader />}>
                <LecturesMain />
              </Suspense>
            } />
            <Route path="*" element={<Navigate to="/lectures/session1/step1" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
