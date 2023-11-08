'use client'
import React, { useState, useRef } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import SuccessModal from './SuccessModal'
import {
  validateField,
  validatePassword,
  validateRetypePassword,
} from './validateForm'
import { initialFormData } from './initialFormData'
import { renderInputField, renderPasswordField } from './RenderFields'

function CreateAccountForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({ ...initialFormData })
  const [showPassword, setShowPassword] = useState(false)
  const hasErrors = Object.values(errors).some((error) => error !== '')

  const inputRefs = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    password: useRef(null),
    retypePassword: useRef(null),
    profession: useRef(null),
    tel: useRef(null),
    businessName: useRef(null),
    businessEmail: useRef(null),
    businessTel: useRef(null),
    staffs: useRef(null),
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setErrors({
      ...errors,
      [name]: '',
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newErrors = {}

    for (const field in formData) {
      if (field === 'password') {
        newErrors[field] = validatePassword(formData[field])
      } else if (field === 'retypePassword') {
        newErrors[field] = validateRetypePassword(formData[field], formData)
      } else {
        newErrors[field] = validateField(field, formData[field])
      }
    }

    setErrors(newErrors)

    if (Object.values(newErrors).every((error) => error === '')) {
      console.log('Form data submitted:', formData)
      window.account_creation_modal.showModal()
      setFormData(initialFormData)
    } else {
      const firstErrorField = Object.keys(newErrors).find(
        (field) => newErrors[field] !== ''
      )

      // Scroll to the input field with the error
      if (firstErrorField) {
        if (firstErrorField === 'password' && inputRefs['password'].current) {
          inputRefs['password'].current.scrollIntoView({ behavior: 'smooth' })
        } else if (
          firstErrorField === 'retypePassword' &&
          inputRefs['retypePassword'].current
        ) {
          inputRefs['retypePassword'].current.scrollIntoView({
            behavior: 'smooth',
          })
        } else if (firstErrorField in inputRefs) {
          inputRefs[firstErrorField].current.scrollIntoView({
            behavior: 'smooth',
          })
        }
      }
    }
  }

  return (
    <section className="p-4">
      <SuccessModal />
      <h1 className="mt-10 text-center font-Poppins text-2xl font-bold uppercase tracking-widest text-primary">
        Create new account on{' '}
        <span className="font-Fascinate text-primary-content/70">
          dakiybuilds
        </span>
      </h1>
      <form
        className="mx-auto my-4 flex w-11/12 flex-col rounded-lg bg-base-200 p-8 font-Raleway text-xs font-semibold uppercase text-primary-content/50 shadow-lg shadow-base-300 md:text-lg md:font-bold"
        noValidate
        onSubmit={handleSubmit}
      >
        <h2 className="mb-3 font-bold text-primary-focus md:text-lg">
          Your Details
        </h2>
        <HorizontalLine />
        {renderInputField(
          'firstName',
          'your first name',
          'text',
          formData,
          handleInputChange,
          errors,
          inputRefs.firstName
        )}
        {renderInputField(
          'lastName',
          'your last name',
          'text',
          formData,
          handleInputChange,
          errors,
          inputRefs.lastName
        )}
        {renderInputField(
          'email',
          'email address',
          'email',
          formData,
          handleInputChange,
          errors,
          inputRefs.email
        )}
        {renderPasswordField(
          'password',
          'Password',
          formData,
          handleInputChange,
          errors,
          showPassword,
          setShowPassword,
          inputRefs.password
        )}
        {renderPasswordField(
          'retypePassword',
          'Re-type Password',
          formData,
          handleInputChange,
          errors,
          showPassword,
          setShowPassword,
          inputRefs.retypePassword
        )}
        {renderInputField(
          'profession',
          'your profession / occupation',
          'text',
          formData,
          handleInputChange,
          errors,
          inputRefs.profession
        )}
        {renderInputField(
          'tel',
          'your mobile number',
          'tel',
          formData,
          handleInputChange,
          errors,
          inputRefs.tel
        )}
        <div className="divider"></div>
        <h2 className="my-3 font-bold text-primary-focus md:text-lg">
          Business Details
        </h2>
        <HorizontalLine />
        {renderInputField(
          'businessName',
          'Business name',
          'text',
          formData,
          handleInputChange,
          errors,
          inputRefs.businessName
        )}
        {renderInputField(
          'businessEmail',
          'Business email',
          'email',
          formData,
          handleInputChange,
          errors,
          inputRefs.businessEmail
        )}
        {renderInputField(
          'businessTel',
          'Business tel',
          'tel',
          formData,
          handleInputChange,
          errors,
          inputRefs.businessTel
        )}
        {renderInputField(
          'staffs',
          'number of staffs',
          'number',
          formData,
          handleInputChange,
          errors,
          inputRefs.staffs
        )}
        <button
          className={`btn ${hasErrors ? 'btn-error' : 'btn-success'}`}
          type="submit"
        >
          Create Account
        </button>
      </form>
    </section>
  )
}

export default CreateAccountForm
