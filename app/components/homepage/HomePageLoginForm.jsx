'use client'
import { useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import { useRouter } from 'next/navigation'
import InputField from './InputField'
import FormHeader from './FormHeader'

function HomePageLoginForm() {
  const router = useRouter()
  const [createAccount, setCreateAccount] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    retypePassword: '',
    status: 0,
  })
  const [formErrors, setFormErrors] = useState({
    email: 'Field is required',
    password: 'Field is required',
    retypePassword: 'Field is required',
  })
  const [isLoading, setIsLoading] = useState(false)

  const [loginResponse, setLoginResponse] = useState('')

  async function handleSubmission(event) {
    event.preventDefault()
    setIsLoading(true)
    setLoginResponse('')

    const formData = new FormData(event.target)
    const value = createAccount ? 'sign-up' : 'login'
    const response = await fetch(`/auth/${value}`, {
      method: 'POST',
      body: formData,
    })

    const { status, message } = await response.json()

    if (status === 200) {
      router.push('/dakiyboard')
      setFormData({ ...formData, status: status })
    } else if (status === 301) {
      setIsLoading(false)
      setFormData({ ...formData, status: 301 })
      setLoginResponse('A verification link has been sent to your email!')
    } else {
      setIsLoading(false)
      setFormData({ ...formData, status: status })
      setLoginResponse(message)
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
    setLoginResponse('')
  }

  const { email, password, retypePassword } = formErrors

  return (
    <section
      id="login-signup"
      className="mx-auto max-w-xl rounded-md bg-base-200 px-2 py-9 leading-loose text-base-content md:mx-0 md:w-3/6 "
    >
      <h1 className="font-Poppins text-lg font-semibold uppercase text-base-content">
        {createAccount ? 'Create Account Form' : 'Login Form'}
      </h1>
      <HorizontalLine />

      <FormHeader
        createAccount={createAccount}
        setCreateAccount={setCreateAccount}
      />

      <form className="flex flex-col text-left" onSubmit={handleSubmission}>
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
          <button
            disabled={email !== '' || password !== '' || isLoading}
            className="btn btn-neutral btn-active mt-5 disabled:btn-disabled"
          >
            {isLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              'Login'
            )}
          </button>
        ) : (
          <button
            disabled={
              email !== '' ||
              password !== '' ||
              retypePassword !== '' ||
              isLoading
            }
            className="btn btn-neutral btn-active mt-5 disabled:btn-disabled"
          >
            {isLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              'Signup'
            )}
          </button>
        )}
        <div className="my-2 h-fit p-3">
          {loginResponse && (
            <span
              className={`text-base font-semibold ${
                formData.status === 301 ? 'text-success' : 'text-error'
              }`}
            >
              {loginResponse}
            </span>
          )}
        </div>
      </form>
    </section>
  )
}

export default HomePageLoginForm
