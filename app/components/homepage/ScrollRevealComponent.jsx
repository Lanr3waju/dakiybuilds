'use client'
import { useEffect, useRef, useState } from 'react'

const ScrollRevealComponent = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsVisible(entry.isIntersecting))
    })

    const refCurrent = domRef.current
    observer.observe(refCurrent)

    return () => observer.unobserve(refCurrent)
  }, [])

  return (
    <div
      className={`transition-all duration-1000 delay-150 ease-in-out ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
      }`}
      ref={domRef}
    >
      {children}
    </div>
  )
}

export default ScrollRevealComponent
