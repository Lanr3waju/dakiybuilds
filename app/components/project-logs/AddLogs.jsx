import { useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'

const AddLogs = () => {
    const initialLogData = { logBody: '', logTitle: '' }
    const [log, setLog] = useState(initialLogData)
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

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        if (validateForm()) {
            setIsLoading(false)
            setLog(initialLogData)
            console.log('Text Area Value:', log)
        }
    }

    return (
        <form className='my-3 w-full' onSubmit={handleSubmit}>
            <HorizontalLine />
            <input
                name='logTitle'
                className='input w-3/4 input-bordered input-primary focus:ring-2 focus:outline-0 focus:ring-primary-focus focus:border-primary-focus'
                maxLength='60'
                value={log.logTitle}
                placeholder='Enter log title'
                aria-label='Enter log title'
                onChange={handleTextAreaChange}
            />
            <textarea
                name='logBody'
                aria-label='Enter logs'
                className='w-full my-4 p-3 textarea textarea-primary textarea-bordered textarea-lg focus:ring-2 focus:outline-0 focus:ring-primary-focus focus:border-primary-focus'
                value={log.logBody}
                onChange={handleTextAreaChange}
                placeholder="Enter today's log..."
            />
            <button disabled={isLoading || !validateForm()} className='btn btn-primary block'>{isLoading ? <span className="loading loading-dots loading-lg"></span> : "Submit Log"}</button>
        </form>
    )
}
export default AddLogs
