import { getGreeting } from "./getTime"

function Greeting() {
    return (
        <h2 className="mt-4 text-xl font-semibold">
            Hello Mr. Abass, {getGreeting()}.
        </h2>
    )
}

export default Greeting
