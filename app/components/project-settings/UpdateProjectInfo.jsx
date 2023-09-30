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
    client: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Here, you can perform the update action using the formData
    console.log('Form data submitted:', formData)
  }

  return (
    <form
      className="flex w-full flex-col p-4 font-Poppins text-lg font-bold uppercase"
      onSubmit={handleSubmit}
    >
      <input
        className="file-input file-input-bordered mb-3 w-full"
        placeholder="Select new Image"
        aria-label="Select new Image"
        type="file"
        name="image"
        value={formData.image}
        onChange={handleInputChange}
      />

      <input
        className="input input-bordered input-warning mb-3 w-full"
        placeholder="Enter new location"
        aria-label="Enter new location"
        type="text"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
      />

      <textarea
        className="textarea textarea-primary mb-3"
        placeholder="Add project summary"
        aria-label="Add project summary"
        name="summary"
        value={formData.summary}
        onChange={handleInputChange}
      />

      <input
        className="input input-bordered input-warning mb-3 w-full"
        placeholder="Enter new date"
        aria-label="Enter new date"
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleInputChange}
      />

      <input
        className="input input-bordered input-warning mb-3 w-full"
        placeholder="Enter new date"
        aria-label="Enter new date"
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleInputChange}
      />

      <select
        name="jobType"
        value={formData.type}
        onChange={handleInputChange}
        className="select select-warning mb-3 w-full"
      >
        <option disabled selected>
          Update Job Type
        </option>
        <option>Construction</option>
        <option>Renovation</option>
        <option>Demolition</option>
        <option>Maintenance</option>
      </select>

      <input
        className="input input-bordered input-warning mb-3 w-full"
        placeholder="Update client name"
        aria-label="Update client name"
        type="text"
        name="client"
        value={formData.client}
        onChange={handleInputChange}
      />

      <button className="btn btn-success" type="submit">
        Update Project
      </button>
    </form>
  )
}

export default EditableProjectForm
