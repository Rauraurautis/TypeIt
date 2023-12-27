import { FC, useRef, useState } from 'react'
import NavPages from './NavPages'
import DifficultySelection from '../fallingwords/DifficultySelection'
import { Difficulty, Gamemode } from '../../lib/util/types'
import hamburgerImage from '../../assets/images/hamburger.png';
import Menu from './DropDownMenu';
import DropDownMenu from './DropDownMenu';



const Navbar = () => {

    return (
        <div className="w-full flex justify-center p-[10px] fixed">
            <div className="hidden md:flex justify-between">
                <NavPages />
            </div>
            <div className="flex flex-col md:hidden w-[50px] h-[50px] left-3 top-3 absolute cursor-pointer">
                <DropDownMenu />
            </div>
        </div>

    )
}

export default Navbar