import Image from "next/image"
import HorizontalLine from "../utils/HorizontalLine"

function DocType({ name }) {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <section className="mt-5">
            <h2 className="font-semibold uppercase text-primary-focus md:text-lg">{name}</h2>
            <HorizontalLine />
            <ul className="mx-auto flex w-full flex-wrap justify-start">
                {data.map((doc) => (
                    <li key={doc}><Image
                        className=" h-30 mb-4 mr-5 w-40 cursor-pointer rounded-md border-2 border-primary object-cover md:w-56"
                        src='/logo.png'
                        width={300}
                        height={200}
                        loading="lazy"
                        alt="logo"
                    />
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default DocType
