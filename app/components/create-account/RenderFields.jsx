'use client'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export const renderInputField = (fieldName, label, type, formData, handleInputChange, errors, inputRef) => (
    <label key={fieldName}>
        {label}
        <input
            ref={inputRef}
            className="input mb-2 w-full font-Roboto shadow-md shadow-accent/30 placeholder:text-primary-content/10"
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

export const renderPasswordField = (fieldName, label, formData, handleInputChange, errors, showPassword, setShowPassword, inputRef) => {

    const handleVisibilityToggle = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setShowPassword(prevShow => !prevShow)
    };

    return (
        <label key={fieldName}>
            {label}
            <div className="relative">
                <input
                    ref={inputRef}
                    className="input mb-2 w-full pr-10 font-Roboto shadow-md shadow-accent/30 placeholder:text-primary-content/10"
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
                    onClick={handleVisibilityToggle}
                >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
            </div>
            <div className='mb-4 text-sm font-semibold lowercase text-error/60'>{errors[fieldName]} <span className='text-warning/80'>(Passwords must contain at least a special character, a capital letter and a digit)</span></div>
        </label>
    )
}
