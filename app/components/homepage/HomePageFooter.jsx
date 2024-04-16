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
  <footer className="flex flex-col justify-around bg-slate-100 px-4 md:px-8 py-10 md:flex-col">
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
        <p className="tracking wider my-2 md:mt-1 leading-6 w-full">
          A web-based construction management system meticulously crafted by professionals in the construction industry to address the challenges faced by project stakeholders (including Project Managers, Construction Managers, Architects, Builders, and Construction Companies).
          Equipped with carefully selected features, it empowers the management team to oversee projects with precision and efficiency.
        </p>
      </ScrollRevealComponent>
      <HorizontalLine />
    </section>
    <section className="w-full px-1 py-2 text-base font-bold text-success md:w-2/4 md:text-2xl">
      <div className="font-Roboto text-sm tracking-wider text-primary-content/70 flex md:items-center md:flex-row flex-col">
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
