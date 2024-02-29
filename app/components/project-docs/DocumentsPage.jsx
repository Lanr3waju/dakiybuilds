'use client'
import { DakiyStore } from '@/context/context'
import AddDocs from './AddDocs'
import DocType from './DocType'
import SearchDocs from './SearchDocs'
import { useContext } from 'react'
import Link from 'next/link'

function DocumentsPage() {
  const { project } = useContext(DakiyStore)
  return Object.keys(project).length > 0 ? (
    <section className="p-4">
      <SearchDocs />
      <AddDocs />
      <DocType name="Drawings" />
      <DocType name="Contract Documents" />
      <DocType name="Schedules" />
      <DocType name="Work Orders" />
      <DocType name="Change Orders" />
      <DocType name="Payment Requests & Receipts" />
    </section>
  ) : (
    <h1 className="m-7 rounded-lg border-2 border-error bg-error-content p-2 text-center text-lg font-bold uppercase text-error">
      Add and Select a Project{' '}
      <Link className="link link-info" href="/all-jobs">
        Here
      </Link>{' '}
      to access the Project Docs
    </h1>
  )
}

export default DocumentsPage
