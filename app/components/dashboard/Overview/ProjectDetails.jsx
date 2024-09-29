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
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL
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
    <section className="mt-3 font-Raleway text-sm">

      <h2 className="font-bold capitalize tracking-widest text-primary-content/75">
        {project.name}
      </h2>
      {isImageLoading ? (
        <div className="my-4 h-80 w-4/6 bg-gray-200 flex items-center justify-center">
          {/* Placeholder for loading */}
          <p>Loading image...</p>
        </div>
      ) : (
        <Image
            className="my-4 h-80 w-full object-cover"
            priority
            quality={100}
          width={500}
          height={300}
          src={pictureSrc}
          alt="Picture of site"
        />
      )}
      <section className='flex justify-left flex-wrap'>
        <h3 className="p-2 m-1 shadow-md shadow-base-200 text-primary-content/75">
          Site Location:{' '}
          <p className="font-medium font-Roboto tracking-wider text-primary-content/75">
            {project.location}
          </p>
        </h3>
        <h3 className="p-2 m-1 shadow-md shadow-base-200 text-primary-content/75">
          Contract sum:{' '}
          <p className="font-medium font-Roboto tracking-wider text-primary-content/75">
            ₦
            {addCommasToMoney(
              workingProjectSumAndDate.workingProjectContractSum
            )}
          </p>
        </h3>
        <h3 className="p-2 m-1 shadow-md shadow-base-200 text-primary-content/75">
          Contract finish Date:{' '}
          <p className="font-medium font-Roboto tracking-wider text-primary-content/75">
            {workingProjectSumAndDate.workingProjectFinishDate}
          </p>
        </h3>
        <h3 className="p-2 m-1 shadow-md shadow-base-200 text-primary-content/75">
          Client name:{' '}
          <p className="font-medium font-Roboto font-Roboto tracking-wider text-primary-content/75">
            {project.client_name}
          </p>
        </h3>
        <h3 className="p-2 m-1 shadow-md shadow-base-200 text-primary-content/75">
          Client email:{' '}
          <p className="font-medium font-Roboto font-Roboto tracking-wider text-primary-content/75">
            {project.client_email}
        </p>
        </h3>
      </section>
    </section>
  )
}

export default ProjectDetails
