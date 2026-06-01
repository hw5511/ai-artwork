import React from 'react'
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

interface Step {
  id: string
  title: string
  file: string
  hidden?: boolean
}

interface Session {
  id: string
  title: string
  steps: Step[]
}

interface LecturesSidebarProps {
  session: Session | undefined
  selectedStepId: string
  selectedFile: string
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
  onStepClick: (stepId: string, file: string) => void
}

export const LecturesSidebar: React.FC<LecturesSidebarProps> = ({
  session,
  selectedStepId,
  selectedFile: _selectedFile,
  sidebarCollapsed,
  onToggleSidebar,
  onStepClick
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <>
      {/* 접기/펼치기 버튼 - 데스크톱에서만 표시 */}
      {!isMobile && (
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            py: 1,
            mb: sidebarCollapsed ? 0 : 1,
            width: sidebarCollapsed ? 60 : 'auto',
            transition: 'width 0.3s ease',
          }}
        >
          <Tooltip title={sidebarCollapsed ? "펼치기" : "접기"} placement={sidebarCollapsed ? "right" : "bottom"}>
            <IconButton
              onClick={onToggleSidebar}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.9)',
                width: 36,
                height: 36,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  transform: 'scale(1.1)',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {sidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* 사이드바 - 반응형 */}
      <Box
        sx={{
          width: isMobile ? '100%' : (sidebarCollapsed ? 60 : (isTablet ? 280 : 300)),
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          maxHeight: isMobile ? '50vh' : 'none',
          borderBottom: isMobile ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          borderRight: !isMobile ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          position: 'relative',
          transition: 'width 0.3s ease',
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: sidebarCollapsed ? 'hidden' : 'auto',
            p: sidebarCollapsed ? 0 : (isMobile ? 1 : 2),
            '&::-webkit-scrollbar': { width: 4 },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.2)',
              '&:hover': { background: 'rgba(255, 255, 255, 0.3)' }
            }
          }}
        >
        {!sidebarCollapsed && session && (
          <Box>
            <Typography
              variant={isMobile ? 'body1' : 'h6'}
              sx={{
                color: 'rgba(255,255,255,0.95)',
                fontWeight: 600,
                px: isMobile ? 2 : 3,
                py: isMobile ? 1.5 : 2,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                mb: 1,
                backgroundColor: 'rgba(255,255,255,0.03)',
              }}
            >
              {session.title}
            </Typography>
            <List dense={isMobile}>
              {session.steps.filter(step => !step.hidden).map((step) => (
                <ListItemButton
                  key={step.id}
                  selected={selectedStepId === step.id}
                  onClick={() => onStepClick(step.id, step.file)}
                  sx={{
                    pl: isMobile ? 3 : 4,
                    pr: isMobile ? 2 : 3,
                    py: isMobile ? 1 : 1.25,
                    color: 'rgba(255,255,255,0.7)',
                    borderRadius: '4px',
                    mx: isMobile ? 1 : 1.5,
                    mb: 0.5,
                    transition: 'all 0.2s ease',
                    '&.Mui-selected': {
                      bgcolor: 'rgba(255,255,255,0.12)',
                      color: '#ffffff',
                      borderLeft: '3px solid #ffffff',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.15)',
                      }
                    },
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.06)',
                      transform: 'translateX(4px)',
                    }
                  }}
                >
                  <ListItemText
                    primary={step.title}
                    primaryTypographyProps={{
                      variant: isMobile ? 'body2' : 'body1'
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        )}
        </Box>
      </Box>
    </>
  )
}
