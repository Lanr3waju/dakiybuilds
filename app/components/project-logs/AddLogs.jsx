import { useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import { logsTable } from './supabaseTables'

const AddLogs = ({ setAddLog, setLog, log }) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleTextAreaChange = ({ target }) => {
        const { name, value } = target
        setLog({ ...log, [name]: value })
    }


    const validateForm = () => {
        const { logBody, logTitle } = log
        if (logBody && logTitle) {
            return true
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        if (validateForm()) {
            const error = await logsTable(log)
            const errorMessage = error?.message
            if (!errorMessage) {
                setIsLoading(false)
                alert('Log successfully added')
                setAddLog(false)
            } else {
                setIsLoading(false)
                alert(errorMessage + "   " + 'Try Again!')
            }
        }
    }

    return (
        <form className='my-3 w-full' onSubmit={handleSubmit}>
            <HorizontalLine />
            <input
                name='logTitle'
                className='input input-bordered input-primary w-3/4 focus:border-primary-focus focus:outline-0 focus:ring-2 focus:ring-primary-focus'
                maxLength='60'
                value={log.logTitle}
                placeholder='Enter log title'
                aria-label='Enter log title'
                onChange={handleTextAreaChange}
            />
            <textarea
                name='logBody'
                aria-label='Enter logs'
                className='textarea textarea-bordered textarea-primary textarea-lg my-4 w-full p-3 focus:border-primary-focus focus:outline-0 focus:ring-2 focus:ring-primary-focus'
                value={log.logBody}
                onChange={handleTextAreaChange}
                placeholder="Enter today's log..."
            />
            <button disabled={isLoading || !validateForm()} className='btn btn-primary block'>{isLoading ? <span className="loading loading-dots loading-lg"></span> : "Submit Log"}</button>
        </form>
    )
}
export default AddLogs
