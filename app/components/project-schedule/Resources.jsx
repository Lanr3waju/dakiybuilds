import addCommasToMoney from '../utils/addCommasToNos'
import resourceData from './resourceData.json'

function Resources() {
    return (
        <section className="mt-5">
            <div className="overflow-x-auto font-Roboto">
                <table className="table table-zebra table-md">
                    <thead className="h-5/6 bg-primary-content text-neutral-content">
                        <tr>
                            <th>S/N</th>
                            <th>
                                <div className="tooltip tooltip-info tooltip-bottom z-50 cursor-pointer before:w-[20rem] before:content-[attr(data-tip)]" data-tip="Resource name">Name</div>
                            </th>
                            <th>
                                <div className="tooltip tooltip-info tooltip-bottom cursor-pointer before:whitespace-pre-wrap before:[--tw-content:'Type_of_resource_\a_(Plants_/_Equipment,_People_or_Material)']" data-tip>Unit</div>
                            </th>
                            <th>
                                <div className="tooltip tooltip-info tooltip-bottom z-50 cursor-pointer" data-tip="Unit cost of each resource">Rate (₦)</div>
                            </th>
                            <th>
                                <div className="tooltip tooltip-info tooltip-bottom cursor-pointer before:whitespace-pre-wrap before:[--tw-content:'The_unit_of_measurement_of_a_resource_\a_e.g._cubic-meter,_bag,_day_etc.']" data-tip>Unit</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {resourceData.map(({ id, name, type, rate, unit }) => (
                            <tr key={id}>
                                <th>{id}</th>
                                <td className='capitalize'>{name}</td>
                                <td className='capitalize'>{type}</td>
                                <td>{addCommasToMoney(rate)}</td>
                                <td className="capitalize">{unit}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-primary-content text-neutral-content">
                        <tr>
                            <th>S/N</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rate</th>
                            <th>Unit</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </section >
    )
}

export default Resources
