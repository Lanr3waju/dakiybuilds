export default function calculatePercentage(part, whole) {
  if (isNaN(part) || isNaN(whole) || part > whole) {
    return 'Invalid input'
  }
  return Math.round((part / whole) * 100)
}
