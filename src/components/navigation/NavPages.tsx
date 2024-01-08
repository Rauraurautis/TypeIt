import { Link, useLocation } from 'react-router-dom'
import { isPage } from '../../lib/util'
import { useTheme } from '../../lib/context/ThemeContext'
import Button from '../ui/Button'




const NavPages = () => {
    const { pathname } = useLocation()

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