import AddButon from '../utils/AddButon'
import TeamMembers from './TeamMembers'

function Team() {
  return (
    <section className="p-4">
      <AddButon addText="Add Team Member" />
      <TeamMembers />
    </section>
  )
}

export default Team
