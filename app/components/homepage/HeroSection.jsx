import { ArrowForwardRounded } from '@mui/icons-material'
import Carousel from './Carousel'
import { Link } from 'react-scroll'

function HeroSection() {
  return (
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
          Join the revolution in construction management. Experience the future
          of building projects with dakiyBuilds.
        </p>
        <Link
          to="get-started"
          spy={true}
          smooth={true}
          offset={0}
          duration={1000}
          className="btn btn-success mx-auto max-w-full px-9 text-white !scroll-smooth"
        >
          Get Started <ArrowForwardRounded />
        </Link>
      </section>
    </section>
  )
}

export default HeroSection
