import Link from "next/link"

function AddButon({ addText, route }) {
    return (
        <Link href={`/${route}`} className='btn btn-primary mb-2 w-full py-5 text-right' >+ {addText}</Link>
    )
}

export default AddButon
