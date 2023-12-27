import { FC } from 'react'
import { Gamemode } from '../../lib/util/types'
import { Link, useLocation } from 'react-router-dom'
import { isPage } from '../../lib/util'


const buttonStyle = "bg-cyan-500 p-3 cursor-pointer hover:bg-opacity-50"

const NavPages = () => {
    const { pathname } = useLocation()


    return (
        <div className="flex gap-5">

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
    )
}

export default NavPages