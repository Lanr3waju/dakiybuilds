import Image from 'next/image'
import Link from 'next/link'
import HorizontalLine from '../utils/HorizontalLine'
import ScrollRevealComponent from './ScrollRevealComponent'
import {
  LinkRounded,
  MailLockSharp,
  PhoneAndroidSharp,
  SupportAgentSharp,
} from '@mui/icons-material'

const HomePageFooter = () => (
  <footer className="flex flex-col justify-around bg-slate-100 px-4 py-16 md:flex-row md:px-12">
    <section className="mx-auto w-full text-center text-base font-light leading-10 tracking-widest text-primary-content/75 md:mx-0 md:max-w-md md:text-left md:text-xs md:leading-4">
      <Image
        className="h-20 w-full object-cover md:w-3/4 "
        src="/logo.png"
        width={700}
        quality={100}
        height={100}
        loading="lazy"
        alt="logo"
      />
      <ScrollRevealComponent>
        <p className="tracking wider my-4 font-Poppins leading-5 md:mt-1">
          DakiyBuilds was created by{' '}
          <Link
            href="https://www.linkedin.com/in/lanr3waju/"
            className="link-info"
          >
            Abass Olanrewaju Wasiu
          </Link>
          , a graduate of the Building Technology Department of Yaba College of
          Technology in Lagos, Nigeria. The system was created to solve the
          unique challenges faced by construction professionals in Nigeria and
          Africa
        </p>
      </ScrollRevealComponent>
      <HorizontalLine />
      <ScrollRevealComponent>
        <p className="font-Poppins leading-5 tracking-wider">
          After working as an Assistant Site Manager during my internship, where
          I faced the challenge of manually tracking site activities,
          interpreting blueprints, and monitoring progress, I realized the
          inefficiencies of existing workflows. This experience inspired the
          creation of DakiyBuids, a web-based construction management system
          aimed at streamlining operations and preventing delays. DakiyBuids
          continues to evolve to meet the growing needs of the industry.
        </p>
      </ScrollRevealComponent>
    </section>
    <div className="w-full px-3 py-10 text-base font-bold text-success md:w-2/4 md:text-2xl">
      <ScrollRevealComponent>
        <div className="my-5 text-center text-2xl tracking-tighter  md:text-left md:text-5xl">
          🟢⚪🟢
        </div>
      </ScrollRevealComponent>
      <HorizontalLine />
      <div className="font-Roboto text-sm tracking-wider text-primary-content/70">
        <h2 className="mb-4 mt-6 text-center font-Poppins text-3xl font-bold uppercase tracking-wider text-primary-content/70 md:mb-2 md:text-left md:text-xl">
          <SupportAgentSharp className="text-center text-3xl text-primary-content/70 md:text-left" />{' '}
          Contact US:
        </h2>
        <p className="my-2 md:my-1">
          <PhoneAndroidSharp />{' '}
          <Link
            href="tel:+23407041444880"
            target="_blank"
            className="link-primary"
          >
            +234070DakiyBuilds
          </Link>{' '}
          (Speak with one of our support specialist)
        </p>
        <p className="my-2 md:my-1">
          <MailLockSharp />{' '}
          <Link
            href="mailto:lanr3waju@gmail.com"
            target="_blank"
            className="link-primary"
          >
            info@dakiybuilds.co
          </Link>{' '}
          (Send us a mail)
        </p>
        <p className="my-2 md:my-1">
          <LinkRounded />{' '}
          <Link
            href="https://www.linkedin.com/in/lanr3waju/"
            target="_blank"
            className="link-primary"
          >
            Abass Olanrewaju Wasiu
          </Link>{' '}
          (Connect with our founder on LinkedIn)
        </p>
      </div>
    </div>
  </footer>
)

export default HomePageFooter
