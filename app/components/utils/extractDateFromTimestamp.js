export default function extractDate(timestamp) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2) // pad with a leading zero if needed
  const day = ('0' + date.getDate()).slice(-2) // pad with a leading zero if needed

  return year + '-' + month + '-' + day
}
