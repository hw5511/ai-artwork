import React from 'react'
import { Box, Typography } from '@mui/material'

interface VideoPlayerProps {
  file: string
  width?: string
  caption?: string
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  file,
  width = '100%',
  caption
}) => {
  // 다운로드 자산과 동일 위치에서 서빙 (base 경로 유지 위해 상대경로 사용)
  const videoPath = `./downloads/${file}`

  return (
    <Box sx={{ my: 4, width: '100%' }}>
      <Box
        component="video"
        controls
        sx={{
          width: width,
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          margin: '0 auto',
          borderRadius: 1,
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          bgcolor: 'black'
        }}
      >
        <source src={videoPath} type="video/mp4" />
        브라우저가 비디오를 지원하지 않습니다.
      </Box>
      {caption && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            mt: 2,
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.9rem'
          }}
        >
          {caption}
        </Typography>
      )}
    </Box>
  )
}
