import { getGreeting } from "./getTime"

function Greeting() {
    return (
        <h2 className="mt-5 text-xl font-semibold">
            Hello Bldr. Abass, {getGreeting()}.
        </h2>
    )
}

export default Greeting
