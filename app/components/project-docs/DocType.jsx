import Image from "next/image"
import HorizontalLine from "../utils/HorizontalLine"

function DocType({ name }) {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <section className="mt-5">
            <h2 className="uppercase md:text-lg font-semibold text-primary-focus">{name}</h2>
            <HorizontalLine />
            <ul className="flex w-full flex-wrap justify-start mx-auto">
                {data.map((doc) => (
                    <li key={doc}><Image
                        className=" cursor-pointer h-30 object-cover rounded-md border-2 border-primary mr-5 mb-4 w-40 md:w-56"
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
