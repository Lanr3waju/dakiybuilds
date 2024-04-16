import Image from 'next/image'
import { Link } from 'react-scroll'

function HomePageHeader() {
  return (
    <header className="z-50 sticky mt-2 flex w-full items-center justify-between shadow-md shadow-base-200 px-2">
      <Image
        className="h-20 w-2/3 object-cover md:w-1/4"
        src="https://res.cloudinary.com/dbzorthz8/image/upload/v1710414091/logo_qbxief.png"
        width={300}
        quality={100}
        height={100}
        priority
        alt="logo"
      />

      <Link
        to="login-signup"
        spy={true}
        smooth={true}
        offset={-30}
        duration={1000}
        className="btn btn-outline btn-success btn-sm !scroll-smooth text-white md:btn-md md:px-9 mr-3"
      >
        Login / Signup
      </Link>
    </header>
  )
}

export default HomePageHeader
