import { FC, useMemo, useState } from 'react'
import { Theme, ThemeName, themes, useTheme } from '../../lib/context/ThemeContext'
import useDropdown from '../../hooks/useDropdown'

interface ThemeSelectProps {

}



const ThemeSelect: FC<ThemeSelectProps> = ({ }) => {
    const { theme, applyTheme } = useTheme()
    const { dropdownRef, isOpen, toggleDropdown } = useDropdown()


    const selectThemeHandler = (name: ThemeName) => {
        if (theme) applyTheme(name)
    }

    const allThemes = useMemo(() => {
        const themeKeys = Object.keys(themes) as ThemeName[]
        return themeKeys.map((theme) => ({ name: theme, theme: themes[theme] }))
    }, [])


    return <div className={` font-semibold flex items-center justify-center gap-5 relative`} ref={dropdownRef}>
        <div className=" select-none flex">
            <button className="cursor-pointer hover:opacity-75 text-5xl flex gap-1" onClick={() => toggleDropdown()}>
                <div className={` w-4 h-4 rounded-full border border-black`} style={{ backgroundColor: theme.backgroundColor }}></div>
                <div className={` w-4 h-4 rounded-full border border-black`} style={{ backgroundColor: theme.color }}></div>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='ml-3 h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19 9l-7 7-7-7'
                    />
                </svg>
            </button>
            {isOpen &&
                <div className="absolute right-0 top-10 animate-fadeIn">
                    {allThemes.map(({ name, theme }) => (
                        <div onClick={() => selectThemeHandler(name)} className="flex justify-between items-center gap-4 cursor-pointer hover:opacity-75 p-0.5" key={name}>
                            <h1>{name}</h1>
                            <div className="text-5xl flex gap-1">
                                <div className={`w-4 h-4 rounded-full border border-black`} style={{ backgroundColor: theme.backgroundColor }}></div>
                                <div className={`w-4 h-4 rounded-full border border-black`} style={{ backgroundColor: theme.color }}></div>
                            </div>

                        </div>
                    ))}
                </div>}
        </div>
    </div>
}

export default ThemeSelect