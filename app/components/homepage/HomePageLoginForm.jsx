'use client'
import { useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import { useRouter } from 'next/navigation'

function InputField({ name, type, value, onChange, placeholder, isError, errorMessage }) {
  return (
    <>
      <input
        className={` ${isError && 'input-error'} input input-bordered input-success mt-3 w-full focus:border-none focus:ring-0`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <p className="mb-3 mt-1 text-sm font-semibold text-error">{isError ? errorMessage : " "}</p>
    </>
  )
}

function FormHeader({ createAccount, setCreateAccount }) {
  return (
    <h2 className="font-Poppins text-lg font-semibold text-base-content/70">
      {createAccount ? 'Already have an account? ' : 'Login to access your projects, or '}
      <button className="link-info link" onClick={() => setCreateAccount(!createAccount)}>
        {createAccount ? 'Click to Login' : 'Click to Sign Up:'}
      </button>
    </h2>
  )
}

function HomePageLoginForm() {
  const router = useRouter()
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

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    const response = await fetch('/auth/login', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (data.status === 200) {
      // Redirect to '/dashboard' or handle successful login
      router.push('/dakiyboard')
    } else {
      // Display 'data.message' to the user
      console.log(`Error: ${data.message}`)
    }
  }

  function validateFormInput({ target }) {
    const { name, value } = target
    setFormData({
      ...formData,
      [name]: value,
    })

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

      <FormHeader createAccount={createAccount} setCreateAccount={setCreateAccount} />

      <form className="flex flex-col text-left" onSubmit={handleSubmit}>
        <InputField
          name="email"
          type="text"
          value={formData.email}
          onChange={validateFormInput}
          placeholder="Enter your mail"
          isError={email}
          errorMessage={email}
        />
        <InputField
          name="password"
          type="password"
          value={formData.password}
          onChange={validateFormInput}
          placeholder="Enter your password"
          isError={password}
          errorMessage={password}
        />

        {createAccount && (
          <InputField
            name="retypePassword"
            type="password"
            value={formData.retypePassword}
            onChange={validateFormInput}
            placeholder="Retype your password"
            isError={retypePassword}
            errorMessage={retypePassword}
          />
        )}

        {!createAccount ? (
          <button disabled={email !== "" || password !== ""} className="btn btn-neutral btn-active mt-5 disabled:btn-disabled">
            Login
          </button>
        ) : (
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
