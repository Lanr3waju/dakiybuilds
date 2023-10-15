'use client'
import { useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'

function HomePageLoginForm() {
  const [createAccount, setCreateAccount] = useState(false)

  return (
    <section className="mt-5 max-w-xl rounded-md bg-base-200/95 px-2 py-9 leading-loose text-base-content shadow-md shadow-base-300 md:w-3/6 ">
      <h1 className="font-Poppins text-lg font-semibold uppercase text-base-content">
        {createAccount ? 'Create Account Form' : 'Login Form'}
      </h1>
      <HorizontalLine />

      {!createAccount && (
        <h2 className="font-Poppins text-lg font-semibold text-base-content/70">
          Login to access your projects, or{' '}
          <button
            className="link-info link"
            onClick={() => setCreateAccount(true)}
          >
            {' '}
            Click to Sign Up:
          </button>
        </h2>
      )}

      {createAccount && (
        <h2 className="font-Poppins text-lg font-semibold text-base-content/70">
          Already have an account?{' '}
          <button
            className="link-info link"
            onClick={() => setCreateAccount(false)}
          >
            Click to Login
          </button>
        </h2>
      )}

      <form
        className="flex flex-col text-left"
        action="/auth/login"
        method="post"
      >
        <input
          className="input input-bordered input-primary my-3 w-full focus:border-none focus:ring-0"
          name="email"
          placeholder="Enter your mail"
        />
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="input input-bordered input-primary my-1 w-full focus:border-none focus:ring-0"
        />
        {createAccount && (
          <input
            name="re-type-password"
            type="password"
            placeholder="Retype your password"
            className="input input-bordered input-primary my-1 w-full focus:border-none focus:ring-0"
          />
        )}
        {!createAccount && (
          <button className="btn btn-neutral btn-active mt-5">Login</button>
        )}
        {createAccount && (
          <button
            className="btn btn-neutral btn-active mt-5"
            formAction="/auth/sign-up"
          >
            Sign Up
          </button>
        )}
      </form>
    </section>
  )
}

export default HomePageLoginForm
