'use client'
import React, { useState } from 'react'
import SuccessModal from './SuccessModal'
import OrganizationForm from './OrganizationForm'
import UserForm from './UserForm'

function CreateProfileForm() {
  const [activateUserForm, setActivateUserForm] = useState(false)


  return (
    <section className="p-4">
      <SuccessModal />
      <h1 className="mt-10 text-center font-Poppins text-2xl font-bold uppercase tracking-widest text-primary">
        Create your profile on{' '}
        <span className="font-Fascinate text-primary-content/70">
          dakiybuilds
        </span>
      </h1>
      <OrganizationForm activateUserForm={activateUserForm} setActivateUserForm={setActivateUserForm} />
      <UserForm activateUserForm={activateUserForm} />
    </section>
  )
}

export default CreateProfileForm
