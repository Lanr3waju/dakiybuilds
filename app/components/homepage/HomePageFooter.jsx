import Image from 'next/image'
import Link from 'next/link'
import HorizontalLine from '../utils/HorizontalLine'

const HomePageFooter = () => (
    <footer className="flex justify-around bg-slate-100 px-4 py-16 md:px-12">
      <section className="max-w-md text-xs">
        <Image
          className="h-20 w-2/3 object-cover md:w-3/4"
          src="/logo.png"
          width={700}
          quality={100}
          height={100}
          loading="lazy"
          alt="logo"
        />
        <p className="tracking wider mb-4 font-Poppins leading-5">
          DakiyBuilds was created by{' '}
          <Link
            href="https://www.linkedin.com/in/lanr3waju/"
            className="link-info"
          >
            Abass Olanrewaju Wasiu
          </Link>
          , a graduate of the Building Technology Department of Yaba College of
          Technology in Lagos, Nigeria. The platform was created to solve the
          unique challenges faced by construction professionals in Nigeria and
          Africa
        </p>
        <HorizontalLine />
        <p className="font-Poppins leading-5 tracking-wider">
          After working as an Assistant Site Manager during my internship, where
          I faced the challenge of manually tracking site activities,
          interpreting blueprints, and monitoring progress, I realized the
          inefficiencies of existing workflows. This experience inspired the
          creation of DakiyBuids, a web-based construction management system
          aimed at streamlining operations and preventing delays. DakiyBuids
          continues to evolve to meet the growing needs of the industry.
        </p>
      </section>
      <div className="w-2/4 px-3 py-10 text-base font-bold text-success md:text-3xl">
        <p>
          Made with 🤎 from Yaba College of Technology (Building Technology
          Department){' '}
        </p>
        <div className="mt-5 text-5xl tracking-tighter">🟢⚪🟢</div>
      </div>
    </footer>
  )

export default HomePageFooter
