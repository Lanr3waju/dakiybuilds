import addCommasToMoney from '../utils/addCommasToNos'
import paymentData from './paymentData.json'

function Payments() {
    return (
        <section className="mt-5">
            <div className="overflow-x-auto font-Roboto">
                <table className="table table-zebra table-xs md:table-md py-2 border-4 border-secondary/50">
                    <thead className="bg-primary text-primary-content-content uppercase font-Poppins tracking-wider">
                        <tr>
                            <th>S/N</th>
                            <th>Amount (₦)</th>
                            <th>Type (CR / DR)</th>
                            <th>Description</th>
                            <th>Beneficiary</th>
                            <th>Date</th>
                            <th>More</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentData.map(({ id, amount, type, description, beneficiary, date }) => (
                            <tr className='hover:translate-y-1 transition-all' key={id}>
                                <th>{id}</th>
                                <td>{addCommasToMoney(amount)}</td>
                                <td>{type}</td>
                                <td>{description}</td>
                                <td className="capitalize">{beneficiary}</td>
                                <td>{date}</td>
                                <td><button className="btn  btn-info btn-outline btn-xs">details</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section >
    )
}

export default Payments
