import { useCallback, useEffect, useState } from 'react'

/**
 * Mouse-driven parallax for pseudo-3D depth.
 * Returns normalized offsets (-1 to 1) and a motion style helper.
 */
export function useParallax({ intensity = 1, smooth = 0.08 } = {}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [target, setTarget] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2
    setTarget({ x, y })
  }, [])

  useEffect(() => {
    let frame
    const animate = () => {
      setOffset((prev) => ({
        x: prev.x + (target.x - prev.x) * smooth,
        y: prev.y + (target.y - prev.y) * smooth,
      }))
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [target, smooth])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  const getTransform = useCallback(
    (depth = 1) => ({
      x: offset.x * depth * intensity * 12,
      y: offset.y * depth * intensity * 12,
    }),
    [offset, intensity],
  )

  return { offset, getTransform }
}
