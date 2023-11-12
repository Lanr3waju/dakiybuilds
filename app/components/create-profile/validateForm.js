const fieldErrorMap = {
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  profession: 'Profession',
  tel: 'Mobile number',
  organizationName: 'Organization name',
  organizationEmail: 'Organization email',
  organizationTel: 'Organization tel',
  staffs: 'Number of staffs',
}

export const validateField = (fieldName, value) => {
  let error = ''

  if (value.trim() === '') {
    error = `${fieldErrorMap[fieldName]} is required`
  } else if (
    (fieldName === 'tel' || fieldName === 'organizationTel') &&
    !/^\d{11}$/.test(value)
  ) {
    error = 'Invalid phone number format; phone number should be 11 digits'
  } else if (fieldName === 'staffs' && !/^\d+$/.test(value)) {
    error = 'Invalid staffs number format: value should be digits e.g. 4'
  }

  return error
}
