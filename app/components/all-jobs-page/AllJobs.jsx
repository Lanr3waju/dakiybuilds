import HorizontalLine from '../utils/HorizontalLine'
import Progress from '../utils/Progress'
import addCommasToMoney from '../utils/addCommasToNos'
import allProjects from './allProjects.json'

function AllJobs() {
    return (
        <section className='p-4 font-Poppins'>
            <h1 className='font-medium uppercase text-primary md:text-lg'>Jobs</h1>
            <HorizontalLine />
            <ul>
                {allProjects.map(({ title, progress, contractSum, startDate, estimatedFinishDate, clientName }) => (
                    <li className='mb-1 flex w-full flex-wrap items-center justify-between p-4 shadow-lg shadow-base-300' key={title}>
                        <section className='w-5/6'>
                            <h2 className='font-semibold uppercase text-primary-content md:mr-4'>{title}<span className='block font-Roboto md:inline'>(₦{addCommasToMoney(contractSum)})</span></h2>
                            <p>Start Date: {startDate} <span className='block md:inline'>Est. Finish Date: {estimatedFinishDate}</span></p>
                            <p>Client: {clientName}</p>
                            <Progress progress={progress} />
                        </section>
                        <button className='btn btn-neutral mt-3 font-Poppins text-neutral-content md:m-0 md:p-12'>open project</button>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default AllJobs

