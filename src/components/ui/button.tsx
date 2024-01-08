import { ButtonHTMLAttributes, FC } from 'react'

type ButtonColor = "orange" | "cyan" | "red" | "white" | "black"
type TextColor = "black" | "white"

const backgroundColors: Record<ButtonColor, string> = {
    orange: "#f97316",
    cyan: "#06b6d4",
    red: "#dc2626",
    white: "#fafafa",
    black: "#18181b"
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
    onClick?: () => void
    textColor?: TextColor
    backgroundColor?: ButtonColor
    customBackgroundColor?: string
    selected?: boolean 
}

const Button: FC<ButtonProps> = ({ backgroundColor, children, textColor, onClick, customBackgroundColor, selected, ...rest }) => {
    return <button {...rest} onClick={onClick} className={`py-2 px-3 rounded-xl transition-all hover:brightness-90 ${selected && "brightness-90"}`}
        style={{ backgroundColor: backgroundColor ? backgroundColors[backgroundColor] : customBackgroundColor, color: textColor ?? "black" }}>{children}</button>
}

export default Button