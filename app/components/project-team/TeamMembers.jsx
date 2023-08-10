import teamData from './teamData.json'

function TeamMembers() {
    return (
        <section className="mt-5">
            <div className="overflow-x-auto font-Roboto">
                <table className="table table-zebra table-xs">
                    <thead className="bg-primary-content text-neutral-content">
                        <tr>
                            <th>S/N</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Last Login</th>
                            <th>More</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamData.map(({ id, name, role, phone, email, lastLoginDate }) => (
                            <tr key={id}>
                                <th>{id}</th>
                                <td>{name}</td>
                                <td>{role}</td>
                                <td>{phone}</td>
                                <td className="capitalize">{email}</td>
                                <td>{lastLoginDate}</td>
                                <td><button className="btn  btn-info btn-outline btn-xs">details</button></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-primary-content text-neutral-content">
                        <tr>
                            <th>S/N</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Tel</th>
                            <th>Email</th>
                            <th>Last Login</th>
                            <th>More</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </section >
    )
}

export default TeamMembers
