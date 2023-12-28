import React, { useState } from 'react'
import DeleteJobModal from './modals/DeleteJobModal'

const DeleteJobState = ({ currentProject, setDeleteState }) => {
    const [userInput, setUserInput] = useState('')

    const handleInputChange = (event) => {
        setUserInput(event.target.value)
    }

    const handlePaste = (event) => {
        event.preventDefault()
        alert('Type in the job title to verify your delete action')
    }

    const handleSubmit = () => {
        if (userInput?.toLowerCase() === currentProject?.name.toLowerCase()) {
            window.delete_job_modal.showModal()
        }
        // setDeleteState(false)
    }

    return (
        <>
            <DeleteJobModal currentProject={currentProject} setDeleteState={setDeleteState} />
            <div className='bg-error/40 p-4 rounded-xl mt-4'>
                <p className='text-error'><span className='font-bold uppercase'>warning:</span>If you proceed to delete this project, you&apos;ll lose all associated data!</p>
                <p>Please enter the job title <span className='font-bold font-Roboto uppercase text-error'>&apos;{currentProject.name}&apos;</span> in the box below to verify your delete action.</p>
                <input className='input input-error w-full my-3' type="text" onChange={handleInputChange} onPaste={handlePaste} />
                <button disabled={userInput?.toLowerCase() !== currentProject?.name.toLowerCase()} className='btn btn-error w-full' onClick={handleSubmit}>Submit</button>
                <button className='btn btn-warning w-full mt-3' onClick={() => setDeleteState(false)}>Cancel</button>
            </div >
        </>
    )
}

export default DeleteJobState
