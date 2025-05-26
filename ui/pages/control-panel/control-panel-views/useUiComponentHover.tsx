import { useEffect, useState } from 'react'

export const useUiComponentHover = ({ hoverId }: { hoverId: string }) => {
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const targetDiv = document.getElementById(hoverId)
    if (!targetDiv) return

    targetDiv.addEventListener(
      'mouseenter',
      (event) => {
        if (!event?.target) return
        setIsHovered(true)
      },
      false
    )

    targetDiv.addEventListener(
      'mouseleave',
      (event) => {
        if (!event?.target) return
        setIsHovered(false)
      },
      false
    )

    return () => {
      targetDiv.removeEventListener('mouseenter', () => {})

      targetDiv.removeEventListener('mouseleave', () => {})
    }
  }, [hoverId])

  return { isHovered }
}
