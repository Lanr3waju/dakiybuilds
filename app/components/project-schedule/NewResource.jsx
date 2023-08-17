'use client'
import React, { useState } from 'react'

const NewResourceForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        rate: '',
        unit: ''
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
        console.log('new resource added:', formData)
    }

    // TODO Add tooltip to inputs

    return (
        <form className='flex w-full flex-col justify-between md:flex-row py-5 font-Poppins text-lg font-bold uppercase' onSubmit={handleSubmit}>
            <input
                className="input input-bordered input-warning mb-3 w-full md:max-w-[22%] placeholder:text-xs"
                placeholder='Enter resource name'
                aria-label='Enter resource name'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
            />

            <select name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="select select-warning mb-3 w-full md:max-w-[22%] placeholder:text-xs">
                <option disabled selected>Select resource type</option>
                <option>Material</option>
                <option>Plant / Equipment</option>
                <option>People</option>
            </select>

            <input
                className="input input-bordered input-warning mb-3 w-full md:max-w-[22%] placeholder:text-xs"
                placeholder='Enter resource rate'
                aria-label='Enter resource rate'
                type="number"
                name="rate"
                value={formData.rate}
                onChange={handleInputChange}
            />

            <input
                className="input input-bordered input-warning mb-3 w-full md:max-w-[22%] placeholder:text-xs"
                placeholder='Enter resource unit of measurement'
                aria-label='Enter resource unit of measurement'
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
            />
            <button className='btn btn-success' type="submit">Add resource</button>
        </form>
    )
}

export default NewResourceForm
