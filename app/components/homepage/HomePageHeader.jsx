import Image from 'next/image'
import { Link } from 'react-scroll'

function HomePageHeader() {
  return (
    <header className="z-50 flex w-full items-center justify-between border-b-4 border-base-300 px-2">
      <Image
        className="h-20 w-2/3 object-cover md:w-1/4"
        src="/logo.png"
        width={300}
        quality={100}
        height={100}
        loading="lazy"
        alt="logo"
      />

      <Link
        to="login-signup"
        spy={true}
        smooth={true}
        offset={-30}
        duration={1000}
        className="btn btn-secondary btn-sm !scroll-smooth rounded-xl text-white md:btn-md md:px-9"
      >
        Login / Signup
      </Link>
    </header>
  )
}

export default HomePageHeader
