'use client'
import { ArrowRightSharp } from '@mui/icons-material'
import RequestDemoModal from './RequestDemoModal'
import ScrollRevealComponent from './ScrollRevealComponent'
import HomePageLoginForm from './HomePageLoginForm'

function GetStartedSection() {
  return (
    <section
      id="get-started"
      className=" justify-between !scroll-smooth bg-neutral px-4 py-12 text-white md:flex md:px-12"
    >
      <RequestDemoModal />
      <section className="w-full text-center md:w-3/6 md:text-left">
        <ScrollRevealComponent>
          <h2 className="mb-2 text-2xl font-bold leading-[50px] tracking-wide">
            Do not miss this limited-time opportunity to be among the first
            users and experience the future of construction management!
          </h2>
        </ScrollRevealComponent>
        <section>
          <ScrollRevealComponent>
            <p className="text-5xl font-extrabold text-success md:my-1">
              Sign up for your FREE account now!{' '}
              <ArrowRightSharp className="mx-auto block rotate-90 animate-pulse text-[200px] md:inline md:rotate-0 md:text-9xl" />{' '}
            </p>
          </ScrollRevealComponent>
          <ScrollRevealComponent>
            <div className="my-1 text-3xl font-bold text-warning md:text-xl">
              OR
            </div>
          </ScrollRevealComponent>
          <ScrollRevealComponent>
            <button
              className="btn btn-error btn-lg mx-auto my-8 w-full px-9 uppercase text-error-content md:mb-0 md:w-3/4"
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
