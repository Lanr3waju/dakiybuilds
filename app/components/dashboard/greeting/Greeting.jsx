'use client'
import { useEffect, useState } from 'react'
import { getGreeting } from './getTime'
import getUserName from './supabaseTables'

function Greeting() {
  const [userName, setUserName] = useState('')

  const fetchUser = async () => {
    const user = await getUserName()
    setUserName(user)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <h2 className="font-Raleway text-xs font-medium">
      Hello {userName},
      <p>{getGreeting()}.</p>
    </h2>
  )
}

export default Greeting
