import Agendas from './Agendas'
import ProjectDetails from './ProjectDetails'
import HorizontalLine from '../../utils/HorizontalLine'

function Overview() {
    return (
        <section>
            <h2 className='text-lg font-semibold uppercase text-primary'>Project Overview:</h2>
            <HorizontalLine />
            <Agendas />
            <ProjectDetails />
        </section>
    )
}

export default Overview
