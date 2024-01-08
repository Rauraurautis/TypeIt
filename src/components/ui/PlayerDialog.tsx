import { FC } from 'react'

interface PlayerDialogProps {
    children: React.ReactNode
    padding?: number
    height?: string
}

const PlayerDialog: FC<PlayerDialogProps> = ({ children, padding, height }) => {
    return (
        <div className={`bg-sky-800 rounded-xl relative animate-fadeIn max-w-[500px]`} style={{ padding: padding ? `${padding}px` : `20px`, height: height === "full" ? "100%" : "auto" }}>
            <div className="flex flex-col items-center justify-between h-full">
                {children}
            </div>
        </div>
    )

}

export default PlayerDialog