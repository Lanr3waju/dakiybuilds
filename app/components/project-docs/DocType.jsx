import HorizontalLine from '../utils/HorizontalLine'
import { DocumentScanner } from '@mui/icons-material'

function DocType({ name }) {
  const data = [2]
  return (
    <section className="mt-5">
      <h2 className="font-semibold uppercase text-primary md:text-lg">
        {name}
      </h2>
      <HorizontalLine />
      <ul className="mx-auto flex w-full flex-wrap justify-start">
        {data.map((doc) => (
          <li key={doc}>
            <DocumentScanner className="h-48 w-36 cursor-pointer rounded-md object-cover md:w-56" />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DocType
