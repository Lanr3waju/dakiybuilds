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
                <div
                  className="tooltip tooltip-bottom tooltip-info z-50 cursor-pointer"
                  data-tip="Resource name"
                >
                  Name
                </div>
              </th>
              <th>
                <div
                  className="tooltip tooltip-bottom tooltip-info z-50 cursor-pointer"
                  data-tip="Category of the resource"
                >
                  Group
                </div>
              </th>
              <th>
                <div
                  className="tooltip tooltip-bottom tooltip-info z-50 cursor-pointer"
                  data-tip="Unit rate of each resource"
                >
                  Rate (₦)
                </div>
              </th>
              <th>
                <div
                  className="tooltip tooltip-bottom tooltip-info cursor-pointer"
                  data-tip="Number of resource required"
                >
                  Quantity
                </div>
              </th>
              <th>
                <div
                  className="tooltip tooltip-bottom tooltip-info cursor-pointer"
                  data-tip="Resource unit of measurement"
                >
                  Unit
                </div>
              </th>
              <th>
                <div
                  className="tooltip tooltip-bottom tooltip-info cursor-pointer"
                  data-tip="Total resource cost"
                >
                  Cost
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {resourceData.map(({ id, name, group, rate, quantity, resourceUnit, cost }) => (
              <tr key={id} className='capitalize'>
                <th>{id}</th>
                <td>{name}</td>
                <td>{group}</td>
                <td>{addCommasToMoney(rate)}</td>
                <td>{quantity}</td>
                <td>{resourceUnit}</td>
                <td>{addCommasToMoney(cost)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-primary-content text-neutral-content">
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Group</th>
              <th>Rate</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Cost</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}

export default Resources
