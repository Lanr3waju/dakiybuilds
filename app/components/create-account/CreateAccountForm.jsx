'use client'
import React, { useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import SuccessModal from './SuccessModal'
import { validateField, validatePassword, validateRetypePassword } from './validateForm'
import { initialFormData } from './initialFormData'
import { renderInputField, renderPasswordField } from './RenderFields'
import Link from 'next/link'


function CreateAccountForm() {
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState({ ...initialFormData })
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

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
                newErrors[field] = validateRetypePassword(formData[field], formData)
            } else {
                newErrors[field] = validateField(field, formData[field])
            }
        }

        setErrors(newErrors)

        if (Object.values(newErrors).every(error => error === '')) {
            console.log('Form data submitted:', formData)
            window.account_creation_modal.showModal()
            setFormData(initialFormData)
        } else {
            setIsSubmitDisabled(true)
        }
    }

    return (
        <section className='p-4'>
            <SuccessModal />
            <h1 className='mt-10 text-center font-Poppins text-2xl font-bold uppercase tracking-widest text-primary'>
                Create new account on <span className='font-Fascinate text-primary-content/70'>dakiybuilds</span>
            </h1>
            <form className='mx-auto my-4 flex w-11/12 flex-col rounded-lg bg-base-200 p-8 font-Raleway text-xs font-semibold uppercase text-primary-content/50 shadow-lg shadow-base-300 md:text-lg md:font-bold' noValidate onSubmit={handleSubmit}>
                <h2 className='my-2 text-right font-Roboto font-medium transition-all hover:-translate-x-3 md:text-lg'>Go back to <Link className='link-info' href="/" >Login Page</Link></h2>
                <h2 className='mb-3 font-bold text-primary-focus md:text-lg'>Your Details</h2>
                <HorizontalLine />

                {renderInputField('firstName', 'your first name', 'text', formData, handleInputChange, errors)}
                {renderInputField('lastName', 'your last name', 'text', formData, handleInputChange, errors)}
                {renderInputField('email', 'email address', 'email', formData, handleInputChange, errors)}
                {renderPasswordField('password', 'Password', formData, handleInputChange, errors, showPassword, setShowPassword)}
                {renderPasswordField('retypePassword', 'Re-type Password', formData, handleInputChange, errors, showPassword, setShowPassword)}
                {renderInputField('profession', 'your profession / occupation', 'text', formData, handleInputChange, errors)}
                {renderInputField('tel', 'your mobile number', 'tel', formData, handleInputChange, errors)}

                <div className="divider"></div>
                <h2 className='my-3 font-bold text-primary-focus md:text-lg'>Business Details</h2>
                <HorizontalLine />

                {renderInputField('businessName', 'Business name', 'text', formData, handleInputChange, errors)}
                {renderInputField('businessEmail', 'Business email', 'email', formData, handleInputChange, errors)}
                {renderInputField('businessTel', 'Business tel', 'tel', formData, handleInputChange, errors)}
                {renderInputField('staffs', 'number of staffs', 'number', formData, handleInputChange, errors)}

                <button className='btn btn-success' type="submit" disabled={isSubmitDisabled}>
                    Create Account
                </button>
            </form>
        </section>
    )
}

export default CreateAccountForm
