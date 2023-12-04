function UpdateLogForm({ setNewLog, setUpdateLog, newLog }) {
    async function submitNewLog(e) {
        e.preventDefault()
        setUpdateLog(false)
        console.log(newLog)
    }

    return (
        <form onSubmit={submitNewLog}>
            <textarea className="textarea textarea-bordered textarea-lg w-full text-sm" onChange={(event) => setNewLog(event.target.value)} value={newLog}></textarea>
            <button className="btn btn-success btn-xs ">Update Log</button>
        </form>
    )
}

export default UpdateLogForm
