import { FC } from 'react'
import { Gamemode } from '../../lib/types'
import { Link, useLocation } from 'react-router-dom'
import { isPage } from '../../lib/util'
import { useTheme } from '../../lib/context/ThemeContext'
import Button from '../ui/Button'




const NavPages = () => {
    const { pathname } = useLocation()
    const { theme } = useTheme()
    const buttonStyle = `bg-cyan-500 p-3 cursor-pointer hover:bg-opacity-50 text-black`

    return (
        <div className="flex gap-5">

            <Link to="/">
                <Button backgroundColor='cyan' selected={isPage("/", pathname)}>
                    Home
                </Button>
            </Link>

            <Link to="/fallingwords">
                <Button backgroundColor='cyan' selected={isPage("/fallingwords", pathname)}>
                    Wordfall
                </Button>
            </Link>

            <Link to="/wpm">
                <Button backgroundColor='cyan' selected={isPage("/wpm", pathname)}>
                    Words Per Minute
                </Button></Link>

        </div>
    )
}

export default NavPages