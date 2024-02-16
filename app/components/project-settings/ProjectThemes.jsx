'use client'

import { DakiyStore } from "@/context/context"
import { useContext } from "react"

function ProjectThemes() {
    const { setSelectedTheme } = useContext(DakiyStore)

    // 2. Create a handler to update the selected theme
    const handleThemeChange = (event) => {
        setSelectedTheme(event.target.value)
    }

    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
                Theme
                <svg width="12px" height="12px" className="inline-block h-2 w-2 fill-current opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow-2xl">
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="Default" value="default" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="Retro" value="retro" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="Cyberpunk" value="cyberpunk" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="Valentine" value="valentine" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="Aqua" value="aqua" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="Cupcake" value="cupcake" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="Bumblebee" value="bumblebee" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="Corporate" value="corporate" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="Pastel" value="pastel" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="Dracula" value="dracula" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="CMYK" value="cmyk" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="Acid" value="acid" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="Lemonade" value="lemonade" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="Coffee" value="coffee" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="Dim" value="dim" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" onChange={handleThemeChange} aria-label="Nord" value="nord" /></li>
            </ul>
        </div>
    )
}

export default ProjectThemes
