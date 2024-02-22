'use client'
import React, { useState } from 'react'

const NewResourceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    rate: '',
    quantity: '',
    unit: '',
    cost: '',
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
    const { quantity, rate } = formData
    const resourceCost = quantity * rate
    setFormData({ ...formData, cost: resourceCost })
    // Here, you can perform the update action using the formData
    console.log('new resource added:', formData)
  }

  return (
    <>
      <form className="flex w-full flex-col justify-between pt-5 font-Poppins text-lg font-bold uppercase md:flex-row">
        <input
          className="input input-bordered input-warning mx-1 mb-3 w-full placeholder:text-xs md:max-w-[20%]"
          placeholder="Enter resource name"
          aria-label="Enter resource name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="select select-warning mx-1 mb-3 w-full placeholder:text-xs md:max-w-[20%]"
        >
          <option disabled>Select resource group</option>
          <option>Material</option>
          <option>Plant / Equipment</option>
          <option>People</option>
        </select>

        <input
          className="input input-bordered input-warning mx-1 mb-3 w-full placeholder:text-xs md:max-w-[20%]"
          placeholder="Enter resource rate"
          aria-label="Enter resource rate"
          type="number"
          name="rate"
          value={formData.rate}
          onChange={handleInputChange}
        />

        <input
          className="input input-bordered input-warning mx-1 mb-3 w-full placeholder:text-xs md:max-w-[20%]"
          placeholder="Enter quantity of resource required"
          aria-label="Enter quantity of resource required"
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
        />

        <input
          className="input input-bordered input-warning mx-1 mb-3 w-full placeholder:text-xs md:max-w-[20%]"
          placeholder="Enter resource unit of measurement"
          aria-label="Enter resource unit of measurement"
          type="text"
          name="unit"
          value={formData.unit}
          onChange={handleInputChange}
        />
      </form>
      <button
        onClick={handleSubmit}
        className="btn btn-success block w-full"
        type="submit"
      >
        Add resource
      </button>
    </>
  )
}

export default NewResourceForm
