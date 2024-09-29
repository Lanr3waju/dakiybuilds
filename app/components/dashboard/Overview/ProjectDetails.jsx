'use client'
import { DakiyStore } from '@/context/context'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import replaceSpacesWithHyphensAndLowerCase from '../../utils/replaceSpacesWithHyphens'
import addCommasToMoney from '../../utils/addCommasToNos'

function ProjectDetails() {
  const { project, workingProjectSumAndDate } = useContext(DakiyStore)
  const [pictureSrc, setPictureSrc] = useState('/logo.png')
  const [isImageLoading, setIsImageLoading] = useState(true)

  useEffect(() => {
    // Create the URL based on the currentProject name
    const url = `${
      process.env.NEXT_PUBLIC_SUPABASE_URL
    }/storage/v1/object/public/project-site-picture/${replaceSpacesWithHyphensAndLowerCase(
      project.name
    )}`

    // Fetch the image to verify if it exists
    fetch(url)
      .then((response) => {
        if (response.ok) {
          setPictureSrc(url) // Set the image URL if it exists
        } else {
          // Set a fallback image if it doesn't exist
          setPictureSrc("https://res.cloudinary.com/dbzorthz8/image/upload/v1710414091/logo_qbxief.png") // Update with your actual fallback image path
        }
      })
      .catch(() => {
        // Set a fallback image in case of an error
        setPictureSrc("https://res.cloudinary.com/dbzorthz8/image/upload/v1710414091/logo_qbxief.png") // Update with your actual fallback image path
      })
      .finally(() => {
        setIsImageLoading(false) // Stop the loading state once the fetch is done
      })
  }, [project])

  return (
    <section className="mt-3 font-Roboto">
      <section>
        <h2 className="font-semibold uppercase tracking-widest text-primary-content">
          {project.name}
        </h2>
        {isImageLoading ? (
          <div className="my-4 h-80 w-4/6 bg-gray-200 flex items-center justify-center">
            {/* Placeholder for loading */}
            <p>Loading image...</p>
          </div>
        ) : (
            <Image
              className="my-4 h-80 w-4/6 object-contain"
              priority
              quality={100}
              width={400}
              height={300}
              src={pictureSrc}
              alt="Picture of site"
            />
        )}
        <h3 className="mt-3 text-xs font-semibold uppercase text-primary">
          Site Location:{' '}
          <span className="block text-lg font-semibold tracking-wider text-primary-content/75">
            {project.location}
          </span>
        </h3>
        <h3 className="mt-3 text-xs font-semibold uppercase text-primary">
          Contract Sum:{' '}
          <span className="block text-lg font-semibold tracking-wider text-primary-content/75">
            ₦
            {addCommasToMoney(
              workingProjectSumAndDate.workingProjectContractSum
            )}
          </span>
        </h3>
        <h3 className="mt-3 text-xs font-semibold uppercase text-primary">
          Contract Finish Date:{' '}
          <span className="block text-lg font-semibold tracking-wider text-primary-content/75">
            {workingProjectSumAndDate.workingProjectFinishDate}
          </span>
        </h3>
      </section>
      <section className="mt-3">
        <h3 className="mt-3 text-xs font-semibold uppercase text-primary">
          Client Name:{' '}
          <span className="block text-lg font-semibold tracking-wider text-primary-content/75">
            {project.client_name}
          </span>
        </h3>
        <p className="mt-3 text-xs font-semibold uppercase text-primary">
          Client Email:{' '}
          <span className="block text-lg font-semibold tracking-wider text-primary-content/75">
            {project.client_email}
          </span>
        </p>
      </section>
    </section>
  )
}

export default ProjectDetails
