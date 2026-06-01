import { useState, useEffect, useRef } from 'react'

interface UseImageLoaderReturn {
  loading: boolean
  error: boolean
  loaded: boolean
  inView: boolean
  imgRef: React.MutableRefObject<HTMLElement | null>
  retry: () => void
  retryCount: number
}

// Intersection Observer를 활용한 이미지 로딩 상태 관리 커스텀 훅
export const useImageLoader = (src: string, disableLazyLoad: boolean = false): UseImageLoaderReturn => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const imgRef = useRef<HTMLElement | null>(null)

  // Intersection Observer로 뷰포트 감지
  useEffect(() => {
    // disableLazyLoad가 true면 즉시 inView를 true로 설정
    if (disableLazyLoad) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '100px' // 100px 전에 미리 로딩 시작
      }
    )

    const currentRef = imgRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [disableLazyLoad])

  // 이미지 로딩 함수
  const loadImage = () => {
    if (!src || !inView) return

    setLoading(true)
    setError(false)
    setLoaded(false)

    const img = new Image()

    img.onload = () => {
      setLoading(false)
      setError(false)
      setLoaded(true)
    }

    img.onerror = () => {
      setLoading(false)
      setError(true)
      setLoaded(false)
    }

    img.src = src

    return () => {
      img.onload = null
      img.onerror = null
    }
  }

  // 실제 이미지 로딩
  useEffect(() => {
    if (!src || !inView) return
    loadImage()
  }, [src, inView, retryCount])

  // 재시도 함수
  const retry = () => {
    setRetryCount(prev => prev + 1)
  }

  return { loading, error, loaded, inView, imgRef, retry, retryCount }
}
