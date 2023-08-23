'use client'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export const renderInputField = (fieldName, label, type, formData, handleInputChange, errors) => (
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

export const renderPasswordField = (fieldName, label, formData, handleInputChange, errors, showPassword, setShowPassword) => {
    // const handleCopyPaste = (event) => {
    //     event.preventDefault()
    // }

    return (
        <label key={fieldName}>
            {label}
            <div className="relative">
                <input
                    className="input mb-2 w-full pr-10 shadow-md shadow-accent/30"
                    placeholder={`Enter ${label}`}
                    aria-label={`Enter ${label}`}
                    type={showPassword ? 'text' : 'password'}
                    name={fieldName}
                    value={formData[fieldName]}
                    onChange={handleInputChange}
                    onCopy={(event) => event.preventDefault()}
                    onPaste={(event) => event.preventDefault()}
                />
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(prevShow => !prevShow)}
                >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
            </div>
            <div className='mb-4 text-sm font-semibold lowercase text-error/60'>{errors[fieldName]} <span className='text-warning/80'>(Passwords must contain at least a special character, a capital letter and a digit)</span></div>
        </label>
    )
}
