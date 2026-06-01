// Vite 개발 서버를 직접 실행하는 Node.js 스크립트 (Hot Reload 지원)
import { createServer } from 'vite'

async function startDevServer() {
  try {
    const server = await createServer({
      // vite.config.ts 파일의 설정을 그대로 사용
      // 플러그인 중복 제거
      server: {
        port: 3007,  // AI Artwork 전용 포트
        host: true,
        open: false,
        hmr: {
          // Hot Module Replacement 최적화
          port: 3007,
          overlay: false  // 에러 오버레이 비활성화
        },
        watch: {
          // 파일 변경 감지 최적화
          usePolling: false,  // 폴링 비활성화 (이벤트 기반)
          interval: 2000,     // 100ms → 2초
          ignored: [          // 불필요한 파일 감시 제외
            '**/node_modules/**',
            '**/dist/**',
            '**/.git/**'
          ]
        },
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
          }
        }
      },
      // 개발 모드 최적화
      define: {
        'process.env.NODE_ENV': '"development"'
      },
      // 의존성 최적화
      optimizeDeps: {
        include: ['react', 'react-dom'],
        exclude: ['@mui/icons-material']
      }
    })
    
    await server.listen()
    
    console.log('🎨 AI Artwork Frontend Dev Server Started with Hot Reload!')
    console.log('   - Local:   http://localhost:3007/')
    console.log('   - Network: http://0.0.0.0:3007/')
    console.log('   - Backend: http://localhost:3000/docs')
    console.log('   - HMR:     Enabled ✅')
    
    server.printUrls()
    
    // Graceful shutdown 처리
    process.on('SIGTERM', async () => {
      console.log('🛑 Shutting down AI Artwork dev server...')
      await server.close()
      process.exit(0)
    })
    
  } catch (error) {
    console.error('❌ Failed to start AI Artwork dev server:', error)
    process.exit(1)
  }
}

startDevServer()