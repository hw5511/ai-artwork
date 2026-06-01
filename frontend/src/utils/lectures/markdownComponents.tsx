import { Box, Typography, IconButton } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

interface MarkdownComponentsProps {
  onCopy: (code: string) => void
  ImageComponent: React.ComponentType<any>
  DownloadButton: React.ComponentType<{file: string; text: string}>
  VideoPlayer: React.ComponentType<{file: string; width?: string; caption?: string}>
}

export const createMarkdownComponents = ({
  onCopy,
  ImageComponent,
  DownloadButton,
  VideoPlayer
}: MarkdownComponentsProps) => ({
  // 코드블록 커스텀 렌더링
  code({ inline, className, children, ...props }: any) {
    // children이 undefined나 null일 수 있으므로 안전하게 처리
    const codeString = children ? String(children).replace(/\n$/, '') : ''

    // className도 안전하게 처리
    const classNameStr = className ? String(className) : ''

    if (!inline && classNameStr) {
      return (
        <Box position="relative" my={4}>
          <Box
            component="pre"
            sx={{
              bgcolor: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              p: 2,
              overflow: 'auto',
              borderRadius: 0,
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            <IconButton
              size="small"
              onClick={() => onCopy(codeString)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'rgba(255,255,255,0.6)',
                bgcolor: 'rgba(0,0,0,0.8)',
                '&:hover': {
                  color: '#ffffff',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
            <code className={className} {...props}>{children}</code>
          </Box>
        </Box>
      )
    }

    // 인라인 코드
    return (
      <code
        style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '2px 6px',
          borderRadius: '3px'
        }}
        {...props}
      >
        {children}
      </code>
    )
  },
  // 이미지 렌더링 - 로딩 상태와 에러 처리 포함
  img: ({ src, alt, title, style, className, ...props }: any) => (
    <ImageComponent
      src={src}
      alt={alt}
      title={title}
      style={style}
      className={className}
      {...props}
    />
  ),
  // 기타 마크다운 요소 스타일
  h1: ({ children }: any) => (
    <Typography variant="h1" sx={{ mb: 5, fontWeight: 600, color: '#ffffff' }}>{children}</Typography>
  ),
  h2: ({ children }: any) => (
    <Typography variant="h2" sx={{ mt: 6, mb: 3, fontWeight: 600, color: 'rgba(255, 255, 255, 0.95)' }}>{children}</Typography>
  ),
  h3: ({ children }: any) => (
    <Typography variant="h3" sx={{ mt: 4, mb: 2, fontWeight: 500, color: 'rgba(255, 255, 255, 0.9)' }}>{children}</Typography>
  ),
  p: ({ children }: any) => (
    <Typography sx={{ mb: 3, lineHeight: 1.9, color: 'rgba(255, 255, 255, 0.85)' }}>{children}</Typography>
  ),
  hr: () => (
    <Box sx={{ my: 5, borderBottom: '1px solid rgba(255,255,255,0.1)' }} />
  ),
  strong: ({ children }: any) => (
    <Box component="strong" sx={{ color: '#ffffff' }}>{children}</Box>
  ),
  ul: ({ children }: any) => (
    <Box component="ul" sx={{ mb: 3, pl: 3 }}>{children}</Box>
  ),
  ol: ({ children }: any) => (
    <Box component="ol" sx={{ mb: 3, pl: 3 }}>{children}</Box>
  ),
  li: ({ children }: any) => (
    <Box component="li" sx={{ mb: 1.5, lineHeight: 1.8 }}>{children}</Box>
  ),
  // 커스텀 다운로드 버튼 처리 & 섹션 구분자 처리 & 이미지 그리드 컨테이너 처리 & 동영상 처리
  div: ({ className, ...props }: any) => {
    if (className === 'download-container') {
      const file = props['data-download-file'];
      const text = props['data-download-text'];
      if (file && text) {
        return <DownloadButton file={file} text={text} />;
      }
    }
    if (className === 'video-container') {
      const file = props['data-video-file'];
      const width = props['data-video-width'];
      const caption = props['data-video-caption'];
      if (file) {
        return <VideoPlayer file={file} width={width} caption={caption} />;
      }
    }
    if (className === 'section-divider') {
      return (
        <Box
          sx={{
            my: 8,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
          }}
        />
      );
    }
    if (className === 'image-grid-container') {
      return (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(auto-fit, minmax(250px, 1fr))',
              md: 'repeat(auto-fit, minmax(300px, 1fr))'
            },
            gap: 2,
            my: 4,
            width: '100%'
          }}
        >
          {props.children}
        </Box>
      );
    }
    return <div className={className} {...props} />;
  },
  // 테이블 렌더링
  table: ({ children }: any) => (
    <Box sx={{ overflowX: 'auto', my: 3 }}>
      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.9rem',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        {children}
      </Box>
    </Box>
  ),
  thead: ({ children }: any) => (
    <Box
      component="thead"
      sx={{
        bgcolor: 'rgba(255,255,255,0.08)',
      }}
    >
      {children}
    </Box>
  ),
  tbody: ({ children }: any) => (
    <Box component="tbody">{children}</Box>
  ),
  tr: ({ children }: any) => (
    <Box
      component="tr"
      sx={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        '&:last-child': { borderBottom: 'none' },
        '&:hover': { bgcolor: 'rgba(255,255,255,0.04)' },
        transition: 'background 0.15s',
      }}
    >
      {children}
    </Box>
  ),
  th: ({ children }: any) => (
    <Box
      component="th"
      sx={{
        px: 2,
        py: 1.5,
        textAlign: 'left',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.95)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        '&:last-child': { borderRight: 'none' },
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </Box>
  ),
  td: ({ children }: any) => (
    <Box
      component="td"
      sx={{
        px: 2,
        py: 1.25,
        color: 'rgba(255,255,255,0.8)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        '&:last-child': { borderRight: 'none' },
        verticalAlign: 'top',
        lineHeight: 1.6,
      }}
    >
      {children}
    </Box>
  ),
  // 링크 렌더링 - 외부/내부 링크 구분 처리
  a: ({ href, children }: any) => {
    // 외부 링크 판별 (http:// 또는 https://로 시작)
    const isExternalLink = href && (href.startsWith('http://') || href.startsWith('https://'));

    return (
      <Box
        component="a"
        href={href}
        target={isExternalLink ? '_blank' : undefined}
        rel={isExternalLink ? 'noopener noreferrer' : undefined}
        sx={{
          color: 'rgba(135, 206, 235, 0.9)',
          textDecoration: 'none',
          borderBottom: '1px solid transparent',
          transition: 'all 0.2s ease',
          '&:hover': {
            color: 'rgba(135, 206, 235, 1)',
            borderBottomColor: 'rgba(135, 206, 235, 0.8)'
          }
        }}
      >
        {children}
      </Box>
    );
  }
})
