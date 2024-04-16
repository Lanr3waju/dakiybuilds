'use client'
import { useEffect, useRef, useState } from 'react'

const ScrollRevealComponent = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false) // State to track visibility of the component
  const domRef = useRef() // Ref to reference the DOM element of the component

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { // IntersectionObserver to observe intersection changes
      entries.forEach((entry) => { // Loop through each observed entry
        if (entry.isIntersecting) { // If component is intersecting with viewport
          setIsVisible(true) // Set isVisible state to true
          observer.unobserve(entry.target) // Stop observing once component is revealed
        }
      })
    })

    const refCurrent = domRef.current // Get current DOM element reference
    observer.observe(refCurrent) // Start observing the DOM element

    return () => observer.unobserve(refCurrent) // Cleanup function to stop observing when component unmounts
  }, []) // Empty dependency array ensures effect runs only once

  return (
    <div
      className={`transition-all delay-150 duration-1000 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-14 opacity-0'
      }`}
      ref={domRef} // Attach ref to the DOM element
    >
      {children}
    </div>
  )
}

export default ScrollRevealComponent
