import Image from 'next/image'
import Link from 'next/link'
import HorizontalLine from '../utils/HorizontalLine'
import ScrollRevealComponent from './ScrollRevealComponent'
import {
  LinkedIn,
  MailSharp,
  PhoneAndroidSharp,
} from '@mui/icons-material'

const HomePageFooter = () => (
  <footer className="flex flex-col justify-around bg-slate-100 px-4 py-10 md:flex-col md:px-16">
    <section className="mx-auto w-full text-center text-sm font-medium leading-10 tracking-widest text-primary-content/80 md:mx-0 md:max-w-[38rem] md:text-left md:text-sm md:leading-6">
      <Image
        className="h-20 w-full object-cover md:w-3/4 "
        src="https://res.cloudinary.com/dbzorthz8/image/upload/v1710414091/logo_qbxief.png"
        width={900}
        quality={100}
        height={100}
        loading="lazy"
        alt="logo"
      />

      <ScrollRevealComponent>
        <p className="my-2 w-full leading-6 md:mt-1">
          A web-based construction management system meticulously crafted by professionals in the construction industry to address the challenges faced by project stakeholders (including Project Managers, Construction Managers, Architects, Builders, and Construction Companies).
          Equipped with carefully selected features, it empowers the management team to oversee projects with precision and efficiency.
        </p>
      </ScrollRevealComponent>
      <HorizontalLine />
    </section>
    <section className="w-full py-2 text-base font-bold text-success md:text-2xl">
      <div className="flex flex-col font-Roboto text-sm tracking-wider text-primary-content/70 md:flex-row md:items-center w-full">
        <p className="my-1 mr-3">
          <PhoneAndroidSharp />{' '}
          <Link
            href="tel:+23407041444880"
            target="_blank"
            className="link-secondary"
          >
            +234 070 - DakiyBuilds
          </Link>{' '}
        </p>
        <p className="my-1 mr-3">
          <MailSharp />{' '}
          <Link
            href="mailto:dakiybuilds@gmail.com"
            target="_blank"
            className="link-secondary"
          >
            dakiybuilds@gmail.com
          </Link>
        </p>
        <p className="my-1 mr-3">
          <LinkedIn />{' '}
          <Link
            href="https://www.linkedin.com/in/lanr3waju/"
            target="_blank"
            className="link-secondary"
          >
            Abass Olanrewaju Wasiu
          </Link>
        </p>
      </div>
    </section>
  </footer>
)

export default HomePageFooter
