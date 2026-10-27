import React from 'react'
import {
  Box,
  Chip,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'

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
  sessions: Session[]
  currentSessionId?: string
  selectedStepId: string
  sidebarCollapsed: boolean
  mobileOpen: boolean
  onToggleSidebar: () => void
  onMobileClose: () => void
  onStepClick: (sessionId: string, stepId: string, file: string) => void
}

const SidebarContents = ({
  sessions,
  currentSessionId,
  selectedStepId,
  onStepClick,
  onMobileClose,
  isMobile,
}: Pick<LecturesSidebarProps, 'sessions' | 'currentSessionId' | 'selectedStepId' | 'onStepClick' | 'onMobileClose'> & { isMobile: boolean }) => (
  <Box sx={{ py: 1.5, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
    {isMobile && (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pb: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>강의 목차</Typography>
        <IconButton color="inherit" aria-label="강의 목차 닫기" onClick={onMobileClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    )}
    <List disablePadding>
      {sessions.map((session) => {
        const availableSteps = session.steps.filter(step => !step.hidden)
        const pending = availableSteps.length === 0
        return (
          <Box key={session.id} sx={{ mb: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                px: 2.5,
                py: 1,
                color: currentSessionId === session.id ? '#fff' : 'rgba(255,255,255,0.78)',
                wordBreak: 'keep-all',
                overflowWrap: 'break-word',
              }}
            >
              <Typography
                variant="body1"
                fontWeight={currentSessionId === session.id ? 700 : 600}
                sx={{ minWidth: 0, wordBreak: 'keep-all', overflowWrap: 'break-word' }}
              >
                {session.title}
              </Typography>
              {pending && (
                <Chip
                  label="준비 중"
                  size="small"
                  sx={{
                    height: 22,
                    flexShrink: 0,
                    color: 'rgba(255,255,255,0.55)',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    fontSize: '0.72rem',
                  }}
                />
              )}
            </Box>
            {availableSteps.length > 0 && (
              <List disablePadding>
                {availableSteps.map((step, index) => {
                  const selected = currentSessionId === session.id && selectedStepId === step.id
                  return (
                    <ListItemButton
                      key={`${session.id}-${step.id}`}
                      selected={selected}
                      onClick={() => onStepClick(session.id, step.id, step.file)}
                      sx={{
                        mx: 1.5,
                        mb: 0.25,
                        pl: 3,
                        pr: 2,
                        py: 0.85,
                        borderRadius: 1,
                        color: 'rgba(255,255,255,0.66)',
                        alignItems: 'flex-start',
                        '&.Mui-selected': {
                          bgcolor: 'rgba(255,255,255,0.14)',
                          color: '#fff',
                        },
                        '&.Mui-selected:hover': { bgcolor: 'rgba(255,255,255,0.17)' },
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.07)' },
                      }}
                    >
                      <ListItemText
                        primary={`${index + 1}. ${step.title}`}
                        primaryTypographyProps={{
                          variant: 'body2',
                          lineHeight: 1.45,
                          sx: { wordBreak: 'keep-all', overflowWrap: 'break-word' },
                        }}
                      />
                    </ListItemButton>
                  )
                })}
              </List>
            )}
          </Box>
        )
      })}
    </List>
  </Box>
)

export const LecturesSidebar: React.FC<LecturesSidebarProps> = (props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={props.mobileOpen}
        onClose={props.onMobileClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 'min(354px, calc(100vw - 36px))',
            bgcolor: '#0a0a0a',
            color: '#fff',
            overflowX: 'hidden',
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
          },
        }}
      >
        <SidebarContents {...props} isMobile />
      </Drawer>
    )
  }

  return (
    <Box
      component="aside"
      sx={{
        width: props.sidebarCollapsed ? 64 : 330,
        flexShrink: 0,
        borderRight: '1px solid rgba(255,255,255,0.1)',
        transition: 'width 0.2s ease',
        overflow: 'hidden',
        wordBreak: 'keep-all',
        overflowWrap: 'break-word',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <Tooltip title={props.sidebarCollapsed ? '목차 펼치기' : '목차 접기'}>
          <IconButton color="inherit" onClick={props.onToggleSidebar} size="small">
            {props.sidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      {!props.sidebarCollapsed && (
        <Box sx={{ height: 'calc(100vh - 112px)', overflowY: 'auto' }}>
          <SidebarContents {...props} isMobile={false} />
        </Box>
      )}
    </Box>
  )
}
