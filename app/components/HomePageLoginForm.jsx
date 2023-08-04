import Link from "next/link"

function HomePageLoginForm() {
    return (
        <section className="mt-5 max-w-xl rounded-md bg-base-200 px-2 py-9 leading-loose text-base-content shadow-md shadow-base-300 md:w-3/6">
            <h2 className="font-Poppins text-lg font-semibold text-base-content/70">Login to access your projects, or <Link className="text-info" href="/#">create new account:</Link></h2>
            <form className="flex flex-col">
                <input type="email" placeholder="Enter your mail" className="input input-bordered input-primary my-3 w-full focus:border-none focus:ring-0" />
                <input type="password" placeholder="Enter your password" className="input input-bordered input-primary my-1 w-full focus:border-none focus:ring-0" />
                <button className="btn btn-neutral btn-active mt-5" type="submit">Login</button>
            </form>
        </section>
    )
}

export default HomePageLoginForm
