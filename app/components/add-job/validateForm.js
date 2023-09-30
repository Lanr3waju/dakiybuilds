export const validateForm = (jobData) => {
  const errors = {}

  // Perform validations for each field
  if (!jobData.jobName) {
    errors.jobName = 'Job Title is required'
  }

  if (!jobData.jobLocation) {
    errors.jobLocation = 'Job Location is required'
  }

  if (!jobData.jobType) {
    errors.jobType = 'Job Type is required'
  }

  if (!jobData.clientName) {
    errors.clientName = 'Client Name is required'
  }

  if (!jobData.contractSum) {
    errors.contractSum = 'Contract Sum is required'
  }

  if (!jobData.clientEmail) {
    errors.clientEmail = 'Client Email is required'
  } else if (!/^\S+@\S+\.\S+$/.test(jobData.clientEmail)) {
    errors.clientEmail = 'Invalid email format'
  }

  if (!jobData.clientTelephone) {
    errors.clientTelephone = 'Client Telephone is required'
  } else if (!/^\d{11}$/.test(jobData.clientTelephone)) {
    errors.clientTelephone = 'Invalid telephone format'
  }

  if (!jobData.agreedStartDate) {
    errors.agreedStartDate = 'Agreed Start Date is required'
  }

  if (!jobData.estimatedFinishDate) {
    errors.estimatedFinishDate = 'Estimated Finish Date is required'
  } else if (
    new Date(jobData.estimatedFinishDate) <= new Date(jobData.agreedStartDate)
  ) {
    errors.estimatedFinishDate =
      'Estimated Finish Date must be after Agreed Start Date'
  }

  if (!jobData.projectDescription) {
    errors.projectDescription = 'Project Description is required'
  }

  return errors
}
