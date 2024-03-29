import NavPages from './NavPages'
import DropDownMenu from './DropDownMenu';
import ThemeSelect from './ThemeSelect';
import logo from "../../assets/images/logo.png"



const Navbar = () => {

    return (
        <div className="w-full flex justify-center p-[10px] fixed z-20">
            <div className="absolute right-5 top-5">
                <ThemeSelect />
            </div>
            <div className="hidden md:flex items-center justify-between gap-10">
                <div className="w-[70px]">
                    <img src={logo} />
                </div>
                <NavPages />
            </div>
            <div className="flex flex-col md:hidden w-[50px] h-[50px] left-3 top-3 absolute cursor-pointer">
                <DropDownMenu />
            </div>
        </div>

    )
}

export default Navbar