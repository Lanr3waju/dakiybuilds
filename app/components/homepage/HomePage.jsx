import Image from "next/image"
import HomePageLoginForm from "./HomePageLoginForm"
import ForgotPasswordModal from "./ForgotPasswordModal"

function HomeComponent() {
    return (
        <>
            <ForgotPasswordModal />
            <header className="border-b-4 border-base-300 bg-neutral-content px-3">
                <Image
                    className="h-20 w-full object-cover md:w-1/4"
                    src='/logo.png'
                    width={500}
                    quality={100}
                    height={100}
                    loading="lazy"
                    alt="logo"
                />
            </header>
            <main className="justify-around px-2 py-9 text-center leading-loose md:flex md:px-4 md:py-20 md:text-left">
                <section className="md:max-w-2xl md:py-11">
                    <h1 className='max-w-[36rem] font-Poppins text-4xl font-extrabold leading-snug tracking-tight text-base-content/80 md:text-5xl xl:max-w-[43.5rem]' data-testid="homepage-heading">
                        Welcome to <span className="bg-[linear-gradient(90deg,hsl(var(--s))_0%,hsl(var(--sf))_9%,hsl(var(--pf))_42%,hsl(var(--p))_47%,hsl(var(--a))_100%)] bg-clip-text font-Fascinate tracking-widest text-primary-focus [-webkit-text-fill-color:transparent] [&::selection]:bg-blue-700/20 [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,hsl(var(--s))_4%,color-mix(in_oklch,hsl(var(--sf)),hsl(var(--pf)))_22%,hsl(var(--p))_45%,color-mix(in_oklch,hsl(var(--p)),hsl(var(--a)))_67%,hsl(var(--a))_100.2%)]">dakiyBuilds</span>
                    </h1>
                    <h2 className="font-Poppins text-xl font-extrabold text-base-content/80 md:text-2xl">Your Modern Web-Based Construction Manager!</h2>
                    <p className="py-4 font-light text-base-content/60 md:text-lg xl:text-2xl">Join the revolution in construction management. Experience the future of building projects with dakiyBuilds.</p>
                    <p className="text-xs text-success md:text-sm">Made with 🤎 from Yaba College of Technology (Building Technology Department) </p>
                </section>
                <HomePageLoginForm />
            </main >
        </>
    )
}

export default HomeComponent
