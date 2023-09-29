const currentDate = new Date()

export const getGreeting = () => {
  const currentHour = currentDate.getHours()

  if (currentHour < 12) {
    return 'Good morning'
  } else if (currentHour < 17) {
    return 'Good afternoon'
  } else {
    return 'Good evening'
  }
}

export const getDate = () => {
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const formattedDate = `${
    dayNames[currentDate.getDay()]
  }, ${currentDate.getDate()} ${
    monthNames[currentDate.getMonth()]
  }, ${currentDate.getFullYear()}`
  return formattedDate
}
