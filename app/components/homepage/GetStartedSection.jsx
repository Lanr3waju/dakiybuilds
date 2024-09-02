'use client'
import { ArrowRightSharp } from '@mui/icons-material'
import RequestDemoModal from './RequestDemoModal'
import ScrollRevealComponent from './ScrollRevealComponent'
import HomePageLoginForm from './HomePageLoginForm'

function GetStartedSection() {
  return (
    <section
      id="get-started"
      className=" justify-between !scroll-smooth border-y-4 border-black bg-neutral px-4 py-12 text-white md:flex md:px-12"
    >
      <RequestDemoModal />
      <section className="w-full text-center md:w-3/6 md:text-left">
        <ScrollRevealComponent>
          <h2 className="mb-2 w-full text-2xl font-semibold leading-[50px] tracking-wide md:text-justify">
            Do not miss this limited-time opportunity to be among the first
            users to experience and shape the future of construction management!
          </h2>
        </ScrollRevealComponent>
        <section>
          <ScrollRevealComponent>
            <div className='flex w-full flex-col items-center md:flex-row'>
              <p className="text-4xl font-extrabold uppercase leading-loose text-success md:my-2 md:text-5xl md:lowercase md:leading-[70px]">
                Sign up for your FREE account now!
            </p>
              <ArrowRightSharp className="mx-auto block rotate-90 animate-pulse text-[150px] text-success md:inline md:rotate-0" />
            </div>
          </ScrollRevealComponent>
          <ScrollRevealComponent>
            <div className="my-2 text-3xl font-bold text-warning md:my-3 md:text-center md:text-5xl">
              OR
            </div>
          </ScrollRevealComponent>
          <ScrollRevealComponent>
            <button
              className="btn btn-error btn-lg mx-auto my-8 w-full px-9 uppercase text-error-content md:mb-0"
              onClick={() =>
                document.getElementById('request_demo_modal').showModal()
              }
            >
              Request a demo
            </button>
          </ScrollRevealComponent>
        </section>
      </section>
      <HomePageLoginForm />
    </section>
  )
}

export default GetStartedSection
