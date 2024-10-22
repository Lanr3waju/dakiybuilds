'use client';

import { useContext, useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import { DakiyStore } from '@/context/context'
import { handleFileUpload } from './fileUploader'
import replaceSpacesWithHyphensAndLowerCase from '../utils/replaceSpacesWithHyphens'
import AlertSuccess from '../utils/AlertSuccess'

export function AddDocs() {
  const { currentProjectId } = useContext(DakiyStore) // Assuming you have currentProjectId in your context
  const [file, setFile] = useState('')
  const [category, setCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const onSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    if (!file || !category) {
      alert('Please select a file and a category before uploading.')
      return
    }

    const fileName = `${currentProjectId}-${replaceSpacesWithHyphensAndLowerCase(file.name)}-${category}`
    const result = await handleFileUpload({ target: { files: [file] } }, fileName)
    if (result) {
      setUploadSuccess(true)
      setIsLoading(false)
      setFile('')
      setCategory('')
      setTimeout(() => setUploadSuccess(false), 5000) // Reset success message after 3 seconds
    }
    setIsLoading(false)
  };

  return (
    <section>
      {uploadSuccess && (
        <AlertSuccess message='File uploaded successfully' />
      )}
      <h2 className='w-full text-base font-semibold'>
        Add Documents
        <HorizontalLine />
      </h2>
      <form
        className="flex flex-col py-2 text-xs md:flex-row md:items-end"
        onSubmit={onSubmit}
      >
        <label className="max-w-sm justify-start font-semibold uppercase text-secondary md:mr-3">
          <input
            name="file"
            onChange={(e) => setFile(e.target.files?.[0])}
            type="file"
            className="file-input file-input-bordered file-input-accent file-input-md w-full max-w-sm"
            accept=".pdf, .doc, .docx, .png, .jpg, .jpeg, .webp" // Allowed file types
          />
        </label>
        <select
          className="select select-warning select-md my-3 w-full max-w-sm text-secondary md:m-0 md:mr-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select Document Category
          </option>
          <option>Drawings</option>
          <option>Contract Documents</option>
          <option>Schedules</option>
          <option>Work Orders</option>
          <option>Change Orders</option>
          <option>Payment Requests & Receipts</option>
        </select>
        <button
          className="btn btn-accent btn-md mt-2 md:m-0"
          type="submit"
          disabled={!file || !category || isLoading} // Disable if no file or category is selected
        >
          {isLoading ? <span className="loading loading-spinner loading-xs"></span> : 'Upload'}
        </button>
      </form>
    </section>
  )
}

export default AddDocs
