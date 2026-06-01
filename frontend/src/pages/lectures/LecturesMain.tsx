import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navigation from '../../components/layout/Navigation'
import { ImageWithLoader } from '../../components/lectures/ImageWithLoader'
import { VideoPlayer } from '../../components/lectures/VideoPlayer'
import { DownloadButton } from '../../components/common/DownloadButton'
import { LecturesSidebar } from '../../components/lectures/LecturesSidebar'
import { processImageTags, processDownloadTags, processVideoTags, processSectionDividers } from '../../utils/lectures/markdownProcessors'
import { createMarkdownComponents } from '../../utils/lectures/markdownComponents'
import { TOC_DATA, type Session } from '../../data/tocData'
import { LECTURE_CONTENTS } from '../../data/lectureContents'
import {
  Box,
  Typography,
  Snackbar,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

const LecturesMain = () => {
  const { sessionId, stepId } = useParams<{ sessionId: string; stepId: string }>()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))

  // 환경변수로 세션 필터링 (빌드 시 지정)
  const SESSION_FILTER = import.meta.env.VITE_SESSION_FILTER || ''

  const [toc, setToc] = useState<Session[]>([])
  const [selectedFile, setSelectedFile] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [copySuccess, setCopySuccess] = useState<boolean>(false)
  const [copyError, setCopyError] = useState<boolean>(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false)

  // 목차 로드
  useEffect(() => {
    // SESSION_FILTER가 지정된 경우 해당 세션만 필터링
    const filteredData = SESSION_FILTER
      ? TOC_DATA.filter(session => session.id === SESSION_FILTER)
      : TOC_DATA
    setToc(filteredData)

    // URL 파라미터 기반으로 초기 콘텐츠 로드
    if (sessionId && stepId) {
      // URL 파라미터에 해당하는 스텝 찾기
      const targetSession = filteredData.find(session => session.id === sessionId)
      const targetStep = targetSession?.steps.find(step => step.id === stepId)

      if (targetSession && targetStep) {
        loadContent(targetStep.file)
      } else {
        // 유효하지 않은 파라미터면 첫 번째로 이동
        if (filteredData.length > 0 && filteredData[0].steps.length > 0) {
          navigate(`/lectures/${filteredData[0].id}/${filteredData[0].steps[0].id}`, { replace: true })
        }
      }
    } else {
      // 파라미터가 없으면 첫 번째 세션의 첫 번째 스텝으로 이동
      if (filteredData.length > 0 && filteredData[0].steps.length > 0) {
        navigate(`/lectures/${filteredData[0].id}/${filteredData[0].steps[0].id}`, { replace: true })
      }
    }
  }, [sessionId, stepId, navigate, SESSION_FILTER])

  // URL 파라미터 변경 감지
  useEffect(() => {
    if (sessionId && stepId && toc.length > 0) {
      const targetSession = toc.find(session => session.id === sessionId)
      const targetStep = targetSession?.steps.find(step => step.id === stepId)

      if (targetSession && targetStep) {
        // 현재 선택된 파일과 다를 때만 로드
        if (selectedFile !== targetStep.file) {
          loadContent(targetStep.file)
        }
      }
    }
  }, [sessionId, stepId, toc, selectedFile])

  // 콘텐츠 로드
  const loadContent = (fileName: string) => {
    setLoading(true)
    setSelectedFile(fileName)

    try {
      // LECTURE_CONTENTS에서 직접 가져오기
      const text = LECTURE_CONTENTS[fileName]

      if (!text) {
        throw new Error(`Content not found: ${fileName}`)
      }

      // 이미지 태그, 동영상 태그, 다운로드 태그, 섹션 구분자 전처리 적용
      let processedContent = processImageTags(text)
      processedContent = processVideoTags(processedContent)
      processedContent = processDownloadTags(processedContent)
      processedContent = processSectionDividers(processedContent)
      setContent(processedContent)
    } catch (err) {
      console.error('Failed to load content:', err)
      setContent('콘텐츠를 불러올 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 복사 함수 (fallback 메커니즘 포함)
  const handleCopy = async (code: string) => {
    try {
      // 먼저 modern clipboard API 시도
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code)
        setCopySuccess(true)
        setCopyError(false)
      } else {
        // fallback: execCommand 사용
        const textArea = document.createElement('textarea')
        textArea.value = code
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()

        try {
          const successful = document.execCommand('copy')
          if (successful) {
            setCopySuccess(true)
            setCopyError(false)
          } else {
            throw new Error('execCommand failed')
          }
        } finally {
          document.body.removeChild(textArea)
        }
      }
    } catch (err) {
      console.error('Failed to copy:', err)
      setCopyError(true)
      setCopySuccess(false)
    }
  }


  // 사이드바 토글 핸들러
  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // 스텝 클릭 핸들러
  const handleStepClick = (stepId: string, file: string) => {
    loadContent(file)
    navigate(`/lectures/${sessionId}/${stepId}`)
  }

  // 세션 변경 핸들러 (Navigation 탭 클릭 시)
  const handleSessionChange = (newSessionId: string) => {
    // 새로운 세션의 첫 번째 스텝으로 이동
    const targetSession = toc.find(session => session.id === newSessionId)
    if (targetSession && targetSession.steps.length > 0) {
      navigate(`/lectures/${newSessionId}/${targetSession.steps[0].id}`)
    }
  }

  // 마크다운 컴포넌트 생성
  const markdownComponents = createMarkdownComponents({
    onCopy: handleCopy,
    ImageComponent: ImageWithLoader,
    DownloadButton: DownloadButton,
    VideoPlayer: VideoPlayer
  })

  // 현재 세션 찾기
  const currentSession = toc.find(session => session.id === sessionId)

  return (
    <>
      {/* Navigation 컴포넌트 */}
      <Navigation
        currentSessionId={sessionId || 'session1'}
        onSessionChange={handleSessionChange}
        sessionFilter={SESSION_FILTER}
      />

      {/* 콘텐츠 영역 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          minHeight: isMobile ? 'auto' : 'calc(100vh - 112px)',
          bgcolor: 'transparent',
          // 모바일에서는 Container 여백 제거
          mx: isMobile ? -1 : 0,
          px: isMobile ? 0 : 0,
        }}
      >

        {/* 사이드바 컴포넌트 */}
        <LecturesSidebar
          session={currentSession}
          selectedStepId={stepId || ''}
          selectedFile={selectedFile}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={handleToggleSidebar}
          onStepClick={handleStepClick}
        />

        {/* 콘텐츠 영역 - 반응형 */}
        <Box
          sx={{
            flex: 1,
            px: isMobile ? 2 : isTablet ? 4 : 6,
            py: isMobile ? 2 : 4,
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: 6,
              height: 6,
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 10,
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 10,
              '&:hover': {
                background: 'rgba(255,255,255,0.35)'
              }
            }
          }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : content ? (
            <ReactMarkdown
              components={markdownComponents}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {content}
            </ReactMarkdown>
          ) : (
            <Typography color="text.secondary">
              왼쪽 목차에서 강의를 선택하세요
            </Typography>
          )}
        </Box>
      </Box>

      {/* 복사 성공 알림 */}
      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        message="클립보드에 복사되었습니다!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />

      {/* 복사 실패 알림 */}
      <Snackbar
        open={copyError}
        autoHideDuration={3000}
        onClose={() => setCopyError(false)}
        message="복사에 실패했습니다. 다시 시도해주세요."
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: {
            bgcolor: 'error.main',
            color: 'white'
          }
        }}
      />
    </>
  )
}

export default LecturesMain