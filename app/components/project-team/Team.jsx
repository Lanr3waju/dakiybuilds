'use client'
import { DakiyStore } from '@/context/context'
import TeamMembers from './TeamMembers'
import { useContext, useState } from 'react'
import Link from 'next/link'

function Team() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('true')
  const { project } = useContext(DakiyStore)

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value
    setEmail(inputEmail)
    const isValidEmail = validateEmail(inputEmail)
    // Set error state based on email validation
    setEmailError(!isValidEmail)
  }

  const handleSubmission = (e) => {
    e.preventDefault()
    // Check if email is valid before submission
    if (validateEmail(email)) {
      alert('Verification email sent to ' + email)
      setEmail('')
    }
  }

  return Object.keys(project).length > 0 ? (
    <section className="p-4">
      <form>
        <label className="input input-bordered my-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
          <input onChange={handleEmailChange} type="text" className="input-ghost grow rounded-lg border-none bg-base-100" value={email} placeholder="Team member's email" />
        </label>
        <button disabled={!email || emailError} onClick={handleSubmission} className='btn btn-primary w-full'>Add Team Member</button>
      </form>
      <TeamMembers />
    </section>
  ) : (
    <h1 className="m-7 rounded-lg border-2 border-error bg-error-content p-2 text-center text-lg font-bold uppercase text-error">
      Add and Select a Project{' '}
      <Link className="link link-info" href="/all-jobs">
        Here
      </Link>{' '}
      to access the project team members
    </h1>
  )
}

export default Team
