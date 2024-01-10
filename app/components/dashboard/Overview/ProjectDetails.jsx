'use client'
import { DakiyStore } from '@/context/context'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import replaceSpacesWithHyphensAndLowerCase from '../../utils/replaceSpacesWithHyphens'
import addCommasToMoney from '../../utils/addCommasToNos'
function ProjectDetails() {
  const { project, workingProjectSumAndDate } = useContext(DakiyStore)
  const [pictureSrc, setPictureSrc] = useState('/logo.png')

  useEffect(() => {
    // Create the URL based on the currentProject name
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project-site-picture/${replaceSpacesWithHyphensAndLowerCase(project.name)}`

    // Fetch the image to see if it exists
    fetch(url)
      .then(response => {
        if (response.ok) {
          setPictureSrc(url) // Set the image URL if it exists
        } else {
          // Set a fallback image if it doesn't exist
          setPictureSrc('/logo.png') // Update with your actual fallback image path
        }
      })
      .catch(() => {
        // Set a fallback image in case of an error
        setPictureSrc('/logo.png') // Update with your actual fallback image path
      })
  }, [project]);

  return (
    <section className="mt-3 font-Roboto">
      <section>
        <h2 className="font-semibold uppercase text-primary-content tracking-widest">
        {project.name}
      </h2>
        <Image className="my-4 w-4/6 object-cover"
        priority quality={100}
          width={400}
          height={300}
        src={pictureSrc}
        alt="Picture of site" />
        <h3 className='uppercase text-primary font-semibold mt-3 text-xs'>Site Location: <span className='text-lg tracking-wider font-semibold text-primary-content/75 block'>{project.location}</span></h3>
        <h3 className='text-primary font-semibold text-xs uppercase mt-3'>Contract Sum: <span className='text-lg tracking-wider font-semibold text-primary-content/75 block'>₦{addCommasToMoney(workingProjectSumAndDate.workingProjectContractSum)}</span></h3>
        <h3 className='text-primary font-semibold text-xs uppercase mt-3'>Contract Finish Date: <span className='text-lg tracking-wider font-semibold text-primary-content/75 block'>{workingProjectSumAndDate.workingProjectFinishDate}</span></h3>
      </section>
      <section className="mt-3">
        <h3 className='text-primary font-semibold text-xs uppercase mt-3'>Client Name: <span className='text-lg tracking-wider font-semibold text-primary-content/75 block'>{project.client_name}</span></h3>
        <p className='text-primary font-semibold text-xs uppercase mt-3'>Client Email: <span className='text-lg tracking-wider font-semibold text-primary-content/75 block'>{project.client_email}</span></p>
      </section>
    </section>
  )
}

export default ProjectDetails
