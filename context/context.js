import { createContext, useState } from "react"

export const DakiyStore = createContext()

function Context({ children }) {
    const [project, setProject] = useState([])

    return (
        <DakiyStore.Provider
            value={{ project, setProject }}
        >
            {children}
        </DakiyStore.Provider>
    )
}

export default Context
