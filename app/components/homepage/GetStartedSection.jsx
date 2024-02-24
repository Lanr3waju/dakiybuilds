'use client'
import { ArrowRightSharp } from '@mui/icons-material'
import RequestDemoModal from './RequestDemoModal'
import ScrollRevealComponent from './ScrollRevealComponent'
import HomePageLoginForm from './HomePageLoginForm'

function GetStartedSection() {
  return (
    <section
      id="get-started"
      className=" md:flex bg-neutral px-4 py-12 text-white md:px-12 !scroll-smooth justify-between"
    >
      <RequestDemoModal />
      <section className="w-full text-center md:w-3/6 md:text-left">
        <ScrollRevealComponent>
          <h2 className="text-2xl font-bold leading-[50px] tracking-wide mb-2">
            Do not miss this limited-time opportunity to be among the first
            users and experience the future of construction management!
          </h2>
        </ScrollRevealComponent>
        <section>
          <ScrollRevealComponent>
            <p className="md:my-1 text-5xl font-extrabold text-success">
              Sign up for your FREE account now!{' '}
              <ArrowRightSharp className="animate-pulse md:text-9xl text-[200px] rotate-90 md:rotate-0 block md:inline mx-auto" />{' '}
            </p>
          </ScrollRevealComponent>
          <ScrollRevealComponent>
            <div className="my-1 md:text-xl text-3xl font-bold text-warning">
              OR
            </div>
          </ScrollRevealComponent>
          <ScrollRevealComponent>
            <button
              className="btn btn-error btn-lg mx-auto mt-8 md:w-3/4 px-9 uppercase text-error-content w-full mb-8 md:mb-0"
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
