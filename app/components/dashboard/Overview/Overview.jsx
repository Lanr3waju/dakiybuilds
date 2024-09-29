import ProjectDetails from './ProjectDetails'
import HorizontalLine from '../../utils/HorizontalLine'

function Overview() {
  return (
    <section className="my-2 rounded-lg bg-base-100 p-2 shadow-md">
      <h2 className="text-lg font-semibold uppercase text-primary">
        Project Overview:
      </h2>
      <HorizontalLine />
      <ProjectDetails />
    </section>
  )
}

export default Overview
