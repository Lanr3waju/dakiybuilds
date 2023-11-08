export default function InputField({ name, type, value, onChange, placeholder, isError, errorMessage }) {
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
