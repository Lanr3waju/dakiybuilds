import ProjectDetails from './ProjectDetails'
import HorizontalLine from '../../utils/HorizontalLine'

function Overview() {
  return (
    <section className="my-2 p-2 bg-base-100 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold uppercase text-primary">
        Project Overview:
      </h2>
      <HorizontalLine />
      <ProjectDetails />
    </section>
  )
}

export default Overview
