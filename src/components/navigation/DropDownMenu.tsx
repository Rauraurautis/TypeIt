import { FC, MutableRefObject, SetStateAction, useRef, useState } from 'react'
import hamburgerImage from '../../assets/images/hamburger.png';
import { Difficulty, Gamemode } from '../../lib/util/types'
import { Link, useLocation } from 'react-router-dom'
import { isPage } from '../../lib/util'



const buttonStyle = "bg-cyan-500 p-3 cursor-pointer hover:bg-opacity-50"
const difficulties = ["easy", "medium", "hard"]
const diffColors = {
    easy: "bg-green-700",
    medium: "bg-yellow-700",
    hard: "bg-red-700"
}

const DropDownMenu = () => {
    const { pathname } = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)
    const [menuAnimation, setMenuAnimation] = useState("animate-menuDropDown")

    const handleMenuClick = () => {
        if (menuOpen) {
            setMenuAnimation(prev => ("animate-menuGoUp"))
            setTimeout(() => {
                setMenuOpen(false)
                setMenuAnimation(prev => ("animate-menuDropDown"))
            }, 100);
        } else {
            setMenuOpen(true)
        }
    }



    return (
        <>
            <img src={hamburgerImage} className="" onClick={handleMenuClick} />
            {menuOpen && <div className={`flex flex-col w-[150px] gap-5 mt-2 ${menuAnimation}`}>
                <div className="">
                    <Link to="/">
                        <div className={`${buttonStyle}  ${isPage("/", pathname) ? "bg-opacity-50" : ""}`} >
                            Home
                        </div>
                    </Link>

                    <Link to="/fallingwords">
                        <div className={`${buttonStyle}  ${isPage("/fallingwords", pathname) ? "bg-opacity-50" : ""}`}>
                            Wordfall
                        </div>
                    </Link>

                    <Link to="/wpm">
                        <div className={`${buttonStyle}  ${isPage("/wpm", pathname) ? "bg-opacity-50" : ""}`}>
                            Words Per Minute
                        </div></Link>
                </div>
            </div >}
        </>
    )
}

export default DropDownMenu