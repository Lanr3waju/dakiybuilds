export default function FormHeader({ createAccount, setCreateAccount, setFormData }) {
  const initialformData = {
    email: '',
    password: '',
    retypePassword: '',
  }

  const handleLoginOrSignupForm = () => {
    setCreateAccount(!createAccount)
    setFormData(initialformData)
  }
  return (
    <h2 className="font-Poppins text-lg font-semibold text-base-content/70">
      {createAccount
        ? 'Already have an account? '
        : 'Login to access your projects, or '}
      <button
        className="link link-info"
        onClick={handleLoginOrSignupForm}
      >
        {createAccount ? 'Click to Login' : 'Click to Sign Up:'}
      </button>
    </h2>
  )
}
