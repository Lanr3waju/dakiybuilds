import HorizontalLine from '../utils/HorizontalLine'
import { DocumentScanner } from '@mui/icons-material'

function DocType() {
  const data = [1, 2, 3, 4]
  return (
    <section className="mt-8">
      <h2 className="text-base font-semibold capitalize text-primary-content">
        Documents
      </h2>
      <HorizontalLine />
      <ul className="mx-auto flex w-full flex-wrap justify-start">
        {data.map((doc) => (
          <li key={doc}>
            <DocumentScanner className="h-20 w-16 cursor-pointer rounded-md object-cover md:w-56" />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DocType
