import ProjectDetails from './ProjectDetails'

function Overview() {
  return (
    <section className="my-2 rounded-lg bg-base-100 p-2 shadow-md">
      <h2 className='font-bold text-primary-content/80'>Project Summary</h2>
      <ProjectDetails />
    </section>
  )
}

export default Overview
