import { useState } from 'react'
import { updateLog } from '../supabaseTables'

function UpdateLogForm({
  setNewLog,
  setUpdateLog,
  newLog,
  currentLogID,
  log,
  setLog,
}) {
  const [isLoading, setIsLoading] = useState(false)

  async function submitNewLog(e) {
    e.preventDefault()
    setIsLoading(true)

    const error = await updateLog(currentLogID, newLog)
    if (error) {
      alert(error)
      setIsLoading(false)
    } else {
      setLog({ ...log, note: newLog })
      setUpdateLog(false)
      setIsLoading(false)
    }
    console.log(newLog)
  }

  return (
    <form onSubmit={submitNewLog}>
      <textarea
        className="textarea textarea-bordered textarea-lg w-full text-sm"
        onChange={(event) => setNewLog(event.target.value)}
        value={newLog}
      ></textarea>
      <button disabled={isLoading} className="btn btn-success btn-xs ">
        {isLoading ? (
          <span className="loading loading-dots loading-sm"></span>
        ) : (
          'Update Log'
        )}
      </button>
    </form>
  )
}

export default UpdateLogForm
