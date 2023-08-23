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

export const validateField = (fieldName, value) => {
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

export const validatePassword = (password) => {
    let error = ''

    if (password.trim() === '') {
        error = 'Password is required'
    } else if (password.length < 8) {
        error = 'Password should be at least 8 characters long'
    } else if (!/\d/.test(password)) {
        error = 'Password must contain at least one digit'
    } else if (!/[A-Z]/.test(password)) {
        error = 'Password must contain at least one capital letter'
    } else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~-]/.test(password)) {
        error = 'Password must contain at least one special character'
    }

    return error
}

export const validateRetypePassword = (retypePassword, formData) => {
    let error = ''

    if (retypePassword.trim() === '') {
        error = 'Re-type Password is required'
    } else if (retypePassword !== formData.password) {
        error = 'Passwords do not match'
    }

    return error
};

