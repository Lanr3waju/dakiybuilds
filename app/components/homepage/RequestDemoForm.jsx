import React from 'react'
import { useForm, ValidationError } from '@formspree/react'

function RequestDemoForm() {
  const [state, handleSubmit] = useForm('mnqevqyv')
  if (state.succeeded) {
    return <p>Thanks for requesting demo!</p>
  }
  return (
    <>
      <h2 className="font-Poppins text-lg font-bold uppercase text-secondary-content/75">
        Request A Demo
      </h2>
      <h3 className="my-1 font-Roboto font-light tracking-wider text-primary-content/85">
        We will contact you shortly to schedule the demo
      </h3>
      <form
        className="flex flex-col justify-start font-medium text-primary-content"
        onSubmit={handleSubmit}
      >
        <input
          className="input-primary my-2 w-full rounded-lg p-4"
          id="name"
          type="text"
          name="name"
          placeholder="Enter your full name"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
        <input
          className="input-primary my-2 w-full rounded-lg p-4"
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email address"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <button
          className="btn btn-success w-full rounded-xl px-3"
          type="submit"
          disabled={state.submitting}
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default RequestDemoForm
