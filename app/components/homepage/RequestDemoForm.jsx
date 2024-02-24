import React from 'react'
import { useForm, ValidationError } from '@formspree/react'

function RequestDemoForm() {
    const [state, handleSubmit] = useForm("mnqevqyv")
    if (state.succeeded) {
        return <p>Thanks for requesting demo!</p>
    }
    return (
        <>
            <h2 className='uppercase text-lg font-bold text-secondary-content/75 font-Poppins'>Request A Demo</h2>
            <h3 className='font-Roboto tracking-wider font-light text-primary-content/85 my-1'>We will contact you shortly to schedule the demo</h3>
            <form className='text-primary-content font-medium flex flex-col justify-start' onSubmit={handleSubmit}>
                <input
                    className='w-full my-2 p-4 input-primary rounded-lg'
                    id="name"
                    type="text"
                    name="name"
                    placeholder='Enter your full name'
                />
                <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                />
                <input
                    className='w-full my-2 p-4 input-primary rounded-lg'
                    id="email"
                    type="email"
                    name="email"
                    placeholder='Enter your email address'
                />
                <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                />
                <button className='btn btn-success rounded-xl px-3 w-full' type="submit" disabled={state.submitting}>
                    Submit
                </button>
            </form>
        </>
    )
}

export default RequestDemoForm
