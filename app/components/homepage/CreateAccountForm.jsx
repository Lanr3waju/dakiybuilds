'use client'
import React, { useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import SuccessModal from './SuccessModal'

const fieldErrorMap = {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    password: 'Password',
    retypePassword: 'Re-type Password',
    profession: 'Profession',
    tel: 'Mobile number',
    businessName: 'Business name',
    businessEmail: 'Business email',
    businessTel: 'Business tel',
    staffs: 'Number of staffs'
}

function CreateAccountForm() {
    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        profession: '',
        tel: '',
        businessName: '',
        businessEmail: '',
        businessTel: '',
        staffs: '',
        password: '',
        retypePassword: ''
    }

    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState({ ...initialFormData })
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)


    const validateField = (fieldName, value) => {
        let error = ''

        if (value.trim() === '') {
            error = `${fieldErrorMap[fieldName]} is required`
        } else if (fieldName === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            error = 'Invalid email format'
        } else if ((fieldName === 'tel' || fieldName === 'businessTel') && !/^\d{11}$/.test(value)) {
            error = 'Invalid phone number format; phone number should be 11 digits'
        } else if (fieldName === 'staffs' && !/^\d+$/.test(value)) {
            error = 'Invalid staffs number format: value should be digits e.g. 4'
        }

        return error
    }

    const validatePassword = (password) => {
        let error = ''

        if (password.trim() === '') {
            error = 'Password is required'
        } else if (password.length < 8) {
            error = 'Password should be at least 8 characters long'
        }

        return error
    }

    const validateRetypePassword = (retypePassword) => {
        let error = ''

        if (retypePassword.trim() === '') {
            error = 'Re-type Password is required'
        } else if (retypePassword !== formData.password) {
            error = 'Passwords do not match'
        }

        return error
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
        setErrors({
            ...errors,
            [name]: ''
        })
        setIsSubmitDisabled(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newErrors = {}

        for (const field in formData) {
            if (field === 'password') {
                newErrors[field] = validatePassword(formData[field])
            } else if (field === 'retypePassword') {
                newErrors[field] = validateRetypePassword(formData[field])
            } else {
                newErrors[field] = validateField(field, formData[field])
            }
        }

        setErrors(newErrors)

        if (Object.values(newErrors).every(error => error === '')) {
            console.log('Form data submitted:', formData)
            window.my_modal_5.showModal()
            setFormData(initialFormData)
        } else {
            setIsSubmitDisabled(true)
        }
    }

    const renderInputField = (fieldName, label, type) => (
        <label key={fieldName}>
            {label}
            <input
                className="input mb-2 w-full shadow-md shadow-accent/30"
                placeholder={`Enter ${label}`}
                aria-label={`Enter ${label}`}
                type={type}
                name={fieldName}
                value={formData[fieldName]}
                onChange={handleInputChange}
            />
            <div className='mb-4 text-sm font-semibold lowercase text-error/60'>{errors[fieldName]}</div>
        </label>
    )

    const renderPasswordField = (fieldName, label) => (
        <label key={fieldName}>
            {label}
            <input
                className="input mb-2 w-full shadow-md shadow-accent/30"
                placeholder={`Enter ${label}`}
                aria-label={`Enter ${label}`}
                type="password"
                name={fieldName}
                value={formData[fieldName]}
                onChange={handleInputChange}
            />
            <div className='mb-4 text-sm font-semibold lowercase text-error/60'>{errors[fieldName]}</div>
        </label>
    )

    return (
        <section className='p-4'>
            <SuccessModal />
            <h1 className='mt-10 text-center font-Poppins text-2xl font-bold uppercase tracking-widest text-primary'>
                Create new account on <span className='font-Fascinate text-primary-content/70'>dakiybuilds</span>
            </h1>
            <form className='mx-auto my-4 flex w-11/12 flex-col rounded-lg bg-base-200 p-8 font-Raleway text-lg font-bold uppercase text-primary-content/50 shadow-lg shadow-base-300' noValidate onSubmit={handleSubmit}>
                <h2 className='mb-3 font-bold text-primary-focus md:text-lg'>Your Details</h2>
                <HorizontalLine />

                {renderInputField('firstName', 'Enter your first name', 'text')}
                {renderInputField('lastName', 'Enter your last name', 'text')}
                {renderInputField('email', 'Enter email address', 'email')}
                {renderPasswordField('password', 'Password')}
                {renderPasswordField('retypePassword', 'Re-type Password')}
                {renderInputField('profession', 'Enter your profession / occupation', 'text')}
                {renderInputField('tel', 'Enter your mobile number', 'tel')}

                <div className="divider"></div>
                <h2 className='my-3 font-bold text-primary-focus md:text-lg'>Business Details</h2>
                <HorizontalLine />

                {renderInputField('businessName', 'Enter Business name', 'text')}
                {renderInputField('businessEmail', 'Enter Business email', 'email')}
                {renderInputField('businessTel', 'Enter Business tel', 'tel')}
                {renderInputField('staffs', 'Enter number of staffs', 'number')}

                <button className='btn btn-success' type="submit" disabled={isSubmitDisabled}>
                    Create Account
                </button>
            </form>
        </section>
    )
}

export default CreateAccountForm
