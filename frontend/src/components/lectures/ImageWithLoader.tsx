import React from 'react'
import { Box, CircularProgress, Typography, IconButton, Skeleton } from '@mui/material'
import BrokenImageIcon from '@mui/icons-material/BrokenImage'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useImageLoader } from '../../hooks/useImageLoader'

interface ImageWithLoaderProps {
  src: string
  alt?: string
  title?: string
  style?: any
  className?: string
  [key: string]: any
}

// 로딩 상태와 에러 처리가 포함된 이미지 컴포넌트
export const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ src, alt, title, style, className, ...props }) => {
  // grid-image 클래스 감지
  const isGridImage = className === 'grid-image'

  const { loading, error, loaded, inView, imgRef, retry, retryCount } = useImageLoader(src, isGridImage)

  // style 문자열 파싱
  const parsedStyle = style && typeof style === 'string'
    ? Object.fromEntries(
        style.split(';')
          .map((s: string) => s.trim())
          .filter((s: string) => s)
          .map((s: string) => {
            const [key, value] = s.split(':').map((p: string) => p.trim())
            return [key.replace(/-([a-z])/g, (g: string) => g[1].toUpperCase()), value]
          })
      )
    : (style || {})

  return (
    <Box
      ref={imgRef}
      sx={{
        position: 'relative',
        // grid-image: 고정 프레임 (300px)
        ...(isGridImage && {
          width: '100%',
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: 1,
          my: 0,
          mx: 0
        }),
        // inline-image: 기존 동작
        ...(className === 'inline-image' && !isGridImage && {
          display: 'inline-block',
          my: 0,
          mx: 1,
          verticalAlign: 'top'
        }),
        // 일반 이미지: 기존 동작
        ...(!isGridImage && className !== 'inline-image' && {
          display: 'block',
          my: 2,
          mx: 0
        })
      }}
    >
      {/* 뷰포트에 들어오기 전 또는 로딩 중 스켈레톤 */}
      {(!inView || loading) && !error && (
        <Box sx={{ position: 'relative' }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 1,
              maxWidth: '100%'
            }}
          />
          {/* 로딩 상태일 때 progress indicator */}
          {loading && inView && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <CircularProgress size={24} sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                이미지 로딩 중...
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* 에러 플레이스홀더 */}
      {error && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            minHeight: 200,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            border: '2px dashed rgba(255, 255, 255, 0.2)',
            borderRadius: 1,
            color: 'rgba(255, 255, 255, 0.5)',
            p: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
              bgcolor: 'rgba(255, 255, 255, 0.08)'
            }
          }}
        >
          <BrokenImageIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
          <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.7, mb: 2 }}>
            이미지를 불러올 수 없습니다
          </Typography>
          {alt && (
            <Typography variant="caption" sx={{ mb: 2, opacity: 0.5, textAlign: 'center' }}>
              {alt}
            </Typography>
          )}
          {/* 재시도 버튼 */}
          <IconButton
            onClick={retry}
            size="small"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                color: '#ffffff',
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <RefreshIcon fontSize="small" />
          </IconButton>
          {retryCount > 0 && (
            <Typography variant="caption" sx={{ mt: 1, opacity: 0.4 }}>
              재시도 횟수: {retryCount}
            </Typography>
          )}
        </Box>
      )}

      {/* 실제 이미지 */}
      {loaded && (
        <Box
          component="img"
          src={src}
          alt={alt}
          title={title}
          loading="lazy"
          sx={{
            // grid-image: object-fit contain으로 프레임에 맞춤
            ...(isGridImage && {
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              borderRadius: 1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
              cursor: 'zoom-in',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                transform: 'scale(1.02)'
              }
            }),
            // 일반 이미지: 기존 스타일
            ...(!isGridImage && {
              maxWidth: parsedStyle.maxWidth || '80%',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
              borderRadius: 1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
              opacity: 1,
              transform: 'scale(1)',
              cursor: 'zoom-in',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                transform: 'scale(1.02)'
              },
              ...parsedStyle
            })
          }}
          {...props}
        />
      )}
    </Box>
  )
}
