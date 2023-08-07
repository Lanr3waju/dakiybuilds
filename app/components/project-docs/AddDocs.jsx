'use client'

import { useEffect, useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'

export function AddDocs() {
    const [file, setFile] = useState()
    const [fileUploaded, setFileUploaded] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!file) return
        setFileUploaded(true)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            // Code to be executed after 3 seconds
            setFileUploaded(false)
        }, 3000)
        return () => clearTimeout(timer)
    }, [fileUploaded])

    return (
        <div>
            {fileUploaded && (
                <div className="alert alert-success transition-all delay-100 absolute left-0" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>File Uploaded Sucessfully!</span>
                </div>
            )}
            <form className='py-2 flex flex-col md:flex-row md:items-end' onSubmit={onSubmit}>
                <label className='text-secondary-focus font-semibold uppercase justify-start max-w-sm md:mr-3'>Add document
                    <HorizontalLine />
                    <input name="file"
                        onChange={(e) => setFile(e.target.files?.[0])}
                        type="file"
                        className="file-input file-input-bordered file-input-accent w-full max-w-sm" />
                </label>
                <select className="select select-warning w-full max-w-sm md:mr-3 text-secondary-focus w-full my-3 md:m-0">
                    <option disabled selected>Select Document Category</option>
                    <option>Drawings</option>
                    <option>Contract Documents</option>
                    <option>Schedules</option>
                    <option>Work Orders</option>
                    <option>Change Orders</option>
                    <option>Payment Requests & Receipts</option>
                </select>
                <button className='btn btn-accent mt-2 md:m-0' type="submit" value="Upload"> Upload</button>
            </form>
        </div>
    )
}

export default AddDocs
