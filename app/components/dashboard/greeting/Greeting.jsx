import { getGreeting } from './getTime'

async function Greeting() {
  const fullName = "Abass Olanrewaju"

  return (
    <h2 className="mt-4 text-xl font-semibold">
      Hello {fullName}, {getGreeting()}.
    </h2>
  )
}

export default Greeting
