import { useEffect, useRef, useState } from 'react'

/** Hide on scroll down, show on scroll up */
export function useScrollDirection({ threshold = 8, topOffset = 24 } = {}) {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY

    const onScroll = () => {
      const y = window.scrollY

      if (y <= topOffset) {
        setVisible(true)
      } else if (y - lastY.current > threshold) {
        setVisible(false)
      } else if (lastY.current - y > threshold) {
        setVisible(true)
      }

      lastY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold, topOffset])

  return visible
}
