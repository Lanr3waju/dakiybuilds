'use client'
import React, { useState } from 'react'

const ForgotPasswordModal = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    setEmailError('')
  }

  const validateEmail = (email) => {
    const emailPattern = /\S+@\S+\.\S+/
    if (!emailPattern.test(email)) {
      return 'Invalid email format'
    }
    return ''
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const emailValidation = validateEmail(email)
    if (emailValidation) {
      setEmailError(emailValidation)
    } else {
      // Here you can handle the submission of the forgotten password request
      // For example, send an email to the provided email address with a reset link
      alert('Forgot Password submitted with email: ' + email)
      window.forgot_password_modal.close()
    }
  }

  return (
    <dialog id="forgot_password_modal" className="modal bg-primary-content/40">
      <form method="dialog" className="modal-box">
        <h2 className="mb-4 text-xl font-bold">Forgot Password</h2>
        <p className="mb-6">
          Please enter your email address to reset your password.
        </p>
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && (
            <div className="mt-2 text-sm text-error/60">{emailError}</div>
          )}
        </div>
        <div className="modal-action">
          <button
            onClick={() => window.forgot_password_modal.close()}
            type="button"
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Reset Password
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default ForgotPasswordModal
