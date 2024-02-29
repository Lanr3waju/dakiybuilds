import { useState, useEffect } from 'react'
import Link from 'next/link'

function UpdateNotification({ projectID }) {
  // Initialize a state variable to manage the visibility of the animate-bounce class.
  const [showBounceAnimation, setShowBounceAnimation] = useState(true)

  useEffect(() => {
    // Set a timeout to remove the animate-bounce class after 10 seconds.
    const timer = setTimeout(() => {
      setShowBounceAnimation(false)
    }, 12000) // 12 seconds in milliseconds

    // Clear the timeout if the component unmounts or the condition changes.
    return () => clearTimeout(timer)
  }, []) // Empty dependency array ensures that this effect runs once after the initial render.

  // Conditionally apply the animate-bounce class based on the state variable.
  const animationClass = showBounceAnimation ? 'animate-bounce' : ''

  return (
    <Link
      className="m-3 flex cursor-pointer flex-col rounded-lg border-4 border-warning p-3 md:flex-row md:items-center md:justify-evenly"
      href={`${projectID}/update-sheet`}
    >
      <div
        role="alert"
        className={`alert alert-warning text-warning-content shadow-lg ${animationClass}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-info"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 className="font-bold">Progress Updates!</h3>
          <div className="text-xs">
            Progress updates have been recorded on this project, please click ME
            to view the updates
          </div>
        </div>
      </div>
    </Link>
  )
}

export default UpdateNotification
