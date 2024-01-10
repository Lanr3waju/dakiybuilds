import { DakiyStore } from '@/context/context'
import AddButon from '../utils/AddButon'
import TeamMembers from './TeamMembers'
import { useContext } from 'react'
import Link from 'next/link'

function Team() {
  const { project } = useContext(DakiyStore)
  return (
    Object.keys(project).length > 0 ? (
    <section className="p-4">
      <AddButon addText="Add Team Member" />
      <TeamMembers />
    </section>
    ) : (
      <h1 className="m-7 rounded-lg border-2 border-error bg-error-content p-2 text-center text-lg font-bold uppercase text-error">
        Add and Select a Project <Link className="link link-info" href='/all-jobs'>Here</Link> to access the Dashboard
      </h1>
    )
  )
}

export default Team
