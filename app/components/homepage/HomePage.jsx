'use client'
import Image from 'next/image'
import { Link } from 'react-scroll'
import Carousel from './Carousel'
import { AirSharp, ArrowForwardRounded, ArrowRightSharp, Diversity1Sharp, EngineeringSharp, EqualizerSharp, ErrorOutlineSharp, HubSharp, InsightsSharp, PriceCheck, ShieldSharp, UpdateSharp } from '@mui/icons-material'
import HomePageFooter from './HomePageFooter'
import HomePageLoginForm from './HomePageLoginForm'

const HomeComponent = () => {

  return (
    <>
      <header className="sticky z-50 flex w-full justify-between border-b-4 border-base-300 px-2">
        <Image
          className="h-20 w-2/3 object-cover md:w-1/4"
          src="/logo.png"
          width={300}
          quality={100}
          height={100}
          loading="lazy"
          alt="logo"
        />
        <div className="flex w-1/3 md:w-1/5">
          <Image
            className="card grid h-20 w-1/3 grow place-items-end object-contain py-2 md:w-1/4"
            src="/yct-logo.png"
            width={300}
            quality={100}
            height={100}
            loading="lazy"
            alt="logo"
          />
          <div className="divider divider-horizontal"></div>
          <Image
            className="card grid h-20 w-1/3 grow place-items-start object-contain py-2 md:w-1/4"
            src="/naobs-logo.png"
            width={300}
            quality={100}
            height={100}
            loading="lazy"
            alt="logo"
          />
        </div>
      </header>
      <main className="text-center leading-loose">
        <section className="flex flex-col justify-center bg-gradient-to-b from-base-100 to-base-200 px-4 py-10 text-left md:flex-row md:px-2 md:py-16">
          <Carousel />
          <section className="md:mx-4 md:max-w-2xl md:text-left">
            <h2 className="font-Poppins text-lg font-extrabold text-success/70 md:text-2xl">
              Construction Management Made Easy
            </h2>
            <h1 className="max-w-[600px] font-Poppins text-3xl font-extrabold leading-10 tracking-wider text-base-content/80 md:text-5xl md:leading-[65px]">
              Ditch the paperwork, build smarter with{' '}
              <span className="font-Fascinate text-secondary">dakiyBuilds</span>
            </h1>
            <p className="max-w-6/12 mx-auto py-4 font-Raleway text-xl font-normal leading-7 tracking-widest text-base-content/80  md:mx-0 md:max-w-[550px] md:py-2 md:font-light md:leading-8">
              Join the revolution in construction management. Experience the
              future of building projects with dakiyBuilds.
            </p>
            <Link to="get-started"
              spy={true}
              smooth={true}
              offset={0}
              duration={1000}
              className="btn btn-success mx-auto max-w-full px-9 text-white !scroll-smooth">
              Get Started <ArrowForwardRounded />
            </Link>
          </section>
        </section>
        <section className="px-4 py-12 md:px-12">
          <h1 className="font-Poppins font-bold md:text-3xl">
            Why use a web-based management system ? 🤔
          </h1>
          <ul className="mt-4 flex flex-wrap justify-center">
            <li className="m-3 w-full rounded-lg border-2 border-solid border-base-300 p-7 md:w-5/12 "> <UpdateSharp className='text-5xl' />
              <h2 className="text-xl font-bold">Real-time updates: </h2>
              <p className="text-base-content/80">
                {' '}
                Changes made by one user are instantly reflected for everyone,
                ensuring everyone has the latest information and reducing the
                risk of outdated data leading to errors.
              </p>
            </li>
            <li className="m-3 w-full rounded-lg border-2 border-solid border-base-300 p-7 md:w-5/12 "> <Diversity1Sharp className='text-5xl' />
              <h2 className="text-xl font-bold">Remote Access</h2>
              <p className="text-base-content/80">
                Access your project from anywhere and at any time. No need to
                carry around bulky files and documents.
              </p>
            </li>
            <li className="m-3 w-full rounded-lg border-2 border-solid  border-base-300 p-7 md:w-5/12"><HubSharp className='text-5xl' />
              <h2 className="text-xl font-bold">Centralized Communication</h2>
              <p className="text-base-content/80">
                Access your project from anywhere and at any time. No need to
                carry around bulky files and documents.
              </p>
            </li>
            <li className="m-3 w-full rounded-lg border-2 border-solid border-base-300 p-7 md:w-5/12 "> <InsightsSharp className='text-5xl' />
              <h2 className="text-xl font-bold">Automated Workflows</h2>
              <p className="text-base-content/80">
                Automate routine tasks like scheduling, progress tracking, and
                document management, freeing up time for more strategic work.
              </p>
            </li>
            <li className="m-3 w-full rounded-lg border-2 border-solid border-base-300 p-7 md:w-5/12 "> <EqualizerSharp className='text-5xl' />
              <h2 className="text-xl font-bold">Improved Data Analysis</h2>
              <p className="text-base-content/80">
                Data collected in the system can be easily analyzed to identify
                trends, improve decision-making, and optimize project
                performance.
              </p>
            </li>
            <li className="m-3 w-full rounded-lg border-2 border-solid border-base-300 p-7 md:w-5/12 "><ErrorOutlineSharp className='text-5xl' />
              <h2 className="text-xl font-bold">Reduced Errors</h2>
              <p className="text-base-content/80">
                Streamlined processes and centralized data minimize the risk of
                errors caused by manual data entry and document management.
              </p>
            </li>
          </ul>
        </section>
        <section className="border-4 border-b-base-300 bg-neutral-content px-4 py-12 md:px-12">
          <h1 className="font-Poppins font-bold md:text-3xl">
            Why chose <span className="font-Fascinate">dakiyBuilds ? 🤨</span>
          </h1>
          <ul className="mt-4 flex flex-wrap justify-center">
            <li className="m-3 w-full rounded-lg border-2 border-solid border-base-300 p-7 md:w-5/12 "> <EngineeringSharp className='text-5xl' />
              <h2 className="text-xl font-bold">
                Built by the industry, for the industry:
              </h2>
              <p className="text-base-content/80">
                {' '}
                We understand your unique challenges and pain points.
                Dakiybuilds is designed specifically for construction workflows.
              </p>
            </li>
            <li className="m-3 w-full rounded-lg border-2 border-solid border-base-300 p-7 md:w-5/12 "> <AirSharp className='text-5xl' />
              <h2 className="text-xl font-bold">
                Simple to learn, powerful to use:
              </h2>
              <p className="text-base-content/80">
                Get started quickly with our intuitive interface and
                user-friendly features. No IT expertise needed.
              </p>
            </li>
            <li className="m-3 w-full rounded-lg border-2 border-solid  border-base-300 p-7 md:w-5/12"><PriceCheck className='text-5xl' />
              <h2 className="text-xl font-bold">Provides a Free tier</h2>
              <p className="text-base-content/80">
                Access core features like document storage, team management,
                scheduling, and basic budget tracking completely FREE
              </p>
            </li>
            <li className="m-3 w-full rounded-lg border-2 border-solid border-base-300 p-7 md:w-5/12 "> <ShieldSharp className='text-5xl' />
              <h2 className="text-xl font-bold">Future proof your projects</h2>
              <p className="text-base-content/80">
                Get ready for the evolution! Dakiybuilds is constantly evolving,
                with exciting AI-powered features and integrations coming soon.
              </p>
            </li>
            <li className="m-3 w-full rounded-lg border-2 border-solid border-base-300 p-7 md:w-5/12 ">
              <h2 className="text-xl font-bold">Made In Nigeria 🟩⬜🟩</h2>
              <p className="text-base-content/80">
                Most importantly, DakiyBuilds is made in Nigeria, thus, designed
                to suit the unique processes / practices in the Nigerian &
                African Construction Industry.
              </p>
            </li>
            <li className="m-3 w-full rounded-lg p-7 md:w-5/12 "></li>
          </ul>
        </section>
        <section id='get-started' className="flex bg-neutral px-4 py-12 text-white md:px-12 !scroll-smooth">
          <section className="w-3/6 text-left">
            <h2 className="text-2xl font-bold leading-[50px] tracking-wide">
              Do not miss this limited-time opportunity to be among the first
              users and experience the future of construction management!
            </h2>
            <section>
              <p className="my-1 text-5xl font-extrabold text-success">
                Sign up for your FREE account now!{' '}
                <ArrowRightSharp className="animate-pulse text-9xl" />{' '}
              </p>
              <div className="my-1 text-xl font-bold text-warning">OR</div>
              <button className="btn btn-error btn-lg mx-auto mt-8 w-3/4 px-9 uppercase text-error-content">
                Request a demo
              </button>
            </section>
          </section>
          <HomePageLoginForm />
        </section>
      </main>
      <HomePageFooter />
    </>
  )
}

export default HomeComponent
