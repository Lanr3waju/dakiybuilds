'use client'
import { ArrowRightSharp } from '@mui/icons-material'
import RequestDemoModal from './RequestDemoModal'
import ScrollRevealComponent from './ScrollRevealComponent'
import HomePageLoginForm from './HomePageLoginForm'

function GetStartedSection() {
  return (
    <section
      id="get-started"
      className=" justify-between !scroll-smooth bg-neutral px-4 py-12 text-white md:flex md:px-12 border-b-4 border-black border-t-4"
    >
      <RequestDemoModal />
      <section className="w-full text-center md:w-3/6 md:text-left">
        <ScrollRevealComponent>
          <h2 className="mb-2 text-2xl font-semibold leading-[50px] tracking-wide w-full md:text-justify">
            Do not miss this limited-time opportunity to be among the first
            users to experience and shape the future of construction management!
          </h2>
        </ScrollRevealComponent>
        <section>
          <ScrollRevealComponent>
            <div className='flex flex-col md:flex-row w-full items-center'>
              <p className="md:text-5xl text-4xl leading-loose uppercase md:lowercase font-extrabold text-success md:my-2 md:leading-[70px]">
                Sign up for your FREE account now!
            </p>
              <ArrowRightSharp className="mx-auto block rotate-90 animate-pulse text-[150px] md:inline md:rotate-0 text-success" />
            </div>
          </ScrollRevealComponent>
          <ScrollRevealComponent>
            <div className="my-2 md:my-3 md:text-center text-3xl font-bold text-warning md:text-5xl">
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
