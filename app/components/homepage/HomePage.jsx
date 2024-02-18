import Image from 'next/image'
import HomePageLoginForm from './HomePageLoginForm'
import ForgotPasswordModal from './ForgotPasswordModal'
import Carousel from './Carousel'

function HomeComponent() {
  return (
    <>
      <ForgotPasswordModal />
      <header className="flex justify-between border-b-4 border-base-300 bg-neutral-content px-2">
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
      <main className="px-2 py-9 text-center leading-loose md:px-4 md:py-20 md:text-left">

        <section className='flex justify-center flex-col md:flex-row'>
          {/*
          <div className="h-96 carousel carousel-vertical rounded-box mb-4 md:mb-0 md:mx-4">
            <div className="carousel-item h-full">
              <Image
                className="w-full h-full object-cover rounded-box"
                src="https://res.cloudinary.com/dbzorthz8/image/upload/v1708292446/jo-szczepanska-5aiRb5f464A-unsplash_u2nbum.jpg"
                width={500}
                quality={100}
                height={300}
                loading="lazy"
                alt="sticker tags on brown board"
              />
            </div>
            <div className="carousel-item h-full">
              <Image
                className="w-full h-full object-cover rounded-box"
                src="https://res.cloudinary.com/dbzorthz8/image/upload/v1708292733/Gemini_Generated_Image_2_cgkmny.jpg"
                width={500}
                quality={100}
                height={300}
                loading="lazy"
                alt="in with the new and out with the old"
              />
            </div>
            <div className="carousel-item h-full">
              <Image
                className="w-full h-full object-cover rounded-box"
                src="https://res.cloudinary.com/dbzorthz8/image/upload/v1708292465/lukas-blazek-mcSDtbWXUZU-unsplash_phvfdi.jpg"
                width={500}
                quality={100}
                height={300}
                loading="lazy"
                alt="gantt chart on laptop screen"
              />
            </div>
          </div> */}
          <Carousel />
          <section className="md:max-w-2xl md:mx-4">
            <h1
              className="max-w-[36rem] font-Poppins text-4xl font-extrabold leading-snug tracking-tight text-base-content/80 md:text-5xl xl:max-w-[43.5rem]"
            >
              Welcome to{' '}
              <span className="text-secondary font-Fascinate">
                dakiyBuilds
              </span>
            </h1>
            <h2 className="font-Poppins text-xl font-extrabold text-base-content/80 md:text-2xl">
              Your Modern Web-Based Construction Manager!
            </h2>
            <p className="py-4 font-light text-base-content/60 md:text-lg xl:text-2xl">
              Join the revolution in construction management. Experience the
              future of building projects with dakiyBuilds.
            </p>
            <p className="text-xs text-success md:text-sm">
              Made with 🤎 from Yaba College of Technology (Building Technology
              Department){' '}
            </p>
          </section>
        </section>
        <HomePageLoginForm />
      </main>
    </>
  )
}

export default HomeComponent
