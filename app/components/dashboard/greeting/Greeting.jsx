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
    <h2 className="mt-4 text-xl font-semibold">
      Hello {userName}, {getGreeting()}.
    </h2>
  )
}

export default Greeting
