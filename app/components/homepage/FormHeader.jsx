export default function FormHeader({ createAccount, setCreateAccount }) {
    return (
        <h2 className="font-Poppins text-lg font-semibold text-base-content/70">
            {createAccount ? 'Already have an account? ' : 'Login to access your projects, or '}
            <button className="link link-info" onClick={() => setCreateAccount(!createAccount)}>
                {createAccount ? 'Click to Login' : 'Click to Sign Up:'}
            </button>
        </h2>
    )
}
