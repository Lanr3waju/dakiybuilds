'use client'
import React, { useState } from 'react'

const EditableProjectForm = () => {
    const [formData, setFormData] = useState({
        image: '',
        location: '',
        summary: '',
        startDate: '',
        endDate: '',
        jobType: '',
        client: ''
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Here, you can perform the update action using the formData
        console.log('Form data submitted:', formData)
    }

    return (
        <form className='flex flex-col uppercase font-bold text-lg font-Poppins p-4 w-full' onSubmit={handleSubmit}>
            <input
                className="file-input file-input-bordered w-full mb-3"
                placeholder='Select new Image'
                aria-label='Select new Image'
                type="file"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
            />

            <input
                className="input input-bordered input-warning w-full mb-3"
                placeholder='Enter new location'
                aria-label='Enter new location'
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
            />

            <textarea
                className="textarea textarea-primary mb-3"
                placeholder='Add project summary'
                aria-label='Add project summary'
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
            />

            <input
                className="input input-bordered input-warning w-full mb-3"
                placeholder='Enter new date'
                aria-label='Enter new date'
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
            />

            <input
                className="input input-bordered input-warning w-full mb-3"
                placeholder='Enter new date'
                aria-label='Enter new date'
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
            />

            {/* TODO this should be a select input */}
            <input
                className="input input-bordered input-warning w-full mb-3"
                placeholder='Select new job type'
                aria-label='Select new job type'
                type="text"
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
            />

            <input
                className="input input-bordered input-warning w-full mb-3"
                placeholder='Update client name'
                aria-label='Update client name'
                type="text"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
            />

            <button className='btn btn-success' type="submit">Update Project</button>
        </form>
    )
}

export default EditableProjectForm
