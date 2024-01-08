import { Dispatch, FC, ReactNode, createContext, useState, SetStateAction, useContext } from "react";

export type ThemeName = "dark" | "medium" | "light"

export type Theme = {
    color: string;
    backgroundColor: string;
};

export const themes: Record<ThemeName, Theme> = {
    light: { color: "#18181b", backgroundColor: "#e2e8f0" },
    medium: { color: "#bae6fd", backgroundColor: "#0c4a6e" },
    dark: { color: "#cbd5e1", backgroundColor: "#171717" }
}

interface ThemeContextType {
    theme: Theme
    applyTheme: (name: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};


export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(themes.medium)

    const applyTheme = (name: ThemeName) => {
        setTheme(themes[name])
    }

    return (
        <ThemeContext.Provider value={{ theme, applyTheme }}  >
            {children}
        </ThemeContext.Provider>
    )
}