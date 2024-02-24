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
  <footer className="flex justify-around bg-slate-100 px-4 py-16 md:px-12 flex-col md:flex-row">
    <section className="w-full md:max-w-md text-base font-light md:text-xs text-center mx-auto md:mx-0 md:text-left leading-10 tracking-widest md:leading-4 text-primary-content/75">
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
        <p className="tracking wider mt-4 md:mt-1 mb-4 font-Poppins leading-5">
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
    <div className="md:w-2/4 w-full px-3 py-10 text-base font-bold text-success md:text-2xl">
      <ScrollRevealComponent>
        <div className="md:text-5xl text-2xl tracking-tighter my-5  text-center md:text-left">
          🟢⚪🟢
        </div>
      </ScrollRevealComponent>
      <HorizontalLine />
      <div className="text-sm text-primary-content/70 font-Roboto tracking-wider">
        <h2 className="font-bold uppercase font-Poppins tracking-wider text-primary-content/70 mt-6 md:mb-2 mb-4 text-3xl md:text-xl text-center md:text-left">
          <SupportAgentSharp className="text-primary-content/70 text-3xl text-center md:text-left" />{' '}
          Contact US:
        </h2>
        <p className="md:my-1 my-2">
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
        <p className="md:my-1 my-2">
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
        <p className="md:my-1 my-2">
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
