import ProjectDetails from './ProjectDetails'
import HorizontalLine from '../../utils/HorizontalLine'

function Overview() {
  return (
    <section className="my-4">
      <h2 className="text-lg font-semibold uppercase text-primary">
        Project Overview:
      </h2>
      <HorizontalLine />
      <ProjectDetails />
    </section>
  )
}

export default Overview
