'use client'
import { useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine';

function HomePageLoginForm() {
  const [createAccount, setCreateAccount] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    retypePassword: '',
  })
  const [formErrors, setFormErrors] = useState({
    email: 'Field is required',
    password: 'Field is required',
    retypePassword: 'Field is required',
  })

  const validateFormInput = ({ target }) => {
    const { name, value } = target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Validation rules can be added here
    const errors = { ...formErrors }


    if (name === 'email') {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      if (!value || !emailRegex.test(value)) {
        errors.email = 'Invalid email address'
      } else {
        errors.email = ''
      }
    }

    if (name === 'password') {
      if (!value || value.length < 8) {
        errors.password = 'Password must be at least 8 characters'
      } else {
        errors.password = ''
      }
    }

    if (name === 'retypePassword') {
      if (createAccount && value !== formData.password) {
        errors.retypePassword = 'Passwords do not match'
      } else {
        errors.retypePassword = ''
      }
    }

    setFormErrors(errors)

  }

  const { email, password, retypePassword } = formErrors
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

      <form className="flex flex-col text-left" action="/auth/login" method="post">
        <input
          className={` ${email && 'input-error'} input input-bordered input-success mt-3 w-full focus:border-none focus:ring-0`}
          name="email"
          onChange={validateFormInput}
          placeholder="Enter your mail"
        />
        <p className="mb-3 mt-1 text-sm font-semibold text-error">{email ? email : " "}</p>
        <input
          name="password"
          type="password"
          onChange={validateFormInput}
          placeholder="Enter your password"
          className={`${password && 'input-error'} input input-bordered input-success mt-1 w-full focus:border-none focus:ring-0`}
        />
        <p className="mb-3 mt-1 text-sm font-semibold text-error">{password ? password : " "}</p>
        {createAccount && (
          <>
            <input
              name="retypePassword"
              type="password"
              onChange={validateFormInput}
              placeholder="Retype your password"
              className={`${retypePassword && 'input-error'} input input-bordered input-success mt-1 w-full focus:border-none focus:ring-0`}
            />
            <p className="mb-3 mt-1 text-sm font-semibold text-error">{retypePassword ? retypePassword : " "}</p>
          </>
        )}
        {!createAccount && (
          <button disabled={email !== "" || password !== ""} className="btn btn-neutral btn-active mt-5 disabled:btn-disabled">
            Login
          </button>
        )}
        {createAccount && (
          <button
            disabled={email !== "" || password !== "" || retypePassword !== ""}
            className="btn btn-neutral btn-active mt-5 disabled:btn-disabled"
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
